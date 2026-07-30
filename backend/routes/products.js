import express from "express";
import products from "../data/products.js";
import { generateReviews, generateRatingBreakdown } from "../data/reviews.js";

const router = express.Router();

// GET /api/products?category=Electronics&search=phone&sort=price_asc&brand=Apple&minRating=4&page=1&limit=12
router.get("/", (req, res) => {
  let result = [...products];
  const {
    category,
    search,
    sort,
    minPrice,
    maxPrice,
    brand,
    minRating,
    page = 1,
    limit = 20,
  } = req.query;

  if (category && category !== "All") {
    result = result.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  if (brand) {
    const brands = brand.split(",").map((b) => b.toLowerCase());
    result = result.filter((p) => brands.includes(p.brand.toLowerCase()));
  }

  if (minRating) result = result.filter((p) => p.rating >= Number(minRating));
  if (minPrice) result = result.filter((p) => p.price >= Number(minPrice));
  if (maxPrice) result = result.filter((p) => p.price <= Number(maxPrice));

  if (sort === "price_asc") result.sort((a, b) => a.price - b.price);
  if (sort === "price_desc") result.sort((a, b) => b.price - a.price);
  if (sort === "rating") result.sort((a, b) => b.rating - a.rating);
  if (sort === "newest") result.sort((a, b) => b.id - a.id);

  const total = result.length;
  const start = (Number(page) - 1) * Number(limit);
  const paginated = result.slice(start, start + Number(limit));

  res.json({ total, page: Number(page), limit: Number(limit), products: paginated });
});

// GET /api/products/categories
router.get("/categories", (req, res) => {
  const categories = [...new Set(products.map((p) => p.category))];
  res.json(categories);
});

// GET /api/products/brands
router.get("/brands", (req, res) => {
  const brands = [...new Set(products.map((p) => p.brand))].sort();
  res.json(brands);
});

// GET /api/products/deals — items flagged as deals, for homepage
router.get("/deals", (req, res) => {
  res.json(products.filter((p) => p.isDeal));
});

// GET /api/products/:id
router.get("/:id", (req, res) => {
  const product = products.find((p) => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ message: "Product not found" });

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const reviews = generateReviews(product.id, product.rating);
  const ratingBreakdown = generateRatingBreakdown(reviews);

  res.json({ ...product, related, reviews, ratingBreakdown });
});

export default router;
