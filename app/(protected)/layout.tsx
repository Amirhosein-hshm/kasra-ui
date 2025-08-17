'use client';
import { useUserMe } from '@/lib/hooks';
import { useMeStore } from '@/lib/stores/me.stores';
import { useEffect } from 'react';

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

  const setLoading = useMeStore((s) => s.setLoading);

  const { data, isSuccess, isPending } = useUserMe({
    queryKey: ['me'],
    staleTime: 5 * 60 * 1000,
    retry: false,
    enabled: !initialized,
  });

  useEffect(() => {
    setLoading(isPending);
  }, [isPending, setLoading]);

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data as any);
    }
  }, [isSuccess, data, setUser]);

  return null;
}
