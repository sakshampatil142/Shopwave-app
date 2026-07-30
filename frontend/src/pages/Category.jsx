import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import Filters from "../components/Filters.jsx";
import { SkeletonGrid } from "../components/SkeletonCard.jsx";
import { getProducts } from "../api.js";

export default function Category() {
  const { name } = useParams();
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("");
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProducts({
      category: name,
      sort,
      limit: 60,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      minRating: filters.minRating,
      brand: filters.brands?.length ? filters.brands.join(",") : undefined,
    })
      .then((data) => setProducts(data.products))
      .finally(() => setLoading(false));
  }, [name, sort, filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl font-semibold text-ink">{name}</h1>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-border rounded-full px-4 py-2 text-sm bg-surface text-ink"
        >
          <option value="">Sort: Featured</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Avg. Customer Rating</option>
          <option value="newest">Newest First</option>
        </select>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <Filters filters={filters} onChange={setFilters} />

        <div className="flex-1">
          {loading && <SkeletonGrid count={8} />}
          {!loading && products.length === 0 && (
            <p className="text-muted py-20 text-center">No products found matching these filters.</p>
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
