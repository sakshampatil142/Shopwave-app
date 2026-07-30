import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const STORAGE_KEY = "shopwave_orders";

export function saveOrderLocally(order) {
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    localStorage.setItem(STORAGE_KEY, JSON.stringify([order, ...existing]));
  } catch {
    // ignore storage errors
  }
}

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      setOrders(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"));
    } catch {
      setOrders([]);
    }
  }, []);

  if (orders.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-semibold mb-3 text-ink">No orders yet</h1>
        <p className="text-muted mb-6">Orders you place will show up here.</p>
        <Link to="/" className="bg-accent-500 text-ink px-6 py-3 rounded-full font-semibold hover:bg-accent-400">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="font-display text-2xl font-semibold mb-6 text-ink">Your Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.orderId} className="bg-surface border border-border rounded-2xl p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 text-sm">
              <div>
                <span className="text-muted">Order ID: </span>
                <span className="font-mono text-ink">{order.orderId}</span>
              </div>
              <span className="bg-accent-500/15 text-accent-400 text-xs font-semibold px-2.5 py-1 rounded-full">
                {order.status}
              </span>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {order.items.map((item) => (
                <img
                  key={item.id}
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 rounded-lg object-cover shrink-0"
                />
              ))}
            </div>
            <div className="flex justify-between items-center mt-3 text-sm">
              <span className="text-muted">Estimated delivery: {order.estimatedDelivery}</span>
              <span className="font-semibold text-ink">₹{order.total.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
