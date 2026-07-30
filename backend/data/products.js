// Real-world style product catalog for ShopWave
// Images used to come from LoremFlickr's keyword search, which returns
// whatever random Flickr photo happens to be tagged with those words —
// unreliable, and sometimes wildly unrelated to the product (a storefront,
// a graffitied wall, etc). To guarantee every product always shows a
// clean, on-brand, category-correct image with a plain white background
// (no network dependency, nothing that can ever come back wrong), product
// images are generated locally as simple SVG tiles instead — see
// `buildPlaceholderImages` at the bottom of this file.

const img = () => null; // placeholder — real images are assigned below

const products = [
  // ---------------- Electronics ----------------
  {
    id: 1,
    title: "Apple iPhone 15 (128GB, Blue)",
    brand: "Apple",
    category: "Electronics",
    price: 65999,
    mrp: 79900,
    rating: 4.6,
    numReviews: 18234,
    stock: 42,
    isDeal: true,
    isBestseller: true,
    description:
      "6.1-inch Super Retina XDR display, A16 Bionic chip, 48MP main camera with 2x telephoto, USB-C, Dynamic Island. Includes 1-year manufacturer warranty.",
    images: [img("iphone,smartphone", 101), img("smartphone,camera", 102), img("mobile,phone", 103)],
  },
  {
    id: 2,
    title: "Samsung Galaxy S24 Ultra (256GB, Titanium Black)",
    brand: "Samsung",
    category: "Electronics",
    price: 124999,
    mrp: 134999,
    rating: 4.5,
    numReviews: 9871,
    stock: 25,
    isBestseller: true,
    description:
      "6.8-inch Dynamic AMOLED 2X, Snapdragon 8 Gen 3, 200MP camera, built-in S Pen, Galaxy AI features, titanium frame.",
    images: [img("android,smartphone", 104), img("smartphone,black", 105), img("phone,stylus", 106)],
  },
  {
    id: 3,
    title: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    brand: "Sony",
    category: "Electronics",
    price: 29990,
    mrp: 34990,
    rating: 4.7,
    numReviews: 15302,
    stock: 60,
    isDeal: true,
    description:
      "Industry-leading noise cancellation, 30-hour battery life, crystal clear hands-free calling, multipoint connection.",
    images: [img("headphones,wireless", 107), img("headphones,black", 108)],
  },
  {
    id: 4,
    title: "Apple MacBook Air M2 (13-inch, 8GB/256GB)",
    brand: "Apple",
    category: "Electronics",
    price: 99900,
    mrp: 114900,
    rating: 4.8,
    numReviews: 7421,
    stock: 18,
    isBestseller: true,
    description:
      "Apple M2 chip with 8-core CPU, Liquid Retina display, up to 18 hours battery life, fanless silent design, 1080p FaceTime HD camera.",
    images: [img("macbook,laptop", 109), img("laptop,silver", 110), img("laptop,keyboard", 111)],
  },
  {
    id: 5,
    title: "Dell XPS 13 Laptop (Intel i7, 16GB, 512GB SSD)",
    brand: "Dell",
    category: "Electronics",
    price: 112990,
    mrp: 129990,
    rating: 4.4,
    numReviews: 2894,
    stock: 12,
    description:
      "13.4-inch FHD+ InfinityEdge display, 13th Gen Intel Core i7, Iris Xe graphics, CNC-machined aluminum chassis.",
    images: [img("laptop,notebook", 112), img("laptop,computer", 113)],
  },
  {
    id: 6,
    title: "boAt Airdopes 141 True Wireless Earbuds",
    brand: "boAt",
    category: "Electronics",
    price: 1299,
    mrp: 4990,
    rating: 4.1,
    numReviews: 214532,
    stock: 500,
    isDeal: true,
    description:
      "42H total playback, ENx tech for calls, IPX4 water resistance, ASAP charging, low-latency gaming mode.",
    images: [img("earbuds,wireless", 114), img("earbuds,case", 115)],
  },
  {
    id: 7,
    title: "Amazon Echo Dot (5th Gen) Smart Speaker with Alexa",
    brand: "Amazon",
    category: "Electronics",
    price: 3499,
    mrp: 5499,
    rating: 4.3,
    numReviews: 98213,
    stock: 200,
    description:
      "Improved bass, built-in temperature sensor, control smart home devices, ask Alexa to play music, set alarms and more.",
    images: [img("smart,speaker", 116), img("speaker,round", 117)],
  },
  {
    id: 8,
    title: "Samsung 55-inch Neo QLED 4K Smart TV (QN90C)",
    brand: "Samsung",
    category: "Electronics",
    price: 134999,
    mrp: 179999,
    rating: 4.5,
    numReviews: 3120,
    stock: 9,
    isDeal: true,
    description:
      "Quantum Matrix Technology, Neo Quantum Processor 4K, Anti-Glare screen, Object Tracking Sound+, Gaming Hub.",
    images: [img("television,smart", 118), img("tv,livingroom", 119)],
  },
  {
    id: 9,
    title: "Logitech MX Master 3S Wireless Mouse",
    brand: "Logitech",
    category: "Electronics",
    price: 8995,
    mrp: 9995,
    rating: 4.7,
    numReviews: 6234,
    stock: 75,
    description:
      "8K DPI tracking, quiet clicks, 90-day battery life, MagSpeed electromagnetic scrolling, works on any surface.",
    images: [img("computer,mouse", 120), img("mouse,desk", 121)],
  },
  {
    id: 37,
    title: "JBL Flip 6 Portable Bluetooth Speaker",
    brand: "JBL",
    category: "Electronics",
    price: 8999,
    mrp: 10999,
    rating: 4.5,
    numReviews: 22110,
    stock: 140,
    isDeal: true,
    description:
      "Bold JBL Pro Sound, IP67 waterproof and dustproof, 12 hours of playtime, PartyBoost for pairing multiple speakers.",
    images: [img("bluetooth,speaker", 122), img("speaker,portable", 123)],
  },
  {
    id: 38,
    title: "Canon EOS R50 Mirrorless Camera with 18-45mm Lens",
    brand: "Canon",
    category: "Electronics",
    price: 74999,
    mrp: 84999,
    rating: 4.6,
    numReviews: 1542,
    stock: 14,
    description:
      "24.2MP APS-C sensor, 4K video, Dual Pixel CMOS AF II, compact and lightweight body ideal for vlogging and travel.",
    images: [img("camera,mirrorless", 124), img("camera,lens", 125)],
  },

  // ---------------- Fashion ----------------
  {
    id: 10,
    title: "Nike Air Force 1 '07 Sneakers",
    brand: "Nike",
    category: "Fashion",
    price: 8295,
    mrp: 8295,
    rating: 4.6,
    numReviews: 34211,
    stock: 120,
    isBestseller: true,
    description:
      "The radiance lives on in the Nike Air Force 1 '07, the b-ball original that puts a fresh spin on what you know best.",
    images: [img("sneakers,white", 126), img("sneakers,shoes", 127)],
  },
  {
    id: 11,
    title: "Levi's 511 Slim Fit Men's Jeans",
    brand: "Levi's",
    category: "Fashion",
    price: 2499,
    mrp: 3999,
    rating: 4.3,
    numReviews: 15421,
    stock: 300,
    isDeal: true,
    description:
      "Slim through the seat and thigh with a slightly tapered leg for a slim silhouette. Mid rise sits below the waist.",
    images: [img("denim,jeans", 128), img("jeans,fashion", 129)],
  },
  {
    id: 12,
    title: "Adidas Ultraboost Light Running Shoes",
    brand: "Adidas",
    category: "Fashion",
    price: 15999,
    mrp: 17999,
    rating: 4.5,
    numReviews: 8921,
    stock: 85,
    description:
      "Our lightest Ultraboost ever. Responsive Light BOOST midsole cushioning, Primeknit textile upper, Continental rubber outsole.",
    images: [img("running,shoes", 130), img("sneakers,sport", 131)],
  },
  {
    id: 13,
    title: "Ray-Ban Aviator Classic Sunglasses",
    brand: "Ray-Ban",
    category: "Fashion",
    price: 8990,
    mrp: 9990,
    rating: 4.7,
    numReviews: 5342,
    stock: 60,
    description:
      "The Aviator Classic, the iconic style that started it all. Crystal lenses, gold-tone metal frame, 100% UV protection.",
    images: [img("sunglasses,aviator", 132), img("sunglasses,fashion", 133)],
  },
  {
    id: 14,
    title: "H&M Cotton Oxford Shirt (Regular Fit)",
    brand: "H&M",
    category: "Fashion",
    price: 1499,
    mrp: 1999,
    rating: 4.0,
    numReviews: 2103,
    stock: 220,
    description:
      "Regular fit shirt in cotton Oxford weave with a collar, buttoned front and long sleeves with adjustable buttoned cuffs.",
    images: [img("shirt,mens", 134), img("shirt,cotton", 135)],
  },
  {
    id: 15,
    title: "Fossil Gen 6 Smartwatch",
    brand: "Fossil",
    category: "Fashion",
    price: 18995,
    mrp: 24995,
    rating: 4.1,
    numReviews: 1892,
    stock: 40,
    description:
      "Wear OS by Google, Snapdragon Wear 4100+ platform, heart rate, SpO2, built-in GPS, swim-proof design.",
    images: [img("smartwatch,wrist", 136), img("watch,smartwatch", 137)],
  },
  {
    id: 39,
    title: "Fastrack Analog Chronograph Watch for Men",
    brand: "Fastrack",
    category: "Fashion",
    price: 2495,
    mrp: 3495,
    rating: 4.2,
    numReviews: 9214,
    stock: 160,
    isDeal: true,
    description:
      "Stainless steel case, water resistant up to 50m, chronograph dial with date display, leather strap.",
    images: [img("wristwatch,analog", 138), img("watch,leather", 139)],
  },
  {
    id: 40,
    title: "Titan Raga Women's Analog Watch",
    brand: "Titan",
    category: "Fashion",
    price: 3995,
    mrp: 4995,
    rating: 4.4,
    numReviews: 6721,
    stock: 95,
    description:
      "Elegant slim case design, rose gold dial, comfortable stainless steel strap, water resistant.",
    images: [img("watch,women", 140), img("wristwatch,rose", 141)],
  },

  // ---------------- Home & Kitchen ----------------
  {
    id: 16,
    title: "Prestige Deluxe Alpha 5L Pressure Cooker",
    brand: "Prestige",
    category: "Home & Kitchen",
    price: 2895,
    mrp: 3495,
    rating: 4.4,
    numReviews: 27321,
    stock: 150,
    description:
      "Stainless steel outer lid cooker, deluxe alpha base with glossy finish, deep-drawn body for even heat distribution.",
    images: [img("pressure,cooker", 142), img("kitchen,cookware", 143)],
  },
  {
    id: 17,
    title: "Philips Air Fryer HD9252/90 (4.1L)",
    brand: "Philips",
    category: "Home & Kitchen",
    price: 8995,
    mrp: 11995,
    rating: 4.5,
    numReviews: 19234,
    stock: 65,
    isDeal: true,
    description:
      "Rapid Air technology for up to 90% less fat, digital touchscreen, dishwasher-safe parts, 4.1L capacity for family meals.",
    images: [img("air,fryer", 144), img("kitchen,appliance", 145)],
  },
  {
    id: 18,
    title: "IKEA MALM Bed Frame with Storage (Queen)",
    brand: "IKEA",
    category: "Home & Kitchen",
    price: 24990,
    mrp: 27990,
    rating: 4.3,
    numReviews: 843,
    stock: 15,
    description:
      "Real wood veneer, four storage boxes on castors provide plenty of room to keep bed linens and other things organized.",
    images: [img("bedroom,bed", 146), img("bed,furniture", 147)],
  },
  {
    id: 19,
    title: "Milton Thermosteel Flip Lid Flask 1L",
    brand: "Milton",
    category: "Home & Kitchen",
    price: 899,
    mrp: 1195,
    rating: 4.4,
    numReviews: 41293,
    stock: 400,
    description:
      "24-hour hot and cold retention, double wall stainless steel vacuum insulation, flip-top lid doubles as a cup.",
    images: [img("thermos,flask", 148), img("bottle,steel", 149)],
  },
  {
    id: 20,
    title: "Dyson V11 Cordless Vacuum Cleaner",
    brand: "Dyson",
    category: "Home & Kitchen",
    price: 45900,
    mrp: 52900,
    rating: 4.6,
    numReviews: 3201,
    stock: 20,
    isBestseller: true,
    description:
      "Intelligent suction power adjustment, LCD screen shows performance data, up to 60 minutes run time, whole-machine filtration.",
    images: [img("vacuum,cleaner", 150), img("vacuum,cordless", 151)],
  },
  {
    id: 41,
    title: "Havells Ventil Air DSP 230mm Exhaust Fan",
    brand: "Havells",
    category: "Home & Kitchen",
    price: 1699,
    mrp: 2199,
    rating: 4.2,
    numReviews: 3421,
    stock: 210,
    description:
      "Rust-proof powder coated body, high air suction capacity, ideal for kitchens and bathrooms.",
    images: [img("exhaust,fan", 152), img("kitchen,fan", 153)],
  },

  // ---------------- Books ----------------
  {
    id: 21,
    title: "Atomic Habits by James Clear (Paperback)",
    brand: "Penguin",
    category: "Books",
    price: 399,
    mrp: 799,
    rating: 4.8,
    numReviews: 89234,
    stock: 900,
    isBestseller: true,
    description:
      "An easy and proven way to build good habits and break bad ones. Tiny changes, remarkable results.",
    images: [img("books,reading", 154)],
  },
  {
    id: 22,
    title: "The Alchemist by Paulo Coelho (Paperback)",
    brand: "HarperCollins",
    category: "Books",
    price: 249,
    mrp: 399,
    rating: 4.6,
    numReviews: 67123,
    stock: 700,
    description:
      "A magical story about listening to your heart, recognizing opportunity and learning to read the omens strewn along life's path.",
    images: [img("book,novel", 155)],
  },
  {
    id: 23,
    title: "Sapiens: A Brief History of Humankind by Yuval Noah Harari",
    brand: "Vintage",
    category: "Books",
    price: 499,
    mrp: 699,
    rating: 4.7,
    numReviews: 45213,
    stock: 500,
    description:
      "A groundbreaking narrative of humanity's creation and evolution that explores how biology and history have defined us.",
    images: [img("book,library", 156)],
  },
  {
    id: 24,
    title: "Deep Work by Cal Newport (Paperback)",
    brand: "Piatkus",
    category: "Books",
    price: 349,
    mrp: 599,
    rating: 4.5,
    numReviews: 21432,
    stock: 350,
    isDeal: true,
    description:
      "Rules for focused success in a distracted world. Learn to master the skill of deep, undistracted concentration.",
    images: [img("book,desk", 157)],
  },

  // ---------------- Beauty & Personal Care ----------------
  {
    id: 25,
    title: "Minimalist 10% Niacinamide Face Serum (30ml)",
    brand: "Minimalist",
    category: "Beauty",
    price: 549,
    mrp: 549,
    rating: 4.3,
    numReviews: 34521,
    stock: 250,
    description:
      "Reduces acne marks and controls sebum production. Formulated with zinc for oil control and clearer-looking skin.",
    images: [img("serum,skincare", 158)],
  },
  {
    id: 26,
    title: "Mamaearth Onion Hair Fall Shampoo (400ml)",
    brand: "Mamaearth",
    category: "Beauty",
    price: 399,
    mrp: 499,
    rating: 4.2,
    numReviews: 78234,
    stock: 400,
    isDeal: true,
    description:
      "Onion extract & plant keratin reduce hair fall and add shine. Free from sulphates, parabens and silicones.",
    images: [img("shampoo,bottle", 159)],
  },
  {
    id: 27,
    title: "Nivea Men Dark Spot Reduction Face Wash (100g)",
    brand: "Nivea",
    category: "Beauty",
    price: 199,
    mrp: 249,
    rating: 4.1,
    numReviews: 19832,
    stock: 600,
    description:
      "10x Vitamin C effect, deep cleans and reduces dark spots caused by pollution, sun and stress.",
    images: [img("facewash,skincare", 160)],
  },
  {
    id: 42,
    title: "Lakme Absolute Perfect Radiance Skin Brightening Cream",
    brand: "Lakme",
    category: "Beauty",
    price: 449,
    mrp: 550,
    rating: 4.0,
    numReviews: 15230,
    stock: 320,
    description:
      "Vitamin C+ complex for even-toned, radiant skin. Lightweight, non-greasy formula for daily use.",
    images: [img("cream,cosmetics", 161)],
  },

  // ---------------- Sports & Outdoors ----------------
  {
    id: 28,
    title: "Yonex Nanoflare 001 Feel Badminton Racquet",
    brand: "Yonex",
    category: "Sports",
    price: 2199,
    mrp: 2999,
    rating: 4.3,
    numReviews: 3241,
    stock: 90,
    description:
      "Lightweight frame for quick swings, high repulsion, ideal for all-round doubles and singles play.",
    images: [img("badminton,racquet", 162), img("racquet,sport", 163)],
  },
  {
    id: 29,
    title: "Cosco Rebounder Football, Size 5",
    brand: "Cosco",
    category: "Sports",
    price: 799,
    mrp: 999,
    rating: 4.0,
    numReviews: 4521,
    stock: 200,
    description:
      "Durable rubberized moulded football, designed for training and recreational play on all surfaces.",
    images: [img("football,soccer", 164)],
  },
  {
    id: 30,
    title: "Decathlon Domyos Yoga Mat (8mm)",
    brand: "Decathlon",
    category: "Sports",
    price: 899,
    mrp: 1199,
    rating: 4.4,
    numReviews: 9821,
    stock: 300,
    isDeal: true,
    description:
      "Extra thick non-slip mat for comfortable yoga and floor exercises, easy to carry and clean.",
    images: [img("yoga,mat", 165)],
  },
  {
    id: 43,
    title: "Nivia Storm Basketball, Size 7",
    brand: "Nivia",
    category: "Sports",
    price: 1099,
    mrp: 1399,
    rating: 4.1,
    numReviews: 2341,
    stock: 140,
    description:
      "Durable rubber composite cover, deep channel design for improved grip and control, indoor/outdoor use.",
    images: [img("basketball,sport", 166)],
  },

  // ---------------- Toys ----------------
  {
    id: 31,
    title: "LEGO Classic Creative Bricks Box (484 pcs)",
    brand: "LEGO",
    category: "Toys",
    price: 2999,
    mrp: 3499,
    rating: 4.8,
    numReviews: 5231,
    stock: 110,
    isBestseller: true,
    description:
      "A large box of LEGO bricks in a variety of colors and shapes to inspire creative building for ages 4+.",
    images: [img("lego,bricks", 167), img("toys,building", 168)],
  },
  {
    id: 32,
    title: "Hot Wheels 20-Car Gift Pack",
    brand: "Hot Wheels",
    category: "Toys",
    price: 1699,
    mrp: 1999,
    rating: 4.6,
    numReviews: 8712,
    stock: 180,
    description:
      "Collection of 20 die-cast vehicles in 1:64 scale, featuring iconic Hot Wheels designs and decos.",
    images: [img("toy,cars", 169)],
  },
  {
    id: 44,
    title: "Funskool Giant Wheel Puzzle (1000 Pieces)",
    brand: "Funskool",
    category: "Toys",
    price: 899,
    mrp: 1199,
    rating: 4.3,
    numReviews: 1245,
    stock: 90,
    description:
      "1000-piece jigsaw puzzle for ages 12+, a relaxing activity that sharpens focus and problem-solving.",
    images: [img("jigsaw,puzzle", 170)],
  },

  // ---------------- Groceries ----------------
  {
    id: 33,
    title: "Tata Sampann Unpolished Toor Dal (1kg)",
    brand: "Tata Sampann",
    category: "Groceries",
    price: 179,
    mrp: 199,
    rating: 4.4,
    numReviews: 12421,
    stock: 800,
    description:
      "100% natural, unpolished toor dal retaining natural nutrients, sourced from select farms.",
    images: [img("lentils,pulses", 171)],
  },
  {
    id: 34,
    title: "Nescafe Gold Blend Instant Coffee (100g)",
    brand: "Nescafe",
    category: "Groceries",
    price: 449,
    mrp: 499,
    rating: 4.5,
    numReviews: 23124,
    stock: 500,
    isDeal: true,
    description:
      "Smooth, rich instant coffee made from a blend of the finest Arabica and Robusta coffee beans.",
    images: [img("coffee,jar", 172)],
  },
  {
    id: 35,
    title: "Fortune Sunlite Refined Sunflower Oil (1L)",
    brand: "Fortune",
    category: "Groceries",
    price: 149,
    mrp: 169,
    rating: 4.2,
    numReviews: 8921,
    stock: 700,
    description:
      "Light textured refined sunflower oil, rich in Vitamin E, ideal for everyday cooking.",
    images: [img("cooking,oil", 173)],
  },
  {
    id: 36,
    title: "Amul Gold Full Cream Milk Powder (500g)",
    brand: "Amul",
    category: "Groceries",
    price: 279,
    mrp: 299,
    rating: 4.3,
    numReviews: 4521,
    stock: 350,
    description:
      "Full cream milk powder made from fresh cow milk, rich in taste and nutrition.",
    images: [img("milk,powder", 174)],
  },
];

