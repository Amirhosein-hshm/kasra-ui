'use client';
import { useDownload } from '@/lib/hooks/useDownload';
import { toast } from 'sonner';

type Props = {
  id: number;
};

export default function FileDownload({ id }: Props) {
  const { mutateAsync } = useDownload();

  const onDownLoad = async () => {
    try {
      const blob = await mutateAsync({ id });

      const url = URL.createObjectURL(blob);
      const a = Object.assign(document.createElement('a'), {
        href: url,
        download: `file-${id}.pdf`,
      });
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      toast.success('فایل با موفقیت دانلود شد!');
    } catch (error) {
      console.error(error);
      toast.error('خطا در دانلود فایل!');
    }
  };

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
