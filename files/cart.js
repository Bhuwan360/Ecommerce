// ============================================================
// views/cart.js — full cart page (the drawer covers the quick
// view; this is the dedicated page for reviewing an order).
// ============================================================

import { formatCurrency, frameArt } from "../utils.js";
import { cart } from "../store.js";

function line(l) {
  return `
    <div class="cart-line">
      <div class="cart-line-art">${frameArt(l.product.category, l.product.id.length)}</div>
      <div>
        <p class="cart-line-name"><a href="#/product/${l.product.id}">${l.product.name}</a></p>
        <p class="cart-line-meta">${l.product.kicker}</p>
        <div class="cart-line-qty">
          <button type="button" data-qty-down="${l.product.id}" aria-label="Decrease quantity">−</button>
          <span>${l.qty}</span>
          <button type="button" data-qty-up="${l.product.id}" aria-label="Increase quantity">+</button>
        </div>
        <button class="cart-line-remove" type="button" data-remove="${l.product.id}">Remove</button>
      </div>
      <p class="cart-line-price">${formatCurrency(l.product.price * l.qty)}</p>
    </div>`;
}

export function renderCartPage() {
  const main = document.getElementById("main");
  const lines = cart.lines;
  const shipping = lines.length ? 650 : 0;
  const subtotal = cart.subtotal;
  const total = subtotal + shipping;

  main.innerHTML = `
    <div class="wrap cart-page-grid">
      <section>
        <div class="section-head" style="margin-bottom: var(--sp-4);">
          <h1 class="section-title">Your bag</h1>
          <span class="section-count">${lines.length} item${lines.length === 1 ? "" : "s"}</span>
        </div>
        ${
          lines.length
            ? lines.map(line).join("")
            : `<p class="cart-empty">Your bag is empty. <a href="#/catalog">Browse the catalog</a> to add something.</p>`
        }
      </section>
      <aside class="summary-panel">
        <div class="summary-row"><span>Subtotal</span><span>${formatCurrency(subtotal)}</span></div>
        <div class="summary-row"><span>Shipping</span><span>${shipping ? formatCurrency(shipping) : "—"}</span></div>
        <div class="summary-row total"><span>Total</span><span>${formatCurrency(total)}</span></div>
        <button class="btn btn-primary btn-block" style="margin-top: var(--sp-4);" ${lines.length ? "" : "disabled"} id="checkoutBtn">
          Checkout
        </button>
        <p class="footer-note" style="margin-top: var(--sp-3);">This is a capstone demo — checkout doesn't process a real order.</p>
      </aside>
    </div>
  `;

  main.querySelectorAll("[data-qty-up]").forEach((btn) =>
    btn.addEventListener("click", () => {
      const id = btn.dataset.qtyUp;
      cart.setQty(id, (cart.items[id] || 0) + 1);
      renderCartPage();
    })
  );
  main.querySelectorAll("[data-qty-down]").forEach((btn) =>
    btn.addEventListener("click", () => {
      const id = btn.dataset.qtyDown;
      cart.setQty(id, (cart.items[id] || 0) - 1);
      renderCartPage();
    })
  );
  main.querySelectorAll("[data-remove]").forEach((btn) =>
    btn.addEventListener("click", () => {
      cart.remove(btn.dataset.remove);
      renderCartPage();
    })
  );
  const checkoutBtn = document.getElementById("checkoutBtn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      document.dispatchEvent(new CustomEvent("halide:toast", { detail: "This demo doesn't process real orders." }));
    });
  }
}
