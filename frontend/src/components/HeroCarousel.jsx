import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    tag: "New season, new deals",
    heading: "Everything you need,\ndelivered to your door.",
    body: "Shop electronics, fashion, home essentials and more — all in one place, with fast delivery across India.",
    cta: { label: "Shop Electronics", to: "/category/Electronics" },
    accent: "accent",
  },
  {
    tag: "Up to 60% off",
    heading: "Today's Deals\nare too good to miss.",
    body: "Hand-picked discounts across every category, refreshed daily. Grab them before they're gone.",
    cta: { label: "See Today's Deals", to: "/deals" },
    accent: "amber",
  },
  {
    tag: "Trending now",
    heading: "Fashion that keeps up\nwith you.",
    body: "From everyday sneakers to statement watches — the styles everyone's adding to cart this week.",
    cta: { label: "Shop Fashion", to: "/category/Fashion" },
    accent: "magenta",
  },
];

const accentClasses = {
  accent: "bg-accent-500 hover:bg-accent-400 text-ink shadow-glow",
  amber: "bg-amber-500 hover:bg-amber-400 text-ink",
  magenta: "bg-magenta-500 hover:bg-magenta-400 text-white",
};

export default function HeroCarousel({ images = [] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive((a) => (a + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[active];

  return (
    <section className="relative bg-surface border-b border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1">
          <p className="uppercase tracking-widest text-amber-400 text-xs font-semibold mb-3">{slide.tag}</p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold leading-tight mb-4 text-ink whitespace-pre-line min-h-[9rem] md:min-h-[7.5rem]">
            {slide.heading}
          </h1>
          <p className="text-muted mb-6 max-w-md">{slide.body}</p>
          <div className="flex flex-wrap gap-3 items-center">
            <Link
              to={slide.cta.to}
              className={`inline-block font-semibold px-6 py-3 rounded-full transition-colors ${accentClasses[slide.accent]}`}
            >
              {slide.cta.label}
            </Link>
            <div className="flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    i === active ? "w-6 bg-accent-500" : "w-2 bg-border"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-4">
          {images.slice(0, 4).map((p) => (
            <Link key={p.id} to={`/product/${p.id}`} className="block">
              <img
                src={p.images[0]}
                alt={p.title}
                className="rounded-2xl aspect-square object-cover shadow-lg border border-border hover:border-accent-500 transition-colors"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
