const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

for (const reel of document.querySelectorAll('[data-photo-reel]')) {
    const track = reel.querySelector('.reel-track');
    const slides = [...track.children];
    const controls = reel.querySelector('.reel-controls');
    const counter = reel.querySelector('.reel-count');
    let requestedSlide;
    let settleTimer;

    const current = () => {
        const index = Math.round(track.scrollLeft / (track.clientWidth || 1));
        return Math.min(slides.length - 1, Math.max(0, index));
    };

    const show = index => {
        const next = (index + slides.length) % slides.length;
        const wraps = next !== index;
        requestedSlide = next;
        track.scrollTo({
            left: slides[next].offsetLeft,
            behavior: wraps || reduceMotion.matches ? 'instant' : 'smooth'
        });
        scheduleCounter();
    };

    function scheduleCounter() {
        clearTimeout(settleTimer);
        settleTimer = setTimeout(() => {
            requestedSlide = undefined;
            const count = String(current() + 1).padStart(2, '0') + ' / ' + String(slides.length).padStart(2, '0');
            if (counter.textContent !== count) counter.textContent = count;
        }, 160);
    }

    track.addEventListener('scroll', scheduleCounter, { passive: true });
    for (const eventName of ['pointerdown', 'touchstart', 'wheel']) {
        track.addEventListener(eventName, () => {
            requestedSlide = undefined;
        }, { passive: true });
    }

    const selected = () => requestedSlide ?? current();

    controls.addEventListener('click', event => {
        const button = event.target.closest('[data-step]');
        if (button) show(selected() + Number(button.dataset.step));
    });

    track.addEventListener('keydown', event => {
        const target = { ArrowLeft: selected() - 1, ArrowRight: selected() + 1, Home: 0, End: slides.length - 1 }[event.key];
        if (target === undefined) return;
        event.preventDefault();
        show(target);
    });

    controls.hidden = false;
}

if (!reduceMotion.matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.classList.add('moonlit-arrived');
            observer.unobserve(entry.target);
        }
    }, { threshold: .15 });

    const elements = document.querySelectorAll(
        '.moon-opening picture, .production-wall figure, .frame-exhibit button, .photo-reel, .after-dark-mark, .after-dark-knocks'
    );
    for (const element of elements) observer.observe(element);
}
