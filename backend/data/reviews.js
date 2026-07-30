const reviewers = [
  "Aarav Sharma", "Priya Patel", "Rohan Mehta", "Ananya Iyer", "Vikram Singh",
  "Sneha Reddy", "Karan Malhotra", "Divya Nair", "Arjun Kapoor", "Ishita Gupta",
  "Aditya Rao", "Meera Joshi", "Sanjay Verma", "Pooja Desai", "Rahul Bhatt",
];

const positiveTemplates = [
  "Exactly as described and arrived earlier than expected. Very happy with this purchase.",
  "Great build quality for the price. Would definitely recommend to others.",
  "Been using it for a few weeks now and it's holding up really well.",
  "Packaging was solid and the product feels premium. No complaints so far.",
  "Works perfectly, easy to set up, and looks even better in person.",
];

const neutralTemplates = [
  "Does the job, nothing extraordinary but nothing wrong either.",
  "Good value for money, though delivery took a couple of days longer than promised.",
  "Decent product overall — a couple of minor niggles but works fine day to day.",
];

const criticalTemplates = [
  "Product is okay but I expected slightly better quality given the price.",
  "Had to contact support once for a minor issue, but it got resolved quickly.",
];

// Deterministic pseudo-random generator so the same product always gets the same reviews
function seededRandom(seed) {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

export function generateReviews(productId, rating, count = 4) {
  const rand = seededRandom(productId * 7 + 13);
  const reviews = [];

  for (let i = 0; i < count; i++) {
    const nameIdx = Math.floor(rand() * reviewers.length);
    const reviewerRating = Math.max(1, Math.min(5, Math.round(rating + (rand() - 0.5) * 1.5)));
    let pool = positiveTemplates;
    if (reviewerRating <= 2) pool = criticalTemplates;
    else if (reviewerRating === 3) pool = neutralTemplates;
    const text = pool[Math.floor(rand() * pool.length)];
    const daysAgo = Math.floor(rand() * 90) + 1;
    const date = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);

    reviews.push({
      id: `${productId}-${i}`,
      name: reviewers[nameIdx],
      rating: reviewerRating,
      text,
      date: date.toISOString().slice(0, 10),
      verified: rand() > 0.2,
      helpfulCount: Math.floor(rand() * 120),
    });
  }

  return reviews.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function generateRatingBreakdown(reviews) {
  const counts = [0, 0, 0, 0, 0]; // index 0 = 1-star ... index 4 = 5-star
  reviews.forEach((r) => counts[r.rating - 1]++);
  const total = reviews.length || 1;
  return [5, 4, 3, 2, 1].map((star) => ({
    star,
    percent: Math.round((counts[star - 1] / total) * 100),
    count: counts[star - 1],
  }));
}
