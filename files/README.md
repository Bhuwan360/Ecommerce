# Halide — Film & Darkroom Supply Catalog

A capstone e-commerce product catalog: a modular vanilla-JavaScript
single-page app with client-side routing, a persistent cart, and a
production build pipeline, deployed as a static site on Vercel.

**Live demo:** _add your deployed URL here after running the deploy step below._

---

## Architecture

The app has no framework and no runtime dependencies — everything in
`/js` and `/css` ships as-is to the browser. Structure:

```
halide/
├── index.html            # app shell: header, cart drawer, <main> mount point
├── css/
│   ├── tokens.css        # design tokens (color, type, spacing)
│   ├── reset.css         # minimal reset + accessibility base styles
│   ├── layout.css        # page structure, header, hero, grids
│   └── components.css    # product cards, buttons, cart lines
├── js/
│   ├── main.js            # entry point — wires router, store, and global UI
│   ├── router.js           # tiny hash-based client-side router
│   ├── store.js            # cart state (pub/sub + localStorage)
│   ├── data.js              # product catalog data
│   ├── utils.js             # formatting, debounce, generated SVG art
│   └── views/
│       ├── catalog.js       # home page, category listings, search results
│       ├── product.js       # product detail page
│       ├── cart.js          # full cart page
│       └── drawer.js        # slide-out quick-view cart
├── build.js               # production build script (see below)
├── package.json
└── vercel.json            # deployment config
```

**Why this shape:**

- **Modular by responsibility, not by page.** `store.js` owns cart
  state and nothing else; every view subscribes to it and re-renders
  rather than mutating it directly. `router.js` doesn't know what a
  product is. `data.js` doesn't know how anything renders. Each file
  can be read, tested, or replaced on its own.
- **Client-side routing** uses the URL hash (`#/catalog/film`,
  `#/product/tri-x-400`, `#/cart`). Hash routing needs zero server
  configuration — a plain static file host works, since the server
  never sees `/catalog/film` as a path — which keeps the Vercel
  config to caching headers only, no rewrite rules.
- **No image requests.** Product art is small SVG generated at
  runtime per category (`utils.js › frameArt`), rather than shipped
  photography. That's a deliberate performance choice as much as a
  visual one: the whole app loads with zero image bytes.
- **State lives in one place.** `CartStore` extends `EventTarget` and
  persists to `localStorage`, so the cart survives a reload; every
  piece of UI that shows cart data (header count, drawer, cart page)
  subscribes to the same `change` event instead of keeping its own
  copy.

## Running locally

```bash
npm install
npm run dev        # serves the unminified source at http://localhost:5173
```

No build step is required for local development — `index.html`
loads the ES modules directly.

## Production build

```bash
npm run build       # writes an optimized build to /dist
npm run preview      # serves /dist at http://localhost:4173 to sanity-check it
```

`build.js` does three things:

1. **Bundles and minifies JavaScript** — all ES modules under `/js`
   are bundled into a single file with esbuild and minified.
2. **Minifies and merges CSS** — the four token/reset/layout/component
   files are concatenated and minified with `clean-css`.
3. **Content-hashes both output files** (e.g. `main.b5c636049f.min.js`)
   and rewrites `index.html`'s `<link>`/`<script>` tags to match, then
   minifies the HTML itself. Hashing the filename means the deployed
   assets can be cached as `immutable` forever — a new deploy produces
   a new filename automatically, so there's never a stale-cache bug.

A recent build: ~23 KB JS, ~13 KB CSS, ~4 KB HTML, minified — all
before gzip/Brotli, which Vercel applies automatically at the edge.

## Deploying to Vercel

**Option A — Vercel CLI**

```bash
npm install -g vercel
vercel            # first run links/creates the project, deploys a preview
vercel --prod     # promotes to the production URL
```

**Option B — Vercel dashboard**

1. Push this project to a GitHub/GitLab/Bitbucket repo.
2. In the Vercel dashboard, **Add New → Project** and import the repo.
3. Vercel detects `vercel.json`, which already sets:
   - `buildCommand`: `npm run build`
   - `outputDirectory`: `dist`
4. Deploy. Every push to the default branch redeploys automatically;
   every other branch/PR gets its own preview URL.

`vercel.json` also sets long-lived immutable caching on `/css/*` and
`/js/*` (safe because filenames are content-hashed), no-cache on
`index.html` (so a new deploy is picked up immediately), and a small
set of standard security headers.

## Notes

This is a capstone demonstration — the "Checkout" button and product
stock levels are illustrative and don't process real orders or
inventory.
