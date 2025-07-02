'use client';

import DataTable from '@/ui/components/data-table/index';
import { projectsTableColumns } from './columns';
import { ProjectResponse } from '@/lib/types';

interface Props {
  data: ProjectResponse[];
}

export default function ProjectsTable({ data }: Props) {
  return <DataTable columns={projectsTableColumns} data={data} />;
}
