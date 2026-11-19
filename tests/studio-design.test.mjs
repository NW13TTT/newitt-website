import { readFileSync } from 'node:fs';
import test from 'node:test';
import assert from 'node:assert/strict';

const read = path => readFileSync(new URL('../public/' + path, import.meta.url), 'utf8');
const routes = ['index', 'skyline', 'paranormal', 'photography', 'contact', 'privacy'];

for (const route of routes) {
    test(route + ' uses the shared studio design and accessible navigation', () => {
        const html = read(route + '.html');
        assert.match(html, /href="studio\.css(?:\?v=2)?"/);
        assert.match(html, /href="#main-content">Skip to content/);
        assert.match(html, /<main id="main-content" tabindex="-1">/);
        assert.match(html, new RegExp('href="' + route + '\\.html"[^>]*aria-current="page"'));
        const footer = html.match(/<nav class="studio-footer-links"[\s\S]*?<\/nav>/)?.[0] ?? '';
        for (const destination of routes) assert.ok(footer.includes('href="' + destination + '.html"'));
    });
}

test('homepage uses existing aerial work and preserves its social media embed', () => {
    const home = read('index.html');
    const skyline = read('skyline.html');
    assert.match(home, /src="media\/moonlit\/valley-wide.webp"/);
    assert.match(home, /href="skyline.html#gloucester-prison"/);
    assert.match(skyline, /class="skyline-gallery" id="gloucester-prison"/);
    assert.equal((skyline.match(/class="skyline-gallery-item"/g) ?? []).length, 4);
    assert.match(home, /src="NEWITT_ANIMATED_SOCIAL_SECTION_BANNER_BUTTONS.html"/);
    assert.match(home, /class="container studio-social-links"/);
    assert.match(read('studio.css'), /@media \(prefers-reduced-motion: reduce\)/);
});

test('home puts visitors directly into the opening and links all three worlds and soundtrack', () => {
    const home = read('index.html');
    assert.doesNotMatch(home, /class="site-intro"/);
    assert.match(home, /Three worlds\. <span>One company\./);
    assert.equal((home.match(/class="world-panel world-/g) ?? []).length, 3);
    assert.match(home, /class="moon-opening-player" href="skyline.html#skyline-soundtracks"/);
    assert.match(home, /Films &amp; Original Soundtracks/);
    assert.match(home, /href="paranormal.html#original-soundtracks"/);
    assert.match(home, /src="media\/soundtracks\/beyond-the-skyline.jpg"/);
    assert.doesNotMatch(home, /w\.soundcloud\.com\/player/);
});

test('exhibition uses actual NEWITT aerial assets with a keyboard-operable viewing dialog', () => {
    const photo = read('photography.html');
    assert.equal((photo.match(/data-full-image="media\/skyline\/Gloucester-prison-aerial-0[1-4]\.JPG"/g) ?? []).length, 4);
    assert.match(photo, /id="photography-lightbox"\s+role="dialog"\s+aria-modal="true"/);
    assert.match(photo, /event\.key === "Escape"/);
    assert.match(photo, /previousFocus\?\.focus\(\)/);
});

test('division heroes have neutral backgrounds and no former colour overlays', () => {
    assert.doesNotMatch(read('paranormal.html'), /class="paranormal-(?:fog|atmosphere)"/);
    assert.doesNotMatch(read('photography.html'), /\.photography-hero::before/);
    assert.match(read('studio.css'), /\.photography-page \.photography-hero \{ background: #161718; \}/);
});

test('all public pages expose the studio index and have the editorial assets', () => {
    for (const route of routes) {
        const html = read(route + '.html');
        assert.match(html, /href="editorial\.css\?v=3"/);
        assert.match(html, /src="editorial.js" defer/);
        assert.match(html, /<dialog id="editorial-menu"/);
        assert.match(html, /<form method="dialog">/);
    }
});

test('division imagery stays unfiltered and Lens motion respects preference', () => {
    const css = read('editorial.css');
    assert.match(css, /prefers-reduced-motion: no-preference/);
    assert.match(css, /\.signature-aerial\s*\{[^}]*filter: none/);
    assert.match(css, /\.photography-page \.frame-exhibit button img \{ filter: none; \}/);
});

test('official logo is present in every header, the open menu and the protected homepage hero', () => {
    for (const route of routes) {
        const html = read(route + '.html');
        assert.match(html, /<header class="site-header editorial-header">[\s\S]*?class="brand-mark"><img src="newitt-media-logo\.png"/);
        assert.match(html, /class="menu-identity">[\s\S]*?newitt-media-logo\.png/);
    }
    assert.match(read('index.html'), /class="moon-opening"/);
    const css = read('editorial.css');
    assert.match(css, /\.editorial-header\s*\{[^}]*position: sticky/);
    assert.match(css, /\.brand-mark\s*\{[^}]*background: #080e13/);
    assert.doesNotMatch(css, /#d7ff3f|#171326/i);
});

test('homepage switches to portrait artwork on phones and places Ian’s biography after featured work', () => {
    const home = read('index.html');
    assert.match(home, /<source media="\(max-width: 600px\)" srcset="media\/moonlit\/valley-portrait.webp">/);
    assert.match(home, /id="production-title"[\s\S]*?id="meet-ian"[\s\S]*?id="screening-title"/);
    assert.match(home, /I’m Ian Newitt, the person behind NEWITT MEDIA/);
});

test('Skyline and Paranormal use their selected visual assets', () => {
    assert.match(read('skyline.html'), /class="skyline-strip container"/);
    assert.match(read('paranormal.html'), /class="after-dark-mark"><img src="media\/moonlit\/after-dark.webp"/);
});

test('forthcoming paranormal soundtrack uses the original artwork and exposes no playback control', () => {
    const paranormal = read('paranormal.html');
    const feature = paranormal.match(/<section[^>]*id="original-soundtracks"[\s\S]*?<\/section>/)?.[0] ?? '';
    assert.match(feature, /The Third Knock Was Inside/);
    assert.match(feature, /Forthcoming soundtrack by NEWITT MEDIA/);
    assert.match(feature, /media\/moonlit\/after-dark.webp/);
    assert.match(feature, /65 BPM/);
    assert.doesNotMatch(feature, /<(?:audio|iframe|button)\b/);
    assert.match(paranormal, /href="#original-soundtracks"/);
});
