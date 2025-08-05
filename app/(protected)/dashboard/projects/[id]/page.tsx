'use client';

import { getSupervisor } from '@/lib/services';
import ErrorView from '@/ui/features/error/error.view';
import SingleProjectPage from '@/ui/pages/projects/single-project.page';
import { useSuspenseQuery } from '@tanstack/react-query';
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

  const query = useSuspenseQuery({
    queryKey: ['supervisorSingleProject', projectId],
    queryFn: () =>
      getSupervisor()
        .readProjectsSupervisorSingleProjectProjectIdGet(projectId)
        .then((res) => {
          console.log('data', res.data);
          return res.data;
        })
        .catch((err) => {
          console.log('err', err);
        }),
  });

  if (query.isError || (query.isSuccess && !query.data)) {
    throw new Error('no query data');
  }

  return (
    <Suspense>
      {query.data ? <SingleProjectPage project={query.data} /> : <></>}
    </Suspense>
  );
}
