'use client';

import { useDarkMode } from '@/lib/hooks/useDarkMode';
import { Toaster as Sonner, ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const { isDark } = useDarkMode();

  return (
    <Sonner
      theme={isDark ? 'dark' : 'light'}
      className="toaster group"
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
