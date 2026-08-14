/* Project page. Reads ?id= from the address bar and renders that entry from
   data.js, so there is one page file rather than five. */

const ARROW = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>`;

const id = new URLSearchParams(window.location.search).get('id');
const project = PROJECTS.find(p => p.id === id);

if (!project) {
  // someone hand-typed a bad id, or arrived with no id at all
  document.getElementById('d-title').textContent = 'Project not found';
  document.getElementById('d-body').innerHTML =
    '<p>That project does not exist. Head back to the list and pick one.</p>';
} else {
  document.title = `${project.title} - Emily Biaz`;

  document.getElementById('d-date').textContent  = project.date;
  document.getElementById('d-title').textContent = project.title;
  document.getElementById('d-body').innerHTML    = project.body;

  // repo link sits beside the title, not buried at the bottom
  document.getElementById('d-links').innerHTML = project.links
    .map(l => `<a class="tag tag-repo" href="${l.href}" target="_blank" rel="noopener">${l.label} ${ARROW}</a>`)
    .join('');

  // skills come before the description, so a skimmer gets them first
  document.getElementById('d-skills').innerHTML = project.skills
    .map(s => `<span class="tag">${s}</span>`)
    .join('');

  const media = document.getElementById('d-media');
  if (project.mediaLayout === 'grid') media.classList.add('media-grid');

  media.innerHTML = project.media.map(item => {
    const caption = item.caption
      ? `<figcaption class="gal-caption">${item.caption}</figcaption>`
      : '';

    // Videos put their caption underneath: overlaid, it would sit on top of the
    // playback controls.
    if (item.type === 'video') {
      return `<figure class="media-item media-video">
                <video src="${item.src}" poster="${item.poster || ''}" controls preload="none" playsinline></video>
                ${item.caption ? `<figcaption class="video-caption">${item.caption}</figcaption>` : ''}
              </figure>`;
    }

    return `<figure class="media-item">
              <img src="${item.src}" alt="${item.alt || ''}" loading="lazy">
              ${caption}
            </figure>`;
  }).join('');
}

/* ── scroll reveal ─────────────────────────────────────── */

const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));
