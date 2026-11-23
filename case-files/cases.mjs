export const cases = [{
  id: 'gloucester-prison',
  title: 'Gloucester Prison',
  location: 'Gloucester, Gloucestershire',
  date: '2026-01-03',
  status: 'published',
  label: 'Documented visit',
  summary: 'A January visit to the former prison, with a record of the material collected and an aerial look at the location.',
  cover: '/media/photography/gloucester-02-1440.webp',
  history: 'The former prison occupies the site of a Norman castle. The new gaol was built between 1786 and 1791 to William Blackburn’s design. Surviving prison buildings illustrate how the site expanded during the nineteenth century.',
  historySource: 'https://historicengland.org.uk/listing/the-list/list-entry/1245474',
  investigation: 'The collection identifies a visit on 3 January 2026. The records include interior video, camera photographs and audio files, with one audio filename dated just after midnight on 4 January. A verified participant list and exact sequence of events are unavailable.',
  findings: 'The records document a visit and the material collected. No verified finding is available for this case. The aerial imagery shows the location, and by itself says nothing about what caused any reported experience.',
  evidence: [
    { id: 'overhead', type: 'photo', title: 'The prison and surrounding streets', src: '/media/photography/gloucester-02-960.webp', full: '/media/photography/gloucester-02-1440.webp', alt: 'Gloucester Prison and surrounding streets from above', note: 'Previously published aerial photograph by NEWITT Skyline Media. Location context. The photograph’s capture date is unverified.' },
    { id: 'grounds', type: 'photo', title: 'The grounds from another angle', src: '/media/photography/gloucester-03-960.webp', full: '/media/photography/gloucester-03-1440.webp', alt: 'Aerial view of Gloucester Prison grounds and neighbouring buildings', note: 'Previously published aerial photograph by NEWITT Skyline Media. Location context.' },
    { id: 'published-clip', type: 'youtube', title: 'Inside Gloucester Prison', videoId: 'QbCZICpydcQ', note: 'Related clip published by Newitt’s Paranormal Adventures. Its recording date has not been verified and it is not assigned to the January visit.' }
  ],
  timeline: [
    { date: '2026-01-03', title: 'Gloucester Prison visit', detail: 'The collection for this date contains interior footage, photographs and audio recordings. The aerial photographs in this case file provide separate location context.', evidence: ['overhead', 'grounds'] },
    { date: '2026-01-04', title: 'Audio record after midnight', detail: 'A recording filename dated 4 January appears in the same collection. The original audio requires clearance before it can be shared.', evidence: [] }
  ]
}];

const slug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const mediaPath = /^\/media\/[a-z0-9/._-]+$/i;
const datePattern = /^\d{4}-\d{2}-\d{2}$/;
function realDate(date) {
  if (!datePattern.test(date) || !Number.isFinite(Date.parse(date))) return false;
  return new Date(date).toISOString().slice(0, 10) === date;
}
export function publicCases(records) {
  const published = records.filter(record => record.status === 'published');
  const ids = new Set();
  for (const record of published) {
    if (!slug.test(record.id) || ids.has(record.id) || !record.title || !record.location ||
        (record.date && !realDate(record.date)) || (!mediaPath.test(record.cover) || record.cover.includes("..")) || !/^https:\/\/[a-z0-9.-]+\//i.test(record.historySource)) throw Error('Invalid published case');
    ids.add(record.id);
    const evidence = new Set();
    for (const item of record.evidence) {
      if (!slug.test(item.id) || evidence.has(item.id) || !item.title || !item.note) throw Error('Invalid evidence metadata');
      evidence.add(item.id);
      if (item.type === 'youtube') {
        if (!/^[\w-]{11}$/.test(item.videoId)) throw Error('Invalid YouTube reference');
      } else if (!['photo', 'video', 'audio'].includes(item.type) || !mediaPath.test(item.src) || item.src.includes('..') ||
                 (item.full && (!mediaPath.test(item.full) || item.full.includes('..'))) ||
                 (item.captions && (!mediaPath.test(item.captions) || item.captions.includes('..'))) ||
                 (item.type === 'photo' && !item.alt)) throw Error('Invalid public evidence file');
    }
    if (record.timeline.some(event => !realDate(event.date) || event.evidence.some(id => !evidence.has(id)))) throw Error('Invalid timeline');
  }
  return published;
}
