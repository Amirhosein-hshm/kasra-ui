import LoginForm from '@/ui/features/auth/login/login-form';
import clsx from 'clsx';

export default function LoginPage() {
  return (
    <div
      className={clsx(
        'fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'
      )}
    >
      <LoginForm />
    </div>
  );
}
