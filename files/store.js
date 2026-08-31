// ============================================================
// store.js — cart state.
// A tiny pub/sub store backed by localStorage. Kept independent
// of any view: views subscribe and re-render, they never own
// cart state themselves. This is the one piece of "modular
// architecture" that most needs to stay decoupled, since every
// view (grid, detail, drawer, cart page) touches it.
// ============================================================

import { getProduct } from "./data.js";

const STORAGE_KEY = "halide.cart.v1";

class CartStore extends EventTarget {
  constructor() {
    super();
    this.items = this.#load(); // { [productId]: quantity }
  }

  #load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  #persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
    } catch {
      /* storage unavailable (private mode, quota) — cart still
         works for the session, it just won't survive a reload */
    }
    this.dispatchEvent(new CustomEvent("change"));
  }

  add(productId, qty = 1) {
    this.items[productId] = (this.items[productId] || 0) + qty;
    this.#persist();
  }

  setQty(productId, qty) {
    if (qty <= 0) {
      delete this.items[productId];
    } else {
      this.items[productId] = qty;
    }
    this.#persist();
  }

  remove(productId) {
    delete this.items[productId];
    this.#persist();
  }

  clear() {
    this.items = {};
    this.#persist();
  }

  get lines() {
    return Object.entries(this.items)
      .map(([id, qty]) => ({ product: getProduct(id), qty }))
      .filter((l) => l.product);
  }

  get count() {
    return Object.values(this.items).reduce((sum, q) => sum + q, 0);
  }

  get subtotal() {
    return this.lines.reduce((sum, l) => sum + l.product.price * l.qty, 0);
  }

  onChange(handler) {
    this.addEventListener("change", handler);
    return () => this.removeEventListener("change", handler);
  }
}

export const cart = new CartStore();
