'use client';

import { Skeleton } from '@/ui/components/skeleton';

export function ProposalDetailSkeleton() {
  return (
    <div className="space-y-3 text-sm text-gray-800 dark:text-gray-100">
      <div className="rounded-lg border p-4 space-y-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex justify-between items-center space-x-4"
          >
            <Skeleton className="h-4 w-32" /> {/* label */}
            <Skeleton className="h-4 w-48" /> {/* value */}
          </div>
        ))}
      </div>
      <Skeleton className="h-4 w-40 mt-2" /> {/* download file placeholder */}
    </div>
  );
}
