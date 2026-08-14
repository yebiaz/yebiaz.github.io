/* ═══════════════════════════════════════════════════════════
   Emily Biaz, portfolio
   Everything about a project lives in PROJECTS below. To add or
   edit one, change this array. The cards and the modal both
   build themselves from it.
   ═══════════════════════════════════════════════════════════ */

const PROJECTS = [
  {
    id: 'peva',
    title: 'Péva Phylogenetic Tree Support Tool',
    date: 'May - July 2026',
    thumb: 'assets/peva-poster.jpg',
    media: [
      { type: 'img', src: 'assets/peva-poster.jpg', alt: 'Emily presenting her REU poster at UNC Charlotte' },
      { type: 'img', src: 'assets/peva-perturbation.png', alt: 'Simulated perturbation test: held-out accuracy decaying as clade labels are randomized' },
      { type: 'img', src: 'assets/peva-importance.png', alt: 'Held-out permutation importance for Random Forest and LightGBM' }
    ],
    links: [{ label: 'GitLab', href: 'https://gitlab.com/phyloinformatics/peva-public/-/tree/main/research/reu26/biaz_hierarchical_clade_prediction' }],
    skills: ['Python', 'Machine learning (Random Forest, LightGBM)', 'Model evaluation', 'Feature-importance methodology', 'Experiment design', 'Data visualization', 'Technical writing', 'Software testing / QA'],
    body: `
      <p>I had the opportunity to participate in the NSF-funded Smart &amp; Secure Future
      Computing REU at UNC Charlotte. I worked with my mentor, Denis Machado, to validate
      and stress-test one of his Péva tools, a system that uses machine learning to give
      phylogenetic trees independent, external support from non-phylogenetic metadata like
      host and geographic data.</p>

      <p>Over nine weeks, I built simulated datasets with known ground-truth signal to test
      whether the model detects real biological signal or just overfits, using a
      <strong>perturbation test</strong> that progressively randomizes labels and checks
      that accuracy decays accordingly.</p>

      <p>I then investigated which features the model actually relies on, and found that
      the standard ways of measuring this, Gini/impurity importance and LightGBM gain,
      produce a compelling but misleading result. I established <strong>held-out
      permutation importance</strong> as the reliable alternative. Using both tests, I ran
      systematic Random Forest vs. LightGBM comparisons across simulated and real-world
      datasets. I found that despite LightGBM's slightly lower accuracy, it allowed for developing 
      the tool to be more <strong>automatable, applicable to more datasets, and convenient to use</strong>. </p>
      

      <p>Lastly, I ran a systematic testing pass on the rest of Péva's 19 tools, checking
      for obscurities and bugs.</p>`
  },

  {
    id: 'presence',
    title: 'Duke-DKU Presence Lab Project',
    date: 'May 2026 - Present',
    thumb: 'assets/presence-lab.jpg',
    media: [
      { type: 'img', src: 'assets/presence-lab.jpg', alt: 'Duke-DKU Presence Lab project artwork' }
    ],
    links: [{ label: 'Presence Lab', href: 'https://bassconnections.duke.edu/project/duke-dku-presence-lab-portal-project-2026-2027/' }],
    skills: ['Immersive media and XR', 'Interaction design', 'Cross-cultural collaboration'],
    body: `
      <p>I'm part of a year-long Duke-DKU team building experimental
      <strong>"portals"</strong>, tech experiences that let our two campuses on opposite
      sides of the world share a sense of presence.</p>

      <p>We're currently researching ideas in immersive media, then will spring into
      building our own: VR narratives, AR campus histories, networked sound art.</p>

      <p>We're a small team across combinations of art, CS, and engineering. Some of us
      will be at Duke in fall, some (including me) at Duke in spring, constantly
      coordinating across a 12-hour time difference, which is in itself the problem we're
      studying.</p>`
  },

  {
    id: 'clubs',
    title: 'Campus Club Portal',
    date: 'Oct - Dec 2025; Aug 2026 - Present',
    thumb: 'assets/club-original-ui.png',
    media: [
      { type: 'img', src: 'assets/club-original-ui.png', alt: 'Original club events database interface' },
      { type: 'img', src: 'assets/club-events.png', alt: 'Event announcement and filtering interface' },
      { type: 'img', src: 'assets/club-schema.png', alt: 'Database schema for the campus club portal',
        caption: 'Portion of Database Design' },
      { type: 'img', src: 'assets/club-flowchart.png', alt: 'Flowchart comparing the current manual PDF process with the proposed platform',
        caption: 'First Flowchart Draft: Fixing the Information Flow' }
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/elliot108/COMPSCI-310-GROUP-PROJECT' }],
    skills: ['SQL', 'Node.js', 'Figma', 'Database design', 'Product strategy & pivoting', 'User-centric design'],
    body: `
      <p>What began as a database project geared for students to have a centralized
      platform to keep up with campus events and get personalized recommendations has now
      turned into a workspace designed to streamline and automate club operations.</p>

      <p>Our original concept was valuable, but not especially realistic for our small
      campus. I revisited the idea and realized the potential for replacing static,
      unstructured PDFs with a connected website, so inputs like club member logs and
      budget expenses are consistently stored as active data. That brought a whole new
      world of benefits: <strong>reducing manual work and errors, eliminating redundant
      email exchanges, and unlocking data analytics</strong> for both individual clubs and
      the university club board.</p>

      <p>While the personalized recommendations and general student users are discarded,
      I'm able to adapt some logic of the original data schema, SQL queries, and frontend
      interface. I'm storyboarding new user flows, writing pseudocode for the new automated
      features, and consulting with the Campus Clubs Coordinator once I return to campus to
      further align my work with her needs.</p>`
  },

  {
    id: 'soundart',
    title: 'Sound Art in Virtual Spaces',
    date: 'March 9 - 12, 2026',
    thumb: 'assets/soundart-poster.jpg',
    media: [
      { type: 'video', src: 'assets/soundart-demo.mp4', poster: 'assets/soundart-poster.jpg' }
    ],
    links: [],
    skills: ['Max/MSP', 'Unreal Engine', 'Spatial audio design', 'Interactive storytelling', 'Cross-disciplinary collaboration', 'Rapid prototyping'],
    body: `
      <p>Over a four-day workshop on Sound Art in Virtual Spaces, I learned to use Max/MSP
      and Unreal Engine for the very first time. Collaborating with two classmates, we
      conceptualized an interactive environment where a player cutting down a tree
      progressively shifts the sound ambience from nature sounds to man-made noise.</p>

      <p>We recorded and routed audio through our own Max patch, syncing it with our Unreal
      Engine project to create an immersive, spatialized soundscape. Beyond implementing the
      location-based sound that moves with the player, as taught in the course, I pushed the
      project further by <strong>linking audio shifts directly to the player's
      actions</strong>.</p>

      <p>Despite working with unfamiliar tools, I quickly leveraged my CS and design
      intuition to turn our concept into a more dynamic virtual experience.</p>

      <p class="note">The voice in the walkthrough is my project partner's.</p>`
  },

  {
    id: 'bee',
    title: 'NYT Spelling Bee Companion',
    date: 'Feb - Mar 2026; July 2026',
    thumb: 'assets/bee-poster.jpg',
    media: [
      { type: 'video', src: 'assets/bee-demo.mp4', poster: 'assets/bee-poster.jpg' },
      { type: 'img', src: 'assets/bee-old-ui.png', alt: 'The original notebook interface',
        caption: 'Old Notebook Interface' }
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/yebiaz/spelling-bee-helper' }],
    skills: ['Python', 'scikit-learn', 'Feature engineering', 'Data structures (tries)', 'Streamlit', 'Interface design', 'User thinking'],
    body: `
      <p>An NYT Spelling Bee companion for the players who just can't get enough.</p>

      <p>I've played this game for years, and the thing that always got me was spending an
      hour on a word that turned out to be <em>bibelot</em>. So I built the tool I wanted:
      it tracks every guess and hint for you, and it lets you know whether the answer you're
      stuck on is one you'd actually know. A <strong>logistic-regression model I
      designed</strong> rates each remaining word common, middling or obscure from its
      frequency, length, letter pattern, and whether it's a regular form of a word you
      already know. That last one only came from my intuition from playing the game. Hints
      are then sized to match: a letter for easy words, a letter and its position for
      middling, the whole word scrambled for the hopeless ones.</p>

      <p>The hardest part of all? NYT doesn't use a fixed dictionary, so my solver finds
      words they don't count and misses a few they do. You can <strong>upload a screenshot
      of their official hint page</strong> and it reconciles the two, reading the numeric
      grid from character positions, inferring the bolded centre letter by solving all seven
      possibilities and scoring each against their counts, then narrowing candidates to
      NYT's total. Lastly, it tells you exactly what the words we're missing might look
      like.</p>

      <p>I built the first version for a class final. The logic worked, but it didn't quite
      match my dream vision. Months later, I came back with better tools and better judgment
      and finished it with cooler features and a more user-friendly interface.</p>`
  }
];

/* ── icons ─────────────────────────────────────────────── */

const ARROW = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>`;

/* ── build the cards ───────────────────────────────────── */

const grid = document.getElementById('grid');

PROJECTS.forEach((p, i) => {
  // A div rather than a button: the repo tag inside is a real link, and a link
  // cannot legally live inside a button. Clicking the card still opens the
  // project; the link handles itself.
  const card = document.createElement('div');
  card.className = 'card reveal';
  // With a two-column grid, an odd number of projects leaves the last one
  // stranded on the left. Centre it instead.
  if (i === PROJECTS.length - 1 && PROJECTS.length % 2 === 1) card.classList.add('card-solo');
  card.style.setProperty('--i', i);

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
        <button class="tag tag-more" type="button" aria-label="${p.title}, read more">Learn more ${ARROW}</button>
      </div>
    </div>`;

  card.addEventListener('click', e => {
    if (e.target.closest('a')) return;   // let the repo link do its own thing
    openModal(p.id);
  });
  grid.appendChild(card);
});

