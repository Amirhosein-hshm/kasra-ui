'use client';

import { Skeleton } from '@/ui/components/skeleton';

export function RFPSidebarSkeleton() {
  return (
    <div className="space-y-6 px-4 pt-6 pb-10">
      <div className="space-y-1">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      <div className="space-y-1">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      <div className="space-y-1">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-20 w-full rounded-md" />
      </div>

      <div className="pt-4">
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
    </div>
  );
}
