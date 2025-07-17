import { getSupervisor } from '@/lib/services';
import { ProjectResponse } from '@/lib/types';
import ErrorView from '@/ui/features/error/error.view';
import SingleProjectPage from '@/ui/pages/projects/single-project.page';
import { QueryClient } from '@tanstack/react-query';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const projectId = Number(id);

  const queryClient = new QueryClient();

  // Prefetch the data on the server
  await queryClient.prefetchQuery({
    queryKey: ['supervisorSingleProject', projectId],
    queryFn: () =>
      getSupervisor()
        .readProjectsSupervisorSingleProjectProjectIdGet(projectId)
        .then((res) => {
          console.log(res.data);
          return res.data;
        })
        .catch((err) => {
          console.log(err);
        }),
  });

  const projectData: ProjectResponse | undefined = queryClient.getQueryData([
    'supervisorSingleProject',
    projectId,
  ]);

  if (!projectData) {
    return <ErrorView />;
  }

  return <SingleProjectPage project={projectData} />;
}
