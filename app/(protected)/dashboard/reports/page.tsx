'use client';

import { Suspense } from 'react';
import ReportsPage from '@/ui/pages/reports/reports.page';

export default function PageWrapper() {
  return (
    <Suspense fallback={<div>در حال بارگذاری گزارش‌ها...</div>}>
      <ReportsPage />
    </Suspense>
  );
}
