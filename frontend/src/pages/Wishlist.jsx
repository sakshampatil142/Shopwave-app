import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import StarRating from "../components/StarRating.jsx";

export default function Wishlist() {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <div className="text-5xl mb-4">♡</div>
        <h1 className="font-display text-2xl font-semibold mb-3 text-ink">Your wishlist is empty</h1>
        <p className="text-muted mb-6">Tap the heart icon on any product to save it here.</p>
        <Link to="/" className="bg-accent-500 text-ink px-6 py-3 rounded-full font-semibold hover:bg-accent-400">
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="font-display text-2xl font-semibold mb-6 text-ink">
        Your Wishlist <span className="text-muted text-base font-normal">({items.length})</span>
      </h1>
      <div className="grid sm:grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-surface border border-border rounded-2xl p-4 flex gap-4">
            <Link to={`/product/${item.id}`} className="shrink-0">
              <img src={item.image} alt={item.title} className="w-24 h-24 rounded-lg object-cover" />
            </Link>
            <div className="flex-1 min-w-0 flex flex-col">
              <span className="text-xs uppercase tracking-wide text-accent-400 font-semibold">{item.brand}</span>
              <Link to={`/product/${item.id}`} className="font-medium text-ink hover:text-accent-400 line-clamp-2 mb-1">
                {item.title}
              </Link>
              <StarRating rating={item.rating || 0} size="text-xs" />
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-semibold text-ink">₹{item.price.toLocaleString()}</span>
                {item.mrp > item.price && (
                  <span className="text-xs text-muted line-through">₹{item.mrp.toLocaleString()}</span>
                )}
              </div>
              <div className="mt-auto flex gap-2 pt-2">
                <button
                  onClick={() => addToCart(item, 1)}
                  className="flex-1 bg-accent-500 hover:bg-accent-400 text-ink text-xs font-semibold py-2 rounded-full"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="px-3 rounded-full border border-border text-muted hover:text-magenta-400 hover:border-magenta-400 text-xs"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
