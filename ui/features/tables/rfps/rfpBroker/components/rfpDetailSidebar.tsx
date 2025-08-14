import { useBrokerRfp } from '@/lib/hooks';
import { Sidebar } from '@/ui/components/sidebar/sidebar';
import { RfpDetailSkeleton } from './loading/RfpDetailsLoading';
import FileDownloadLink from '@/ui/features/file-download/FileDownloadLink';
import { RFPResponse } from '@/lib/types';
import { getFullName } from '@/lib/utils';
import { toJalaliYMD } from '@/lib/utils/toJalali';

interface RfpSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selected?: RFPResponse | null;
}

export function RFPDetailSideBar({
  open,
  onOpenChange,
  selected,
}: RfpSidebarProps) {
  const { data, isLoading } = useBrokerRfp(selected?.id);

  return (
    <Sidebar
      open={open}
      onOpenChange={onOpenChange}
      showDefaultFooter={false}
      title={`جزئیات RFP ${selected?.id ?? ''}`}
      description=""
    >
      {!isLoading && data ? (
        <div className="space-y-3 text-sm text-gray-800 dark:text-gray-100">
          <div className="rounded-lg border p-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">عنوان</span>
              <span className="text-right break-all">{selected?.info}</span>
            </div>
            {/* @ts-ignore */}
            {selected?.rfpField?.title && (
              <div className="flex justify-between items-center">
                <span className="font-medium">دسته بندی</span>
                <span className="text-right break-all">
                  {/* @ts-ignore */}
                  {selected?.rfpField?.title}
                </span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="font-medium">ثبت کننده</span>
              <span className="text-right break-all">
                {getFullName(selected?.creator!)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium"> تاریخ ثبت</span>
              <span className="text-right break-all">
                {toJalaliYMD(selected?.createdAt!)}
              </span>
            </div>
          </div>
          <FileDownloadLink id={data.fileId!} />
        </div>
      ) : (
        <RfpDetailSkeleton />
      )}
    </Sidebar>
  );
}
