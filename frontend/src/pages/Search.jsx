import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import Filters from "../components/Filters.jsx";
import { SkeletonGrid } from "../components/SkeletonCard.jsx";
import { getProducts } from "../api.js";

export default function Search() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProducts({
      search: q,
      limit: 60,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      minRating: filters.minRating,
      brand: filters.brands?.length ? filters.brands.join(",") : undefined,
    })
      .then((data) => setProducts(data.products))
      .finally(() => setLoading(false));
  }, [q, filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-display text-2xl font-semibold mb-1 text-ink">Results for "{q}"</h1>
      <p className="text-muted text-sm mb-6">{products.length} products found</p>

      <div className="flex flex-col lg:flex-row gap-8">
        <Filters filters={filters} onChange={setFilters} />
        <div className="flex-1">
          {loading && <SkeletonGrid count={8} />}
          {!loading && products.length === 0 && (
            <p className="text-muted py-20 text-center">
              No products matched your search. Try a different keyword.
            </p>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
