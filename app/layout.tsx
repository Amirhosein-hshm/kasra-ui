'use client';
import { Toaster } from '@/ui/components/sonner';
import QueryProvider from '@/lib/providers/query-provider';
import { useUserMe } from '@/lib/hooks';
import './globals.css';
import { useEffect } from 'react';
import { useMeStore } from '@/lib/stores/me.stores';

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
          <GetMeLoader />
          {children}
          <Toaster position="top-center" />
        </QueryProvider>
      </body>
    </html>
  );
}

function GetMeLoader() {
  const setUser = useMeStore((state) => state.setUser);

  const { data, isSuccess } = useUserMe({
    queryKey: ['me'],
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data);
    }
  }, [isSuccess, data, setUser]);

  return null;
}
