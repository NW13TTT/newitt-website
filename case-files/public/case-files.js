const form = document.getElementById('archive-filters');
if (form) {
  form.hidden = false;
  const cards = [...document.querySelectorAll('.case-card')];
  const apply = () => {
    const values = new FormData(form);
    const query = values.get('search').trim().toLowerCase();
    for (const card of cards) {
      card.hidden = Boolean((query && !card.textContent.toLowerCase().includes(query)) ||
        (values.get('location') && values.get('location') !== card.dataset.location) ||
        (values.get('year') && values.get('year') !== card.dataset.year) ||
        (values.get('type') && !card.dataset.types.split('|').includes(values.get('type'))));
    }
    document.getElementById('filter-status').textContent = cards.some(card => !card.hidden) ? '' : 'No cases match these filters.';
  };
  form.addEventListener('input', apply);
  form.addEventListener('submit', event => { event.preventDefault(); apply(); });
}

const dialog = document.getElementById('viewer');
const links = [...document.querySelectorAll('[data-photo]')];
if (dialog?.showModal && links.length) {
  let index = 0;
  let opener;
  const image = dialog.querySelector('img');
  const zoom = dialog.querySelector('[data-zoom]');
  const reset = () => {
    dialog.classList.remove('zoom');
    zoom.setAttribute('aria-pressed', 'false');
    zoom.textContent = 'Zoom in';
  };
  const show = position => {
    index = (position + links.length) % links.length;
    const link = links[index];
    image.src = link.href;
    image.alt = link.querySelector('img').alt;
    reset();
  };
  links.forEach((link, position) => link.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    opener = link;
    show(position);
    dialog.showModal();
  }));
  dialog.querySelector('[data-close]').onclick = () => dialog.close();
  dialog.querySelector('[data-next]').onclick = () => show(index + 1);
  dialog.querySelector('[data-previous]').onclick = () => show(index - 1);
  zoom.onclick = () => {
    const enabled = dialog.classList.toggle('zoom');
    zoom.setAttribute('aria-pressed', String(enabled));
    zoom.textContent = enabled ? 'Zoom out' : 'Zoom in';
  };
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      show(index + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  dialog.addEventListener('close', () => { image.removeAttribute('src'); opener?.focus(); });
}
for (const button of document.querySelectorAll('[data-video]')) {
  button.hidden = false;
  button.addEventListener('click', () => {
    const frame = document.createElement('iframe');
    frame.src = 'https://www.youtube-nocookie.com/embed/' + button.dataset.video + '?playsinline=1';
    frame.title = 'Related Gloucester Prison video by Newitt’s Paranormal Adventures';
    frame.allow = 'encrypted-media; fullscreen; picture-in-picture';
    frame.allowFullscreen = true;
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    button.replaceWith(frame);
    frame.focus();
  });
}
