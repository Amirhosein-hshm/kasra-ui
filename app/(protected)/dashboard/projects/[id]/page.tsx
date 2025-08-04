'use client';

import { getSupervisor } from '@/lib/services';
import { ProjectResponse } from '@/lib/types';
import ErrorView from '@/ui/features/error/error.view';
import SingleProjectPage from '@/ui/pages/projects/single-project.page';
import { QueryClient, useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { Suspense, use } from 'react';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const paramsObj = use(params);
  const projectId = Number(paramsObj.id);

  const queryClient = new QueryClient();

  const query = useSuspenseQuery({
    queryKey: ['supervisorSingleProject', projectId],
    queryFn: () =>
      getSupervisor()
        .readProjectsSupervisorSingleProjectProjectIdGet(projectId)
        .then((res) => res.data)
        .catch((err) => {
          console.log(err);
        }),
  });

  if (query.isError) {
    return <ErrorView />;
  }

  return (
    <Suspense>
      {query.data ? <SingleProjectPage project={query.data} /> : <></>}
    </Suspense>
  );
}
