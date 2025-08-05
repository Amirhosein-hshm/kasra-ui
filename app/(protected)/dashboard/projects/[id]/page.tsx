'use client';

import { useSupervisorSingleProject } from '@/lib/hooks';
import SingleProjectPage from '@/ui/pages/projects/single-project.page';
import { useParams } from 'next/navigation';
import { Suspense } from 'react';

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page() {
  const { id } = useParams();
  const projectId = Number(id);

  const query = useSupervisorSingleProject(projectId);

  return (
    <Suspense>
      {query.data ? <SingleProjectPage project={query.data} /> : <></>}
    </Suspense>
  );
}
