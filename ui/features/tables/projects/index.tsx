'use client';

import Project from '@/lib/types/models/Project';
import DataTable from '@/ui/components/data-table/index';
import { projectsTableColumns } from './columns';

interface Props {
  data: Project[];
}

export default function ProjectsTable({ data }: Props) {
  return <DataTable columns={projectsTableColumns} data={data} />;
}
