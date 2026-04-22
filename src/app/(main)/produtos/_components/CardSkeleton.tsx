export default function CardSkeleton() {
  return (
    <div className="border rounded-lg p-4 h-[480px] animate-pulse">
      <div className="h-52 bg-gray-200 rounded mb-4" />
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/3 mt-auto" />
    </div>
  );
}