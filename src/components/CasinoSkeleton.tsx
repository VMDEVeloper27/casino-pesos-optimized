export default function CasinoSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 animate-pulse">
      <div className="grid lg:grid-cols-[200px,1fr,300px] gap-6">
        {/* Casino Info Skeleton */}
        <div className="text-center lg:text-left">
          <div className="w-24 h-16 bg-gray-200 rounded-lg mx-auto lg:mx-0 mb-3"></div>
          <div className="h-6 bg-gray-200 rounded w-32 mx-auto lg:mx-0 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-24 mx-auto lg:mx-0 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-16 mx-auto lg:mx-0"></div>
        </div>

        {/* Details Skeleton */}
        <div>
          <div className="bg-gray-100 rounded-lg p-4 mb-4">
            <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i}>
                <div className="h-3 bg-gray-200 rounded w-16 mb-1"></div>
                <div className="h-5 bg-gray-200 rounded w-20"></div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-8 bg-gray-200 rounded-full w-20"></div>
            ))}
          </div>
        </div>

        {/* Actions Skeleton */}
        <div className="flex flex-col gap-3">
          <div className="h-12 bg-gray-200 rounded-xl"></div>
          <div className="h-12 bg-gray-200 rounded-xl"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-3 bg-gray-200 rounded w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CasinoSkeletonList({ count = 5 }: { count?: number }) {
  return (
    <div className="grid gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <CasinoSkeleton key={index} />
      ))}
    </div>
  );
}