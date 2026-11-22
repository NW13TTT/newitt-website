const encoder = new TextEncoder();
const prefix = '/skyline-explorer';
const privacyHeaders = { 'cache-control': 'no-store', 'x-content-type-options': 'nosniff', 'referrer-policy': 'strict-origin-when-cross-origin' };
const json = (data, status = 200) => Response.json(data, { status, headers: privacyHeaders });
const fail = (message, status = 400) => json({ error: message }, status);
const query = (db, sql, ...args) => db.prepare(sql).bind(...args);
const statuses = new Set(['pending', 'rejected', 'open', 'closed', 'planned', 'filmed', 'published']);

async function sign(secret, value) {
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(value));
  return Array.from(new Uint8Array(signature), byte => byte.toString(16).padStart(2, '0')).join('');
}
function equal(left, right) {
  if (left.length !== right.length) return false;
  let diff = 0;
  for (let i = 0; i < left.length; i++) diff |= left.charCodeAt(i) ^ right.charCodeAt(i);
  return diff === 0;
}
async function allow(env, request, scope, maximum, seconds) {
  const now = Math.floor(Date.now() / 1000);
  const expires = (Math.floor(now / seconds) + 1) * seconds;
  const ip = request.headers.get('CF-Connecting-IP') || 'local';
  const key = await sign(env.VISITOR_SECRET, scope + ':' + expires + ':' + ip);
  const [rate] = await env.DB.batch([
    query(env.DB, 'INSERT INTO limits VALUES (?,1,?) ON CONFLICT(bucket) DO UPDATE SET count=count+1 WHERE count < ? RETURNING count', key, expires, maximum),
    query(env.DB, 'DELETE FROM limits WHERE expires < ?', now)
  ]);
  return rate.results.length > 0;
}
async function visitor(env, request) {
  const cookie = request.headers.get('Cookie')?.match(/(?:^|;\s*)skyline_visit=([\da-f-]{36})\.([\da-f]{64})(?:;|$)/i);
  if (cookie && equal(cookie[2], await sign(env.VISITOR_SECRET, cookie[1]))) return { key: cookie[2] };
  const id = crypto.randomUUID();
  const key = await sign(env.VISITOR_SECRET, id);
  const secure = new URL(request.url).protocol === 'https:' ? '; Secure' : '';
  return { key, cookie: 'skyline_visit=' + id + '.' + key + '; Max-Age=31536000; Path=' + prefix + '; HttpOnly; SameSite=Strict' + secure };
}
function field(value, min, max) {
  if (typeof value !== 'string') throw new Error('Please complete the required fields.');
  const clean = value.trim().replace(/\s+/g, ' ');
  if (clean.length < min || clean.length > max || /[<>\u0000-\u001f]/.test(clean)) throw new Error('Check the field lengths and use plain text.');
  return clean;
}
function link(value, media = false) {
  if (!value) return null;
  if (media && /^\/skyline-explorer\/media\/[a-z0-9.-]+$/.test(value)) return value;
  const url = new URL(field(value, 8, 500));
  if (url.protocol !== 'https:' || url.username || url.password || !url.hostname.includes('.')) throw new Error('Use a public HTTPS link.');
  return url.href;
}
function coordinate(value, min, max) {
  if (value === '' || value == null || !['number', 'string'].includes(typeof value)) throw new Error('Enter a public map location.');
  const number = Number(value);
  if (!Number.isFinite(number) || number < min || number > max) throw new Error('Enter valid map coordinates.');
  return Math.round(number * 1000) / 1000;
}
async function body(request) {
  const reader = request.body?.getReader();
  if (!reader) throw new Error('Missing form data.');
  const decoder = new TextDecoder();
  let text = '', size = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 8192) { await reader.cancel(); throw new Error('This entry is too long.'); }
    text += decoder.decode(value, { stream: true });
  }
  const data = JSON.parse(text + decoder.decode());
  if (!data || Array.isArray(data) || typeof data !== 'object') throw new Error('Invalid form.');
  return data;
}
const publicDestinations = `SELECT d.id,d.name,d.region,d.description,d.status,d.latitude,d.longitude,
  COUNT(v.visitor) AS votes FROM destinations d LEFT JOIN votes v ON d.id=v.destination
  WHERE d.status IN ('open','closed','planned','filmed','published') GROUP BY d.id ORDER BY votes DESC,d.name`;

