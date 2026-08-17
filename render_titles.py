"""Render the word marks: slate blue letters with a crazed glaze surface.

Run:  python render_titles.py

Needs Strenuous_Bl.otf beside this file (or edit FONT below) and Pillow, numpy,
scipy. Writes the title-*.png files into assets/.

The look: solid slate blue letters carrying the fine crackle of a crazed glaze.
The crackle is generated, not photographed: seed points scattered over the
letters, then the boundaries between their territories drawn as faint pale
lines, which is roughly how crazing actually propagates. Rounded inner shading,
a lit crest on every top edge and a soft drop shadow do the 3D.
"""

import os
import random

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont
from scipy.ndimage import distance_transform_edt, gaussian_filter1d

FONT = "Strenuous_Bl.otf"
OUT = "assets"
PX = 300          # render size; the page scales these down, so this is 3x sharp
PAD = 26          # room for drips and shadow

# ── palette, sampled from the crazed blue glaze ────────────────────────
BLUE_LIT = np.array([86, 122, 156])      # catching the light
BLUE_MID = np.array([58, 87, 118])       # the body of the glaze
BLUE_DEEP = np.array([38, 58, 82])       # falling into shadow
CRACKLE = np.array([150, 178, 200])      # the crazing lines, a touch paler


def letter_mask(text, px=PX, pad=PAD):
    font = ImageFont.truetype(FONT, px)
    box = ImageDraw.Draw(Image.new("L", (8, 8))).textbbox((0, 0), text, font=font)
    w, h = box[2] - box[0] + pad * 2, box[3] - box[1] + pad * 2
    mask = Image.new("L", (w, h), 0)
    ImageDraw.Draw(mask).text((pad - box[0], pad - box[1]), text, font=font, fill=255)
    return np.asarray(mask).astype(np.float32) / 255.0, w, h


