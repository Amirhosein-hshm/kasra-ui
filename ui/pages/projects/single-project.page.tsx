'use client';
import { Button } from '@/ui/components/button';
import FileDownload from '@/ui/components/file-download';
import { UploadReportDialog } from '@/ui/features/dialogs/upload-report.dialog';
import ReportsTable from '@/ui/features/tables/report';
import clsx from 'clsx';

interface Props {
  project: {
    id: number;
    name: string;
    info: string;
    category;
  };
}

export default function SingleProjectPage(props: Props) {
  return (
    <div className={clsx('PageContainer')}>
      <h1 className="my-4">{props.project.name}</h1>

      <p>{props.project.info}</p>

      <FileDownload title="بارگیری پروپوزال" />

      <ReportsTable data={[]} headerAppendix={<UploadReportDialog />} />
    </div>
  );
}
