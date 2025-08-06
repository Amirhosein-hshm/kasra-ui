'use client';

import { useSupervisorSingleReport, useUserReport } from '@/lib/hooks';
import { useMeStore } from '@/lib/stores/me.stores';
import { ReportResponse } from '@/lib/types';
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
  const isSupervisor = userTypeId === UserType.Supervisor;

  const supervisorReportQuery = useSupervisorSingleReport(reportId, {
    enabled: isSupervisor,
  });
  const userReportQuery = useUserReport(reportId, {
    enabled: isUser,
  });

  const reportData: ReportResponse | null | undefined = isUser
    ? userReportQuery.data
    : isSupervisor
    ? supervisorReportQuery.data
    : null;

  if (userReportQuery.isError || supervisorReportQuery.isError) {
    return <ErrorView />;
  }
  if (userReportQuery.isLoading || supervisorReportQuery.isLoading) {
    return <></>;
  }
  if (reportData?.project) {
    return (
      <SingleReportPage
        projectID={reportData?.project?.id}
        info={reportData?.info}
        fileIDs={{
          pdf: reportData?.filePdfId,
          word: reportData?.fileDocxId,
          powerpoint: reportData?.filePptxId,
        }}
        comment={reportData?.comment}
      />
    );
  }

  return <Spinner size={50} className="my-20 mx-auto" />;
}
