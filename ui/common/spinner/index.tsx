import { LoaderCircle, LucideProps } from 'lucide-react';
import styles from './spinner.module.css';
import clsx from 'clsx';

export default function Spinner(props: LucideProps) {
  return (
    <LoaderCircle {...props} className={clsx(styles.spin, props.className)} />
  );
}