// ---- Local SVG product illustrations ----------------------------------
// Real product photography can't be redistributed here (licensing), and a
// random web image lookup was unreliable (see note above), so every
// product gets a hand-drawn flat-style vector illustration of the actual
// product shape instead — a phone silhouette for phones, a shoe profile
// for sneakers, a bottle for skincare, etc. Deterministic per product id,
// always loads, no network dependency, and always shows the right kind of
// thing rather than a generic photo stand-in.

const categoryVisual = {
  Electronics: { tint: "#EAF2FF", accent: "#2563EB" },
  Fashion: { tint: "#FFF3E8", accent: "#EA580C" },
  "Home & Kitchen": { tint: "#F0F7EE", accent: "#16A34A" },
  Books: { tint: "#F5F0FF", accent: "#7C3AED" },
  Beauty: { tint: "#FFEEF3", accent: "#DB2777" },
  Sports: { tint: "#EAFBF4", accent: "#0D9488" },
  Toys: { tint: "#FFF9E5", accent: "#D97706" },
  Groceries: { tint: "#EFFCEF", accent: "#65A30D" },
};

// Small deterministic hash so same-type products still get slightly
// different shades instead of looking identical.
function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.min(255, Math.max(0, (n >> 16) + amt));
  const g = Math.min(255, Math.max(0, ((n >> 8) & 0xff) + amt));
  const b = Math.min(255, Math.max(0, (n & 0xff) + amt));
  // Returned as hex (not rgb()) so the result can be safely fed back into
  // shade() again for further tinting (icons nest shade() calls).
  const toHex = (v) => v.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// ---- shape drawing helpers (all operate in a 600x600 canvas) ----------

