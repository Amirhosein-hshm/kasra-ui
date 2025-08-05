'use client';
import { Button, ButtonProps } from './button';

export const FileDownload = (props: ButtonProps) => {
  const { children, ...rest } = props;
  return <Button {...rest}>{children ?? 'بارگیری فایل'}</Button>;
};