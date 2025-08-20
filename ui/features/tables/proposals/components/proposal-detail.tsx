'use client';

import { useUserProposal } from '@/lib/hooks';
import { useMeStore } from '@/lib/stores/me.stores';
import { ProposalResponse } from '@/lib/types';
import { UserType } from '@/lib/types/UserType.enum';
import { Sidebar } from '@/ui/components/sidebar/sidebar';
import FileDownloadLink from '@/ui/features/file-download/FileDownloadLink';
import { PropsWithChildren } from 'react';
import { ProposalDetailSkeleton } from './loading/proposal-detail-loading';
import clsx from 'clsx';
import { mutationOptions } from '@tanstack/react-query';

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

  const { data: userQ, isLoading: userLoading } = useUserProposal(
    selected?.id ?? 0,
    {
      enabled: open && !!selected?.id && userTypeId === UserType.User,
      queryKey: ['userProposal', selected?.id],
    }
  );

  const data = userQ;
  const isLoading = userLoading;

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
            <Item title="عنوان">{selected?.title}</Item>
            <Item title="توضیحات">{selected?.description}</Item>
            <Item title="استاد راهنما">{selected?.master?.name}</Item>
            <Item title="نام و نام خانوادگی مجری">
              {selected?.applicantName}
            </Item>
            <Item title="تاریخ شروع">
              {selected?.startAt
                ? new Date(selected?.startAt).toLocaleDateString('fa-IR')
                : '-'}
            </Item>
            <Item title="تاریخ پایان">
              {selected?.endAt
                ? new Date(selected?.endAt).toLocaleDateString('fa-IR')
                : '-'}
            </Item>
            <Item title="شماره تماس">{selected?.contactNumber}</Item>
            <Item title="مدرک تحصیلی">{selected?.education}</Item>
            <Item multiline title="تخصص">
              {selected?.expertise}
            </Item>
            <Item multiline title="مدت‌زمان و نفرساعت اجرای پروژه">
              {selected?.projectDuration}
            </Item>
            <Item multiline title="اهداف پروژه">
              {selected?.projectGoals}
            </Item>
            <Item multiline title="اهمیت پروژه">
              {selected?.projectImportance}
            </Item>
            <Item multiline title="جزئیات و روش های فنی انجام پروژه">
              {selected?.technicalDetails}
            </Item>
            <Item
              multiline
              title="ويژگي‌هاي اصلي و مشخصات عمومی و فني محصول پروژه"
            >
              {selected?.productFeatures}
            </Item>
            <Item
              multiline
              title="سوابق پژوهش‌ها و محصولات مشابه موجود در سطح کشور و دنیا"
            >
              {selected?.similarProducts}
            </Item>
            <Item multiline title="دستاوردهای هر گام از پروژه">
              {selected?.projectOutcomes}
            </Item>
            <Item multiline title="نوآوری پروژه">
              {selected?.projectOutcomes}
            </Item>
            <Item multiline title="ریسک‌ها و گلوگاه‌هاي احتمالی در اجرای پروژه">
              {selected?.projectRisks}
            </Item>
          </div>

          <FileDownloadLink id={data.fileId!} />
        </div>
      ) : (
        <ProposalDetailSkeleton />
      )}
    </Sidebar>
  );
}

const Item = ({
  title,
  multiline,
  children,
}: PropsWithChildren<{ title: string; multiline?: boolean }>) => (
  <div
    className={clsx(
      'flex justify-between items-center',
      multiline && 'flex-col justify-start items-start'
    )}
  >
    <span className="font-medium">
      {title}
      {multiline && ':'}
    </span>
    <span className="text-right break-all">{children}</span>
  </div>
);
