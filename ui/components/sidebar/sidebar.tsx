// ui/components/sidebar/sidebar.tsx
'use client';

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
  DrawerOverlay,
  DrawerPortal,
} from '../drawer';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { Button } from '../button';

interface SidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  showHeader?: boolean;
  customFooter?: ReactNode; // جایگزین فوتر پیش‌فرض
  onSubmit?: () => void; // callback برای دکمه ثبت
  showDefaultFooter?: boolean; // کنترل نمایش فوتر پیش‌فرض
  className?: string;
  side?: 'left' | 'right' | 'bottom' | 'top';
  isLoading?: boolean;
}

export function Sidebar({
  open,
  onOpenChange,
  title,
  description,
  children,
  showHeader = true,
  customFooter,
  onSubmit,
  showDefaultFooter = true,
  className,
  isLoading = false,
  side = 'left',
}: SidebarProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction={side}>
      <DrawerPortal>
        <DrawerOverlay />
        <DrawerContent
          className={cn(
            'bg-[#0a0e1a]/70 backdrop-blur-md text-white border-l border-white/10 shadow-xl',
            className
          )}
        >
          {showHeader && (title || description) && (
            <DrawerHeader className="border-b-2 border-s-fuchsia-50">
              {title && <DrawerTitle>{title}</DrawerTitle>}
              {description && (
                <DrawerDescription>{description}</DrawerDescription>
              )}
            </DrawerHeader>
          )}

          <div className="flex-1 overflow-auto p-4">{children}</div>

          {/* اگر کاربر فوتر دلخواه داده */}
          {customFooter ? (
            <DrawerFooter>{customFooter}</DrawerFooter>
          ) : (
            showDefaultFooter && (
              <DrawerFooter className="flex flex-col-reverse sm:flex-row gap-2 p-4 border-t-2 border-s-fuchsia-50">
                <DrawerClose asChild>
                  <Button variant="outline" className="w-full sm:w-auto flex-1">
                    بستن
                  </Button>
                </DrawerClose>
                {onSubmit && (
                  <Button
                    loading={isLoading}
                    className="w-full sm:w-auto flex-1"
                    onClick={() => {
                      onSubmit();
                    }}
                  >
                    ثبت
                  </Button>
                )}
              </DrawerFooter>
            )
          )}
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
}
