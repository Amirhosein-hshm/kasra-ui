import { RFPForTable } from '@/lib/types/models/RFP';
import DataTable from '@/ui/components/data-table/index';
import { projectsTableColumns } from './columns';

interface Props {
  data: RFPForTable[];
}

export default function RFPsTable({ data }: Props) {
  return <DataTable columns={projectsTableColumns} data={data} />;
}
