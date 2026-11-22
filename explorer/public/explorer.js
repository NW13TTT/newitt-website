const endpoint = '/skyline-explorer/api/';
const get = (id) => document.getElementById(id);
const element = (tag, text, options = {}) => {
  const node = document.createElement(tag);
  if (text) node.textContent = text;
  for (const [name, value] of Object.entries(options)) node.setAttribute(name, value);
  return node;
};
async function api(path, data) {
  const response = await fetch(endpoint + path, data ? {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
  } : undefined);
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || 'Please try again.');
  return result;
}

function setupMap(name, items, select) {
  if (!window.L) {
    get(name + '-map').textContent = 'Map unavailable. Use the location list below.';
    get(name + '-reset').disabled = true;
    return () => {};
  }
  const map = L.map(name + '-map', { scrollWheelZoom: false, zoomAnimation: false, fadeAnimation: false })
    .setView(name === 'flight' ? [51.86, -2.37] : [54.8, -3.4], name === 'flight' ? 10 : 5);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
  }).addTo(map);
  const markers = new Map();
  for (const [index, item] of items.entries()) {
    if (item.latitude === null || item.longitude === null) continue;
    const marker = L.marker([item.latitude, item.longitude], {
      icon: L.divIcon({ className: 'sky-pin', html: String(index + 1), iconSize: [32, 32] }),
      title: item.name, alt: item.name, riseOnHover: true
    }).addTo(map);
    marker.getElement().setAttribute('aria-label', item.name);
    marker.on('click', () => select(item, marker.getElement()));
    markers.set(item.id, marker);
  }
  const reset = () => {
    const coordinates = [...markers.values()].map(marker => marker.getLatLng());
    if (coordinates.length) map.fitBounds(coordinates, { padding: [38, 38], maxZoom: 11, animate: false });
  };
  get(name + '-reset').addEventListener('click', reset);
  reset();
  return (item) => {
    for (const [id, marker] of markers) marker.getElement().classList.toggle('is-selected', id === item?.id);
    const marker = markers.get(item?.id);
    if (marker && !map.getBounds().contains(marker.getLatLng())) map.panTo(marker.getLatLng(), { animate: false });
  };
}

function setupArchive(name, items, details) {
  const list = get(name + '-list');
  const card = get(name + '-card');
  const buttons = new Map();
  let opener;
  let selected;
  function close() {
    card.hidden = true;
    card.replaceChildren();
    selected = null;
    highlight(null);
    for (const button of buttons.values()) button.setAttribute('aria-pressed', 'false');
    opener?.focus();
  }
  function select(item, control) {
    opener = control || buttons.get(item.id);
    selected = item;
    highlight(item);
    for (const [id, button] of buttons) button.setAttribute('aria-pressed', String(id === item.id));
    const closeButton = element('button', 'Close', { type: 'button', class: 'close', 'aria-label': 'Close ' + item.name });
    closeButton.addEventListener('click', close);
    card.replaceChildren(closeButton, ...details(item, select));
    card.hidden = false;
    card.focus();
  }
  const highlight = setupMap(name, items, select);
  items.forEach((item, index) => {
    const button = element('button', (index + 1) + ' · ' + item.name, {
      type: 'button', 'aria-pressed': 'false', 'aria-controls': card.id
    });
    button.addEventListener('click', () => select(item, button));
    buttons.set(item.id, button);
    list.append(button);
  });
  card.addEventListener('keydown', event => {
    if (event.key === 'Escape' && selected) {
      event.preventDefault();
      close();
    }
  });
  get(name + '-status').textContent = items.length ? '' :
    name === 'flight' ? 'No flights are available.' : 'There are no approved destinations yet. Suggest the first one below.';
}

