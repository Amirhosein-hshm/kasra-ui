import { useBrokerProposal, useUserProposal } from '@/lib/hooks';
import { Sidebar } from '@/ui/components/sidebar/sidebar';
import { ProposalResponse } from 'lib/types/proposalResponse';
import { ProposalDetailSkeleton } from './loading/proposal-detail-loading';
import { json } from 'stream/consumers';
import { useMeStore } from '@/lib/stores/me.stores';
import { UserType } from '@/lib/types/UserType.enum';
import FileDownload from '@/ui/features/file-download/fileDownload';

interface ProposalSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selected?: ProposalResponse | null;
}

export function ProposalDetailSideBar({
  open,
  onOpenChange,
  selected,
}: ProposalSidebarProps) {
  const userTypeId = useMeStore((s) => s.user?.userTypeId);

  const { data: brokerQ, isLoading: brokerLoading } = useBrokerProposal(
    selected?.id ?? 0,
    {
      enabled: open && !!selected?.id && userTypeId === UserType.Broker,
      queryKey: ['brokerProposal', selected?.id],
    }
  );

  const { data: userQ, isLoading: userLoading } = useUserProposal(
    selected?.id ?? 0,
    {
      enabled: open && !!selected?.id && userTypeId === UserType.User,
      queryKey: ['userProposal', selected?.id],
    }
  );

  const data = brokerQ || userQ;
  const isLoading = brokerLoading || userLoading;

  return (
    <Sidebar
      open={open}
      onOpenChange={onOpenChange}
      title={`جزئیات پروپوزال ${selected?.id ?? ''}`}
      description=""
    >
      {!isLoading && data ? (
        <div className="space-y-3 text-sm text-gray-800 dark:text-gray-100">
          <div className="rounded-lg border p-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">عنوان</span>
              <span className="text-right break-all">{selected?.info}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">عنوان RFP</span>
              <span className="text-right break-all">{selected?.rfp.info}</span>
            </div>
            {selected?.rfp.RFP_field?.title && (
              <div className="flex justify-between items-center">
                <span className="font-medium">دسته بندی</span>
                <span className="text-right break-all">
                  {selected?.rfp.RFP_field?.title}
                </span>
              </div>
            )}
          </div>

          <FileDownload id={data.fileId!} />
        </div>
      ) : (
        <ProposalDetailSkeleton />
      )}
    </Sidebar>
  );
}
