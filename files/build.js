// ============================================================
// build.js — production build.
// Bundles + minifies the JS modules into one file, minifies the
// CSS and HTML, and copies the result into /dist. Vercel runs
// this automatically via the "build" script (see vercel.json).
// No framework, no bundler config file — esbuild + clean-css do
// the whole job in a few dozen lines.
// ============================================================
import { build } from "esbuild";
import CleanCSS from "clean-css";
import { minify as minifyHtml } from "html-minifier-terser";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

const ROOT = process.cwd();
const DIST = path.join(ROOT, "dist");

function hashOf(buf) {
  return crypto.createHash("sha256").update(buf).digest("hex").slice(0, 10);
}

async function clean() {
  await fs.rm(DIST, { recursive: true, force: true });
  await fs.mkdir(DIST, { recursive: true });
}

async function buildJs() {
  const result = await build({
    entryPoints: [path.join(ROOT, "js/main.js")],
    bundle: true,
    minify: true,
    format: "esm",
    target: "es2020",
    write: false,
  });
  const out = result.outputFiles[0];
  const hash = hashOf(out.contents);
  const filename = `main.${hash}.min.js`;
  await fs.mkdir(path.join(DIST, "js"), { recursive: true });
  await fs.writeFile(path.join(DIST, "js", filename), out.contents);
  console.log(`  js/${filename}  ${(out.contents.byteLength / 1024).toFixed(1)} KB`);
  return filename;
}

async function buildCss() {
  const files = ["tokens.css", "reset.css", "layout.css", "components.css"];
  const source = (
    await Promise.all(files.map((f) => fs.readFile(path.join(ROOT, "css", f), "utf8")))
  ).join("\n");
  const output = new CleanCSS({ level: 2 }).minify(source);
  if (output.errors.length) throw new Error(output.errors.join("\n"));
  const hash = hashOf(Buffer.from(output.styles));
  const filename = `styles.${hash}.min.css`;
  await fs.mkdir(path.join(DIST, "css"), { recursive: true });
  await fs.writeFile(path.join(DIST, "css", filename), output.styles);
  console.log(`  css/${filename}  ${(output.stats.minifiedSize / 1024).toFixed(1)} KB (from ${(output.stats.originalSize / 1024).toFixed(1)} KB)`);
  return filename;
}

async function buildHtml(cssFile, jsFile) {
  let html = await fs.readFile(path.join(ROOT, "index.html"), "utf8");
  html = html
    .replace(
      /<link rel="stylesheet" href="\/css\/reset.css" \/>\s*<link rel="stylesheet" href="\/css\/tokens.css" \/>\s*<link rel="stylesheet" href="\/css\/layout.css" \/>\s*<link rel="stylesheet" href="\/css\/components.css" \/>/,
      `<link rel="stylesheet" href="/css/${cssFile}" />`
    )
    .replace('<script type="module" src="/js/main.js"></script>', `<script type="module" src="/js/${jsFile}"></script>`);

  const minified = await minifyHtml(html, {
    collapseWhitespace: true,
    removeComments: true,
    minifyCSS: true,
    minifyJS: false,
  });
  await fs.writeFile(path.join(DIST, "index.html"), minified);
  console.log(`  index.html  ${(Buffer.byteLength(minified) / 1024).toFixed(1)} KB`);
}

async function main() {
  console.log("Building Halide for production...");
  await clean();
  const cssFile = await buildCss();
  const jsFile = await buildJs();
  await buildHtml(cssFile, jsFile);
  console.log("Done. Output in /dist — filenames are content-hashed, so they can be cached as immutable.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
