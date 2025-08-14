'use client';

import { Suspense } from 'react';
import { useMeStore } from '@/lib/stores/me.stores';
import AllocatePage from '@/ui/pages/allocates/brokerAllocates';

export default function PageWrapper() {
  const userTypeId = useMeStore((s) => s.user?.userTypeId);
  return (
    <Suspense fallback={<div>در حال بارگذاری فرم‌های تخصیص ...</div>}>
      {userTypeId == 1 && <AllocatePage />}
    </Suspense>
  );
}
