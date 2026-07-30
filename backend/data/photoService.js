// Fetches real stock photography from Pexels for every product, grouped
// by product type so we only make ~30 API calls (one per product type)
// instead of one per product.
//
// Requires a free Pexels API key: https://www.pexels.com/api/
// Set it as an environment variable before starting the backend:
//   export PEXELS_API_KEY=your_key_here
//   npm start
//
// Without a key, this is a no-op and products keep the generated SVG
// illustrations already assigned in products.js — the app still works,
// it just won't have real photos.

import products, { detectType, SEARCH_TERMS } from "./products.js";

const PEXELS_SEARCH_URL = "https://api.pexels.com/v1/search";

async function fetchPhotosFor(term, count) {
  const url = `${PEXELS_SEARCH_URL}?query=${encodeURIComponent(term)}&per_page=${Math.min(
    Math.max(count, 1),
    80
  )}`;
  const res = await fetch(url, {
    headers: { Authorization: process.env.PEXELS_API_KEY },
  });
  if (!res.ok) {
    throw new Error(`Pexels responded ${res.status} for "${term}"`);
  }
  const data = await res.json();
  return (data.photos || []).map((p) => p.src.large);
}

export async function loadRealProductPhotos() {
  if (!process.env.PEXELS_API_KEY) {
    console.log(
      "[photoService] No PEXELS_API_KEY set — using generated illustrations. " +
        "Set PEXELS_API_KEY to show real stock photos instead (see backend/data/photoService.js)."
    );
    return;
  }

  const groups = new Map();
  for (const p of products) {
    const type = detectType(p.title);
    if (!groups.has(type)) groups.set(type, []);
    groups.get(type).push(p);
  }

  console.log(`[photoService] Fetching real photos for ${groups.size} product types from Pexels...`);

  await Promise.all(
    Array.from(groups.entries()).map(async ([type, group]) => {
      const term = SEARCH_TERMS[type] || type;
      try {
        const urls = await fetchPhotosFor(term, group.length * 2);
        if (!urls.length) return;
        group.forEach((product, i) => {
          const start = (i * 2) % urls.length;
          product.images = [urls[start], urls[(start + 1) % urls.length]];
        });
      } catch (err) {
        console.error(`[photoService] Failed to fetch photos for "${term}":`, err.message);
        // That group just keeps its generated illustration — no crash.
      }
    })
  );

  console.log("[photoService] Done.");
}
