import { PropsWithChildren } from 'react';

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-4xl font-bold">{children}</div>
    </div>
  );
}
