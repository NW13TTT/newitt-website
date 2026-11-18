import { readFileSync } from 'node:fs';
import test from 'node:test';
import assert from 'node:assert/strict';

const read = path => readFileSync(new URL('../public/' + path, import.meta.url), 'utf8');
const routes = ['index', 'skyline', 'paranormal', 'photography', 'contact', 'privacy'];

for (const route of routes) {
    test(route + ' uses the shared studio design and accessible navigation', () => {
        const html = read(route + '.html');
        assert.match(html, /href="studio.css"/);
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
