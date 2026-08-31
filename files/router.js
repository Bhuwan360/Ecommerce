// ============================================================
// router.js — minimal client-side hash router.
// Hash-based on purpose: it needs zero server configuration to
// deploy (no rewrite rules for deep links), which keeps the
// Vercel config to a static file server plus cache headers.
// ============================================================

const routes = []; // { pattern: RegExp, keys: string[], render: fn }

function toRegExp(path) {
  const keys = [];
  const pattern = path
    .replace(/\/+$/, "")
    .split("/")
    .filter(Boolean)
    .map((seg) => {
      if (seg.startsWith(":")) {
        keys.push(seg.slice(1));
        return "([^/]+)";
      }
      return seg.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    })
    .join("/");
  return { regexp: new RegExp(`^/${pattern}/?$`), keys };
}

export function route(path, render) {
  const { regexp, keys } = toRegExp(path);
  routes.push({ regexp, keys, render });
}

function currentPath() {
  const hash = location.hash.slice(1); // drop '#'
  return hash ? hash : "/";
}

async function resolve() {
  const path = currentPath().split("?")[0];
  for (const r of routes) {
    const match = path.match(r.regexp);
    if (match) {
      const params = {};
      r.keys.forEach((key, i) => (params[key] = decodeURIComponent(match[i + 1])));
      await r.render(params);
      document.getElementById("main").focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
      return;
    }
  }
  routes.notFound?.(path);
}

export function notFound(render) {
  routes.notFound = render;
}

export function startRouter() {
  window.addEventListener("hashchange", resolve);
  window.addEventListener("DOMContentLoaded", resolve);
  if (document.readyState !== "loading") resolve();
}

export function navigate(path) {
  location.hash = path;
}
