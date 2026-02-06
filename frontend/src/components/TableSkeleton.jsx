export default function TableSkeleton() {
  return (
    <div className="animate-pulse">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-5 gap-4 p-3 border-b"
        >
          <div className="h-4 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded col-span-2" />
          <div className="h-4 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded" />
        </div>
      ))}
    </div>
  );
}
