import {
  useBrokerAllocate,
  useUserAllocate,
  useResearcherAllocate,
} from '@/lib/hooks';
import { Sidebar } from '@/ui/components/sidebar/sidebar';
import { AllocateDetailSkeleton } from './loading/AllocateDetailsLoading';
import FileDownloadLink from '@/ui/features/file-download/FileDownloadLink';
import { AllocateResponse } from '@/lib/types';
import { getFullName } from '@/lib/utils';
import { toJalaliYMD } from '@/lib/utils/toJalali';
import { useMeStore } from '@/lib/stores/me.stores';

interface AllocateSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selected?: AllocateResponse | null;
}

export function AllocateDetailSideBar({
  open,
  onOpenChange,
  selected,
}: AllocateSidebarProps) {
  const userTypeId = useMeStore((s) => s.user?.userTypeId);

  const { data: brokerAllocate, isLoading: brokerLoading } = useBrokerAllocate(
    userTypeId!,
    selected?.id
  );

  const { data: userAllocate, isLoading: userLoading } = useUserAllocate(
    userTypeId!,
    selected?.id
  );
  const { data: researcherAllocate, isLoading: researcherLoading } =
    useResearcherAllocate(userTypeId!, selected?.id);

  const data = brokerAllocate || userAllocate || researcherAllocate;
  const isLoading = brokerLoading || userLoading || researcherLoading;

  return (
    <Sidebar
      open={open}
      onOpenChange={onOpenChange}
      showDefaultFooter={false}
      title={`جزئیات تخصیص ${selected?.id ?? ''}`}
      description=""
    >
      {!isLoading && data ? (
        <div className="space-y-3 text-sm text-gray-800 dark:text-gray-100">
          <div className="rounded-lg border p-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">rfp عنوان</span>
              <span className="text-right break-all">{selected?.rfp.info}</span>
            </div>
            {/* @ts-ignore */}
            {selected?.rfp.rfpField?.title && (
              <div className="flex justify-between items-center">
                <span className="font-medium"> rfp دسته بندی</span>
                <span className="text-right break-all">
                  {/* @ts-ignore */}
                  {selected?.rfp.rfpField?.title}
                </span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="font-medium"> rfp ثبت کننده</span>
              <span className="text-right break-all">
                {getFullName(selected?.rfp.creator!)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium"> rfp تاریخ ثبت</span>
              <span className="text-right break-all">
                {toJalaliYMD(selected?.rfp.createdAt!)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">تخصیص یافته به</span>
              <span className="text-right break-all">
                {getFullName(selected?.allocatedToUser!)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">وضعیت</span>
              <span className="text-right break-all">{selected?.state}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-medium"> تخصیص دهنده</span>
              <span className="text-right break-all">
                {getFullName(selected?.rfp.creator!)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium"> تاریخ تخصیص</span>
              <span className="text-right break-all">
                {toJalaliYMD(selected?.rfp.createdAt!)}
              </span>
            </div>
          </div>
          <FileDownloadLink id={data.rfp.fileId!} />
        </div>
      ) : (
        <AllocateDetailSkeleton />
      )}
    </Sidebar>
  );
}
