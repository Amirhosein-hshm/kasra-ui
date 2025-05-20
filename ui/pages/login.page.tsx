import LoginForm from '@/ui/features/auth/login/login-form';
import { ModeToggle } from '@/ui/features/theme/mode-toggler';

export default function LoginPage() {
  return (
    <div>
      <div className="fixed top-4 right-4">
        <ModeToggle />
      </div>
      <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] backdrop-blur-[60px]">
        <LoginForm />
      </div>
    </div>
  );
}
