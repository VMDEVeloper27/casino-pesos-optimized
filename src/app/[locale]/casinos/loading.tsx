import { CasinoSkeletonList } from '@/components/CasinoSkeleton';

export default function CasinosLoading() {
  return (
    <main className="min-h-screen bg-gray-50 pt-8 pb-16">
      <div className="container mx-auto px-4">
        {/* Header Skeleton */}
        <div className="text-center mb-8">
          <div className="h-12 bg-gray-200 rounded-lg w-96 mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded-lg w-64 mx-auto animate-pulse"></div>
        </div>

        {/* Search and Sort Bar Skeleton */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
            <div className="w-40">
              <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Results Count Skeleton */}
        <div className="mb-6">
          <div className="h-5 bg-gray-200 rounded w-48 animate-pulse"></div>
        </div>

        {/* Casino Cards Skeleton */}
        <CasinoSkeletonList count={3} />
      </div>
    </main>
  );
}