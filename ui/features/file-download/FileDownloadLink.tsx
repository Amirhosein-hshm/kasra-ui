'use client';
import { useCreateDownload } from '@/lib/utils/hooks/useCreateDownload';
import Spinner from '@/ui/common/spinner';
import clsx from 'clsx';

type Props = {
  id: number;
};

export default function FileDownloadLink({ id }: Props) {
  const { onDownLoad, isPending } = useCreateDownload(id);
  return (
    id && (
      <div
        className={clsx(
          'inline-flex gap-2 text-blue-600 dark:text-blue-400 hover:underline mt-2',
          isPending && 'opacity-50'
        )}
        onClick={() => {
          if (!isPending) onDownLoad();
        }}
        style={isPending ? { cursor: 'pointer' } : {}}
      >
        📎 دانلود فایل پیوست‌شده
        {isPending && <Spinner />}
      </div>
    )
  );
}
