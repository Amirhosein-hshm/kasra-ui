import { PropsWithChildren } from 'react';
import AuroraBackground from '@/lib/ui/common/aurora-background';

export default function LoginLayout({ children }: PropsWithChildren) {
  return (
    <AuroraBackground>
      <div>{children}</div>;
    </AuroraBackground>
  );
}
