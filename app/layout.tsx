'use client';

import { Toaster } from '@/ui/components/sonner';
import QueryProvider from '@/lib/providers/query-provider';
import { DirectionProvider } from '@radix-ui/react-direction';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (theme === 'dark' || (!theme && systemDark)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (_) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <QueryProvider>
          <DirectionProvider dir="rtl">{children}</DirectionProvider>
          <Toaster position="top-center" />
        </QueryProvider>
      </body>
    </html>
  );
}
