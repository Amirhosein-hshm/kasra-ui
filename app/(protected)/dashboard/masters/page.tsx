import MastersPage from '@/ui/pages/masters.page';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense>
      <MastersPage />
    </Suspense>
  );
}
