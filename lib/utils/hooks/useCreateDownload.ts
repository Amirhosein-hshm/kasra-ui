import { useDownload } from '@/lib/hooks/useDownload';
import { toast } from 'sonner';

export function useCreateDownload(id: number) {
  const { mutateAsync, isPending } = useDownload();

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

  return { onDownLoad, isPending };
}
