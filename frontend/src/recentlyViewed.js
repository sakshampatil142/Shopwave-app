const STORAGE_KEY = "shopwave_recently_viewed";
const MAX_ITEMS = 10;

export function trackRecentlyViewed(product) {
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const filtered = existing.filter((p) => p.id !== product.id);
    const entry = {
      id: product.id,
      title: product.title,
      price: product.price,
      mrp: product.mrp,
      rating: product.rating,
      brand: product.brand,
      images: product.images,
    };
    const updated = [entry, ...filtered].slice(0, MAX_ITEMS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // ignore storage errors
  }
}

export function getRecentlyViewed(excludeId) {
  try {
    const items = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return excludeId ? items.filter((p) => p.id !== Number(excludeId)) : items;
  } catch {
    return [];
  }
}
