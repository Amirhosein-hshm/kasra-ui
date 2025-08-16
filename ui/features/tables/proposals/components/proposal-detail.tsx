'use client';

import { useUserProposal } from '@/lib/hooks';
import { useMeStore } from '@/lib/stores/me.stores';
import { ProposalResponse } from '@/lib/types';
import { UserType } from '@/lib/types/UserType.enum';
import { Sidebar } from '@/ui/components/sidebar/sidebar';
import FileDownloadLink from '@/ui/features/file-download/FileDownloadLink';
import { PropsWithChildren } from 'react';
import { ProposalDetailSkeleton } from './loading/proposal-detail-loading';

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
            <Item title="استاد راهنما">{selected?.masterNameAndFamily}</Item>
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
          </div>

          <FileDownloadLink id={data.fileId!} />
        </div>
      ) : (
        <ProposalDetailSkeleton />
      )}
    </Sidebar>
  );
}

const Item = ({ title, children }: PropsWithChildren<{ title: string }>) => (
  <div className="flex justify-between items-center">
    <span className="font-medium">{title}</span>
    <span className="text-right break-all">{children}</span>
  </div>
);