function shadow() {
  return `<ellipse cx="300" cy="470" rx="150" ry="18" fill="#000" opacity="0.08"/>`;
}

function phoneIcon(c) {
  return `
    <rect x="228" y="120" width="144" height="300" rx="26" fill="${shade(c, -30)}"/>
    <rect x="238" y="150" width="124" height="230" rx="4" fill="${c}"/>
    <circle cx="300" cy="136" r="4" fill="${shade(c, -60)}"/>
    <rect x="278" y="392" width="44" height="5" rx="2.5" fill="${shade(c, -60)}"/>`;
}

function laptopIcon(c) {
  return `
    <rect x="210" y="160" width="180" height="130" rx="8" fill="${shade(c, -30)}"/>
    <rect x="220" y="170" width="160" height="110" rx="2" fill="${c}"/>
    <path d="M170 300 L430 300 L410 335 Q408 340 402 340 L198 340 Q192 340 190 335 Z" fill="${shade(c, -15)}"/>
    <rect x="170" y="292" width="260" height="10" rx="4" fill="${shade(c, -30)}"/>`;
}

function headphonesIcon(c) {
  return `
    <path d="M215 300 A85 85 0 0 1 385 300" stroke="${shade(c, -30)}" stroke-width="16" fill="none" stroke-linecap="round"/>
    <rect x="188" y="290" width="46" height="80" rx="20" fill="${c}"/>
    <rect x="366" y="290" width="46" height="80" rx="20" fill="${c}"/>`;
}

