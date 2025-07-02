'use client';
import { useBrokerProposals } from '@/lib/hooks';
import { TableSkeleton } from '@/ui/components/loadings/table-loading';
import ProposalsTable from '@/ui/features/tables/proposals';
export default function ProposalsPage() {
  const { data, isLoading } = useBrokerProposals();
  if (isLoading || !data) {
    return <TableSkeleton />;
  }
  return (
    <>
      <ProposalsTable data={data} />
    </>
  );
}
