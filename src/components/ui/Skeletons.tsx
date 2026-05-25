export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Image placeholder */}
      <div className="aspect-[3/4] bg-white/5 rounded-sm mb-4" />
      {/* Text placeholders */}
      <div className="h-3 bg-white/5 rounded w-3/4 mb-2" />
      <div className="h-3 bg-white/5 rounded w-1/3" />
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function FilterSidebarSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-4 bg-white/5 rounded w-1/2" />
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-3 bg-white/5 rounded w-3/4" />
      ))}
      <div className="h-px bg-white/5 my-4" />
      <div className="h-4 bg-white/5 rounded w-1/3" />
      <div className="h-8 bg-white/5 rounded" />
    </div>
  );
}
