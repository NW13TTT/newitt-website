import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import { createHandler } from '../explorer/worker.mjs';

const base = 'https://preview.example';
const prefix = '/skyline-explorer';
const migration = (name) => readFileSync(new URL('../explorer/migrations/' + name, import.meta.url), 'utf8');

function setup() {
  const sqlite = new DatabaseSync(':memory:');
  sqlite.exec(migration('0001.sql') + migration('0002.sql'));
  const db = {
    prepare(sql) {
      const statement = sqlite.prepare(sql);
      function bound(args) {
        return {
          bind: (...params) => bound(params),
          async run() {
            if (statement.columns().length) {
              const results = statement.all(...args);
              return { results, meta: { changes: results.length } };
            }
            const { changes } = statement.run(...args);
            return { results: [], meta: { changes } };
          }
        };
      }
      return bound([]);
    },
    async batch(statements) {
      sqlite.exec('BEGIN');
      try {
        const results = [];
        for (const statement of statements) results.push(await statement.run());
        sqlite.exec('COMMIT');
        return results;
      } catch (error) {
        sqlite.exec('ROLLBACK');
        throw error;
      }
    }
  };
  const handler = createHandler((name, privatePage) => new Response(name, { headers: { 'cache-control': privatePage ? 'no-store' : 'public' } }),
    () => new Response('approved site'));
  async function request(path, { data, ip = '192.0.2.1', admin = false, origin = base, cookie } = {}) {
    const headers = new Headers({ 'CF-Connecting-IP': ip });
    if (data) {
      headers.set('Origin', origin);
      headers.set('Content-Type', 'application/json');
    }
    if (admin) headers.set('Authorization', 'Basic ' + btoa('skyline:test-admin'));
    if (cookie) headers.set('Cookie', cookie);
    return handler(new Request(base + prefix + path, { headers, method: data ? 'POST' : 'GET', body: data ? JSON.stringify(data) : undefined }),
      { DB: db, ADMIN_PASSWORD: 'test-admin', VISITOR_SECRET: 'test-only' });
  }
  return { request, sqlite };
}
const suggestion = { name: 'Test viewpoint', region: 'Test county', description: 'A suitable documentary landscape for this test.', reference: 'https://example.org/landscape' };

test('only the four verified flights are seeded, with no public destinations or votes', async () => {
  const { request } = setup();
  const { flights, destinations } = await (await request('/api/explore')).json();
  assert.equal(flights.length, 4);
  assert.ok(flights.every(item => item.latitude && item.longitude && item.youtube));
  assert.ok(flights.every(item => !('source' in item)));
  assert.deepEqual(destinations, []);
});

test('admin requires credentials and submissions require same-origin JSON, plain text and a public HTTPS reference', async () => {
  const { request } = setup();
  const restricted = await request('/admin');
  assert.equal(restricted.status, 401);
  assert.match(restricted.headers.get('WWW-Authenticate'), /^Basic /);
  assert.equal((await request('/api/admin')).status, 401);
  assert.equal((await request('/admin', { admin: true })).headers.get('Cache-Control'), 'no-store');
  assert.equal((await request('/api/suggest', { data: suggestion, origin: 'https://elsewhere.example' })).status, 403);
  for (const addition of [{ name: '<img>' }, { website: 'bot' }, { reference: 'javascript:alert(1)' }]) {
    assert.equal((await request('/api/suggest', { data: { ...suggestion, ...addition } })).status, 400);
  }
});

test('moderation keeps entries private, approves with public coordinates, closes voting and removes related data', async () => {
  const { request, sqlite } = setup();
  assert.equal((await request('/api/suggest', { data: suggestion })).status, 201);
  assert.equal((await request('/api/suggest', { data: { ...suggestion, name: ' TEST-viewpoint ' } })).status, 409);
  assert.deepEqual((await (await request('/api/explore')).json()).destinations, []);
  const [{ id }] = (await (await request('/api/admin', { admin: true })).json()).destinations;
  assert.equal((await request('/api/vote', { data: { id } })).status, 409);
  const moderation = { action: 'destination', id, status: 'open', latitude: 52.1002, longitude: -2.2345 };
  assert.equal((await request('/api/admin', { data: moderation, admin: true })).status, 200);
  const [destination] = (await (await request('/api/explore')).json()).destinations;
  assert.equal(destination.status, 'open');
  assert.equal(destination.latitude, 52.1);
  assert.equal(destination.votes, 0);
  assert.ok(!('reference' in destination));
  const vote = await request('/api/vote', { data: { id } });
  assert.deepEqual(await vote.json(), { votes: 1 });
  const cookie = vote.headers.get('Set-Cookie');
  assert.match(cookie, /HttpOnly; SameSite=Strict; Secure/);
  assert.equal((await request('/api/vote', { data: { id }, ip: '192.0.2.2', cookie: cookie.split(';')[0] })).status, 409);
  assert.equal((await request('/api/vote', { data: { id } })).status, 409);
  assert.deepEqual(await (await request('/api/vote', { data: { id }, ip: '192.0.2.2' })).json(), { votes: 2 });
  assert.equal((await request('/api/admin', { data: { ...moderation, status: 'closed' }, admin: true })).status, 200);
  assert.equal((await request('/api/vote', { data: { id }, ip: '192.0.2.3' })).status, 409);
  assert.equal((await request('/api/admin', { data: { action: 'remove', id }, admin: true })).status, 200);
  assert.equal(sqlite.prepare('SELECT count(*) AS count FROM votes').get().count, 0);
  assert.equal(sqlite.prepare('SELECT count(*) AS count FROM vote_windows').get().count, 0);
});

test('limits repeat submissions and supports adding and editing verified flights', async () => {
  const { request } = setup();
  for (let index = 0; index < 5; index++) {
    assert.equal((await request('/api/suggest', { data: { ...suggestion, name: 'Test location ' + index } })).status, 201);
  }
  assert.equal((await request('/api/suggest', { data: suggestion })).status, 429);
  const flight = { action: 'flight', id: 'test-flight', name: 'Test flight', region: 'Test county',
    description: 'A temporary flight record for testing.', latitude: 51, longitude: -2, source: 'https://example.org/verified' };
  assert.equal((await request('/api/admin', { data: flight, admin: true })).status, 200);
  assert.equal((await request('/api/admin', { data: { ...flight, name: 'Test flight edit' }, admin: true })).status, 200);
  const { flights } = await (await request('/api/explore')).json();
  assert.equal(flights.length, 5);
  assert.equal(flights.find(item => item.id === flight.id).name, 'Test flight edit');
});
