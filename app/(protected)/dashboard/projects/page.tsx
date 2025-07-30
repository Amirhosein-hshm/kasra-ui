'use client';

import { Suspense } from 'react';
import ProjectsPage from '@/ui/pages/projects/projects.page';

export default function PageWrapper() {
  return (
    <Suspense fallback={<div>در حال بارگذاری...</div>}>
      <ProjectsPage />
    </Suspense>
  );
}
