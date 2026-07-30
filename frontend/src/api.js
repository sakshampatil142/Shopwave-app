import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

export const getProducts = (params = {}) => api.get("/products", { params }).then((r) => r.data);
export const getProduct = (id) => api.get(`/products/${id}`).then((r) => r.data);
export const getCategories = () => api.get("/products/categories").then((r) => r.data);
export const getBrands = () => api.get("/products/brands").then((r) => r.data);
export const getDeals = () => api.get("/products/deals").then((r) => r.data);
export const checkout = (payload) => api.post("/cart/checkout", payload).then((r) => r.data);
export const getOrder = (orderId) => api.get(`/cart/orders/${orderId}`).then((r) => r.data);
export const applyCoupon = (payload) => api.post("/cart/apply-coupon", payload).then((r) => r.data);

export default api;
