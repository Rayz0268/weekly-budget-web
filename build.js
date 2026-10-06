#!/usr/bin/env node
/*
 * Build: pre-compiles src/app.jsx -> public/app.js (and the APK copy when present)
 * so the browser no longer ships/runs babel.js at runtime.
 * Also stamps a cache-busting version into index.html (?v=) and sw.js.
 *
 * Run: node build.js        (Node at ~/dev-tools/node/bin)
 */
const fs = require("fs");
const path = require("path");
const Babel = require(path.join(__dirname, "tools", "babel.js"));

const ver = Date.now().toString(36);

function compile(srcFile, outFile) {
  const src = fs.readFileSync(srcFile, "utf8");
  const out = Babel.transform(src, { presets: ["react"] }).code;
  fs.writeFileSync(outFile, out);
  console.log("compiled", path.relative(__dirname, srcFile), "->", outFile, `(${(out.length / 1024).toFixed(0)} KB)`);
}

// Stamp the cache-busting version onto our OWN bundle only.
// Must stay anchored to src="…": a looser /app\.js"/ also matches the Firebase CDN
// import (…/firebase-app.js), and a query string there loads a SECOND copy of the
// module, so getAuth(app) throws "Component auth has not been registered yet".
function stampVersion(htmlFile) {
  const html = fs.readFileSync(htmlFile, "utf8");
  const out = html.replace(/src="app\.js(\?v=[\w-]*)?"/g, `src="app.js?v=${ver}"`);
  if (out === html) throw new Error(`no src="app.js" tag to stamp in ${htmlFile}`);
  if (/gstatic\.com\/[^"]*\?v=/.test(out)) throw new Error(`stamp leaked into a CDN import in ${htmlFile}`);
  fs.writeFileSync(htmlFile, out);
}

// --- web app ---
compile(path.join(__dirname, "src", "app.jsx"), path.join(__dirname, "public", "app.js"));
stampVersion(path.join(__dirname, "public", "index.html"));
const sw = fs.readFileSync(path.join(__dirname, "src", "sw.js"), "utf8").replace("__VERSION__", ver);
fs.writeFileSync(path.join(__dirname, "public", "sw.js"), sw);
console.log("stamped version", ver);

// --- APK webapp (compiled separately from its own source) ---
const apkSrc = path.join(process.env.HOME, "budget_webview_apk", "src", "app.jsx");
const apkAssets = path.join(process.env.HOME, "budget_webview_apk", "app", "src", "main", "assets");
if (fs.existsSync(apkSrc)) {
  compile(apkSrc, path.join(apkAssets, "app.js"));
  stampVersion(path.join(apkAssets, "index.html"));
}
