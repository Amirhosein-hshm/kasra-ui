import UsersPage from '@/ui/pages/users/users.page';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense>
      <UsersPage />
    </Suspense>
  );
}
