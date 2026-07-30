import express from "express";
import { v4 as uuidv4 } from "uuid";
import products from "../data/products.js";

const router = express.Router();

// In-memory order storage (demo only — replace with a real DB in production)
const orders = [];

// Demo coupon codes
const COUPONS = {
  WELCOME10: { type: "percent", value: 10, label: "10% off" },
  SAVE50: { type: "flat", value: 50, label: "₹50 off" },
  FLAT200: { type: "flat", value: 200, label: "₹200 off" },
};

// POST /api/cart/checkout
// body: { items: [{ id, qty }], address, paymentMethod, couponCode }
router.post("/checkout", (req, res) => {
  const { items = [], address, paymentMethod = "Cash on Delivery", couponCode } = req.body;

  if (!items.length) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  let subtotal = 0;
  const orderItems = items.map(({ id, qty }) => {
    const product = products.find((p) => p.id === Number(id));
    if (!product) throw new Error(`Product ${id} not found`);
    const lineTotal = product.price * qty;
    subtotal += lineTotal;
    return {
      id: product.id,
      title: product.title,
      price: product.price,
      qty,
      image: product.images[0],
    };
  });

  let discount = 0;
  const code = couponCode?.trim().toUpperCase();
  const coupon = code ? COUPONS[code] : null;
  if (coupon) {
    discount = coupon.type === "percent" ? Math.round(subtotal * (coupon.value / 100)) : coupon.value;
    discount = Math.min(discount, subtotal);
  }

  const shipping = subtotal - discount > 500 ? 0 : 49;
  const tax = Math.round((subtotal - discount) * 0.05);
  const total = subtotal - discount + shipping + tax;

  const order = {
    orderId: uuidv4(),
    items: orderItems,
    subtotal,
    discount,
    couponCode: coupon ? code : null,
    shipping,
    tax,
    total,
    address,
    paymentMethod,
    status: "Confirmed",
    createdAt: new Date().toISOString(),
    estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toDateString(),
  };

  orders.push(order);
  res.status(201).json(order);
});

// POST /api/cart/apply-coupon — validate a coupon without placing the order
router.post("/apply-coupon", (req, res) => {
  const { couponCode, subtotal = 0 } = req.body;
  const code = couponCode?.trim().toUpperCase();
  const coupon = COUPONS[code];
  if (!coupon) return res.status(404).json({ message: "Invalid coupon code" });

  let discount = coupon.type === "percent" ? Math.round(subtotal * (coupon.value / 100)) : coupon.value;
  discount = Math.min(discount, subtotal);
  res.json({ code, label: coupon.label, discount });
});

// GET /api/cart/orders/:orderId
router.get("/orders/:orderId", (req, res) => {
  const order = orders.find((o) => o.orderId === req.params.orderId);
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
});

export default router;
