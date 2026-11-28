import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { runInNewContext } from 'node:vm';

const source = readFileSync(new URL('../public/photography.js', import.meta.url), 'utf8');
const styles = readFileSync(new URL('../public/photography.css', import.meta.url), 'utf8');

function element(children = {}, groups = {}) {
    return {
        dataset: {},
        hidden: false,
        attributes: {},
        handlers: {},
        querySelector(selector) { return children[selector]; },
        querySelectorAll(selector) { return groups[selector]; },
        setAttribute(name, value) { this.attributes[name] = value; },
        addEventListener(name, listener) { this.handlers[name] = listener; },
        fire(name, properties = {}) {
            const event = { ...properties, defaultPrevented: false, preventDefault() { this.defaultPrevented = true; } };
            this.handlers[name](event);
            return event;
        },
        focus(options) { this.focusOptions = options; }
    };
}

function setup() {
    const photos = Array.from({ length: 4 }, (_, i) => {
        const image = { src: `photo-${i}.webp`, srcset: `photo-${i}.webp 960w` };
        const plate = element({ img: image, figcaption: { textContent: `Caption ${i}` } });
        plate.dataset.original = `original-${i}.JPG`;
        const thumbnail = element();
        thumbnail.dataset.photo = String(i);
        return { plate, thumbnail };
    });
    const stage = element({}, { '.photography-plate': photos.map(photo => photo.plate) });
    const thumbnails = photos.map(photo => photo.thumbnail);
    const navigation = element({}, { '[data-photo]': thumbnails });
    const opener = element();
    const closer = element();
    const live = {};
    const galleryCount = {};
    const viewerCount = {};
    const viewerImage = {};
    const viewerStage = element({ img: viewerImage });
    const caption = {};
    const original = {};
    const stepButtons = () => ['-1', '1'].map(step => {
        const button = element();
        button.dataset.photoStep = step;
        return button;
    });
    const gallerySteps = stepButtons();
    const viewerSteps = stepButtons();
    const gallery = element({
        '.photography-stage': stage, '.photography-navigation': navigation,
        '.photography-live': live, '.photography-open': opener, '[data-photo-count]': galleryCount
    }, { '[data-photo-step]': gallerySteps });
    const viewer = element({
        '.photography-close': closer, '.photography-viewer-image': viewerStage,
        '.photography-viewer-caption': caption, '.photography-original': original, '[data-photo-count]': viewerCount
    }, { '[data-photo-step]': viewerSteps });
    viewer.showModal = () => { viewer.open = true; };
    viewer.close = () => { viewer.open = false; };
    const document = { getElementById: id => ({ portfolio: gallery, 'photography-lightbox': viewer })[id] };
    runInNewContext(source, { document });
    return { stage, photos, thumbnails, navigation, gallery, gallerySteps, galleryCount, live,
        opener, closer, viewer, viewerSteps, viewerStage, viewerImage, viewerCount, caption, original };
}

test('rapid taps, keyboard and thumbnail selection keep the visible photo, counter and status in sync', () => {
    const { photos, thumbnails, navigation, gallery, gallerySteps, galleryCount, live } = setup();
    assert.equal(navigation.hidden, false);
    gallerySteps[0].fire('click');
    assert.equal(galleryCount.textContent, '04 / 04');
    for (let tap = 0; tap < 3; tap++) gallerySteps[1].fire('click');
    assert.equal(galleryCount.textContent, '03 / 04');
    assert.equal(photos.filter(photo => !photo.plate.hidden).length, 1);
    assert.equal(thumbnails[2].attributes['aria-current'], 'true');
    assert.equal(live.textContent, '3 of 4. Caption 2');
    assert.equal(gallery.fire('keydown', { key: 'Home' }).defaultPrevented, true);
    assert.equal(galleryCount.textContent, '01 / 04');
    assert.equal(gallery.fire('keydown', { key: 'ArrowRight', metaKey: true }).defaultPrevented, false);
    thumbnails[1].fire('click');
    assert.equal(galleryCount.textContent, '02 / 04');
});

test('full-screen viewer shares the selected image, links the original and safely restores focus', () => {
    const { thumbnails, opener, closer, viewer, viewerSteps, viewerImage, original, galleryCount, viewerCount, caption } = setup();
    thumbnails[2].fire('click');
    opener.fire('click');
    assert.equal(viewer.open, true);
    assert.equal(closer.focusOptions.preventScroll, true);
    assert.equal(viewerImage.src, 'photo-2.webp');
    assert.equal(original.href, 'original-2.JPG');
    viewerSteps[1].fire('click');
    viewer.fire('keydown', { key: 'ArrowRight' });
    assert.equal(viewerCount.textContent, '01 / 04');
    assert.equal(galleryCount.textContent, viewerCount.textContent);
    assert.equal(caption.textContent, '1 of 4. Caption 0');
    closer.fire('click');
    opener.fire('click');
    viewer.fire('close');
    assert.equal(opener.focusOptions, undefined);
    closer.fire('click');
    viewer.fire('close');
    assert.equal(opener.focusOptions.preventScroll, true);
});

test('only deliberate single-finger horizontal swipes move the photo in either viewing mode', () => {
    const { stage, opener, viewerStage, galleryCount, viewerCount } = setup();
    const point = (clientX, clientY, identifier = 1) => ({ clientX, clientY, identifier });
    const start = surface => surface.fire('touchstart', { touches: [point(180, 100)] });
    const end = (surface, touch) => surface.fire('touchend', { changedTouches: [touch], touches: [] });
    start(stage);
    assert.equal(stage.fire('touchmove', { cancelable: true, touches: [point(100, 102)] }).defaultPrevented, true);
    end(stage, point(75, 103));
    assert.equal(galleryCount.textContent, '02 / 04');
    for (const ignored of [point(166, 104), point(171, 230), point(75, 230), point(75, 102, 2)]) {
        start(stage);
        end(stage, ignored);
    }
    start(stage);
    stage.fire('touchcancel');
    end(stage, point(50, 102));
    start(stage);
    stage.fire('touchmove', { cancelable: true, touches: [point(100, 102), point(195, 110, 2)] });
    end(stage, point(50, 102));
    assert.equal(galleryCount.textContent, '02 / 04');
    start(stage);
    assert.equal(stage.fire('touchmove', { cancelable: true, touches: [point(179, 128)] }).defaultPrevented, false);
    assert.equal(stage.fire('touchmove', { cancelable: true, touches: [point(64, 133)] }).defaultPrevented, false);
    end(stage, point(48, 133));
    assert.equal(galleryCount.textContent, '02 / 04');
    opener.fire('click');
    start(viewerStage);
    end(viewerStage, point(260, 103));
    assert.equal(viewerCount.textContent, '01 / 04');
    assert.equal(galleryCount.textContent, '01 / 04');
});

test('gallery rendering never depends on animation, and its fade opts into motion', () => {
    assert.doesNotMatch(source, /scrollTo|setTimeout|transitionend|animationend/);
    const motion = styles.slice(styles.indexOf('@media (prefers-reduced-motion: no-preference)'));
    assert.match(motion, /animation: photography-reveal/);
    assert.equal((styles.match(/animation:/g) ?? []).length, 1);
});
