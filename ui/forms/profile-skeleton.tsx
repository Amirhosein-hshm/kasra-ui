'use client';

import { Skeleton } from '@/ui/components/skeleton';
import clsx from 'clsx';

export default function ProfileFormSkeleton() {
  return (
    <div className={clsx('flex flex-col gap-4 items-center', 'w-full h-full')}>
      <div className="w-[50%] border-white border-[1px] rounded p-2 flex flex-col gap-2">
        {[1, 2, 3, 4].map((row) => (
          <div
            key={row}
            className="flex flex-col gap-2 lg:flex-row lg:justify-between lg:items-center lg:gap-2"
          >
            <div className="flex gap-2 items-center">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-36" />
            </div>
            {row !== 4 && (
              <div className="flex gap-2 items-center">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-36" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
