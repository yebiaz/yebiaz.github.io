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
index.html      page structure: nav, hero, projects section, about, modal
style.css       all the styling, including the paper texture and the colour palette
script.js       the PROJECTS list, card building, gallery modal, scroll reveals
assets/         images, videos, resume PDF
```

## Editing your projects

Everything about a project lives in one place: the `PROJECTS` array at the top of
`script.js`. The cards and the pop-up both build themselves from it, so you never edit
the same text twice. Each entry looks like this:

```js
{
  id: 'bee',                         // any unique short name
  title: 'NYT Spelling Bee Companion',
  date: 'Feb - Mar 2026; July 2026',
  thumb: 'assets/bee-poster.jpg',    // the card image
  media: [ ... ],                    // what you swipe through in the pop-up
  links: [{ label: 'GitHub', href: '...' }],
  skills: ['Python', 'scikit-learn', ...],
  body: `<p>...</p>`                 // the description
}
```

To reorder projects, move the entries around. To add one, copy an entry and change it.
`links` can be empty (`[]`) if there's nothing to link.

## Changing the colours

The palette is defined once at the top of `style.css`, in `:root`. Change a value there
and it updates everywhere:

```css
--ground:#1A1410;   /* the dark brown page background */
--paper:#EDE5D3;    /* beige text */
--honey:#DFA22B;    /* accent, same as the hive centre cell */
--moss:#7E9668;     /* green secondary */
```

For the dark-brown-and-light-blue version you were considering, change `--moss` and
`--honey` to blues and leave `--ground` alone.

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
