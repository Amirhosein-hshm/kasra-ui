'use client';

import { Suspense } from 'react';
import { useMeStore } from '@/lib/stores/me.stores';
import AllocatePage from '@/ui/pages/allocates/allocates';

export default function PageWrapper() {
  const userTypeId = useMeStore((s) => s.user?.userTypeId);
  return (
    <Suspense fallback={<div>در حال بارگذاری فرم‌های تخصیص ...</div>}>
      <AllocatePage />
    </Suspense>
  );
}
