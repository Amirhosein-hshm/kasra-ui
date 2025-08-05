'use client';

import {
  useSupervisorReportsByProject,
  useUserReportsByProject,
} from '@/lib/hooks';
import { useMeStore } from '@/lib/stores/me.stores';
import { ProjectResponse } from '@/lib/types';
import { UserType } from '@/lib/types/UserType.enum';
import ReportForTable from '@/lib/ui-types/ReportForTable.interface';
import { Badge } from '@/ui/components/badge';
import { FileDownload } from '@/ui/components/file-download';
import { UploadReportDialog } from '@/ui/features/dialogs/upload-report.dialog';
import ReportsTable from '@/ui/features/tables/report';
import clsx from 'clsx';
import Link from 'next/link';

interface Props {
  project: ProjectResponse;
}

export default function SingleProjectPage(props: Props) {
  const userInfo = useMeStore();
  const userTypeId = userInfo?.user?.userTypeId;
  const isUser = userTypeId === UserType.User;
  const isSupervisor = userTypeId === UserType.Supervisor;

  const projectId = props.project.id;
  const fileId = props.project.proposal.fileId;

  const supervisorReportsQuery = useSupervisorReportsByProject(projectId, {
    enabled: isSupervisor,
    queryKey: ['supervisorReportsByProject', projectId],
  });

  const userReportsQuery = useUserReportsByProject(projectId, {
    enabled: isUser,
    queryKey: ['userReportsByProject', projectId],
  });

  const dataRaw =
    userTypeId === UserType.Supervisor
      ? supervisorReportsQuery.data
      : userTypeId === UserType.User
      ? userReportsQuery.data
      : [];

  const data: ReportForTable[] =
    dataRaw?.map((item) => ({
      id: item.id,
      // FIXME:
      status: item.state ? '?' : '!',
      project: item.project.title,
      // FIXME:
      percentage: 0,
    })) ?? [];

  const isLoading =
    userTypeId === UserType.Supervisor
      ? supervisorReportsQuery.isLoading
      : userTypeId === UserType.User
      ? userReportsQuery.isLoading
      : false;

  const isSuccess =
    userTypeId === UserType.Supervisor
      ? supervisorReportsQuery.isSuccess
      : userTypeId === UserType.User
      ? userReportsQuery.isSuccess
      : false;

  return (
    <div className={clsx('PageContainer')}>
      <h1 className="my-4 flex gap-2">
        {props.project.title}
        <Badge>{(props.project.proposal.rfp as any).rfpField.title}</Badge>
      </h1>

      <Link
        href={
          fileId
            ? `${process.env.NEXT_PUBLIC_API_BASE_URL}file/download/${fileId}`
            : ''
        }
      >
        <FileDownload>
          بارگیری پروپوزال
        </FileDownload>
      </Link>

      <h2 className="mt-4">گزارش کارها</h2>

      <ReportsTable
        data={data || []}
        headerAppendix={isUser && <UploadReportDialog />}
        deactivateSelection
        // FIXME:
        loading={isLoading}
      />
    </div>
  );
}
