'use client';
import FileDownload from '@/ui/components/file-download';
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
  console.log(FileDownload);
  return (
    <div className={clsx('PageContainer')}>
      <h1 className="my-4">{props.project.name}</h1>

      <p>{props.project.info}</p>

      <FileDownload title="بارگیری پروپوزال" />

      <ReportsTable data={[]} />
    </div>
  );
}
