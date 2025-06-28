import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import LoginForm from '@/ui/features/auth/login/login-form';
import { toast } from 'sonner';

export default function AuthForms() {
  const router = useRouter();

  function handleLoginSuccess() {
    toast.success('ورود موفقیت‌آمیز بود');
    router.push('/dashboard');
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="login"
        variants={fadeLoginForm}
        initial="initial"
        animate="animate"
        exit="exit"
        className="mx-6 w-[256px]"
      >
        <LoginForm onSuccess={handleLoginSuccess} />
      </motion.div>
    </AnimatePresence>
  );
}

const fadeLoginForm = {
  initial: {
    opacity: 1,
    x: 0,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: -10,
  },
};