function earbudsIcon(c) {
  return `
    <rect x="220" y="270" width="160" height="95" rx="18" fill="${shade(c, -25)}"/>
    <rect x="230" y="278" width="140" height="45" rx="10" fill="${shade(c, 25)}" opacity="0.5"/>
    <ellipse cx="270" cy="220" rx="20" ry="26" fill="#F5F5F5"/>
    <ellipse cx="330" cy="220" rx="20" ry="26" fill="#F5F5F5"/>
    <rect x="264" y="196" width="12" height="20" rx="6" fill="#D0D0D0"/>
    <rect x="324" y="196" width="12" height="20" rx="6" fill="#D0D0D0"/>`;
}

function speakerIcon(c) {
  return `
    <rect x="240" y="150" width="120" height="230" rx="55" fill="${shade(c, -20)}"/>
    ${[0, 1, 2, 3, 4].map((row) =>
      [0, 1, 2].map((col) => `<circle cx="${272 + col * 28}" cy="${200 + row * 34}" r="6" fill="${shade(c, -55)}"/>`).join("")
    ).join("")}`;
}

function tvIcon(c) {
  return `
    <rect x="150" y="140" width="300" height="190" rx="10" fill="${shade(c, -35)}"/>
    <rect x="164" y="154" width="272" height="162" fill="${c}"/>
    <rect x="280" y="330" width="40" height="30" fill="${shade(c, -35)}"/>
    <rect x="230" y="358" width="140" height="10" rx="5" fill="${shade(c, -35)}"/>`;
}

