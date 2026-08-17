/* Home page: the project grid and the scroll reveals.
   Project content lives in data.js. */

const ARROW = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>`;

const grid = document.getElementById('grid');

PROJECTS.forEach((p, i) => {
  // A div rather than a link, because the repo tag inside is itself a link and
  // links cannot nest. Clicking the card navigates; the repo tag handles itself.
  const card = document.createElement('div');
  card.className = 'card reveal';
  // With a two-column grid, an odd number of projects leaves the last one
  // stranded on the left. Centre it instead.
  if (i === PROJECTS.length - 1 && PROJECTS.length % 2 === 1) card.classList.add('card-solo');
  // The first project starts in colour, so the grid is never entirely grey.
  if (i === 0) card.classList.add('is-lit');
  card.style.setProperty('--i', i);

  const href = `project.html?id=${p.id}`;

  const repoTags = p.links
    .map(l => `<a class="tag tag-repo" href="${l.href}" target="_blank" rel="noopener">${l.label}</a>`)
    .join('');

  card.innerHTML = `
    <div class="card-media">
      <img src="${p.thumb}" alt="" loading="lazy">
    </div>
    <div class="card-body">
      <p class="card-date">${p.date}</p>
      <h3 class="card-title">${p.title}</h3>
      <div class="card-tags">
        ${repoTags}
        <a class="tag tag-more" href="${href}">Learn more ${ARROW}</a>
      </div>
    </div>`;

  card.addEventListener('click', e => {
    if (e.target.closest('a')) return;   // repo tag and Learn more do their own thing
    window.location.href = href;
  });

  // The spotlight follows the cursor: whichever card you touched last stays in
  // colour, so Péva hands off rather than the page going flat.
  card.addEventListener('mouseenter', () => {
    document.querySelectorAll('.card.is-lit').forEach(c => c.classList.remove('is-lit'));
    card.classList.add('is-lit');
  });

  grid.appendChild(card);
});

/* ── the opening ───────────────────────────────────────────
   A ball of clay appears where the portrait will be, splits, and rolls out
   moulding each name; the pieces then fire from brown to glazed blue while
   the portrait develops from a brown-washed grey and the line types itself.
   Runs once per visit; skipped entirely for reduced motion. */

const lede = document.getElementById('lede');
const typed = lede && lede.querySelector('.typed');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function typeLine(text, el, start, per) {
  let i = 0;
  const tick = () => {
    el.textContent = text.slice(0, ++i);
    if (i < text.length) setTimeout(tick, per);
  };
  setTimeout(tick, start);
}

if (lede) {
  const text = lede.dataset.text;
  if (reduced) {
    typed.textContent = text;
    lede.querySelector('.caret').remove();
  } else {
    document.body.classList.add('js-open');
    document.body.classList.add('js-fire');
    requestAnimationFrame(() => requestAnimationFrame(() => {
      document.body.classList.add('js-run');
    }));
    // starts the instant the first punch lands, finishes as the clay settles
    // into its final rest, right before the kiln
    typeLine(text, typed, 0, 3200 / text.length);
    setTimeout(() => lede.querySelector('.caret').classList.add('done'), 4100);
  }
}

/* ── scroll reveal ─────────────────────────────────────── */

const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* the two section titles fire once, when they are scrolled to */
if (!reduced) {
  const kiln = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('lit');
        kiln.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.fire-on-view').forEach(el => kiln.observe(el));
}
