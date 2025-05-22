import { AnimatePresence, motion } from 'framer-motion';
import LoginForm from '@/ui/features/auth/login/login-form';
import OtpForm from '@/ui/features/auth/login/otp-form';
import { AuthStep } from '@/lib/types/ui/AuthStep.enum';

interface Props {
  step: string;
  setStep: React.Dispatch<React.SetStateAction<AuthStep>>;
}

export default function AuthForms({ step, setStep }: Props) {
  function handleLoginSuccess() {
    setStep(AuthStep.Otp);
  }

  return (
    <AnimatePresence mode="wait">
      {step === AuthStep.Login ? (
        <motion.div
          key={AuthStep.Login}
          variants={fadeLoginForm}
          initial="initial"
          animate="animate"
          exit="exit"
          className="mx-6 w-[256px]"
        >
          <LoginForm onSuccess={handleLoginSuccess} />
        </motion.div>
      ) : (
        <motion.div
          key={AuthStep.Otp}
          variants={fadeOtpForm}
          initial="initial"
          animate="animate"
          exit="exit"
          className="mx-6 w-[256px] h-full"
        >
          <OtpForm />
        </motion.div>
      )}
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

const fadeOtpForm = {
  initial: {
    opacity: 0,
    x: 10,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: 10,
  },
};