function mouseIcon(c) {
  return `
    <path d="M300 160 C365 160 385 210 385 280 C385 350 350 400 300 400 C250 400 215 350 215 280 C215 210 235 160 300 160 Z" fill="${c}"/>
    <line x1="300" y1="160" x2="300" y2="250" stroke="${shade(c, -40)}" stroke-width="4"/>
    <rect x="292" y="185" width="16" height="40" rx="8" fill="${shade(c, -40)}"/>`;
}

function cameraIcon(c) {
  return `
    <rect x="180" y="210" width="240" height="150" rx="14" fill="${shade(c, -25)}"/>
    <rect x="230" y="180" width="70" height="35" rx="6" fill="${shade(c, -25)}"/>
    <circle cx="300" cy="285" r="55" fill="#2b2b2b"/>
    <circle cx="300" cy="285" r="38" fill="${shade(c, 40)}"/>
    <circle cx="390" cy="235" r="8" fill="${shade(c, 60)}"/>`;
}

function sneakerIcon(c) {
  return `
    <path d="M160 340 Q160 300 210 290 L250 260 Q270 245 300 250 L360 268 Q400 278 420 300 L440 305 Q460 310 460 335 L460 350 L160 350 Z" fill="${c}"/>
    <path d="M160 350 L460 350 L460 365 Q460 372 452 372 L168 372 Q160 372 160 365 Z" fill="${shade(c, -50)}"/>
    <path d="M255 262 L300 300 L360 270" stroke="${shade(c, -60)}" stroke-width="4" fill="none"/>`;
}

function jeansIcon(c) {
  return `
    <path d="M235 150 L365 150 L372 260 L340 420 L305 420 L300 280 L295 420 L260 420 L228 260 Z" fill="${c}"/>
    <rect x="235" y="150" width="130" height="30" fill="${shade(c, -30)}"/>
    <line x1="300" y1="185" x2="300" y2="270" stroke="${shade(c, -40)}" stroke-width="3" stroke-dasharray="6 5"/>`;
}

