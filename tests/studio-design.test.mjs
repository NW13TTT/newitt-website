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
    assert.match(home, /class="studio-hero-image" src="media\/skyline\/Gloucester-prison-aerial-04.webp"/);
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
    assert.match(home, /class="editorial-player"[\s\S]*?2331058893[\s\S]*?auto_play=false/);
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
        assert.match(html, /href="editorial.css"/);
        assert.match(html, /src="editorial.js" defer/);
        assert.match(html, /<dialog id="editorial-menu"/);
        assert.match(html, /<form method="dialog">/);
    }
});

test('division imagery stays unfiltered and Lens motion respects preference', () => {
    const css = read('editorial.css');
    assert.match(css, /prefers-reduced-motion: no-preference/);
    assert.match(css, /\.arrival-frame \.studio-hero-image[^}]*filter: none/);
    assert.match(css, /\.photography-page \.frame-exhibit button img \{ filter: none; \}/);
});
