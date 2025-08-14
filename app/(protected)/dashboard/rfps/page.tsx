'use client';

import { Suspense } from 'react';
import ExpelorerRfps from '@/ui/pages/rfps/expelorerRfps.page';

import BrokerRfps from '@/ui/pages/rfps/brokerRfps';
import { useMeStore } from '@/lib/stores/me.stores';

export default function PageWrapper() {
  const userTypeId = useMeStore((s) => s.user?.userTypeId);
  return (
    <Suspense fallback={<div>در حال بارگذاری فرم‌های RFP...</div>}>
      {userTypeId == 2 && <ExpelorerRfps />}
      {userTypeId == 1 && <BrokerRfps />}
    </Suspense>
  );
}