function flightDetails(flights) {
  return (item, select) => {
    const parts = [
      element('p', item.region, { class: 'eyebrow' }),
      element('h3', item.name, { id: 'flight-title' }),
      element('p', item.description)
    ];
    if (item.film) {
      const video = element('video', '', { controls: '', playsinline: '', preload: 'none',
        src: item.film, 'aria-label': item.name + ' aerial footage' });
      if (item.photo) video.poster = item.photo;
      parts.push(video);
    } else if (item.photo) {
      parts.push(element('img', '', { src: item.photo, alt: item.name + ' from above', loading: 'lazy' }));
    }
    if (item.photo) parts.push(element('a', 'View photograph', { href: item.photo }));
    if (item.youtube) {
      const watch = new URL(item.youtube);
      const id = watch.hostname === 'www.youtube.com' ? watch.searchParams.get('v') : null;
      if (!item.film && id && /^[\w-]{11}$/.test(id)) {
        const playerButton = element('button', 'Load flight player', { type: 'button', class: 'button primary player-trigger' });
        playerButton.addEventListener('click', () => {
          const start = Number.parseInt(watch.searchParams.get('t'), 10) || 0;
          const player = element('iframe', '', {
            src: 'https://www.youtube-nocookie.com/embed/' + id + '?start=' + start + '&playsinline=1',
            title: item.name + ' aerial film on YouTube', allowfullscreen: '', class: 'flight-player',
            allow: 'encrypted-media; picture-in-picture; fullscreen', referrerpolicy: 'strict-origin-when-cross-origin'
          });
          playerButton.replaceWith(player);
          player.focus();
        });
        parts.push(playerButton);
      }
      parts.push(element('a', 'Watch on YouTube', { href: item.youtube }));
    }
    if (item.soundtrack) parts.push(element('a', 'Explore NEWITT soundtracks', { href: item.soundtrack }));
    const nearby = flights.filter(other => other.id !== item.id &&
      Math.hypot(other.latitude - item.latitude, (other.longitude - item.longitude) * .62) < .35);
    if (nearby.length) {
      const menu = element('div', '', { class: 'select-list' });
      for (const other of nearby) {
        const button = element('button', other.name, { type: 'button' });
        button.addEventListener('click', () => select(other));
        menu.append(button);
      }
      parts.push(element('h4', 'Nearby flights'), menu);
    }
    return parts;
  };
}

function destinationDetails(item) {
  const statusNames = { open: 'Voting open', closed: 'Voting closed', planned: 'Planned', filmed: 'Filmed', published: 'Published' };
  const count = element('p', item.votes + (item.votes === 1 ? ' vote' : ' votes'), { 'aria-live': 'polite' });
  const parts = [
    element('p', item.region + ' · ' + statusNames[item.status], { class: 'eyebrow' }),
    element('h3', item.name, { id: 'destination-title' }),
    element('p', item.description), count
  ];
  if (item.status === 'open') {
    const button = element('button', item.voted ? 'Vote recorded' : 'Vote for this destination', { type: 'button', class: 'button primary' });
    button.disabled = Boolean(item.voted);
    const feedback = element('p', '', { role: 'status', class: 'feedback' });
    button.addEventListener('click', async () => {
      button.disabled = true;
      feedback.textContent = 'Sending vote…';
      try {
        const result = await api('vote', { id: item.id });
        item.votes = result.votes;
        item.voted = true;
        count.textContent = item.votes + (item.votes === 1 ? ' vote' : ' votes');
        button.textContent = 'Vote recorded';
        feedback.textContent = 'Thank you. Your vote was recorded.';
      } catch (error) {
        feedback.textContent = error.message;
        button.disabled = false;
      }
    });
    parts.push(button, feedback);
  }
  return parts;
}

const form = get('suggestion');
form.addEventListener('submit', async event => {
  event.preventDefault();
  const submit = form.querySelector('button[type=submit]');
  submit.disabled = true;
  const feedback = get('suggestion-status');
  feedback.textContent = 'Sending suggestion…';
  try {
    await api('suggest', Object.fromEntries(new FormData(form)));
    form.reset();
    feedback.textContent = 'Thank you. Your suggestion is awaiting review.';
  } catch (error) {
    feedback.textContent = error.message;
  } finally {
    submit.disabled = false;
  }
});

async function start() {
  try {
    const { flights, destinations } = await api('explore');
    setupArchive('flight', flights, flightDetails(flights));
    setupArchive('next', destinations, destinationDetails);
  } catch (error) {
    for (const name of ['flight', 'next']) {
      get(name + '-status').textContent = error.message;
      get(name + '-reset').disabled = true;
    }
  }
  const anchors = { flights: 'flights', next: 'next' };
  const section = anchors[location.pathname.split('/').filter(Boolean).at(-1)];
  if (section && !location.hash) get(section).scrollIntoView();
}
start();
