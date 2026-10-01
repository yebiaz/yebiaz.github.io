# Emily Biaz, portfolio

A single-page static site. No build step, no framework, no dependencies. Three files
plus an assets folder.

## Look at it locally

Double-click `index.html`. That's it. It opens in your browser and everything works.

If videos ever misbehave when opened that way, run a tiny local server instead:

```bash
cd portfolio
python3 -m http.server 8000
```

then visit `http://localhost:8000`.

## What's where

```
index.html      home page: nav, hero, project grid, about
project.html    the shell every project page is rendered into
data.js         all project content, in one array
script.js       home page: builds the cards, handles the spotlight
project.js      project page: reads ?id= and renders that project
style.css       all the styling, including the paper texture and the palette
assets/         images, videos, resume PDF
```

Each project gets its own address, e.g. `project.html?id=bee`. One page file
serves all of them, filled in from `data.js`.

A project page also ends with a "More Projects" section showing the next two
projects in a fixed browsing order (`RANKING` at the top of `project.js`),
wrapping back to the start when needed - independent of the order projects
are listed in `data.js` itself.

## Editing your projects

Everything about a project lives in one place: the `PROJECTS` array in `data.js`. The cards and the project page both build themselves from it, so you never edit
the same text twice. Each entry looks like this:

```js
{
  id: 'bee',                         // any unique short name - also add it to
                                      // RANKING in project.js if you want it
                                      // in the "More Projects" rotation
  headline: 'Beating the NYT Spelling Bee, Word by Word',  // outcome-focused, shown big
  title: 'NYT Spelling Bee Companion',                     // the literal name, shown small underneath
  thumb: 'assets/bee-poster.jpg',    // the card image
  media: [ ... ],                    // images and video on the project page
  mediaLayout: 'grid',               // optional: lay the images out two by two
  links: [{ label: 'GitHub', href: '...' }],
  skills: ['Python', 'scikit-learn', ...],
  body: `<p>...</p>`                 // the description
}
```

To reorder the project grid, move the entries around. To add one, copy an entry,
change it, and add its `id` to `RANKING` in `project.js` if it should show up
in "More Projects". `links` can be empty (`[]`) if there's nothing to link -
on the project page that link, when present, is styled as the primary
(filled) button, since it's the main thing to do on that page.

## Fonts and the word marks

Exactly two type families are used anywhere on the site: Strenuous (the three
big titles, rendered as images - see below) and Outfit (literally everything
else: body copy, labels, tags, buttons). Text groups that used to be told
apart by switching fonts are now told apart by size and weight instead.

The four big titles (EMILY, BIAZ, Selected Projects, About Me) are **PNG images**
in `assets/`, not live text. They are drawn by `render_titles.py`: letterforms set
in Strenuous Black, filled with a slate blue carrying the fine crackle of a crazed
glaze, then rounded shading, a lit crest along every top edge and a soft drop
shadow for the 3D.

The crackle is generated rather than photographed. Seed points are scattered over
the letters and the boundaries between their territories drawn as faint pale
lines, which is roughly how crazing propagates through a glaze. `density` in
`crackle_map` sets how fine the cells are.

They are images on purpose. The Strenuous licence is a Typodermic **desktop** EULA:
it permits installing the font and making static graphics with it, and it forbids
converting the font to another format (a `.woff2` would be a derivative work) or
distributing the font software. Rendering fixed images sits inside the desktop
licence; serving the font would need a separate web licence.

To change the wording or retune the look, put `Strenuous_Bl.otf` beside the script
and run:

```bash
pip install pillow numpy scipy
python render_titles.py
```

The knobs worth touching are at the top of the file: the palette constants, and
`glaze_frac` in each `render()` call, which sets how far down the letters the glaze
reaches. The font file is deliberately not committed to this repo.

## The opening animation

On load, EMILY and BIAZ are already sitting there as plain brown clay letters,
no moulding. A beat later they fire: a rest on white, then a settle into the
blue glaze, each colour fading in and staying while the next one lands on top
of it - a plain crossfade with nothing to read as a stutter. The line beneath
types itself at a comfortable pace, starting the moment the clay appears.
"Selected Projects" and "About Me" do the same firing sequence when scrolled
into view, but stay fully visible in brown from the moment the page loads -
they never fade in.

(An earlier version had a third stage here, an orange "straight out of the
kiln" flash between clay and white. It was cut - orange didn't fit the rest
of the site - leaving the simpler brown-to-cream-to-blue sequence above.)

Anyone with "reduce motion" turned on gets the finished, glazed state
immediately.

Timing lives in `style.css` under "the run"; typing speed is the last argument
of `typeLine` in `script.js`.

An earlier version animated the clay moulding into letters stage by stage.
That code (`morph_stages` in `render_titles.py`, using signed-distance-field
interpolation between a slab and the letterforms) was tried and pulled; the
git history has it if it's ever wanted back.

## Changing the colours

The palette is intentionally small: one brown, one blue, and cream (used for
body text and anywhere contrast against the dark background matters most).
It's defined once at the top of `style.css`, in `:root`:

```css
--ground:#1A1410;   /* dark brown page background (tonal shades of this, not a new colour) */
--cream:#DBC1AC;    /* main text colour */
--brown:#967259;    /* the one brown accent */
--blue:#9CBEDC;     /* the one blue accent */
```

Change `--brown` or `--blue` and it updates everywhere at once: tags, borders,
buttons, the wavy dividers, the fired word marks. Differences that used to
come from extra named colours (a paler brown, a second blue) now come from
`opacity` where needed, so there's still visual depth without more hues.

The paper texture is generated in CSS, not an image file. See `body::before`. Raising
its `opacity` makes the grain heavier; lowering it makes the page smoother.

## Publishing to GitHub Pages

When you're happy with it:

1. Create a new **public** repo on GitHub. Naming it `yebiaz.github.io` gives you the
   address `https://yebiaz.github.io`; any other name gives you
   `https://yebiaz.github.io/repo-name`.
2. Upload these files. `index.html` must sit at the top level, not inside a folder.
3. Repo **Settings → Pages → Build and deployment**. Source: *Deploy from a branch*.
   Branch: `main`, folder: `/ (root)`. Save.
4. Wait a minute or two, then reload. The URL appears at the top of that same page.
