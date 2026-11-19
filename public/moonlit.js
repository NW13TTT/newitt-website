const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

for (const reel of document.querySelectorAll('[data-photo-reel]')) {
    const track = reel.querySelector('.reel-track');
    const slides = [...track.children];
    const controls = reel.querySelector('.reel-controls');
    const counter = reel.querySelector('.reel-count');
    const current = () => Math.round(track.scrollLeft / (track.clientWidth || 1));

    const show = index => {
        const next = (index + slides.length) % slides.length;
        track.scrollTo({ left: slides[next].offsetLeft, behavior: reduceMotion.matches ? 'instant' : 'smooth' });
    };

    track.addEventListener('scroll', () => {
        const count = String(current() + 1).padStart(2, '0') + ' / ' + String(slides.length).padStart(2, '0');
        if (counter.textContent !== count) counter.textContent = count;
    }, { passive: true });

    controls.addEventListener('click', event => {
        const button = event.target.closest('[data-step]');
        if (button) show(current() + Number(button.dataset.step));
    });

    track.addEventListener('keydown', event => {
        const target = { ArrowLeft: current() - 1, ArrowRight: current() + 1, Home: 0, End: slides.length - 1 }[event.key];
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
