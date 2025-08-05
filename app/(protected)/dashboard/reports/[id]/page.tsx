import { getSupervisor } from '@/lib/services';
import { ProjectResponse } from '@/lib/types';
import ErrorView from '@/ui/features/error/error.view';
import SingleReportPage from '@/ui/pages/reports/single-report.page';

import { QueryClient } from '@tanstack/react-query';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const reportId = Number(id);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['supervisorSingleProject', reportId],
    queryFn: () =>
      getSupervisor()
        .readProjectsSupervisorSingleProjectProjectIdGet(reportId)
        .then((res) => {
          console.log(res.data);
          return res.data;
        })
        .catch((err) => {
          console.log(err);
        }),
  });

  const reportData: ProjectResponse | undefined = queryClient.getQueryData([
    'supervisorSingleReport',
    reportId,
  ]);

  if (!reportData) {
    return <ErrorView />;
  }

  return <SingleReportPage />;
}
