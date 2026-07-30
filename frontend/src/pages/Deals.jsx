import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
import { getDeals } from "../api.js";

export default function Deals() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDeals().then(setDeals).finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-2">
        <h1 className="font-display text-3xl font-semibold text-ink">🔥 Today's Deals</h1>
        <span className="text-xs bg-amber-500 text-ink font-bold px-2 py-1 rounded-full">Limited time</span>
      </div>
      <p className="text-muted text-sm mb-6">Hand-picked discounts across every category.</p>

      {loading && <p className="text-muted py-20 text-center">Loading deals…</p>}
      {!loading && deals.length === 0 && (
        <p className="text-muted py-20 text-center">No active deals right now — check back soon.</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {deals.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
