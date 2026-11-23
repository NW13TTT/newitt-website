const base = '/paranormal/case-files';
const escape = (value = '') => String(value).replace(/[&<>"']/g, character =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const dateLabel = (value) => value ? new Intl.DateTimeFormat('en-GB', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(value)) : '';
const label = (type) => ({ photo: 'Photography', video: 'Video', youtube: 'Video', audio: 'Audio' })[type];

function layout(title, main) {
  return `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow"><title>${escape(title)} | NEWITT MEDIA</title>
<link rel="stylesheet" href="${base}/case-files.css"><script defer src="${base}/case-files.js"></script></head>
<body><a class="skip" href="#content">Skip to content</a>
<header class="mast"><a class="brand" href="/"><img src="/media/header-emblem.webp" alt="" width="48" height="48">NEWITT MEDIA</a>
<nav aria-label="Main navigation"><a href="/paranormal">After Dark</a><a href="${base}">Case Files</a></nav></header>
<main id="content">${main}</main><footer><p>FROM ABOVE. AFTER DARK. AND EVERYTHING IN BETWEEN.</p><a href="/privacy">Privacy</a></footer>
<dialog id="viewer" aria-labelledby="viewer-title"><div class="viewer-bar"><p id="viewer-title">Photograph viewer</p><button type="button" data-close>Close</button></div><div class="image-frame"><img alt=""></div>
<div class="viewer-bar"><button type="button" data-previous>Previous</button><button type="button" data-zoom aria-pressed="false">Zoom in</button><button type="button" data-next>Next</button></div></dialog></body></html>`;
}
const option = (value) => `<option value="${escape(value)}">${escape(value)}</option>`;
export function archive(records) {
  const locations = [...new Set(records.map(record => record.location))].sort();
  const years = [...new Set(records.filter(record => record.date).map(record => record.date.slice(0, 4)))].sort();
  const types = [...new Set(records.flatMap(record => record.evidence.map(item => label(item.type))))].sort();
  return layout('The Case Files', `
<section class="hero archive-hero"><img class="hero-image" src="/media/photography/gloucester-02-1440.webp" alt="" fetchpriority="high">
<div class="wrap hero-inner"><p class="eyebrow">Newitt’s Paranormal Adventures</p><h1>The Case <em>Files.</em></h1>
<p>Every location has a history. Every investigation has a story.</p><a class="action" href="#archive">Browse the archive ↓</a></div></section>
<section class="wrap section" id="archive"><p class="eyebrow">Investigation archive</p><h2>Open a case</h2>
<form id="archive-filters" hidden><label>Search <input type="search" name="search" placeholder="Location or case name"></label>
<label>Location <select name="location"><option value="">All locations</option>${locations.map(option).join('')}</select></label>
<label>Year <select name="year"><option value="">All years</option>${years.map(option).join('')}</select></label>
<label>Material <select name="type"><option value="">All types</option>${types.map(option).join('')}</select></label></form>
<p id="filter-status" role="status"></p>
<div class="cards">${records.map(record => `<article class="case-card" data-location="${escape(record.location)}" data-year="${escape(record.date?.slice(0, 4))}" data-types="${escape(record.evidence.map(item => label(item.type)).join('|'))}">
<a href="${base}/${escape(record.id)}"><img src="${escape(record.cover)}" width="1440" height="810" loading="lazy" alt=""><div class="case-card-body">
<p class="eyebrow">${escape(record.label)}</p><h3>${escape(record.title)}</h3><p>${escape(record.location)} · ${escape(dateLabel(record.date))}</p>
<p>${escape(record.summary)}</p><span class="text-link">Open case file ↗</span></div></a></article>`).join('')}</div>
${records.length ? '' : '<p>No case files are ready to share yet.</p>'}</section>`);
}
function evidence(item) {
  let media;
  if (item.type === 'photo') {
    media = `<a class="photo" data-photo href="${escape(item.full || item.src)}"><img src="${escape(item.src)}" width="960" height="540" loading="lazy" alt="${escape(item.alt)}"><span>Open photograph ↗</span></a>`;
  } else if (item.type === 'youtube') {
    media = `<div class="video-placeholder"><button type="button" data-video="${escape(item.videoId)}" hidden>Load YouTube player</button>
<a href="https://www.youtube.com/watch?v=${escape(item.videoId)}">Watch on YouTube ↗</a></div>`;
  } else {
    const captions = item.captions ? `<track kind="captions" label="English" srclang="en" src="${escape(item.captions)}">` : '';
    media = item.type === 'video' ? `<video controls playsinline preload="none" src="${escape(item.src)}">${captions}</video>` :
      `<audio controls preload="none" src="${escape(item.src)}"></audio><p>Headphones may help with quiet recordings.</p>`;
  }
  return `<article class="evidence" id="${escape(item.id)}"><p class="eyebrow">${label(item.type)}</p><h3>${escape(item.title)}</h3>
${media}<p>${escape(item.note)}</p>${item.transcript ? `<details><summary>Transcript</summary><p>${escape(item.transcript)}</p></details>` : ''}</article>`;
}
export function casePage(record) {
  return layout(record.title, `
<section class="hero case-hero"><img class="hero-image" src="${escape(record.cover)}" alt="" fetchpriority="high"><div class="wrap hero-inner">
<a class="back" href="${base}">← All case files</a><p class="eyebrow">${escape(record.label)}</p><h1>${escape(record.title)}.</h1>
<p>${escape(record.location)} · ${escape(dateLabel(record.date))}</p></div></section>
<div class="wrap section case-layout">
<nav class="chapters" aria-label="Case chapters"><a href="#location">Location</a><a href="#investigation">Investigation</a><a href="#timeline">Timeline</a><a href="#evidence">Evidence room</a><a href="#findings">Findings</a></nav>
<div class="case-copy">
<section id="location"><p class="eyebrow">Historical background</p><h2>The location</h2><p>${escape(record.history)}</p><a href="${escape(record.historySource)}">Historic England listing ↗</a></section>
<section id="investigation"><h2>The investigation</h2><p>${escape(record.investigation)}</p></section>
<section id="timeline"><h2>Timeline</h2><p>Dates follow the available collection records.</p><div class="timeline">${record.timeline.map(event =>
  `<details><summary><time datetime="${escape(event.date)}">${escape(dateLabel(event.date))}</time><strong>${escape(event.title)}</strong></summary><p>${escape(event.detail)}</p>
  ${event.evidence.map(id => `<a href="#${escape(id)}">${escape(record.evidence.find(item => item.id === id)?.title)} ↘</a>`).join('')}</details>`).join('')}</div></section>
<section id="evidence"><h2>Evidence room</h2><p>Location photographs and a related public video. Original investigation audio and footage are awaiting publication clearance.</p>
<div class="evidence-grid">${record.evidence.map(evidence).join('')}</div></section>
<section id="findings"><p class="eyebrow">What the record supports</p><h2>Findings</h2><p>${escape(record.findings)}</p></section>
</div></div>`);
}
