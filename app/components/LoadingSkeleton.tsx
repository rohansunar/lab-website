export const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse space-y-8">
      <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto" />
      <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-200 rounded" />
          ))}
        </div>
        <div className="h-[500px] bg-gray-200 rounded" />
      </div>
    </div>
  );
}; 