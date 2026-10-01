/* Every project lives here. index.html and project.html both read this file,
   so one change updates the card and the project page together.
   Reorder these entries to reorder the grid.

   `headline` is the big, outcome-focused heading (what happened / what was
   cool). `title` is the literal project name, shown smaller underneath it.

   RANKING below controls the "More Projects" picks at the bottom of each
   project page - it is independent of this array's order. */

const PROJECTS = [
  {
    id: 'peva',
    headline: 'Proving an ML Tool Reads Biology, Not Noise',
    title: 'Péva Phylogenetic Tree Support Tool',
    thumb: 'assets/peva-poster.jpg',
    media: [
      { type: 'img', src: 'assets/peva-poster.jpg', alt: 'Emily presenting her REU poster at UNC Charlotte',
        caption: 'REU Poster Session, UNC Charlotte' },
      { type: 'img', src: 'assets/peva-importance.png', alt: 'Held-out permutation importance for Random Forest and LightGBM',
        caption: 'Held-Out Permutation Importance: Noise Never Outranks Signal' }
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
      datasets.</p>

      <p>Lastly, I ran a systematic testing pass on the rest of Péva's 19 tools, checking
      for obscurities and bugs.</p>`
  },

  {
    id: 'bee',
    headline: 'Building the Spelling Bee Helper I Always Wanted',
    title: 'NYT Spelling Bee Companion',
    thumb: 'assets/bee-poster.jpg',
    media: [
      { type: 'video', src: 'assets/bee-demo.mp4', poster: 'assets/bee-poster.jpg',
        caption: 'The rebuilt interface in use' },
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
  },

  {
    id: 'clubs',
    headline: 'Designing a Database for Campus Life',
    title: 'Campus Club Portal',
    thumb: 'assets/club-events.png',
    media: [
      { type: 'img', src: 'assets/club-events.png', alt: 'Event announcement and filtering interface',
        caption: 'Event Discovery and Filters' }
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/elliot108/COMPSCI-310-GROUP-PROJECT' }],
    skills: ['SQL', 'Node.js', 'Figma', 'Database design', 'Team coordination', 'User-centric design'],
    body: `
      <p>A team project to give students one place to find campus events and keep up with
      club activity, instead of scattered PDFs and text chains.</p>

      <p>Across seven weeks, we worked together in designing our <strong>SQL schema</strong>,
      building out the backend, and prototyping the browsing and filtering interface in
      Figma. Keeping the data model, the queries, and the frontend talking to each other
      cleanly, while coordinating the work across a small team, I realized was as much the
      project as any single feature or query.</p>`
  },

  {
    id: 'soundart',
    headline: 'Sound That Reacts to What You Do',
    title: 'Sound Art in Virtual Spaces',
    thumb: 'assets/soundart-poster.jpg',
    media: [
      { type: 'video', src: 'assets/soundart-demo.mp4', poster: 'assets/soundart-poster.jpg',
        caption: 'Walkthrough of the Unreal environment' }
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
    id: 'claudecode',
    headline: 'Built with Claude Code',
    title: "The portfolio site you're seeing right now!",
    noDetail: true,   // no project page, no "Learn more", never shown in another project's More Projects
    textOnly: true,   // no thumbnail/media - just a small centered title + subtitle card
    links: []
  }
];
