import express from "express";
import cors from "cors";
import morgan from "morgan";
import productsRouter from "./routes/products.js";
import cartRouter from "./routes/cart.js";
import { loadRealProductPhotos } from "./data/photoService.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ message: "ShopWave API is running" });
});

app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Swap in real stock photos (if PEXELS_API_KEY is set) before we start
// serving requests, so the first response already has them.
await loadRealProductPhotos();

app.listen(PORT, () => {
  console.log(`ShopWave backend running on http://localhost:${PORT}`);
});
