import { createHandler } from './worker.mjs';
import page from './public/index.html';
import admin from './public/admin.html';
import styles from './public/explorer.css';
import showcaseStyles from './public/flight-showcase.css';
import explorer from './public/explorer.js';
import moderation from './public/admin.js';
import skylineLinks from './public/skyline-links.html';
import greenAcres from './public/media/green-acres.webp';
import brockworth from './public/media/brockworth.webp';
import ancientRamInn from './public/media/ancient-ram-inn.webp';

const files = new Map([
  ['index.html', [page, 'text/html; charset=utf-8']],
  ['admin.html', [admin, 'text/html; charset=utf-8']],
  ['explorer.css', [styles, 'text/css; charset=utf-8']],
  ['flight-showcase.css', [showcaseStyles, 'text/css; charset=utf-8']],
  ['explorer.js', [explorer, 'text/javascript; charset=utf-8']],
  ['admin.js', [moderation, 'text/javascript; charset=utf-8']],
  ['media/green-acres.webp', [greenAcres, 'image/webp']],
  ['media/brockworth.webp', [brockworth, 'image/webp']],
  ['media/ancient-ram-inn.webp', [ancientRamInn, 'image/webp']]
]);
const headers = {
  'x-robots-tag': 'noindex, nofollow', 'x-content-type-options': 'nosniff',
  'referrer-policy': 'strict-origin-when-cross-origin',
  'content-security-policy': "default-src 'self'; script-src 'self' https://unpkg.com; style-src 'self' https://unpkg.com 'unsafe-inline'; img-src 'self' https: data:; media-src 'self' https:; frame-src https://www.youtube-nocookie.com; frame-ancestors 'none'; base-uri 'none'; form-action 'self'; object-src 'none'"
};

function serve(file, privatePage, request) {
  const asset = files.get(file);
  if (!asset || (file === 'admin.html' && !privatePage)) return new Response('Not found', { status: 404, headers });
  const [content, type] = asset;
  return new Response(request?.method === 'HEAD' ? null : content, {
    headers: { ...headers, 'content-type': type, 'cache-control': privatePage ? 'no-store' : 'public, max-age=300' }
  });
}

async function approvedSite(request) {
  if (!['GET', 'HEAD'].includes(request.method)) return new Response('Method not allowed', { status: 405 });
  const url = new URL(request.url);
  const origin = new URL('https://www.newittmedia.co.uk');
  origin.pathname = url.pathname;
  origin.search = url.search;
  const outgoing = new Headers();
  if (request.headers.get('Range')) outgoing.set('Range', request.headers.get('Range'));
  const live = await fetch(origin, { method: request.method, headers: outgoing, redirect: 'manual' });
  const result = new Response(live.body, live);
  result.headers.set('x-robots-tag', 'noindex, nofollow');
  if (!/^\/skyline(?:\.html|\/)?$/.test(url.pathname) || !live.ok || request.method !== 'GET') return result;
  result.headers.delete('content-length');
  result.headers.delete('etag');
  return new HTMLRewriter()
    .on('head', {
      element(head) { head.append('<link rel="stylesheet" href="/skyline-explorer/flight-showcase.css">', { html: true }); }
    })
    .on('section[aria-label="Skyline Explorer"]', {
      element(section) { section.replace(skylineLinks.trimEnd(), { html: true }); }
    })
    .transform(result);
}

export default { fetch: createHandler(serve, approvedSite) };
