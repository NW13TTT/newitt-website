import test from 'node:test';
import assert from 'node:assert/strict';
import { cases, publicCases } from '../case-files/cases.mjs';
import { archive, casePage } from '../case-files/render.mjs';

test('published archive exposes only validated cases and no draft metadata', () => {
  const records = publicCases([...cases, { id: 'private-placeholder', status: 'draft' }]);
  const page = archive(records);
  assert.equal(records.length, 1);
  assert.match(page, /\/paranormal\/case-files\/gloucester-prison/);
  assert.doesNotMatch(page, /private-placeholder|\/Volumes\/|\/Users\//);
});
test('invalid dates, private references and broken timeline evidence are rejected', () => {
  const copy = () => structuredClone(cases);
  const invalid = copy();
  invalid[0].date = '2026-02-30';
  assert.throws(() => publicCases(invalid));
  const privateMedia = copy();
  privateMedia[0].evidence[0].src = '/Volumes/private.mp4';
  assert.throws(() => publicCases(privateMedia));
  const broken = copy();
  broken[0].timeline[0].evidence.push('missing');
  assert.throws(() => publicCases(broken));
});
test('case stays navigable without JS, with contextual imagery and no autoplay', () => {
  const page = casePage(cases[0]);
  assert.match(page, /<details><summary><time/);
  assert.match(page, /href="\/media\/photography\/gloucester-02-1440.webp"/);
  assert.match(page, /Watch on YouTube/);
  assert.match(page, /recording date has not been verified/);
  assert.doesNotMatch(page, /<iframe|autoplay|<audio/);
});
test('future approved video and audio load on demand and support captions or transcripts', () => {
  const records = structuredClone(cases);
  records[0].evidence.push(
    { id: 'test-audio', type: 'audio', title: 'Example', note: 'Test only', src: '/media/test.m4a', transcript: '<script>' },
    { id: 'test-video', type: 'video', title: 'Example', note: 'Test only', src: '/media/test.mp4', captions: '/media/test.vtt' }
  );
  const page = casePage(publicCases(records)[0]);
  assert.match(page, /<audio controls preload="none"/);
  assert.match(page, /<video controls playsinline preload="none"/);
  assert.match(page, /<track kind="captions"/);
  assert.match(page, /&lt;script&gt;/);
});