def drip_edge(width, height, top, seed):
    """Where the glaze stops, per column: a gentle wander plus hanging tongues."""
    rng = random.Random(seed)
    base = np.full(width, top, dtype=np.float32)

    # slow wander, so the line is never mechanical
    wander = gaussian_filter1d(
        np.array([rng.uniform(-1, 1) for _ in range(width)], dtype=np.float32),
        sigma=width / 14,
    )
    wander /= (np.abs(wander).max() + 1e-6)
    base += wander * height * 0.05

    # a few tongues of glaze running further down
    for _ in range(max(5, width // 90)):
        cx = rng.randint(0, width - 1)
        half = max(6, rng.randint(int(width * 0.008), int(width * 0.028)))
        depth = rng.uniform(0.12, 0.30) * height
        lo, hi = max(0, cx - half * 3), min(width, cx + half * 3 + 1)
        x = np.arange(lo, hi)
        t = (x - cx) / max(half, 1)
        # narrow at the tip, flaring where it leaves the pool
        base[lo:hi] += depth * np.exp(-(t ** 2) / 1.5)

    # fine ripple along the whole lip
    ripple = gaussian_filter1d(
        np.array([rng.uniform(-1, 1) for _ in range(width)], dtype=np.float32), sigma=2.2
    )
    base += ripple * height * 0.012
    return base


def soft(a, sigma):
    return np.asarray(
        Image.fromarray((np.clip(a, 0, 1) * 255).astype(np.uint8)).filter(
            ImageFilter.GaussianBlur(sigma)
        )
    ).astype(np.float32) / 255.0


def crackle_map(w, h, seed, density=0.0016):
    """Faint pale lines where one crazing cell meets the next."""
    rng = np.random.default_rng(seed)
    n = max(24, int(w * h * density))
    ys = rng.integers(0, h, n)
    xs = rng.integers(0, w, n)
    seeds = np.zeros((h, w), dtype=bool)
    seeds[ys, xs] = True

    # nearest seed for every pixel; where that changes, two cells meet
    _, idx = distance_transform_edt(~seeds, return_indices=True)
    label = idx[0] * w + idx[1]
    edges = np.zeros((h, w), dtype=np.float32)
    edges[:, :-1] += (label[:, :-1] != label[:, 1:])
    edges[:-1, :] += (label[:-1, :] != label[1:, :])
    edges = np.clip(edges, 0, 1)

    # break the lines up so they read as hairline crazing, not a wire mesh
    broken = edges * (gaussian_filter1d(rng.random((h, w)), 3, axis=1) > 0.42)
    return soft(broken, 0.7)


# wet clay: the same forms before they are fired
CLAY_LIT = np.array([168, 124, 88])
CLAY_MID = np.array([126, 88, 60])
CLAY_DEEP = np.array([74, 48, 31])

# straight out of the kiln, still glowing
HOT_LIT = np.array([255, 196, 112])
HOT_MID = np.array([240, 146, 58])
HOT_DEEP = np.array([168, 78, 22])
HOT_CRACKLE = np.array([255, 232, 190])

# the moment between the glow and the glaze, burnt out to near white
WHITE_LIT = np.array([255, 253, 248])
WHITE_MID = np.array([243, 238, 230])
WHITE_DEEP = np.array([201, 195, 186])
WHITE_CRACKLE = np.array([255, 255, 255])


def render(text, out_path, seed=7, mode='fired'):
    mask, w, h = letter_mask(text)
    shade(mask, w, h, out_path, seed=seed, mode=mode)


def shade(mask, w, h, out_path, seed=7, mode='fired'):
    """Give a silhouette its body, surface and 3D, and write it out."""
    ys = np.arange(h)[:, None].astype(np.float32)

    cov = mask.sum(axis=1)
    main = np.where(cov > cov.max() * 0.22)[0]
    top, bottom = main[0], main[-1]
    span = max(bottom - top, 1)

    # ── base: a little lighter toward the top of each letter ──
    palettes = {
        'fired': (BLUE_LIT, BLUE_MID, BLUE_DEEP, CRACKLE),
        'clay':  (CLAY_LIT, CLAY_MID, CLAY_DEEP, CRACKLE),
        'hot':   (HOT_LIT, HOT_MID, HOT_DEEP, HOT_CRACKLE),
        'white': (WHITE_LIT, WHITE_MID, WHITE_DEEP, WHITE_CRACKLE),
    }
    lit, mid, deep, crackle_col = palettes[mode]
    tt = np.broadcast_to(np.clip((ys - top) / span, 0, 1), (h, w))
    rgb = (lit[None, None, :] * (1 - tt[..., None]) * 0.42
           + mid[None, None, :] * (0.58 + 0.42 * tt[..., None]))

    # gentle mottling, so the surface is not a flat fill
    rng = np.random.default_rng(seed + 99)
    mottle = soft(rng.random((h, w)).astype(np.float32), 9.0) - 0.5
    rgb += mottle[..., None] * 20

    # ── the crazing (fired pieces only; wet clay has none) ──
    lines = np.zeros((h, w), np.float32) if mode in ('clay', 'hot') else crackle_map(w, h, seed)
    rgb += lines[..., None] * (crackle_col - mid)[None, None, :] * (0.62 if mode == 'hot' else 0.42)
    # a hair of shadow on one side of each line gives them depth
    rgb -= soft(np.clip(np.roll(lines, 1, axis=0) - lines, 0, 1), 0.6)[..., None] * 10

    # ── 3D ──
    dist = distance_transform_edt(mask > 0.5).astype(np.float32)
    round_ = np.clip(dist / 13.0, 0, 1) ** 0.7
    rgb = rgb * (0.70 + 0.44 * round_)[..., None] + deep[None, None, :] * (1 - round_)[..., None] * 0.22

    top_light = soft(np.clip(mask - np.roll(mask, 9, axis=0), 0, 1), 4.0)
    bottom_dark = soft(np.clip(mask - np.roll(mask, -8, axis=0), 0, 1), 4.5)
    rgb += top_light[..., None] * np.array([54, 62, 70])
    rgb -= bottom_dark[..., None] * 46

    rgb = np.clip(rgb, 0, 255).astype(np.uint8)

    # ── compose, with the soft drop shadow that worked well ──
    alpha = (np.clip(mask, 0, 1) * 255).astype(np.uint8)
    art = Image.fromarray(np.dstack([rgb, alpha]), "RGBA")

    drop = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    drop.paste((0, 0, 0, 150), (0, 0), Image.fromarray(alpha))
    drop = drop.filter(ImageFilter.GaussianBlur(7))
    canvas = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    canvas.alpha_composite(drop, (0, 6))
    canvas.alpha_composite(art)
    canvas.save(out_path)
    print(f"{out_path}  {w}x{h}")


def pad_to_match(a_path, b_path):
    """Pad the narrower word mark so both files are the same width.

    The hero is EMILY / portrait / BIAZ in a three-column grid. If the two
    images differ in width, the columns cannot be equal and the portrait drifts
    off the page's midline at wide sizes. Equal canvases fix it for good: EMILY
    sits flush right in its canvas, BIAZ flush left, so both hug the portrait.
    """
    a, b = Image.open(a_path), Image.open(b_path)
    w = max(a.width, b.width)
    for img, path, align_right in ((a, a_path, True), (b, b_path, False)):
        if img.width == w:
            continue
        canvas = Image.new("RGBA", (w, img.height), (0, 0, 0, 0))
        canvas.alpha_composite(img, (w - img.width if align_right else 0, 0))
        canvas.save(path)
        print(f"padded {path} to {w}px")


def sdf(mask):
    """Signed distance: positive inside the shape, negative outside."""
    inside = distance_transform_edt(mask > 0.5)
    outside = distance_transform_edt(mask <= 0.5)
    return inside - outside


def morph_stages(text, stem, stages=5, seed=7):
    """Five steps from a slab of clay to the finished letters.

    Interpolating the two shapes' distance fields (rather than fading one image
    into the other) makes the counters open outward the way a punch would push
    them: the holes appear, deepen, and the letters pull apart.
    """
    mask, w, h = letter_mask(text)
    rows = np.where(mask.max(axis=1) > 0.02)[0]
    cols = np.where(mask.max(axis=0) > 0.02)[0]

    # the starting slab: the letters' bounding box with generously rounded ends
    slab = np.zeros((h, w), np.float32)
    slab[rows[0]:rows[-1] + 1, cols[0]:cols[-1] + 1] = 1
    r = (rows[-1] - rows[0]) * 0.32
    slab = np.asarray(
        Image.fromarray((slab * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(r))
    ).astype(np.float32) / 255.0
    slab = (slab > 0.5).astype(np.float32)

    d_slab, d_letters = sdf(slab), sdf(mask)

    rng = np.random.default_rng(seed)
    wobble = soft(rng.random((h, w)).astype(np.float32), 26) - 0.5

    # A straight linear blend leaves the middle stages looking like the slab and
    # dumps all the change into the last step. Front-load it so the punches
    # appear early and the last stages are refinements.
    schedule = [0.0, 0.62, 0.80, 0.92, 1.0]
    for i in range(stages):
        t = schedule[i]
        d = (1 - t) * d_slab + t * d_letters
        # the middle stages are hand-punched, so let the edges wander a little
        d = d + wobble * 13 * max(0.0, 1 - abs(t - 0.62) * 2.6) * (1 - t)
        stage = np.clip(d * 0.6 + 0.5, 0, 1)
        stage = np.minimum(stage, 1.0)
        out = f"{OUT}/{stem}-s{i + 1}.png"
        shade(stage, w, h, out, seed=seed, mode='clay')


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    render("EMILY", f"{OUT}/title-emily.png", seed=3)
    render("BIAZ", f"{OUT}/title-biaz.png", seed=8)
    pad_to_match(f"{OUT}/title-emily.png", f"{OUT}/title-biaz.png")

    # the unfired versions, used by the opening animation
    # the five moulding stages, slab to letters
    morph_stages("EMILY", "title-emily", seed=3)
    morph_stages("BIAZ", "title-biaz", seed=8)
    for i in range(1, 6):
        pad_to_match(f"{OUT}/title-emily-s{i}.png", f"{OUT}/title-biaz-s{i}.png")

    # glowing, the moment they come out of the kiln
    render("EMILY", f"{OUT}/title-emily-hot.png", seed=3, mode="hot")
    render("BIAZ", f"{OUT}/title-biaz-hot.png", seed=8, mode="hot")
    pad_to_match(f"{OUT}/title-emily-hot.png", f"{OUT}/title-biaz-hot.png")

    render("EMILY", f"{OUT}/title-emily-white.png", seed=3, mode="white")
    render("BIAZ", f"{OUT}/title-biaz-white.png", seed=8, mode="white")
    pad_to_match(f"{OUT}/title-emily-white.png", f"{OUT}/title-biaz-white.png")

    # the section titles fire on scroll, so they need the same four stages
    for label, stem, seed in (("Selected Projects", "projects", 15), ("About Me", "about", 21)):
        for mode, suffix in (("clay", "-clay"), ("hot", "-hot"), ("white", "-white"), ("fired", "")):
            render(label, f"{OUT}/title-{stem}{suffix}.png", seed=seed, mode=mode)
