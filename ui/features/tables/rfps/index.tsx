import { RFPForTable } from '@/lib/types/models/RFP';
import DataTable from '@/ui/components/data-table/index';
import { projectsTableColumns } from './columns';
import { Button } from '@/ui/components/button';
import Link from 'next/link';
import { PATHS } from '@/lib/constants/PATHS';

interface Props {
  data: RFPForTable[];
}

export default function RFPsTable({ data }: Props) {
  return (
    <DataTable
      columns={projectsTableColumns}
      data={data}
      headerAppendix={<AddRFPButton />}
    />
  );
}

const AddRFPButton = () => (
  <Link href={PATHS.dashboard.rfps.create}>
    <Button>افزودن RFP</Button>
  </Link>
);
