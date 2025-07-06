import { useBrokerProposal } from '@/lib/hooks';
import { Sidebar } from '@/ui/components/sidebar/sidebar';
import { ProposalResponse } from 'lib/types/proposalResponse';
import { ProposalDetailSkeleton } from './loading/proposal-detail-loading';

interface ProposalSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selected?: ProposalResponse | null;
}

const keyLabels: Partial<Record<keyof ProposalResponse, string>> = {
  id: 'شناسه پروپوزال',
  info: 'اطلاعات',
  RFP_id: 'شناسه RFP',
  userId: 'شناسه کاربر',
  comment: 'توضیحات',
  state: 'وضعیت',
};

export function ProposalDetailSideBar({
  open,
  onOpenChange,
  selected,
}: ProposalSidebarProps) {
  const { data, isLoading } = useBrokerProposal(selected?.id ?? 0, {
    enabled: open && !!selected?.id,
    queryKey: ['brokerProposal', selected?.id],
  });

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
            {(Object.entries(data) as [keyof ProposalResponse, any][]).map(
              ([key, value]) => {
                if (key === 'fileId') return null;
                return (
                  <div key={key} className="flex justify-between items-center">
                    <span className="font-medium">
                      {keyLabels[key] ?? key}:
                    </span>
                    <span className="text-right break-all">
                      {value?.toString()}
                    </span>
                  </div>
                );
              }
            )}
          </div>

          {data.fileId && (
            <a
              href={`http://localhost:8000/file/download/${data.fileId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-blue-600 dark:text-blue-400 hover:underline mt-2"
            >
              📎 دانلود فایل پیوست‌شده
            </a>
          )}
        </div>
      ) : (
        <ProposalDetailSkeleton />
      )}
    </Sidebar>
  );
}
