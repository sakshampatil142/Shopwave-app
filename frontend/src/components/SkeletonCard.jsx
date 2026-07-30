import React from "react";

export default function SkeletonCard() {
  return (
    <div className="bg-surface rounded-2xl border border-border/60 overflow-hidden animate-pulse">
      <div className="aspect-square bg-surface2" />
      <div className="p-4 space-y-2">
        <div className="h-2.5 w-1/3 bg-surface2 rounded" />
        <div className="h-3.5 w-full bg-surface2 rounded" />
        <div className="h-3.5 w-2/3 bg-surface2 rounded" />
        <div className="h-4 w-1/2 bg-surface2 rounded mt-2" />
        <div className="h-9 w-full bg-surface2 rounded-full mt-3" />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
      {[...Array(count)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