async function admin(request, env, path, serve) {
  if (!env.ADMIN_PASSWORD || !env.VISITOR_SECRET) return fail('Administration is unavailable.', 503);
  const expected = 'Basic ' + btoa('skyline:' + env.ADMIN_PASSWORD);
  if (!equal(request.headers.get('Authorization') || '', expected)) {
    if (!(await allow(env, request, 'login', 12, 900))) return fail('Try again later.', 429);
    return new Response('Sign in to Skyline Explorer administration.', { status: 401, headers: { ...privacyHeaders, 'WWW-Authenticate': 'Basic realm="Skyline Explorer", charset="UTF-8"' } });
  }
  if (path === '/admin' && request.method === 'GET') return serve('admin.html', true);
  if (path !== '/api/admin') return fail('Not found.', 404);
  if (request.method === 'GET') {
    const results = await env.DB.batch([env.DB.prepare('SELECT * FROM destinations ORDER BY created DESC'), env.DB.prepare('SELECT * FROM flights ORDER BY name')]);
    return json({ destinations: results[0].results, flights: results[1].results });
  }
  const data = await body(request);
  if (data.action === 'destination') {
    if (!statuses.has(data.status)) throw new Error('Select a valid status.');
    const lat = data.latitude === '' || data.latitude == null ? null : coordinate(data.latitude, -90, 90);
    const lon = data.longitude === '' || data.longitude == null ? null : coordinate(data.longitude, -180, 180);
    if ((lat === null) !== (lon === null)) throw new Error('Provide both map coordinates or leave both empty.');
    const result = await query(env.DB, 'UPDATE destinations SET status=?,latitude=?,longitude=? WHERE id=?', data.status, lat, lon, field(data.id, 1, 80)).run();
    return result.meta.changes ? json({ ok: true }) : fail('Destination not found.', 404);
  }
  if (data.action === 'remove') {
    await query(env.DB, 'DELETE FROM destinations WHERE id=?', field(data.id, 1, 80)).run();
    return json({ ok: true });
  }
  if (data.action === 'flight') {
    const id = data.id ? field(data.id, 1, 80) : crypto.randomUUID();
    await query(env.DB, `INSERT INTO flights VALUES (?,?,?,?,?,?,?,?,?,?,?)
      ON CONFLICT(id) DO UPDATE SET name=excluded.name,region=excluded.region,description=excluded.description,
      latitude=excluded.latitude,longitude=excluded.longitude,photo=excluded.photo,film=excluded.film,
      youtube=excluded.youtube,soundtrack=excluded.soundtrack,source=excluded.source`,
      id, field(data.name, 2, 100), field(data.region, 2, 100), field(data.description, 5, 800),
      coordinate(data.latitude, -90, 90), coordinate(data.longitude, -180, 180),
      link(data.photo, true), link(data.film, true), link(data.youtube), link(data.soundtrack),
      link(field(data.source, 8, 500))).run();
    return json({ ok: true });
  }
  return fail('Unknown moderation action.');
}

