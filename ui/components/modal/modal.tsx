'use client';

import { ReactNode } from 'react';
import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '../dialog'; // ← همینی که گذاشتی
import { Button } from '../button';
import { cn } from '@/lib/utils';

type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  showHeader?: boolean;
  customFooter?: ReactNode;
  showDefaultFooter?: boolean;
  onSubmit?: () => void;
  isLoading?: boolean;
  className?: string;
  size?: ModalSize;
  footerAlign?: 'start' | 'center' | 'end';
  showCloseButton?: boolean;
  disableOutsideClose?: boolean;
}

const sizeClass: Record<ModalSize, string> = {
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-md',
  lg: 'sm:max-w-lg',
  xl: 'sm:max-w-2xl',
};

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  showHeader = true,
  customFooter,
  onSubmit,
  showDefaultFooter = true,
  isLoading = false,
  className,
  size = 'lg',
  footerAlign = 'end',
  showCloseButton = true,
  disableOutsideClose = false,
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent
          showCloseButton={showCloseButton}
          className={cn(
            // پایه‌ی شاد‌سی‌اِن
            'bg-background',
            // اندازه
            sizeClass[size],
            className
          )}
          // جلوگیری از بستن با کلیک بیرون/ESC (در صورت نیاز)
          onPointerDownOutside={(e) => {
            if (disableOutsideClose) e.preventDefault();
          }}
          onEscapeKeyDown={(e) => {
            if (disableOutsideClose) e.preventDefault();
          }}
        >
          {showHeader && (title || description) && (
            <DialogHeader className="border-b pb-3">
              {title && <DialogTitle>{title}</DialogTitle>}
              {description && (
                <DialogDescription>{description}</DialogDescription>
              )}
            </DialogHeader>
          )}

          <div className="max-h-[75vh] overflow-auto py-3">{children}</div>

          {customFooter ? (
            <DialogFooter className="pt-3">{customFooter}</DialogFooter>
          ) : (
            showDefaultFooter && (
              <DialogFooter
                className={cn(
                  'pt-3 gap-2',
                  footerAlign === 'start' && 'sm:justify-start',
                  footerAlign === 'center' && 'sm:justify-center',
                  footerAlign === 'end' && 'sm:justify-end'
                )}
              >
                <DialogClose asChild>
                  <Button variant="outline">بستن</Button>
                </DialogClose>
                <Button loading={isLoading} onClick={() => onSubmit?.()}>
                  ثبت
                </Button>
              </DialogFooter>
            )
          )}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

export default Modal;
