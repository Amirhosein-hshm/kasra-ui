'use client';
import { useUserMe } from '@/lib/hooks';
import { useEffect } from 'react';
import { useMeStore } from '@/lib/stores/me.stores';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GetMeLoader />
      {children}
    </>
  );
}

function GetMeLoader() {
  const setUser = useMeStore((s) => s.setUser);
  const initialized = useMeStore((s) => s.initialized);

  const { data, isSuccess } = useUserMe({
    queryKey: ['me'],
    staleTime: 5 * 60 * 1000,
    retry: false,
    enabled: !initialized,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data as any);
    }
  }, [isSuccess, data, setUser]);

  return null;
}
