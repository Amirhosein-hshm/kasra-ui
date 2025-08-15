'use client';

import { useUserReport } from '@/lib/hooks';
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

  const userReportQuery = useUserReport(reportId);

  const data: ReportResponse | null | undefined = isUser
    ? (userReportQuery.data as ReportResponse)
    : null;

  const isError = isUser ? userReportQuery.isError : null;

  if (isError) {
    return <ErrorView />;
  }

  if (data)
    return (
      <SingleReportPage
        state={Number(data?.state)}
        reportID={data?.id}
        projectID={data?.project?.id}
        fileIDs={{
          pdf: data?.filePdfId,
          word: data?.fileDocxId,
          powerpoint: data?.filePptxId,
        }}
        comment={data?.comment}
      />
    );

  return <Spinner size={50} className="my-20 mx-auto" />;
}
