import {
  useBrokerAllocate,
  useUserAllocate,
  useResearcherAllocate,
  useExplorerAllocate,
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

  const { data: explorerAllocate, isLoading: explorerLoading } =
    useExplorerAllocate(userTypeId!, selected?.id);

  const data =
    brokerAllocate || userAllocate || researcherAllocate || explorerAllocate;
  const isLoading =
    brokerLoading || userLoading || researcherLoading || explorerLoading;

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
              <span className="text-right break-all">{data?.rfp.info}</span>
            </div>
            {/* @ts-ignore */}
            {data?.rfp.rfpField?.title && (
              <div className="flex justify-between items-center">
                <span className="font-medium"> rfp دسته بندی</span>
                <span className="text-right break-all">
                  {/* @ts-ignore */}
                  {data?.rfp.rfpField?.title}
                </span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="font-medium"> rfp ثبت کننده</span>
              <span className="text-right break-all">
                {getFullName(data?.rfp.creator!)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium"> rfp تاریخ ثبت</span>
              <span className="text-right break-all">
                {toJalaliYMD(data?.rfp.createdAt!)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">تخصیص یافته به</span>
              <span className="text-right break-all">
                {getFullName(data?.allocatedToUser!)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">وضعیت</span>
              <span className="text-right break-all">{selected?.state}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-medium"> تخصیص دهنده</span>
              <span className="text-right break-all">
                {getFullName(data?.rfp.creator!)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium"> تاریخ تخصیص</span>
              <span className="text-right break-all">
                {toJalaliYMD(data?.rfp.createdAt!)}
              </span>
            </div>
          </div>

          {data.projectTitle && (
            <div className="rounded-lg border p-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">موضوع پروژه</span>
                <span className="text-right break-all">
                  {data?.projectTitle}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-medium">توضیحات پروژه</span>
                <span className="text-right break-all">
                  {data?.projectDescription}
                </span>
              </div>
            </div>
          )}
          <FileDownloadLink id={data.rfp.fileId!} />
        </div>
      ) : (
        <AllocateDetailSkeleton />
      )}
    </Sidebar>
  );
}