/* ── modal + gallery ───────────────────────────────────── */

const modal   = document.getElementById('modal');
const stage   = document.getElementById('stage');
const dotsBox = document.getElementById('dots');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let current = null;   // the project being shown
let index   = 0;      // which slide
let lastFocus = null; // so focus returns where it came from

function renderSlide() {
  const item = current.media[index];

  const caption = item.caption
    ? `<figcaption class="gal-caption">${item.caption}</figcaption>`
    : '';

  stage.innerHTML = item.type === 'video'
    ? `<video src="${item.src}" poster="${item.poster || ''}" controls preload="none" playsinline></video>`
    : `<figure class="gal-figure"><img src="${item.src}" alt="${item.alt || ''}">${caption}</figure>`;

  // arrows and dots only earn their place when there is more than one slide
  const many = current.media.length > 1;
  prevBtn.hidden = nextBtn.hidden = !many;

  dotsBox.innerHTML = many
    ? current.media.map((_, i) =>
        `<button class="dot ${i === index ? 'on' : ''}" data-i="${i}" aria-label="Image ${i + 1}"></button>`
      ).join('')
    : '';
}

function step(by) {
  index = (index + by + current.media.length) % current.media.length;
  renderSlide();
}

function openModal(id) {
  current = PROJECTS.find(p => p.id === id);
  index = 0;
  lastFocus = document.activeElement;

  document.getElementById('modal-date').textContent  = current.date;
  document.getElementById('modal-title').textContent = current.title;
  document.getElementById('modal-text').innerHTML    = current.body;

  document.getElementById('modal-skills').innerHTML =
    current.skills.map(s => `<span class="tag">${s}</span>`).join('');

  document.getElementById('modal-links').innerHTML =
    current.links.map(l =>
      `<a class="tag tag-link tag-repo" href="${l.href}" target="_blank" rel="noopener">${l.label} ${ARROW}</a>`
    ).join('');

  renderSlide();
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  modal.querySelector('.modal-close').focus();
}

function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = '';
  stage.innerHTML = '';           // stop any playing video
  if (lastFocus) lastFocus.focus();
}

prevBtn.addEventListener('click', () => step(-1));
nextBtn.addEventListener('click', () => step(1));

dotsBox.addEventListener('click', e => {
  const dot = e.target.closest('.dot');
  if (dot) { index = +dot.dataset.i; renderSlide(); }
});

modal.addEventListener('click', e => { if (e.target.hasAttribute('data-close')) closeModal(); });

document.addEventListener('keydown', e => {
  if (modal.hidden) return;
  if (e.key === 'Escape') closeModal();
  if (current.media.length < 2) return;
  if (e.key === 'ArrowLeft')  step(-1);
  if (e.key === 'ArrowRight') step(1);
});

// swipe on touch screens
let touchX = null;
stage.addEventListener('touchstart', e => { touchX = e.changedTouches[0].clientX; }, { passive: true });
stage.addEventListener('touchend', e => {
  if (touchX === null || current.media.length < 2) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 45) step(dx < 0 ? 1 : -1);
  touchX = null;
}, { passive: true });

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
