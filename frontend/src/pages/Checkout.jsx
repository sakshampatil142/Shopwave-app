import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { checkout, applyCoupon } from "../api.js";
import { saveOrderLocally } from "./Orders.jsx";

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", line1: "", city: "", pincode: "" });
  const [payment, setPayment] = useState("COD");
  const [placing, setPlacing] = useState(false);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  const [couponInput, setCouponInput] = useState("");
  const [coupon, setCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [applying, setApplying] = useState(false);

  const discount = coupon?.discount || 0;
  const shipping = subtotal - discount > 500 ? 0 : 49;
  const tax = Math.round((subtotal - discount) * 0.05);
  const total = subtotal - discount + shipping + tax;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleApplyCoupon = async () => {
    setCouponError("");
    setApplying(true);
    try {
      const res = await applyCoupon({ couponCode: couponInput, subtotal });
      setCoupon(res);
    } catch {
      setCoupon(null);
      setCouponError("Invalid or expired coupon code.");
    } finally {
      setApplying(false);
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError("");
    setPlacing(true);
    try {
      const res = await checkout({
        items: items.map((i) => ({ id: i.id, qty: i.qty })),
        address: form,
        paymentMethod: payment === "COD" ? "Cash on Delivery" : "Card / UPI",
        couponCode: coupon?.code,
      });
      setOrder(res);
      saveOrderLocally(res);
      clearCart();
    } catch (err) {
      setError("Something went wrong placing your order. Please try again.");
    } finally {
      setPlacing(false);
    }
  };

  if (order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h1 className="font-display text-2xl font-semibold mb-2 text-ink">Order Confirmed!</h1>
        <p className="text-muted mb-1">Order ID: <span className="font-mono text-ink">{order.orderId}</span></p>
        <p className="text-muted mb-6">Estimated delivery: {order.estimatedDelivery}</p>
        <p className="text-lg font-semibold mb-8 text-ink">Total paid: ₹{order.total.toLocaleString()}</p>
        <div className="flex gap-3 justify-center">
          <Link to="/" className="bg-accent-500 text-ink px-6 py-3 rounded-full font-semibold hover:bg-accent-400">
            Continue Shopping
          </Link>
          <Link to="/orders" className="border border-border text-ink px-6 py-3 rounded-full font-semibold hover:border-accent-400">
            View Orders
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <p className="text-muted mb-6">Your cart is empty — add some items before checking out.</p>
        <Link to="/" className="bg-accent-500 text-ink px-6 py-3 rounded-full font-semibold hover:bg-accent-400">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-8">
      <form onSubmit={handlePlaceOrder} className="md:col-span-2 space-y-6">
        <h1 className="font-display text-2xl font-semibold text-ink">Checkout</h1>

        <div className="bg-surface border border-border rounded-2xl p-6 space-y-4">
          <h2 className="font-semibold text-ink">Shipping Address</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <input required name="name" placeholder="Full name" value={form.name} onChange={handleChange}
              className="bg-surface2 border border-border rounded-lg px-3 py-2 text-sm text-ink placeholder:text-muted" />
            <input required name="phone" placeholder="Phone number" value={form.phone} onChange={handleChange}
              className="bg-surface2 border border-border rounded-lg px-3 py-2 text-sm text-ink placeholder:text-muted" />
            <input required name="line1" placeholder="Address line" value={form.line1} onChange={handleChange}
              className="bg-surface2 border border-border rounded-lg px-3 py-2 text-sm text-ink placeholder:text-muted sm:col-span-2" />
            <input required name="city" placeholder="City" value={form.city} onChange={handleChange}
              className="bg-surface2 border border-border rounded-lg px-3 py-2 text-sm text-ink placeholder:text-muted" />
            <input required name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange}
              className="bg-surface2 border border-border rounded-lg px-3 py-2 text-sm text-ink placeholder:text-muted" />
          </div>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-6 space-y-3">
          <h2 className="font-semibold mb-1 text-ink">Payment Method</h2>
          {[
            { id: "COD", label: "Cash on Delivery" },
            { id: "CARD", label: "Card / UPI (demo — no real payment processed)" },
          ].map((opt) => (
            <label key={opt.id} className="flex items-center gap-3 text-sm text-ink cursor-pointer">
              <input type="radio" name="payment" checked={payment === opt.id} onChange={() => setPayment(opt.id)} />
              {opt.label}
            </label>
          ))}
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={placing}
          className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-ink font-semibold py-3 rounded-full transition-colors"
        >
          {placing ? "Placing order…" : `Place Order — ₹${total.toLocaleString()}`}
        </button>
      </form>

      <div className="bg-surface border border-border rounded-2xl p-6 h-fit">
        <h2 className="font-semibold mb-4 text-ink">Order Summary</h2>
        <ul className="space-y-3 mb-4 max-h-56 overflow-y-auto">
          {items.map((i) => (
            <li key={i.id} className="flex gap-3 text-sm">
              <img src={i.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
              <div className="flex-1">
                <p className="line-clamp-1 text-ink">{i.title}</p>
                <p className="text-muted">Qty {i.qty}</p>
              </div>
              <span className="text-ink">₹{(i.price * i.qty).toLocaleString()}</span>
            </li>
          ))}
        </ul>

        <div className="border-t border-border pt-4 mb-4">
          <label className="text-xs text-muted mb-1 block">Coupon code</label>
          <div className="flex gap-2">
            <input
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              placeholder="e.g. WELCOME10"
              className="flex-1 bg-surface2 border border-border rounded-lg px-3 py-2 text-sm text-ink placeholder:text-muted"
            />
            <button
              type="button"
              onClick={handleApplyCoupon}
              disabled={!couponInput || applying}
              className="px-4 rounded-lg bg-surface2 border border-border text-ink text-sm font-medium hover:border-accent-500 disabled:opacity-50"
            >
              {applying ? "…" : "Apply"}
            </button>
          </div>
          {coupon && (
            <p className="text-xs text-accent-400 mt-1.5">✓ "{coupon.code}" applied — {coupon.label}</p>
          )}
          {couponError && <p className="text-xs text-red-400 mt-1.5">{couponError}</p>}
          <p className="text-[11px] text-muted mt-1.5">Try: WELCOME10, SAVE50, or FLAT200</p>
        </div>

        <div className="border-t border-border pt-4 space-y-2 text-sm text-muted">
          <div className="flex justify-between"><span>Subtotal</span><span className="text-ink">₹{subtotal.toLocaleString()}</span></div>
          {discount > 0 && (
            <div className="flex justify-between text-accent-400"><span>Discount</span><span>−₹{discount.toLocaleString()}</span></div>
          )}
          <div className="flex justify-between"><span>Shipping</span><span className="text-ink">{shipping === 0 ? "Free" : `₹${shipping}`}</span></div>
          <div className="flex justify-between"><span>Tax</span><span className="text-ink">₹{tax.toLocaleString()}</span></div>
          <div className="flex justify-between font-semibold text-base pt-2 text-ink"><span>Total</span><span>₹{total.toLocaleString()}</span></div>
        </div>
      </div>
    </div>
  );
}
