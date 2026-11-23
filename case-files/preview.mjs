import { cases, publicCases } from './cases.mjs';
import { archive, casePage } from './render.mjs';
import css from './public/case-files.css';
import js from './public/case-files.js';

const records = publicCases(cases);
const root = '/paranormal/case-files';
const live = 'https://www.newittmedia.co.uk';
const headers = {
  'x-robots-tag': 'noindex, nofollow',
  'x-content-type-options': 'nosniff',
  'referrer-policy': 'strict-origin-when-cross-origin',
  'content-security-policy': "default-src 'self'; img-src 'self'; media-src 'self'; frame-src https://www.youtube-nocookie.com; frame-ancestors 'none'; base-uri 'none'; form-action 'self'"
};
const cta = '<a class="button primary" href="/paranormal/case-files">Open the Case Files <span aria-hidden="true">↗</span></a>';

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/$/, '');
    const head = request.method === 'HEAD';
    if (request.method !== 'GET' && !head) return new Response('Preview is read-only', { status: 405 });
    const response = (body, type, status = 200) => new Response(head ? null : body, {
      status, headers: { ...headers, 'content-type': type + '; charset=utf-8', 'cache-control': 'public, max-age=120' }
    });
    if (path === root) return response(archive(records), 'text/html');
    if (path === root + '/case-files.css') return response(css, 'text/css');
    if (path === root + '/case-files.js') return response(js, 'text/javascript');
    if (path.startsWith(root + '/')) {
      const record = records.find(record => path === root + '/' + record.id);
      return record ? response(casePage(record), 'text/html') : response('Case file not found', 'text/plain', 404);
    }

    const target = new URL(live);
    target.pathname = url.pathname;
    target.search = url.search;
    if (/^\/skyline-explorer(?:\/|$)/.test(path) && !path.startsWith('/skyline-explorer/media/')) return Response.redirect(target, 302);
    const forwarded = new Headers();
    if (request.headers.has('range')) forwarded.set('range', request.headers.get('range'));
    const upstream = await fetch(target, { method: request.method, redirect: 'manual', headers: forwarded });
    const result = new Response(upstream.body, upstream);
    result.headers.set('x-robots-tag', 'noindex, nofollow');
    if (head || !upstream.ok || !['/paranormal', '/paranormal.html'].includes(path)) return result;
    result.headers.delete('etag');
    result.headers.delete('content-length');
    return new HTMLRewriter().on('#after-dark-title ~ .hero-actions', {
      element(el) { el.append(cta, { html: true }); }
    }).transform(result);
  }
};
