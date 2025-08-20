'use client';

import { useSupervisorReportsByProject, useUserReport } from '@/lib/hooks';
import { useMeStore } from '@/lib/stores/me.stores';
import { UserType } from '@/lib/types/UserType.enum';
import Spinner from '@/ui/common/spinner';
import ErrorView from '@/ui/features/error/error.view';
import SingleReportPage from '@/ui/pages/reports/single-report.page';
import { useParams } from 'next/navigation';

export default function Page() {
  const { id } = useParams();
  const reportId = Number(id);

  const userInfo = useMeStore();
  const userTypeId = userInfo?.user?.userTypeId;
  const isUser = userTypeId === UserType.User;

  const userReportQuery = useUserReport(reportId);
  const projectID = userReportQuery.data?.projectId;
  const supervisorReportsQuery = useSupervisorReportsByProject(projectID, {
    enabled: userReportQuery.isSuccess,
    queryKey: ['supervisor-reports-by-project-query', projectID],
  });
  const userLastReportAcceptedProgress =
    supervisorReportsQuery.data?.[1]?.acceptedPercent;

  const isLoading = userReportQuery.isLoading;
  const data = userReportQuery.data;
  const isError = isUser ? userReportQuery.isError : null;

  if (isError) {
    return <ErrorView />;
  }

  if (data)
    return (
      <SingleReportPage
        state={data?.state}
        reportID={data?.id}
        projectID={data?.project?.id}
        fileIDs={{
          pdf: data?.filePdfId,
          word: data?.fileDocxId,
          powerpoint: data?.filePptxId,
        }}
        comment={data?.comment}
        announcedPercentage={data?.anouncedPercent}
        lastAcceptedPercentage={userLastReportAcceptedProgress ?? 0}
        acceptedPercentage={data?.acceptedPercent ?? 0}
      />
    );

  if (isLoading) return <Spinner size={50} className="my-20 mx-auto" />;
}
