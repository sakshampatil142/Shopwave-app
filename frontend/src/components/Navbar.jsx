import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useWishlist } from "../context/WishlistContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { getCategories } from "../api.js";

export default function Navbar() {
  const { totalItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(setCategories).catch(() => {});
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(query.trim() ? `/search?q=${encodeURIComponent(query.trim())}` : "/search");
  };

  return (
    <header className="sticky top-0 z-40">
      {/* Row 1 — logo, delivery, search, account/orders, cart */}
      <div className="bg-navy-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center gap-4">
          <Link to="/" className="flex items-center gap-1 shrink-0 border border-transparent hover:border-white/60 rounded p-1">
            <span className="font-display text-xl font-bold tracking-tight text-white">
              Shop<span className="text-accent-500">Wave</span>
            </span>
          </Link>

          <div className="hidden lg:flex flex-col leading-tight text-xs shrink-0 border border-transparent hover:border-white/60 rounded p-1 cursor-pointer">
            <span className="text-gray-300">Delivering to Pune 411005</span>
            <span className="font-bold text-white">📍 Update location</span>
          </div>

          <form onSubmit={handleSearch} className="flex-1 flex max-w-3xl">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for products, brands and more"
              className="w-full rounded-l-md px-4 py-2 bg-white text-ink placeholder:text-muted text-sm focus:outline-none focus-visible:outline-none"
            />
            <button
              type="submit"
              className="bg-accent-500 hover:bg-accent-400 px-4 rounded-r-md text-ink font-semibold text-sm transition-colors"
              aria-label="Search"
            >
              🔍
            </button>
          </form>

          <Link
            to={user ? "/orders" : "/login"}
            className="hidden sm:flex flex-col leading-tight text-xs shrink-0 border border-transparent hover:border-white/60 rounded p-1"
          >
            <span className="text-gray-300">{user ? `Hello, ${user.name.split(" ")[0]}` : "Hello, sign in"}</span>
            <span className="font-bold text-white">Account &amp; Orders</span>
          </Link>

          <Link
            to="/wishlist"
            className="relative flex items-center gap-1.5 shrink-0 text-sm font-medium text-white border border-transparent hover:border-white/60 rounded p-1"
          >
            <span className="text-xl leading-none">♡</span>
            <span className="hidden sm:inline">Wishlist</span>
            {wishlistItems.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-accent-500 text-ink text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            className="relative flex items-end gap-1.5 shrink-0 text-sm font-medium text-white border border-transparent hover:border-white/60 rounded p-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 1.994-4.708 2.602-7.202.376-1.541-.837-3.048-2.437-3.048H5.106M7.5 14.25L5.106 5.25M7.5 14.25L5.25 18M14.25 18a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0" />
            </svg>
            <span className="hidden sm:inline font-bold">Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent-500 text-ink text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Row 2 — category links */}
      <nav className="bg-navy-700 text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-5 overflow-x-auto">
          <Link to="/" className="font-semibold hover:text-accent-400 whitespace-nowrap flex items-center gap-1">
            <span>☰</span> All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/category/${encodeURIComponent(cat)}`}
              className="hover:text-accent-400 whitespace-nowrap"
            >
              {cat}
            </Link>
          ))}
          <Link to="/deals" className="hover:text-accent-400 whitespace-nowrap font-semibold text-accent-500 ml-auto">
            🔥 Today's Deals
          </Link>
        </div>
      </nav>
    </header>
  );
}