function sunglassesIcon(c) {
  return `
    <circle cx="245" cy="290" r="60" fill="${shade(c, -20)}"/>
    <circle cx="355" cy="290" r="60" fill="${shade(c, -20)}"/>
    <circle cx="245" cy="290" r="46" fill="${shade(c, 30)}" opacity="0.55"/>
    <circle cx="355" cy="290" r="46" fill="${shade(c, 30)}" opacity="0.55"/>
    <path d="M305 285 Q300 275 295 285" stroke="${shade(c, -20)}" stroke-width="8" fill="none"/>
    <line x1="185" y1="280" x2="150" y2="260" stroke="${shade(c, -20)}" stroke-width="8"/>
    <line x1="415" y1="280" x2="450" y2="260" stroke="${shade(c, -20)}" stroke-width="8"/>`;
}

function shirtIcon(c) {
  return `
    <path d="M255 165 L230 200 L190 230 L215 275 L245 255 L245 400 L355 400 L355 255 L385 275 L410 230 L370 200 L345 165 Q300 195 255 165 Z" fill="${c}"/>
    <path d="M275 165 Q300 200 325 165" stroke="${shade(c, -40)}" stroke-width="4" fill="none"/>`;
}

function smartwatchIcon(c) {
  return `
    <rect x="270" y="120" width="60" height="60" rx="10" fill="${shade(c, -30)}"/>
    <rect x="270" y="410" width="60" height="60" rx="10" fill="${shade(c, -30)}"/>
    <rect x="235" y="205" width="130" height="190" rx="28" fill="${shade(c, -20)}"/>
    <rect x="250" y="222" width="100" height="156" rx="12" fill="${c}"/>
    <rect x="365" y="280" width="12" height="24" rx="4" fill="${shade(c, -40)}"/>`;
}

function analogWatchIcon(c) {
  return `
    <path d="M275 130 L325 130 L318 205 L282 205 Z" fill="${shade(c, -30)}"/>
    <path d="M275 470 L325 470 L318 395 L282 395 Z" fill="${shade(c, -30)}"/>
    <circle cx="300" cy="300" r="95" fill="${shade(c, -20)}"/>
    <circle cx="300" cy="300" r="78" fill="#FAFAFA"/>
    <line x1="300" y1="300" x2="300" y2="250" stroke="#333" stroke-width="4" stroke-linecap="round"/>
    <line x1="300" y1="300" x2="335" y2="300" stroke="#333" stroke-width="4" stroke-linecap="round"/>
    <circle cx="300" cy="300" r="6" fill="#333"/>`;
}

function cookerIcon(c) {
  return `
    <path d="M210 260 Q210 220 300 220 Q390 220 390 260 L385 340 Q385 380 300 380 Q215 380 215 340 Z" fill="${c}"/>
    <rect x="175" y="250" width="30" height="16" rx="8" fill="${shade(c, -35)}"/>
    <rect x="395" y="250" width="30" height="16" rx="8" fill="${shade(c, -35)}"/>
    <path d="M225 220 Q300 190 375 220 L365 235 Q300 212 235 235 Z" fill="${shade(c, -20)}"/>
    <circle cx="300" cy="205" r="12" fill="${shade(c, -35)}"/>`;
}

function airfryerIcon(c) {
  return `
    <rect x="200" y="170" width="200" height="220" rx="24" fill="${shade(c, -15)}"/>
    <rect x="222" y="230" width="156" height="130" rx="12" fill="${shade(c, 15)}"/>
    <circle cx="300" cy="200" r="14" fill="#333"/>
    <rect x="270" y="355" width="60" height="10" rx="5" fill="${shade(c, -40)}"/>`;
}

function bedIcon(c) {
  return `
    <rect x="150" y="270" width="320" height="70" rx="10" fill="${c}"/>
    <rect x="150" y="230" width="40" height="150" rx="8" fill="${shade(c, -35)}"/>
    <rect x="160" y="255" width="290" height="20" rx="8" fill="${shade(c, 30)}"/>
    <rect x="170" y="340" width="16" height="40" fill="${shade(c, -45)}"/>
    <rect x="414" y="340" width="16" height="40" fill="${shade(c, -45)}"/>`;
}

function flaskIcon(c) {
  return `
    <rect x="245" y="150" width="110" height="270" rx="30" fill="${c}"/>
    <rect x="260" y="120" width="80" height="45" rx="10" fill="${shade(c, -30)}"/>
    <rect x="255" y="230" width="90" height="14" fill="${shade(c, 30)}" opacity="0.5"/>`;
}

function vacuumIcon(c) {
  return `
    <rect x="290" y="150" width="20" height="180" rx="8" fill="${shade(c, -20)}"/>
    <path d="M250 330 Q300 310 350 330 L360 400 Q300 420 240 400 Z" fill="${c}"/>
    <rect x="270" y="130" width="70" height="26" rx="13" fill="${shade(c, -35)}"/>
    <rect x="270" y="400" width="70" height="18" rx="6" fill="${shade(c, -45)}"/>`;
}

function fanIcon(c) {
  return `
    <circle cx="300" cy="290" r="120" fill="${shade(c, -25)}"/>
    <circle cx="300" cy="290" r="100" fill="${c}"/>
    ${[0, 60, 120, 180, 240, 300].map(
      (deg) => `<path d="M300 290 L300 210" stroke="${shade(c, -45)}" stroke-width="10" stroke-linecap="round" transform="rotate(${deg} 300 290)"/>`
    ).join("")}
    <circle cx="300" cy="290" r="16" fill="${shade(c, -55)}"/>`;
}

function bookIcon(c) {
  return `
    <rect x="200" y="150" width="200" height="280" rx="6" fill="${c}"/>
    <rect x="200" y="150" width="20" height="280" fill="${shade(c, -40)}"/>
    <rect x="240" y="190" width="130" height="8" fill="${shade(c, 40)}" opacity="0.6"/>
    <rect x="240" y="215" width="100" height="8" fill="${shade(c, 40)}" opacity="0.6"/>`;
}

