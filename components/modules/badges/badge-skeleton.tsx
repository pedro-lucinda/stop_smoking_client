export function BadgesSkeleton({ count = 6 }: { count?: number }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <li key={i} className="animate-pulse">
          <div className="flex items-center gap-3 rounded-xl border p-3">
            <div className="h-8 w-8 rounded-lg bg-muted" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-1/2 bg-muted rounded" />
              <div className="h-3 w-2/3 bg-muted rounded" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
