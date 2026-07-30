import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import HeroCarousel from "../components/HeroCarousel.jsx";
import TrustBadges from "../components/TrustBadges.jsx";
import { SkeletonGrid } from "../components/SkeletonCard.jsx";
import { getProducts, getCategories, getDeals } from "../api.js";
import { getRecentlyViewed } from "../recentlyViewed.js";

const categoryIcons = {
  Electronics: "💻",
  Fashion: "👕",
  "Home & Kitchen": "🏠",
  Books: "📚",
  Beauty: "💄",
  Sports: "🏸",
  Toys: "🧸",
  Groceries: "🛒",
};

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [deals, setDeals] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getProducts({ limit: 60 }), getCategories(), getDeals()])
      .then(([p, c, d]) => {
        setProducts(p.products);
        setCategories(c);
        setDeals(d);
      })
      .finally(() => setLoading(false));
    setRecentlyViewed(getRecentlyViewed());
  }, []);

  const grouped = categories.map((cat) => ({
    category: cat,
    items: products.filter((p) => p.category === cat).slice(0, 4),
  }));

  return (
    <div>
      <HeroCarousel images={products.slice(0, 4)} />
      <TrustBadges />

      {/* Category quick nav */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-4 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/category/${encodeURIComponent(cat)}`}
              className="shrink-0 flex flex-col items-center gap-2 bg-surface hover:bg-surface2 border border-border rounded-2xl px-6 py-4 min-w-[110px] transition-colors"
            >
              <span className="text-3xl">{categoryIcons[cat] || "🛍️"}</span>
              <span className="text-xs text-ink font-medium text-center">{cat}</span>
            </Link>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 pb-10 space-y-14">
        {loading && (
          <div className="space-y-4">
            <div className="h-7 w-48 bg-surface2 rounded animate-pulse" />
            <SkeletonGrid count={4} />
          </div>
        )}

        {/* Deal of the day rail */}
        {!loading && deals.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="font-display text-2xl font-semibold text-ink">🔥 Today's Deals</h2>
              <span className="text-xs bg-amber-500 text-ink font-bold px-2 py-1 rounded-full">
                Limited time
              </span>
              <Link to="/deals" className="ml-auto text-accent-400 text-sm font-medium hover:underline">
                See all →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {deals.slice(0, 4).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        {!loading &&
          grouped.map(
            ({ category, items }) =>
              items.length > 0 && (
                <section key={category}>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-display text-2xl font-semibold text-ink">{category}</h2>
                    <Link
                      to={`/category/${encodeURIComponent(category)}`}
                      className="text-accent-400 text-sm font-medium hover:underline"
                    >
                      See all →
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                    {items.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                </section>
              )
          )}

        {/* Recently viewed */}
        {recentlyViewed.length > 0 && (
          <section>
            <h2 className="font-display text-2xl font-semibold text-ink mb-4">Recently Viewed</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {recentlyViewed.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
