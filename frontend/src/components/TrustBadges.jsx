import React from "react";

const badges = [
  { icon: "🚚", title: "Free Delivery", desc: "On orders above ₹500" },
  { icon: "↩️", title: "7-Day Returns", desc: "No questions asked" },
  { icon: "🔒", title: "Secure Payments", desc: "100% protected checkout" },
  { icon: "🎧", title: "24/7 Support", desc: "We're here to help" },
];

export default function TrustBadges() {
  return (
    <section className="border-y border-border bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {badges.map((b) => (
          <div key={b.title} className="flex items-center gap-3">
            <span className="text-2xl">{b.icon}</span>
            <div>
              <p className="text-sm font-semibold text-ink">{b.title}</p>
              <p className="text-xs text-muted">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