function bottleSerumIcon(c) {
  return `
    <rect x="255" y="220" width="90" height="170" rx="16" fill="${c}" opacity="0.85"/>
    <rect x="270" y="170" width="60" height="55" rx="8" fill="${shade(c, -30)}"/>
    <rect x="288" y="140" width="24" height="35" rx="6" fill="${shade(c, -45)}"/>`;
}

function bottlePumpIcon(c) {
  return `
    <rect x="235" y="200" width="130" height="200" rx="20" fill="${c}"/>
    <rect x="270" y="150" width="60" height="55" rx="10" fill="${shade(c, -25)}"/>
    <rect x="285" y="115" width="14" height="40" rx="6" fill="${shade(c, -45)}"/>
    <rect x="255" y="260" width="90" height="16" fill="${shade(c, 35)}" opacity="0.5"/>`;
}

function tubeIcon(c) {
  return `
    <path d="M260 150 L340 150 L355 220 Q365 260 355 400 Q355 415 340 415 L260 415 Q245 415 245 400 Q235 260 245 220 Z" fill="${c}"/>
    <rect x="265" y="130" width="70" height="26" rx="6" fill="${shade(c, -35)}"/>
    <rect x="255" y="330" width="90" height="14" fill="${shade(c, 40)}" opacity="0.4"/>`;
}

function jarIcon(c) {
  return `
    <rect x="220" y="220" width="160" height="170" rx="14" fill="${c}"/>
    <rect x="212" y="185" width="176" height="42" rx="10" fill="${shade(c, -30)}"/>
    <rect x="235" y="260" width="130" height="16" fill="${shade(c, 40)}" opacity="0.4"/>`;
}

function racquetIcon(c) {
  return `
    <ellipse cx="300" cy="210" rx="75" ry="95" fill="none" stroke="${shade(c, -20)}" stroke-width="14"/>
    <ellipse cx="300" cy="210" rx="60" ry="80" fill="${c}" opacity="0.35"/>
    <rect x="288" y="300" width="24" height="140" rx="8" fill="${shade(c, -20)}"/>
    <rect x="278" y="425" width="44" height="30" rx="8" fill="${shade(c, -45)}"/>`;
}

function ballIcon(c, pattern) {
  const seams = pattern === "football"
    ? `<path d="M300 210 L260 250 L275 300 L325 300 L340 250 Z" fill="#222"/>
       <path d="M300 210 L300 170" stroke="#222" stroke-width="4"/>
       <path d="M260 250 L215 240" stroke="#222" stroke-width="4"/>
       <path d="M340 250 L385 240" stroke="#222" stroke-width="4"/>
       <path d="M275 300 L255 345" stroke="#222" stroke-width="4"/>
       <path d="M325 300 L345 345" stroke="#222" stroke-width="4"/>`
    : `<path d="M300 190 Q260 260 300 390" stroke="#222" stroke-width="5" fill="none"/>
       <path d="M300 190 Q340 260 300 390" stroke="#222" stroke-width="5" fill="none"/>
       <path d="M195 290 Q300 250 405 290" stroke="#222" stroke-width="5" fill="none"/>`;
  return `<circle cx="300" cy="290" r="110" fill="${c}"/>${seams}`;
}

function matIcon(c) {
  return `
    <rect x="180" y="255" width="240" height="70" rx="35" fill="${c}"/>
    <circle cx="420" cy="290" r="35" fill="${shade(c, -25)}"/>
    <circle cx="420" cy="290" r="14" fill="${shade(c, -45)}"/>`;
}

function blocksIcon(c) {
  return `
    <rect x="200" y="220" width="200" height="160" rx="10" fill="${c}"/>
    ${[0, 1, 2].map((i) => `<circle cx="${250 + i * 50}" cy="200" r="16" fill="${c}"/>`).join("")}
    <rect x="200" y="220" width="200" height="30" fill="${shade(c, 30)}" opacity="0.5"/>`;
}

function toyCarIcon(c) {
  return `
    <path d="M170 320 L195 270 Q210 250 240 250 L360 250 Q390 250 405 270 L430 320 Z" fill="${c}"/>
    <rect x="170" y="320" width="260" height="30" rx="10" fill="${shade(c, -20)}"/>
    <path d="M225 255 L255 255 L250 290 L215 290 Z" fill="${shade(c, 40)}" opacity="0.6"/>
    <path d="M320 255 L360 255 L370 290 L325 290 Z" fill="${shade(c, 40)}" opacity="0.6"/>
    <circle cx="225" cy="352" r="26" fill="#333"/>
    <circle cx="225" cy="352" r="11" fill="#ccc"/>
    <circle cx="375" cy="352" r="26" fill="#333"/>
    <circle cx="375" cy="352" r="11" fill="#ccc"/>`;
}

function puzzleIcon(c) {
  return `
    <path d="M210 210 H290 V235 Q290 250 305 250 Q320 250 320 235 V210 H390 V280 H375 Q360 280 360 295 Q360 310 375 310 H390 V380 H210 Z" fill="${c}"/>`;
}

function packetIcon(c) {
  return `
    <path d="M225 180 L375 180 L390 250 Q400 320 385 395 Q382 410 365 410 L235 410 Q218 410 215 395 Q200 320 210 250 Z" fill="${c}"/>
    <rect x="225" y="180" width="150" height="24" fill="${shade(c, -35)}"/>
    <rect x="240" y="260" width="120" height="60" rx="6" fill="${shade(c, 40)}" opacity="0.35"/>`;
}

function oilBottleIcon(c) {
  return `
    <path d="M265 210 L335 210 L345 260 L355 400 Q355 415 340 415 L260 415 Q245 415 245 400 L255 260 Z" fill="${c}" opacity="0.7"/>
    <rect x="278" y="160" width="44" height="55" rx="6" fill="${shade(c, -25)}"/>
    <rect x="286" y="130" width="28" height="34" rx="6" fill="${shade(c, -45)}"/>`;
}

