import { PropsWithChildren } from 'react';
import AuroraBackground from '@/ui/common/aurora-background';

export default function LoginLayout({ children }: PropsWithChildren) {
  return (
    <AuroraBackground>
      <div>{children}</div>
    </AuroraBackground>
  );
}
