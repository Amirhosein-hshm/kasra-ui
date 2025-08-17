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
        <title>سامانه کسری</title>
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
