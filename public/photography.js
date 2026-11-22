(() => {
    const gallery = document.getElementById('portfolio');
    const stage = gallery.querySelector('.photography-stage');
    const navigation = gallery.querySelector('.photography-navigation');
    const plates = [...stage.querySelectorAll('.photography-plate')];
    const thumbnails = [...navigation.querySelectorAll('[data-photo]')];
    const announcement = gallery.querySelector('.photography-live');
    const open = gallery.querySelector('.photography-open');
    const viewer = document.getElementById('photography-lightbox');
    const close = viewer.querySelector('.photography-close');
    const viewerStage = viewer.querySelector('.photography-viewer-image');
    const viewerImage = viewerStage.querySelector('img');
    const viewerCaption = viewer.querySelector('.photography-viewer-caption');
    const original = viewer.querySelector('.photography-original');
    const counters = [gallery, viewer].map(root => root.querySelector('[data-photo-count]'));
    let current = 0;

    function showPhoto(index, announce = true) {
        current = (index + plates.length) % plates.length;
        const plate = plates[current];
        const description = plate.querySelector('figcaption').textContent.trim();
        const count = `${String(current + 1).padStart(2, '0')} / ${String(plates.length).padStart(2, '0')}`;
        const status = `${current + 1} of ${plates.length}. ${description}`;

        plates.forEach((item, position) => {
            item.hidden = position !== current;
            thumbnails[position].setAttribute('aria-current', String(position === current));
        });
        counters.forEach(counter => { counter.textContent = count; });

        if (viewer.open) {
            const image = plate.querySelector('img');
            viewerImage.alt = description;
            viewerImage.sizes = '(max-width: 820px) 100vw, 1260px';
            viewerImage.srcset = image.srcset;
            viewerImage.src = image.src;
            viewerCaption.textContent = status;
            original.href = plate.dataset.original;
        } else if (announce) {
            announcement.textContent = status;
        }
    }

    function bindNavigation(root) {
        root.querySelectorAll('[data-photo-step]').forEach(button => {
            button.addEventListener('click', () => showPhoto(current + Number(button.dataset.photoStep)));
        });
        root.addEventListener('keydown', event => {
            const index = { ArrowLeft: current - 1, ArrowRight: current + 1, Home: 0, End: plates.length - 1 }[event.key];
            if (!Number.isInteger(index) || event.altKey || event.metaKey || event.ctrlKey) return;
            event.preventDefault();
            showPhoto(index);
        });
    }

    function bindSwipe(surface) {
        let start;
        const delta = touch => ({ x: touch.clientX - start.clientX, y: touch.clientY - start.clientY });
        const horizontal = ({ x, y }) => Math.abs(x) > Math.abs(y) * 1.35;

        surface.addEventListener('touchstart', event => {
            start = event.touches.length === 1 ? event.touches[0] : undefined;
        }, { passive: true });
        surface.addEventListener('touchmove', event => {
            if (event.touches.length !== 1) start = undefined;
            if (!start || !event.cancelable) return;
            const movement = delta(event.touches[0]);
            if (Math.abs(movement.x) > 12 && horizontal(movement)) event.preventDefault();
        }, { passive: false });
        surface.addEventListener('touchend', event => {
            const touch = Array.from(event.changedTouches).find(point => point.identifier === start?.identifier);
            const movement = touch && delta(touch);
            start = undefined;
            if (movement && !event.touches.length && Math.abs(movement.x) >= 36 && horizontal(movement)) {
                showPhoto(current + (movement.x < 0 ? 1 : -1));
            }
        }, { passive: true });
        surface.addEventListener('touchcancel', () => { start = undefined; }, { passive: true });
    }

    thumbnails.forEach(button => {
        button.addEventListener('click', () => showPhoto(Number(button.dataset.photo)));
    });
    open.addEventListener('click', () => {
        viewer.showModal();
        showPhoto(current, false);
        close.focus({ preventScroll: true });
    });
    close.addEventListener('click', () => viewer.close());
    viewer.addEventListener('close', () => {
        // A queued close event from an earlier opening must not steal focus from a reopened viewer.
        if (!viewer.open) open.focus({ preventScroll: true });
    });

    bindNavigation(gallery);
    bindNavigation(viewer);
    bindSwipe(stage);
    bindSwipe(viewerStage);
    stage.tabIndex = 0;
    stage.dataset.interactive = '';
    showPhoto(current, false);
    navigation.hidden = false;
})();
