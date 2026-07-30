import React from "react";

export default function StarRating({ rating = 0, count, size = "text-sm" }) {
  const full = Math.floor(rating);

  return (
    <div className={`flex items-center gap-1 ${size}`}>
      <div className="flex text-amber-400">
        {[...Array(5)].map((_, i) => (
          <span key={i}>{i < full ? "★" : "☆"}</span>
        ))}
      </div>
      <span className="text-muted">{rating.toFixed(1)}</span>
      {count !== undefined && <span className="text-muted/70">({count.toLocaleString()})</span>}
    </div>
  );
}
