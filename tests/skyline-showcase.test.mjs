import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

test('Skyline retains the four approved flights and their local poster assets', () => {
    const page = readFileSync('public/skyline.html', 'utf8');
    assert.match(page, /skyline-showcase\.css/);
    for (const slug of ['green-acres', 'brockworth', 'gloucester-prison', 'ancient-ram-inn']) {
        assert.ok(page.includes('https://www.newittmedia.co.uk/skyline-explorer/flights?flight=' + slug));
    }
    const showcase = page.match(/<section class="flight-showcase"[\s\S]*?<\/section>/)[0];
    const sources = [...showcase.matchAll(/<img src="([^"]+)"/g)].map(match => match[1]);
    assert.equal(sources.length, 4);
    assert.ok(sources.every(path => existsSync('public' + path)));
    assert.match(showcase, /Where Shall We Fly Next/);
    assert.match(page, /Beyond The Skyline/);
});
