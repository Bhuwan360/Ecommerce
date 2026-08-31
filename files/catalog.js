// ============================================================
// views/catalog.js — home page, category listings, and search
// results. All three share one grid renderer.
// ============================================================

import { CATEGORIES, PRODUCTS, productsByCategory, searchProducts, getCategory } from "../data.js";
import { formatCurrency, frameArt, sprocketRow } from "../utils.js";
import { cart } from "../store.js";

function productCard(product, index) {
  const inCart = Boolean(cart.items[product.id]);
  return `
    <article class="product-card">
      <div class="frame-art">
        ${sprocketRow()}
        ${frameArt(product.category, index)}
      </div>
      <div class="product-card-body">
        <p class="product-kicker">${product.kicker}</p>
        <h3 class="product-name"><a href="#/product/${product.id}">${product.name}</a></h3>
        <p class="product-blurb">${product.blurb}</p>
      </div>
      <div class="product-card-foot">
        <p class="product-price">
          ${product.was ? `<span class="was">${formatCurrency(product.was)}</span>` : ""}
          ${formatCurrency(product.price)}
        </p>
        <button
          class="add-btn${inCart ? " is-added" : ""}"
          data-add-to-cart="${product.id}"
          aria-label="Add ${product.name} to bag"
          title="Add to bag"
        >${inCart ? "✓" : "+"}</button>
      </div>
      ${product.stock <= 3 ? `<p class="stock-badge low">${product.stock} left</p>` : `<p class="stock-badge">In stock</p>`}
    </article>`;
}

function grid(products) {
  if (products.length === 0) {
    return `
      <div class="empty-state">
        <h3>Nothing on this shelf</h3>
        <p>Try a different search term, or browse a category from the nav above.</p>
      </div>`;
  }
  return `<div class="product-grid">${products.map(productCard).join("")}</div>`;
}

function categoryRail(activeSlug) {
  return `
    <nav class="category-rail" aria-label="Categories">
      <a class="chip${!activeSlug ? " is-active" : ""}" href="#/catalog">All</a>
      ${CATEGORIES.map(
        (c) => `<a class="chip${c.slug === activeSlug ? " is-active" : ""}" href="#/catalog/${c.slug}">${c.label}</a>`
      ).join("")}
    </nav>`;
}

export function renderHome() {
  const main = document.getElementById("main");
  main.innerHTML = `
    <section class="hero">
      <div class="wrap hero-grid">
        <div>
          <h1 class="hero-heading">Supplies for people who still develop by hand.</h1>
          <p class="hero-lede">Film, cameras, chemistry, and paper — stocked for a working darkroom, not a display shelf. Everything ships in the box it was tested in.</p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="#/catalog/film">Shop film</a>
            <a class="btn btn-outline" href="#/catalog">Browse everything</a>
          </div>
        </div>
        <div class="spec-panel">
          <p class="spec-panel-title">CATALOG · AUG 2026</p>
          <dl>
            <div class="spec-row"><dt>Active listings</dt><dd>${PRODUCTS.length}</dd></div>
            <div class="spec-row"><dt>Categories</dt><dd>${CATEGORIES.length}</dd></div>
            <div class="spec-row"><dt>Formats</dt><dd>35mm · 120 · Instant</dd></div>
            <div class="spec-row"><dt>Ships</dt><dd>Domestic, 2–4 days</dd></div>
          </dl>
        </div>
      </div>
    </section>
    ${categoryRail(null)}
    <section class="section wrap">
      <div class="section-head">
        <h2 class="section-title">Full catalog</h2>
        <span class="section-count">${PRODUCTS.length} items</span>
      </div>
      ${grid(PRODUCTS)}
    </section>
  `;
}

export function renderCategory({ slug }) {
  const main = document.getElementById("main");
  const category = getCategory(slug);
  const products = productsByCategory(slug);

  if (!category) {
    main.innerHTML = `<div class="wrap"><div class="empty-state"><h3>Unknown category</h3><p>That shelf doesn't exist. <a href="#/catalog">Back to the full catalog</a>.</p></div></div>`;
    return;
  }

  main.innerHTML = `
    ${categoryRail(slug)}
    <section class="section wrap">
      <div class="section-head">
        <h2 class="section-title">${category.label}</h2>
        <span class="section-count">${products.length} items</span>
      </div>
      ${grid(products)}
    </section>
  `;
}

export function renderSearch(query) {
  const main = document.getElementById("main");
  const results = searchProducts(query);
  main.innerHTML = `
    <section class="section wrap">
      <div class="section-head">
        <h2 class="section-title">Results for “${query}”</h2>
        <span class="section-count">${results.length} items</span>
      </div>
      ${grid(results)}
    </section>
  `;
}
