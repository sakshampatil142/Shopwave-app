import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function Cart() {
  const { items, updateQty, removeFromCart, subtotal } = useCart();
  const navigate = useNavigate();
  const FREE_SHIPPING_THRESHOLD = 500;
  const shipping = subtotal > FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 49;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + tax;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-semibold mb-3 text-ink">Your cart is empty</h1>
        <p className="text-muted mb-6">Looks like you haven't added anything yet.</p>
        <Link to="/" className="bg-accent-500 text-ink px-6 py-3 rounded-full font-semibold hover:bg-accent-400">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-4">
        <h1 className="font-display text-2xl font-semibold mb-2 text-ink">Your Cart</h1>

        {remainingForFreeShipping > 0 ? (
          <div className="bg-surface border border-border rounded-2xl p-4">
            <p className="text-sm text-ink mb-2">
              Add <span className="text-accent-400 font-semibold">₹{remainingForFreeShipping.toLocaleString()}</span> more to get{" "}
              <span className="font-semibold">free delivery</span> 🚚
            </p>
            <div className="h-2 rounded-full bg-surface2 overflow-hidden">
              <div className="h-full bg-accent-500 transition-all" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        ) : (
          <div className="bg-accent-500/10 border border-accent-500/30 rounded-2xl p-4 text-sm text-accent-400 font-medium">
            🎉 Your order qualifies for free delivery!
          </div>
        )}
        {items.map((item) => (
          <div key={item.id} className="bg-surface border border-border rounded-2xl p-4 flex gap-4 items-center">
            <img src={item.image} alt={item.title} className="w-20 h-20 rounded-lg object-cover" />
            <div className="flex-1 min-w-0">
              <Link to={`/product/${item.id}`} className="font-medium text-ink hover:text-accent-400 line-clamp-2">
                {item.title}
              </Link>
              <p className="text-sm text-muted mt-1">₹{item.price.toLocaleString()} each</p>
            </div>
            <div className="flex items-center border border-border rounded-full">
              <button onClick={() => updateQty(item.id, item.qty - 1)} className="px-3 py-1.5 text-lg text-ink">−</button>
              <span className="px-2 min-w-[2ch] text-center text-ink">{item.qty}</span>
              <button onClick={() => updateQty(item.id, item.qty + 1)} className="px-3 py-1.5 text-lg text-ink">+</button>
            </div>
            <div className="w-24 text-right font-semibold text-ink">₹{(item.price * item.qty).toLocaleString()}</div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-muted hover:text-magenta-400 text-sm ml-2"
              aria-label="Remove item"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="bg-surface border border-border rounded-2xl p-6 h-fit">
        <h2 className="font-display text-xl font-semibold mb-4 text-ink">Order Summary</h2>
        <div className="space-y-2 text-sm text-muted">
          <div className="flex justify-between"><span>Subtotal</span><span className="text-ink">₹{subtotal.toLocaleString()}</span></div>
          <div className="flex justify-between"><span>Shipping</span><span className="text-ink">{shipping === 0 ? "Free" : `₹${shipping}`}</span></div>
          <div className="flex justify-between"><span>Tax (5%)</span><span className="text-ink">₹{tax.toLocaleString()}</span></div>
        </div>
        <div className="border-t border-border mt-4 pt-4 flex justify-between font-semibold text-lg text-ink">
          <span>Total</span><span>₹{total.toLocaleString()}</span>
        </div>
        <button
          onClick={() => navigate("/checkout")}
          className="mt-6 w-full bg-amber-500 hover:bg-amber-400 text-ink font-semibold py-3 rounded-full transition-colors"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
