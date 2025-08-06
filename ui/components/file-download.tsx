'use client';
import { IconDownload } from '@tabler/icons-react';
import { Button, ButtonProps } from './button';

export const FileDownload = (props: ButtonProps) => {
  const { children, variant, ...rest } = props;
  return (
    <Button variant={variant ?? "outline"} {...rest}>
      <div className="flex gap-2">
        <IconDownload />
        <span>{children ?? 'بارگیری فایل'}</span>
      </div>
    </Button>
  );
};
