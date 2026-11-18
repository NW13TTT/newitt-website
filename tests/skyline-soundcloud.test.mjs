// Run from repository root: node --test tests/skyline-soundcloud.test.mjs
import { readFileSync } from 'node:fs';
import test from 'node:test';
import assert from 'node:assert/strict';
const html = readFileSync(new URL('../public/skyline.html', import.meta.url), 'utf8');
test('preserves supplied album link and SoundCloud fallback', () => {
  assert.match(html, /https:\/\/on\.soundcloud\.com\/XFTikZjkzyTCidSdjF/);
  assert.match(html, /Listen to the full album/);
});
test('requests official SoundCloud oEmbed rather than injecting untrusted HTML', () => {
  assert.match(html, /soundcloud\.com\/oembed\?format=json/);
  assert.match(html, /DOMParser\(\)/);
  assert.match(html, /widget\.hostname !== "w\.soundcloud\.com"/);
  assert.doesNotMatch(html, /innerHTML\s*=\s*data\.html/);
});
test('rejects non-playlist embeds and disables autoplay', () => {
  assert.match(html, /playlists\|sets/);
  assert.match(html, /auto_play", "false"/);
});
test('keeps the existing Gloucester Prison gallery and accessibility', () => {
  assert.match(html, /Gloucester Prison • Aerial View 04/);
  assert.match(html, /skyline-lightbox/);
  assert.match(html, /prefers-reduced-motion:reduce/);
  assert.match(html, /aria-controls="skyline-album-frame"/);
});
