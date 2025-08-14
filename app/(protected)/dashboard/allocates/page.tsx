'use client';

import { Suspense } from 'react';
import AllocatePage from '@/ui/pages/allocates/allocates';

export default function PageWrapper() {
  return (
    <Suspense fallback={<div>در حال بارگذاری فرم‌های تخصیص ...</div>}>
      <AllocatePage />
    </Suspense>
  );
}
