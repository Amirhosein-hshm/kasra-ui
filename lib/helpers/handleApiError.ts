import { toast } from 'sonner';

export function handleApiError(
  error: any,
  customHandler?: (error: any) => void
) {
  if (customHandler) {
    customHandler(error);
  }

  if (!error.__handled__) {
    const message = 'مشکلی پیش آمده!';

    toast.error(message);

    error.__handled__ = true;
  }

  throw error;
}
