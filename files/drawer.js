// ============================================================
// views/drawer.js — the slide-out quick-view cart, independent
// of the full cart page so adding an item never loses your place
// in the catalog.
// ============================================================

import { formatCurrency, frameArt } from "../utils.js";
import { cart } from "../store.js";

export function renderDrawer() {
  const body = document.getElementById("cartBody");
  const foot = document.getElementById("cartFoot");
  const lines = cart.lines;

  body.innerHTML = lines.length
    ? lines
        .map(
          (l) => `
      <div class="cart-line">
        <div class="cart-line-art">${frameArt(l.product.category, l.product.id.length)}</div>
        <div>
          <p class="cart-line-name">${l.product.name}</p>
          <p class="cart-line-meta">${l.qty} × ${formatCurrency(l.product.price)}</p>
        </div>
        <p class="cart-line-price">${formatCurrency(l.product.price * l.qty)}</p>
      </div>`
        )
        .join("")
    : `<p class="cart-empty">Your bag is empty.</p>`;

  foot.innerHTML = `
    <div class="summary-row total"><span>Subtotal</span><span>${formatCurrency(cart.subtotal)}</span></div>
    <a class="btn btn-primary btn-block" href="#/cart" style="margin-top: var(--sp-3);">View bag</a>
  `;
}
