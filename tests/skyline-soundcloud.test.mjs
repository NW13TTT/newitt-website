import { readFileSync } from 'node:fs';
import test from 'node:test';
import assert from 'node:assert/strict';

const html = readFileSync(new URL('../public/skyline.html', import.meta.url), 'utf8');
const section = html.match(/<section[^>]*id="skyline-soundtracks"[\s\S]*?<\/section>/)?.[0] ?? '';

test('embeds the complete official Beyond The Skyline playlist with artwork and autoplay off', () => {
    const iframe = section.match(/<iframe[\s\S]*?<\/iframe>/g) ?? [];
    assert.equal(iframe.length, 1);
    const src = iframe[0].match(/\bsrc="([^"]+)"/)?.[1];
    assert.ok(src);
    const player = new URL(src.replaceAll('&amp;', '&'));
    assert.equal(player.origin + player.pathname, 'https://w.soundcloud.com/player/');
    assert.equal(decodeURIComponent(player.searchParams.get('url')),
        'https://api.soundcloud.com/playlists/soundcloud:playlists:2331058893');
    assert.equal(player.searchParams.get('auto_play'), 'false');
    assert.equal(player.searchParams.get('visual'), 'true');
    assert.equal(player.searchParams.get('show_artwork'), 'true');
    assert.doesNotMatch(iframe[0], /\bhidden\b/);
});

test('names the player and links directly to the official playlist', () => {
    assert.match(section, /aria-labelledby="skyline-music-title"/);
    assert.match(section, /title="Beyond The Skyline — NEWITT MEDIA playlist on SoundCloud"/);
    assert.match(section, /The Original Soundtrack of NEWITT Skyline Media/);
    assert.match(section, /href="https:\/\/soundcloud\.com\/ian-newitt\/sets\/beyond-the-skyline"/);
    assert.doesNotMatch(html, /on\.soundcloud\.com|soundcloud\.com\/oembed|skyline-load-album/);
});

test('retains the Gloucester Prison gallery and opts into music animation only when allowed', () => {
    assert.match(html, /Gloucester Prison • Aerial View 04/);
    assert.match(html, /skyline-lightbox/);
    assert.match(html, /@media \(prefers-reduced-motion: no-preference\) \{\s*\.skyline-music-panel::before/);
});
