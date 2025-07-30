'use client';

import { Suspense } from 'react';
import ProposalsPage from '@/ui/pages/proposals/proposals.page';

export default function PageWrapper() {
  return (
    <Suspense fallback={<div>در حال بارگذاری پیشنهادها...</div>}>
      <ProposalsPage />
    </Suspense>
  );
}
