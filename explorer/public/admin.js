const endpoint = '/skyline-explorer/api/admin';
const message = document.getElementById('status');
const destinations = document.getElementById('destinations');
const flightSelect = document.getElementById('flights');
const flightForm = document.getElementById('flight-form');
let flights = [];

function make(tag, text, attributes = {}) {
  const node = document.createElement(tag);
  node.textContent = text;
  for (const [name, value] of Object.entries(attributes)) node.setAttribute(name, value);
  return node;
}
async function admin(data) {
  const response = await fetch(endpoint, data ? {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
  } : undefined);
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || 'Unable to complete this request.');
  }
  return response.json();
}
function coordinate(name, value, min, max) {
  const label = make('label', name);
  const input = make('input', '', { type: 'number', step: 'any', min, max });
  input.value = value ?? '';
  label.append(input);
  return { label, input };
}
function destination(record) {
  const form = make('form', '', { class: 'admin-entry' });
  const heading = make('h3', record.name + ' · ' + record.region);
  const approval = make('select', '');
  for (const [value, label] of Object.entries({
    pending: 'Awaiting review', open: 'Approved · voting open', closed: 'Approved · voting closed',
    rejected: 'Rejected', planned: 'Planned', filmed: 'Filmed', published: 'Published'
  })) approval.append(make('option', label, { value }));
  approval.value = record.status;
  const statusLabel = make('label', 'Status');
  statusLabel.append(approval);
  const latitude = coordinate('Latitude', record.latitude, -90, 90);
  const longitude = coordinate('Longitude', record.longitude, -180, 180);
  const save = make('button', 'Save decision', { type: 'submit', class: 'button primary' });
  const remove = make('button', 'Remove suggestion and votes', { type: 'button', class: 'button' });
  const reference = record.reference ? [make('a', 'Open submitted public reference', { href: record.reference, rel: 'noopener noreferrer', target: '_blank' })] : [];
  form.append(heading, make('p', record.description), ...reference, statusLabel, latitude.label, longitude.label, save, remove);
  form.addEventListener('submit', event => {
    event.preventDefault();
    change({ action: 'destination', id: record.id, status: approval.value,
      latitude: latitude.input.value, longitude: longitude.input.value }, save);
  });
  remove.addEventListener('click', () => {
    if (confirm('Remove this suggestion and its votes?')) change({ action: 'remove', id: record.id }, remove);
  });
  return form;
}
async function load() {
  const result = await admin();
  destinations.replaceChildren(...result.destinations.map(destination));
  if (!result.destinations.length) destinations.textContent = 'There are no submissions to review.';
  flights = result.flights;
  flightSelect.replaceChildren(make('option', 'Add a new flight', { value: '' }),
    ...flights.map(item => make('option', item.name, { value: item.id })));
  message.textContent = '';
}
async function change(data, button) {
  button.disabled = true;
  message.textContent = 'Saving…';
  try {
    await admin(data);
    await load();
    message.textContent = 'Saved.';
  } catch (error) {
    message.textContent = error.message;
  } finally {
    button.disabled = false;
  }
}
flightSelect.addEventListener('change', () => {
  const record = flights.find(item => item.id === flightSelect.value);
  for (const input of flightForm.querySelectorAll('[name]')) input.value = record?.[input.name] ?? '';
});
flightForm.addEventListener('submit', event => {
  event.preventDefault();
  change({ action: 'flight', ...Object.fromEntries(new FormData(flightForm)) }, flightForm.querySelector('button'));
});
load().catch(error => { message.textContent = error.message; });
