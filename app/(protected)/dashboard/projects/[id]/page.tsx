import { getSupervisor } from '@/lib/services';
import { ProjectResponse } from '@/lib/types';
import ErrorView from '@/ui/features/error/error.view';
import SingleProjectPage from '@/ui/pages/projects/single-project.page';
import { QueryClient } from '@tanstack/react-query';

export default async function Page({ params }: any) {
  const { id } = params;
  const projectId = Number(id);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['supervisorSingleProject', projectId],
    queryFn: () =>
      getSupervisor()
        .readProjectsSupervisorSingleProjectProjectIdGet(projectId)
        .then((res) => res.data)
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
