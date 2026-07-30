import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import StarRating from "../components/StarRating.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { SkeletonGrid } from "../components/SkeletonCard.jsx";
import { getProduct } from "../api.js";
import { useCart } from "../context/CartContext.jsx";
import { useWishlist } from "../context/WishlistContext.jsx";
import { trackRecentlyViewed } from "../recentlyViewed.js";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setProduct(null);
    setActiveImg(0);
    setQty(1);
    getProduct(id).then((data) => {
      setProduct(data);
      trackRecentlyViewed(data);
    });
  }, [id]);

  if (!product)
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-10 animate-pulse">
        <div className="aspect-square rounded-2xl bg-surface2" />
        <div className="space-y-4">
          <div className="h-4 w-24 bg-surface2 rounded" />
          <div className="h-8 w-3/4 bg-surface2 rounded" />
          <div className="h-4 w-40 bg-surface2 rounded" />
          <div className="h-10 w-48 bg-surface2 rounded" />
          <div className="h-20 w-full bg-surface2 rounded" />
        </div>
      </div>
    );

  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const wishlisted = isWishlisted(product.id);

  const handleAdd = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-xs text-muted mb-4">
        <Link to="/" className="hover:text-accent-400">Home</Link> /{" "}
        <Link to={`/category/${product.category}`} className="hover:text-accent-400">{product.category}</Link> /{" "}
        <span className="text-ink">{product.title}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Images */}
        <div>
          <div className="aspect-square rounded-2xl overflow-hidden bg-surface border border-border shadow-card mb-3 relative">
            <img src={product.images[activeImg]} alt={product.title} className="w-full h-full object-cover" />
            <button
              onClick={() => toggleWishlist(product)}
              className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center text-xl backdrop-blur-sm ${
                wishlisted ? "bg-magenta-500 text-white" : "bg-black/40 text-white hover:bg-black/60"
              }`}
            >
              {wishlisted ? "♥" : "♡"}
            </button>
          </div>
          <div className="flex gap-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
                  activeImg === i ? "border-accent-500" : "border-transparent"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-wide text-accent-400 font-semibold">{product.brand}</span>
            {product.isBestseller && (
              <span className="bg-accent-500 text-ink text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                Bestseller
              </span>
            )}
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-semibold mt-1 mb-3 text-ink">{product.title}</h1>
          <StarRating rating={product.rating} count={product.numReviews} size="text-base" />

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-semibold text-ink">₹{product.price.toLocaleString()}</span>
            {product.mrp > product.price && (
              <>
                <span className="text-muted line-through">₹{product.mrp.toLocaleString()}</span>
                <span className="text-accent-400 font-semibold text-sm">{discount}% off</span>
              </>
            )}
          </div>
          <p className="text-xs text-muted mt-1">Inclusive of all taxes</p>

          <p className="mt-6 text-ink/80 leading-relaxed">{product.description}</p>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center border border-border rounded-full">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-2 text-lg text-ink" aria-label="Decrease quantity">−</button>
              <span className="px-3 min-w-[2ch] text-center text-ink">{qty}</span>
              <button onClick={() => setQty((q) => Math.min(product.stock, q + 1))} className="px-3 py-2 text-lg text-ink" aria-label="Increase quantity">+</button>
            </div>
            <span className={`text-sm ${product.stock <= 15 ? "text-magenta-400 font-medium" : "text-muted"}`}>
              {product.stock > 0
                ? product.stock <= 15
                  ? `Only ${product.stock} left in stock — order soon`
                  : `${product.stock} in stock`
                : "Out of stock"}
            </span>
          </div>

          <div className="mt-6 hidden sm:flex gap-3">
            <button
              onClick={handleAdd}
              className="flex-1 bg-accent-500 hover:bg-accent-400 text-ink font-semibold py-3 rounded-full transition-colors"
            >
              {added ? "Added ✓" : "Add to Cart"}
            </button>
            <Link
              to="/cart"
              onClick={() => addToCart(product, qty)}
              className="flex-1 text-center bg-amber-500 hover:bg-amber-400 text-ink font-semibold py-3 rounded-full transition-colors"
            >
              Buy Now
            </Link>
          </div>

          <div className="mt-8 border-t border-border pt-6 grid grid-cols-2 gap-4 text-sm text-muted">
            <div>🚚 Free delivery on orders above ₹500</div>
            <div>↩️ 7-day easy returns</div>
            <div>🔒 Secure payment</div>
            <div>🏷️ 1-year warranty included</div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-16 border-t border-border pt-10">
        <h2 className="font-display text-2xl font-semibold mb-6 text-ink">Customer Reviews</h2>
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-4xl font-semibold text-ink">{product.rating.toFixed(1)}</span>
              <div>
                <StarRating rating={product.rating} size="text-sm" />
                <p className="text-xs text-muted mt-1">{product.numReviews.toLocaleString()} ratings</p>
              </div>
            </div>
            <div className="space-y-1.5">
              {product.ratingBreakdown?.map((row) => (
                <div key={row.star} className="flex items-center gap-2 text-xs text-muted">
                  <span className="w-8">{row.star} ★</span>
                  <div className="flex-1 h-2 rounded-full bg-surface2 overflow-hidden">
                    <div className="h-full bg-amber-400" style={{ width: `${row.percent}%` }} />
                  </div>
                  <span className="w-8 text-right">{row.percent}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 space-y-5">
            {product.reviews?.map((r) => (
              <div key={r.id} className="border-b border-border pb-5 last:border-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-accent-500/20 text-accent-400 flex items-center justify-center text-xs font-bold">
                      {r.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-ink">{r.name}</p>
                      <StarRating rating={r.rating} size="text-xs" />
                    </div>
                  </div>
                  <span className="text-xs text-muted">{r.date}</span>
                </div>
                {r.verified && (
                  <span className="text-[10px] text-accent-400 font-semibold uppercase tracking-wide">
                    Verified Purchase
                  </span>
                )}
                <p className="text-sm text-ink/80 mt-1.5">{r.text}</p>
                <p className="text-xs text-muted mt-1.5">👍 {r.helpfulCount} people found this helpful</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {product.related?.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-2xl font-semibold mb-4 text-ink">You may also like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {product.related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Sticky mobile action bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-surface border-t border-border p-3 flex gap-3">
        <button
          onClick={handleAdd}
          className="flex-1 bg-accent-500 text-ink font-semibold py-3 rounded-full"
        >
          {added ? "Added ✓" : "Add to Cart"}
        </button>
        <Link
          to="/cart"
          onClick={() => addToCart(product, qty)}
          className="flex-1 text-center bg-amber-500 text-ink font-semibold py-3 rounded-full"
        >
          Buy Now
        </Link>
      </div>
      <div className="sm:hidden h-20" />
    </div>
  );
}
