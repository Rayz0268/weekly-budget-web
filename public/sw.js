/* Service worker — instant loads + full offline for the installed app.
 * VERSION is stamped by build.js; a new deploy = new cache, old ones are purged.
 * Firebase/gstatic requests pass straight through (the SDK handles its own offline). */
const VERSION = "muw719qe";
const CACHE = "weekly-budget-" + VERSION;
const ASSETS = ["./", "app.js?v=" + VERSION, "react.js", "react-dom.js", "manifest.webmanifest",
  "favicon.svg", "favicon.png", "icon-192.png", "icon-512.png", "apple-touch-icon.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin) return;
  // Navigations: network-first so new deploys arrive immediately; cache keeps it working offline.
  // `cache: "no-cache"` forces revalidation of the shell — without it the browser's own HTTP
  // cache can hand back a stale index.html here and pin the app to an old bundle.
  if (e.request.mode === "navigate") {
    e.respondWith(fetch(e.request, { cache: "no-cache" })
      .then((r) => { const copy = r.clone(); caches.open(CACHE).then((c) => c.put("./", copy)); return r; })
      .catch(() => caches.match("./")));
    return;
  }
  // Static assets are versioned (?v=) — cache-first is safe and instant.
  e.respondWith(caches.match(e.request).then((hit) => hit || fetch(e.request).then((r) => {
    if (r.ok) { const copy = r.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); }
    return r;
  })));
});
