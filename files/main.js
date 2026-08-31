// ============================================================
// main.js — application entry point.
// Wires the router to views, the cart store to the header/drawer,
// and the small pieces of global UI (search, drawer open/close,
// toast) that don't belong to any one view.
// ============================================================

import { route, notFound, startRouter, navigate } from "./router.js";
import { renderHome, renderCategory, renderSearch } from "./views/catalog.js";
import { renderProduct } from "./views/product.js";
import { renderCartPage } from "./views/cart.js";
import { renderDrawer } from "./views/drawer.js";
import { cart } from "./store.js";
import { debounce } from "./utils.js";

// ---- Routes ----
route("/", renderHome);
route("/catalog", renderHome);
route("/catalog/:slug", renderCategory);
route("/product/:id", renderProduct);
route("/cart", renderCartPage);
notFound((path) => {
  document.getElementById("main").innerHTML = `
    <div class="wrap">
      <div class="empty-state">
        <h3>Page not found</h3>
        <p>“${path}” doesn't match anything in the catalog. <a href="#/">Back home</a>.</p>
      </div>
    </div>`;
});

// ---- Nav active-state ----
function markActiveNav() {
  const path = location.hash.slice(1) || "/";
  document.querySelectorAll(".primary-nav a").forEach((a) => {
    const target = a.getAttribute("href").slice(1);
    a.classList.toggle("is-active", path === target || (target !== "/" && path.startsWith(target)));
  });
}
window.addEventListener("hashchange", markActiveNav);
window.addEventListener("DOMContentLoaded", markActiveNav);

// ---- Add-to-cart delegation (grid cards use data attributes so
// re-rendering a view never leaves orphaned listeners behind) ----
document.getElementById("main").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-add-to-cart]");
  if (!btn) return;
  const id = btn.dataset.addToCart;
  cart.add(id, 1);
  btn.classList.add("is-added");
  btn.textContent = "✓";
  document.dispatchEvent(new CustomEvent("halide:toast", { detail: "Added to bag" }));
});

// ---- Cart count + drawer ----
function updateCartCount() {
  document.getElementById("cartCount").textContent = cart.count;
}
cart.onChange(() => {
  updateCartCount();
  renderDrawer();
});
updateCartCount();

const drawer = document.getElementById("cartDrawer");
const scrim = document.getElementById("drawerScrim");

function openDrawer() {
  renderDrawer();
  drawer.hidden = false;
  scrim.hidden = false;
  document.getElementById("cartToggle").setAttribute("aria-expanded", "true");
  document.getElementById("cartClose").focus();
}
function closeDrawer() {
  drawer.hidden = true;
  scrim.hidden = true;
  document.getElementById("cartToggle").setAttribute("aria-expanded", "false");
}
document.getElementById("cartToggle").addEventListener("click", openDrawer);
document.getElementById("cartClose").addEventListener("click", closeDrawer);
scrim.addEventListener("click", closeDrawer);
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !drawer.hidden) closeDrawer();
});

// ---- Search ----
const searchToggle = document.getElementById("searchToggle");
const searchBar = document.getElementById("searchBar");
const searchInput = document.getElementById("searchInput");

searchToggle.addEventListener("click", () => {
  const willShow = searchBar.hidden;
  searchBar.hidden = !willShow;
  searchToggle.setAttribute("aria-expanded", String(willShow));
  if (willShow) searchInput.focus();
});

const runSearch = debounce((value) => {
  if (value.trim()) navigate(`/search?q=${encodeURIComponent(value)}`);
});
searchInput.addEventListener("input", (e) => runSearch(e.target.value));
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && searchInput.value.trim()) {
    renderSearch(searchInput.value.trim());
  }
});

// search is handled outside the declarative router table since it
// reads a query string rather than a path segment
window.addEventListener("hashchange", () => {
  const [path, qs] = location.hash.slice(1).split("?");
  if (path === "/search" && qs) {
    const q = new URLSearchParams(qs).get("q") || "";
    searchInput.value = q;
    renderSearch(q);
  }
});

// ---- Toast ----
let toastTimer;
const toastEl = document.createElement("div");
toastEl.className = "toast";
toastEl.setAttribute("role", "status");
document.body.appendChild(toastEl);

document.addEventListener("halide:toast", (e) => {
  toastEl.textContent = e.detail;
  toastEl.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("is-visible"), 2200);
});

// ---- Build stamp (informational, shows this is a static build) ----
document.getElementById("buildStamp").textContent = new Date().toISOString().slice(0, 10);

// ---- Go ----
startRouter();
