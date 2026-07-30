import React, { useEffect, useState } from "react";
import { getBrands } from "../api.js";

export default function Filters({ filters, onChange }) {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    getBrands().then(setBrands).catch(() => {});
  }, []);

  const toggleBrand = (brand) => {
    const current = filters.brands || [];
    const next = current.includes(brand) ? current.filter((b) => b !== brand) : [...current, brand];
    onChange({ ...filters, brands: next });
  };

  return (
    <aside className="w-full lg:w-56 shrink-0 space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-ink mb-3">Price</h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice || ""}
            onChange={(e) => onChange({ ...filters, minPrice: e.target.value })}
            className="w-full bg-surface2 border border-border rounded-lg px-2 py-1.5 text-sm text-ink placeholder:text-muted"
          />
          <span className="text-muted">–</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice || ""}
            onChange={(e) => onChange({ ...filters, maxPrice: e.target.value })}
            className="w-full bg-surface2 border border-border rounded-lg px-2 py-1.5 text-sm text-ink placeholder:text-muted"
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-ink mb-3">Customer Rating</h3>
        <div className="space-y-1.5">
          {[4, 3, 2].map((r) => (
            <label key={r} className="flex items-center gap-2 text-sm text-muted cursor-pointer">
              <input
                type="radio"
                name="minRating"
                checked={String(filters.minRating) === String(r)}
                onChange={() => onChange({ ...filters, minRating: r })}
              />
              <span className="text-amber-400">{"★".repeat(r)}</span>
              <span>&amp; up</span>
            </label>
          ))}
          {filters.minRating && (
            <button
              onClick={() => onChange({ ...filters, minRating: undefined })}
              className="text-xs text-accent-400 hover:underline"
            >
              Clear rating filter
            </button>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-ink mb-3">Brand</h3>
        <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
          {brands.map((b) => (
            <label key={b} className="flex items-center gap-2 text-sm text-muted cursor-pointer">
              <input
                type="checkbox"
                checked={(filters.brands || []).includes(b)}
                onChange={() => toggleBrand(b)}
              />
              {b}
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={() => onChange({})}
        className="text-xs font-medium text-accent-400 hover:underline"
      >
        Clear all filters
      </button>
    </aside>
  );
}
