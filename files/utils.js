// ============================================================
// utils.js — small, dependency-free helpers shared across views.
// Kept framework-free on purpose: the whole app is under 30KB
// of source before minification, so a framework would cost more
// than it would save.
// ============================================================

const currencyFmt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function formatCurrency(cents) {
  return currencyFmt.format(cents / 100);
}

export function debounce(fn, wait = 180) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

export function qs(sel, root = document) {
  return root.querySelector(sel);
}

export function qsa(sel, root = document) {
  return Array.from(root.querySelectorAll(sel));
}

/**
 * Builds a small element from an HTML string. Used sparingly —
 * most views build markup with template strings and set it via
 * innerHTML in one shot, which is cheap for a catalog this size
 * and avoids a virtual-DOM dependency entirely.
 */
export function fragmentFrom(html) {
  const tpl = document.createElement("template");
  tpl.innerHTML = html.trim();
  return tpl.content;
}

/**
 * Deterministic per-category SVG art, generated at runtime instead
 * of shipping product photography. This keeps the entire catalog's
 * asset weight near zero — no image requests, no CDN, nothing to
 * lazy-load — while still giving every card a distinct mark.
 * Each category gets one hand-tuned motif; products within a
 * category vary only by accent index so the grid still reads as
 * a catalog rather than a repeated icon.
 */
const CATEGORY_ART = {
  film: (accent) => `
    <svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
      <rect width="160" height="120" fill="#1B1712"/>
      <rect x="14" y="18" width="132" height="84" fill="none" stroke="${accent}" stroke-width="2"/>
      <rect x="30" y="34" width="100" height="52" fill="${accent}" opacity="0.18"/>
      ${[0,1,2,3,4,5].map(i => `<rect x="${20 + i*22}" y="10" width="10" height="6" fill="${accent}"/><rect x="${20 + i*22}" y="104" width="10" height="6" fill="${accent}"/>`).join("")}
    </svg>`,
  cameras: (accent) => `
    <svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
      <rect width="160" height="120" fill="#1B1712"/>
      <rect x="26" y="42" width="108" height="56" fill="none" stroke="${accent}" stroke-width="2"/>
      <rect x="60" y="28" width="28" height="16" fill="none" stroke="${accent}" stroke-width="2"/>
      <circle cx="80" cy="70" r="20" fill="none" stroke="${accent}" stroke-width="2"/>
      <circle cx="80" cy="70" r="8" fill="${accent}" opacity="0.5"/>
      <rect x="112" y="50" width="12" height="8" fill="${accent}"/>
    </svg>`,
  chemistry: (accent) => `
    <svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
      <rect width="160" height="120" fill="#1B1712"/>
      <path d="M70 20 h20 v28 l22 44 a8 8 0 0 1 -7 12 H55 a8 8 0 0 1 -7 -12 l22 -44 Z" fill="none" stroke="${accent}" stroke-width="2"/>
      <path d="M58 78 h44" stroke="${accent}" stroke-width="2"/>
      <circle cx="66" cy="60" r="2.4" fill="${accent}"/>
      <circle cx="90" cy="66" r="2" fill="${accent}"/>
      <circle cx="76" cy="52" r="1.6" fill="${accent}"/>
    </svg>`,
  paper: (accent) => `
    <svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
      <rect width="160" height="120" fill="#1B1712"/>
      <rect x="44" y="16" width="72" height="90" fill="none" stroke="${accent}" stroke-width="2"/>
      <rect x="54" y="30" width="52" height="34" fill="${accent}" opacity="0.16"/>
      <line x1="54" y1="76" x2="106" y2="76" stroke="${accent}" stroke-width="1.4"/>
      <line x1="54" y1="86" x2="94" y2="86" stroke="${accent}" stroke-width="1.4"/>
    </svg>`,
  accessories: (accent) => `
    <svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
      <rect width="160" height="120" fill="#1B1712"/>
      <circle cx="80" cy="60" r="30" fill="none" stroke="${accent}" stroke-width="2"/>
      <circle cx="80" cy="60" r="14" fill="none" stroke="${accent}" stroke-width="2"/>
      <line x1="80" y1="16" x2="80" y2="28" stroke="${accent}" stroke-width="2"/>
      <line x1="80" y1="92" x2="80" y2="104" stroke="${accent}" stroke-width="2"/>
    </svg>`,
};

const ACCENTS = ["#C8631E", "#7C8A6B", "#B8814A", "#8A8172"];

export function frameArt(category, seed = 0) {
  const build = CATEGORY_ART[category] || CATEGORY_ART.accessories;
  const accent = ACCENTS[seed % ACCENTS.length];
  return build(accent);
}

export function sprocketRow(count = 10) {
  return `<div class="sprocket-row" aria-hidden="true">${"<span></span>".repeat(count)}</div>`;
}
