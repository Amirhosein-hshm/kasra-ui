'use client';
import { cn } from '@/lib/utils';
import { IconDownload } from '@tabler/icons-react';
import dynamic from 'next/dynamic';
import { Button, ButtonProps } from './button';

export const FileDownload = (props: ButtonProps) => {
  const { children, ...rest } = props;
  return <Button {...rest}>{children ?? 'بارگیری فایل'}</Button>;
};
