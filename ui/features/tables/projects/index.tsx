'use client';

import DataTable from '@/ui/components/data-table/index';
import { getProjectsTableColumns } from './columns';
import { ProjectResponse } from '@/lib/types';
import { useState } from 'react';

interface Props {
  data: ProjectResponse[];
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  setPageIndex: (index: number) => void;
  setPageSize: (size: number) => void;
  search: string;
  setSearch: (v: string) => void;
  isFetching: boolean;
}

export default function ProjectsTable({
  data,
  pageIndex,
  pageSize,
  pageCount,
  setPageIndex,
  setPageSize,
  search,
  setSearch,
  isFetching,
}: Props) {
  const [openProjectDetail, setOpenProjectDetail] = useState(false);
  const [selected, setSelected] = useState<ProjectResponse | null>(null);

  const projectsTableColumns = getProjectsTableColumns({
    onView: (item) => {
      setSelected(item);
      setOpenProjectDetail(true);
    },
    onOpenProjectDetail: (item) => {
      setSelected(item);
      setOpenProjectDetail(true);
    },
  });

  return (
    <DataTable
      columns={projectsTableColumns}
      data={data}
      externalPagination={{
        pageIndex,
        pageSize,
        pageCount,
        setPageIndex,
        setPageSize,
      }}
      search={search}
      setSearch={setSearch}
      isFetching={isFetching}
    />
  );
}
