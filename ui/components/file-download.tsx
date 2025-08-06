'use client';

import { IconDownload } from '@tabler/icons-react';
import { Button, ButtonProps } from './button';
import { useDownload } from '@/lib/hooks/useDownload';
import { useCreateDownload } from '@/lib/utils/hooks/useCreateDownload';

interface FileDownloadType extends Omit<ButtonProps, 'id'> {
  id: number;
}

export const FileDownload = ({
  id,
  children,
  variant = 'outline',
  ...rest
}: FileDownloadType) => {
  const { onDownLoad, isPending } = useCreateDownload(id);

  return (
    <Button
      loading={isPending}
      onClick={onDownLoad}
      variant={variant}
      {...rest}
    >
      <div className="flex gap-2 items-center">
        <IconDownload />
        <span>{children ?? 'بارگیری فایل'}</span>
      </div>
    </Button>
  );
};