const ICONS = {
  phone: phoneIcon,
  laptop: laptopIcon,
  headphones: headphonesIcon,
  earbuds: earbudsIcon,
  speaker: speakerIcon,
  tv: tvIcon,
  mouse: mouseIcon,
  camera: cameraIcon,
  sneaker: sneakerIcon,
  jeans: jeansIcon,
  sunglasses: sunglassesIcon,
  shirt: shirtIcon,
  smartwatch: smartwatchIcon,
  analogWatch: analogWatchIcon,
  cooker: cookerIcon,
  airfryer: airfryerIcon,
  bed: bedIcon,
  flask: flaskIcon,
  vacuum: vacuumIcon,
  fan: fanIcon,
  book: bookIcon,
  bottleSerum: bottleSerumIcon,
  bottlePump: bottlePumpIcon,
  tube: tubeIcon,
  jar: jarIcon,
  racquet: racquetIcon,
  football: (c) => ballIcon(c, "football"),
  basketball: (c) => ballIcon(c, "basketball"),
  mat: matIcon,
  blocks: blocksIcon,
  toycar: toyCarIcon,
  puzzle: puzzleIcon,
  packet: packetIcon,
  oilBottle: oilBottleIcon,
};

// Map free-text title keywords to an icon type. Checked in order, first
// match wins, so more specific phrases are listed first.
const TYPE_RULES = [
  [/iphone|galaxy|smartphone|mobile|redmi|pixel/i, "phone"],
  [/laptop|macbook|xps|notebook/i, "laptop"],
  [/earbuds|airdopes|airpods/i, "earbuds"],
  [/headphone/i, "headphones"],
  [/echo dot|smart speaker|alexa/i, "speaker"],
  [/bluetooth speaker|jbl|flip 6/i, "speaker"],
  [/\btv\b|television|qled|smart tv/i, "tv"],
  [/mouse/i, "mouse"],
  [/camera|eos|mirrorless/i, "camera"],
  [/sneaker|air force|running shoes|ultraboost/i, "sneaker"],
  [/jeans/i, "jeans"],
  [/sunglasses|aviator/i, "sunglasses"],
  [/shirt/i, "shirt"],
  [/smartwatch|gen 6/i, "smartwatch"],
  [/watch/i, "analogWatch"],
  [/pressure cooker/i, "cooker"],
  [/air fryer/i, "airfryer"],
  [/bed frame/i, "bed"],
  [/thermosteel|flask|thermos/i, "flask"],
  [/vacuum/i, "vacuum"],
  [/exhaust fan|ventil/i, "fan"],
  [/paperback|book|sapiens|alchemist|habits|deep work/i, "book"],
  [/serum/i, "bottleSerum"],
  [/shampoo/i, "bottlePump"],
  [/face wash|toothpaste/i, "tube"],
  [/dal|coffee|milk powder|tata sampann|nescafe|amul/i, "packet"],
  [/cream/i, "jar"],
  [/racquet|racket/i, "racquet"],
  [/football/i, "football"],
  [/basketball/i, "basketball"],
  [/yoga mat/i, "mat"],
  [/lego|bricks/i, "blocks"],
  [/hot wheels|toy car/i, "toycar"],
  [/puzzle/i, "puzzle"],
  [/dal|coffee|milk powder|tata sampann|nescafe|amul/i, "packet"],
  [/sunflower oil|refined oil/i, "oilBottle"],
];

export function detectType(title) {
  for (const [re, type] of TYPE_RULES) {
    if (re.test(title)) return type;
  }
  return "packet";
}

// Plain-English, brand-free search terms for looking up real stock photos
// per product type (used by photoService.js) — keyed the same as ICONS.
export const SEARCH_TERMS = {
  phone: "smartphone",
  laptop: "laptop computer",
  headphones: "headphones",
  earbuds: "wireless earbuds",
  speaker: "smart speaker",
  tv: "flat screen television",
  mouse: "computer mouse",
  camera: "mirrorless camera",
  sneaker: "sneakers shoes",
  jeans: "blue jeans",
  sunglasses: "sunglasses",
  shirt: "collared shirt",
  smartwatch: "smartwatch",
  analogWatch: "wrist watch",
  cooker: "pressure cooker kitchen",
  airfryer: "air fryer kitchen appliance",
  bed: "bed frame furniture",
  flask: "steel thermos flask",
  vacuum: "cordless vacuum cleaner",
  fan: "exhaust fan",
  book: "books stack",
  bottleSerum: "skincare serum bottle",
  bottlePump: "shampoo bottle",
  tube: "face wash tube cosmetic",
  jar: "cosmetic cream jar",
  racquet: "badminton racket",
  football: "soccer ball",
  basketball: "basketball",
  mat: "yoga mat rolled",
  blocks: "colorful building block toys",
  toycar: "toy car",
  puzzle: "jigsaw puzzle box",
  packet: "grocery pouch pantry",
  oilBottle: "cooking oil bottle",
};

function placeholderImage(title, category, seed) {
  const vis = categoryVisual[category] || { tint: "#F3F4F6", accent: "#6B7280" };
  const type = detectType(title);
  const draw = ICONS[type] || ICONS.packet;
  const hue = hashStr(title + seed) % 40; // 0-39, subtle per-product tint shift
  const color = shade(vis.accent, hue - 20);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
    <rect width="600" height="600" fill="#FFFFFF"/>
    <rect width="600" height="600" fill="${vis.tint}"/>
    ${shadow()}
    ${draw(color)}
  </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

products.forEach((p) => {
  const count = Math.max(p.images.length, 1);
  p.images = Array.from({ length: count }, (_, i) => placeholderImage(p.title, p.category, i));
});

export default products;
