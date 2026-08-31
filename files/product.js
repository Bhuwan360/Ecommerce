// ============================================================
// views/product.js — single product detail page.
// ============================================================

import { getProduct, getCategory } from "../data.js";
import { formatCurrency, frameArt, sprocketRow } from "../utils.js";
import { cart } from "../store.js";

export function renderProduct({ id }) {
  const main = document.getElementById("main");
  const product = getProduct(id);

  if (!product) {
    main.innerHTML = `<div class="wrap"><div class="empty-state"><h3>Item not found</h3><p>That listing may have sold out permanently. <a href="#/catalog">Back to the catalog</a>.</p></div></div>`;
    return;
  }

  const category = getCategory(product.category);

  main.innerHTML = `
    <div class="wrap">
      <p class="breadcrumb">
        <a href="#/catalog">Catalog</a> /
        <a href="#/catalog/${category.slug}">${category.label}</a> /
        ${product.name}
      </p>
      <div class="detail-grid">
        <div class="detail-frame">
          ${sprocketRow(14)}
          ${frameArt(product.category, product.id.length)}
        </div>
        <div>
          <p class="detail-kicker">${product.kicker}</p>
          <h1 class="detail-title">${product.name}</h1>
          <p class="detail-price">
            ${product.was ? `<span class="was" style="text-decoration:line-through;color:var(--c-paper-faint);margin-right:.5em;">${formatCurrency(product.was)}</span>` : ""}
            ${formatCurrency(product.price)}
          </p>
          <p class="detail-copy">${product.blurb}</p>

          <div class="qty-row">
            <div class="qty-stepper">
              <button type="button" id="qtyDown" aria-label="Decrease quantity">−</button>
              <span id="qtyValue">1</span>
              <button type="button" id="qtyUp" aria-label="Increase quantity">+</button>
            </div>
            <button class="btn btn-primary" id="addToCartBtn">Add to bag</button>
          </div>
          <p class="stock-badge${product.stock <= 3 ? " low" : ""}" style="margin-top:.75rem;">
            ${product.stock <= 3 ? `Only ${product.stock} left` : "In stock, ships in 2–4 days"}
          </p>

          <dl class="spec-table">
            ${product.specs.map(([k, v]) => `<div class="spec-row"><dt>${k}</dt><dd>${v}</dd></div>`).join("")}
          </dl>
        </div>
      </div>
    </div>
  `;

  let qty = 1;
  const qtyValue = document.getElementById("qtyValue");
  document.getElementById("qtyDown").addEventListener("click", () => {
    qty = Math.max(1, qty - 1);
    qtyValue.textContent = qty;
  });
  document.getElementById("qtyUp").addEventListener("click", () => {
    qty = Math.min(product.stock, qty + 1);
    qtyValue.textContent = qty;
  });
  document.getElementById("addToCartBtn").addEventListener("click", () => {
    cart.add(product.id, qty);
    document.dispatchEvent(new CustomEvent("halide:toast", { detail: `Added ${qty} × ${product.name}` }));
  });
}
