import React from "react";
import { Link } from "react-router-dom";
import StarRating from "./StarRating.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useWishlist } from "../context/WishlistContext.jsx";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="group bg-surface rounded-2xl shadow-card hover:shadow-cardHover transition-shadow duration-200 overflow-hidden flex flex-col border border-border/60">
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-surface2">
        <img
          src={product.images[0]}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-amber-500 text-ink text-xs font-bold px-2 py-1 rounded-full">
            {discount}% OFF
          </span>
        )}
        {product.isBestseller && (
          <span className="absolute top-2 right-10 bg-accent-500 text-ink text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">
            Bestseller
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors ${
            wishlisted ? "bg-magenta-500 text-white" : "bg-black/40 text-white hover:bg-black/60"
          }`}
        >
          {wishlisted ? "♥" : "♡"}
        </button>
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <span className="text-xs uppercase tracking-wide text-accent-400 font-semibold mb-1">
          {product.brand}
        </span>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-sm leading-snug line-clamp-2 mb-2 text-ink hover:text-accent-400">
            {product.title}
          </h3>
        </Link>
        <StarRating rating={product.rating} count={product.numReviews} />
        {product.stock !== undefined && product.stock <= 15 && (
          <p className="text-xs text-magenta-400 font-medium mt-1">Only {product.stock} left</p>
        )}
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-semibold text-ink">₹{product.price.toLocaleString()}</span>
          {product.mrp > product.price && (
            <span className="text-xs text-muted line-through">₹{product.mrp.toLocaleString()}</span>
          )}
        </div>
        <button
          onClick={() => addToCart(product, 1)}
          className="mt-3 w-full py-2 rounded-full bg-accent-500 text-ink text-sm font-semibold hover:bg-accent-400 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
