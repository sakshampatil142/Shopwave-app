# ShopWave — Full-Stack E-Commerce Site (Amazon-style)

A complete Amazon-style shopping site with a React frontend and a Node/Express backend.

## What's included
- **44 real, realistic products** (Apple, Samsung, Sony, Nike, Adidas, LEGO, etc.) with actual prices, ratings, descriptions, categories, and **real stock product photography** pulled live from the Pexels API (matched by product type — real phones for phones, real sneakers for sneakers, etc.), falling back to a generated illustration if no API key is configured
- Dark theme UI (near-black background, teal/amber/magenta accents) styled after Amazon/Flipkart/Ajio-style storefronts
- Home page with hero banner, category icon row, "Today's Deals" rail, and category product rows
- Category browsing, search, sort, **and a filter sidebar** (price range, brand, minimum rating)
- Dedicated **Deals** page
- **Wishlist** (heart icon on any product, persisted in localStorage)
- Product detail page with image gallery, stock, **customer reviews with a star-rating breakdown**, and related products
- Cart with quantity controls (persisted in localStorage)
- Checkout flow with address form, **coupon code support** (try `WELCOME10`, `SAVE50`, `FLAT200`), and order confirmation
- **Order history page** (persisted in localStorage, since demo backend orders reset on restart)
- **Mock sign-in** (demo only — no password, just personalizes the navbar)
- REST API backend serving all product/cart/review data

## Tech stack
- **Frontend:** React 18 + Vite, React Router, Tailwind CSS, Axios
- **Backend:** Node.js + Express (in-memory data — swap in MongoDB/Postgres for production)

## Project structure
```
ecommerce-app/
├── backend/
│   ├── data/products.js      # product catalog
│   ├── routes/products.js    # GET /api/products, /api/products/:id, /api/products/categories
│   ├── routes/cart.js        # POST /api/cart/checkout, GET /api/cart/orders/:id
│   └── server.js
└── frontend/
    └── src/
        ├── pages/             # Home, ProductDetail, Category, Search, Cart, Checkout
        ├── components/        # Navbar, Footer, ProductCard, StarRating
        ├── context/CartContext.jsx
        └── api.js
```

## How to run it

### 1. Backend
```bash
cd backend
npm install
npm start        # or: npm run dev
```
Runs on **http://localhost:5000**

**To show real product photos** (recommended — takes ~2 minutes):
1. Get a free API key at https://www.pexels.com/api/ (no cost, instant approval).
2. Before starting the backend, set it as an environment variable:
   ```bash
   export PEXELS_API_KEY=your_key_here   # macOS/Linux
   set PEXELS_API_KEY=your_key_here      # Windows (cmd)
   ```
3. Start the backend as above. On startup you'll see `[photoService] Fetching real photos...` in the console, and every product will load a real, relevant stock photo (a real phone photo for phones, real sneakers for sneakers, etc.) instead of the drawn illustration.

Without a key, the app runs fine and just uses the generated SVG illustrations already in `backend/data/products.js` — nothing breaks, you just won't have real photos. Photos are supplied by Pexels and don't require attribution, but a "Photos via Pexels" credit is included in the footer as good practice.

### 2. Frontend
Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```
Runs on **http://localhost:5173** and proxies `/api` calls to the backend automatically (see `vite.config.js`).

Then open **http://localhost:5173** in your browser.

## Notes & next steps
- Product images come from the Pexels API (real stock photography, matched by product type — not the literal manufacturer product shot, since those are copyrighted/trademarked and can't be redistributed here). Swap in your own official product images when you're ready to go live.
- Cart is stored in the browser (localStorage). Orders are stored in-memory on the backend and reset when the server restarts — connect a real database (MongoDB, PostgreSQL) for persistence.
- No real payment gateway is wired up — checkout is a demo flow. To go live, integrate Razorpay/Stripe on the backend's `/api/cart/checkout` route.
- No authentication yet — add login/signup (e.g. JWT-based) if you want per-user accounts, order history, and wishlists.
- To deploy: host the backend (Render/Railway/EC2) and the frontend build (`npm run build` → Vercel/Netlify), pointing the frontend's API base URL at your deployed backend.
