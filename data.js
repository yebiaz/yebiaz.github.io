/* Every project lives here. index.html and project.html both read this file,
   so one change updates the card and the project page together.
   Reorder these entries to reorder the grid. */

const PROJECTS = [
  {
    id: 'peva',
    title: 'Péva Phylogenetic Tree Support Tool',
    date: 'May - July 2026',
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
    title: 'NYT Spelling Bee Companion',
    date: 'Feb - Mar 2026; July 2026',
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
    title: 'Campus Club Portal',
    date: 'Oct - Dec 2025; Aug 2026 - Present',
    thumb: 'assets/club-events.png',
    media: [
      { type: 'img', src: 'assets/club-events.png', alt: 'Event announcement and filtering interface',
        caption: 'Event Discovery and Filters' },
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
    id: 'presence',
    title: 'Duke-DKU Presence Lab Project',
    date: 'May 2026 - Present',
    thumb: 'assets/presence-lab.jpg',
    media: [
      { type: 'img', src: 'assets/presence-lab.jpg', alt: 'Duke-DKU Presence Lab project artwork',
        caption: 'Duke-DKU Presence Lab' }
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
    id: 'soundart',
    title: 'Sound Art in Virtual Spaces',
    date: 'March 9 - 12, 2026',
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
  }
];