export function createHandler(serve, fallback) {
  return async function handle(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname !== prefix && !url.pathname.startsWith(prefix + '/')) return fallback(request, env, ctx);
    const path = url.pathname.slice(prefix.length).replace(/\/$/, '') || '/';
    try {
      if (path.startsWith('/api/') || path === '/admin') {
        if (!['GET', 'POST'].includes(request.method)) return fail('Method not allowed.', 405);
        if (request.method === 'POST' && (request.headers.get('Origin') !== url.origin ||
            !/^application\/json(?:\s*;|$)/i.test(request.headers.get('Content-Type') || ''))) return fail('Invalid request origin or format.', 403);
        if (!env.DB || !env.VISITOR_SECRET) return fail('Community service is currently unavailable.', 503);
        if (path === '/admin' || path === '/api/admin') return await admin(request, env, path, serve);
        if (path === '/api/explore' && request.method === 'GET') {
          const [flights, destinations] = await env.DB.batch([env.DB.prepare('SELECT id,name,region,description,latitude,longitude,photo,film,youtube,soundtrack FROM flights ORDER BY name'), env.DB.prepare(publicDestinations)]);
          return json({ flights: flights.results, destinations: destinations.results });
        }
        if (path === '/api/suggest' && request.method === 'POST') {
          if (!(await allow(env, request, 'suggest', 5, 3600))) return fail('Please wait before sending another suggestion.', 429);
          const data = await body(request);
          if (data.website) return fail('Suggestion rejected.');
          const name = field(data.name, 2, 100), region = field(data.region, 2, 100);
          const description = field(data.description, 10, 800);
          if (/https?:\/\/|www\./i.test(description)) return fail('Use the optional reference link field for links.');
          const normalized = (name + ' ' + region).normalize('NFKD').toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');
          const result = await query(env.DB, 'INSERT OR IGNORE INTO destinations(id,name,region,description,reference,normalized,created) VALUES(?,?,?,?,?,?,?)',
            crypto.randomUUID(), name, region, description, link(data.reference), normalized, Date.now()).run();
          return result.meta.changes ? json({ ok: true }, 201) : fail('That destination has already been suggested.', 409);
        }
        if (path === '/api/vote' && request.method === 'POST') {
          if (!(await allow(env, request, 'vote', 12, 3600))) return fail('Voting limit reached. Try again later.', 429);
          const { id } = await body(request);
          const identity = await visitor(env, request);
          field(id, 1, 80);
          const now = Date.now();
          const expires = (Math.floor(now / 86400000) + 1) * 86400000;
          const ip = request.headers.get('CF-Connecting-IP') || 'local';
          const network = await sign(env.VISITOR_SECRET, 'vote:' + expires + ':' + ip);
          const results = await env.DB.batch([
            query(env.DB, 'DELETE FROM vote_windows WHERE expires < ?', now),
            query(env.DB, `INSERT OR IGNORE INTO votes SELECT id,? FROM destinations
              WHERE id=? AND status='open' AND NOT EXISTS
              (SELECT 1 FROM vote_windows WHERE destination=? AND public_network=?)`, identity.key, id, id, network),
            query(env.DB, 'INSERT OR IGNORE INTO vote_windows SELECT ?,?,? WHERE changes() > 0', id, network, expires),
            query(env.DB, 'SELECT status,(SELECT COUNT(*) FROM votes WHERE destination=?) AS votes FROM destinations WHERE id=?', id, id)
          ]);
          const row = results[3].results[0];
          if (row?.status !== 'open') return fail('Voting is closed for this destination.', 409);
          if (!results[1].meta.changes) return fail('A vote has already been recorded from this browser or connection.', 409);
          const response = json({ votes: row.votes });
          if (identity.cookie) response.headers.append('Set-Cookie', identity.cookie);
          return response;
        }
        return fail('Not found.', 404);
      }
      if (!['GET', 'HEAD'].includes(request.method)) return fail('Method not allowed.', 405);
      return await serve(path === '/' || path === '/flights' || path === '/next' ? 'index.html' : path.slice(1), false, request);
    } catch (error) {
      if (/D1_|SQLITE|storage|binding/i.test(error.message)) {
        console.error(error.message);
        return fail('The community service could not complete this request.', 503);
      }
      return fail(error instanceof SyntaxError ? 'Enter valid form data or a public HTTPS link.' : error.message);
    }
  };
}
