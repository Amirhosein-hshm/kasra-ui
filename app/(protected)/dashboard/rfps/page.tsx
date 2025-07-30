'use client';

import { Suspense } from 'react';
import RfpsPage from '@/ui/pages/rfps/rfps.page';

export default function PageWrapper() {
  return (
    <Suspense fallback={<div>در حال بارگذاری فرم‌های RFP...</div>}>
      <RfpsPage />
    </Suspense>
  );
}
