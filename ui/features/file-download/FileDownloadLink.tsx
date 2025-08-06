'use client';
import { useDownload } from '@/lib/hooks/useDownload';
import { useCreateDownload } from '@/lib/utils/hooks/useCreateDownload';
import { toast } from 'sonner';

type Props = {
  id: number;
};

export default function FileDownloadLink({ id }: Props) {
  const { onDownLoad } = useCreateDownload(id);
  return (
    id && (
      <div
        className="inline-block text-blue-600 dark:text-blue-400 hover:underline mt-2"
        onClick={onDownLoad}
        style={{ cursor: 'pointer' }}
      >
        📎 دانلود فایل پیوست‌شده
      </div>
    )
  );
}
