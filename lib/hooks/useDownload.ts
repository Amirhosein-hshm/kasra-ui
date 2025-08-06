import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { downloadFile } from '../custom-services/downloadFiles';

export function useDownload(
  options?: UseMutationOptions<any, Error, { id: number }>
) {
  return useMutation({
    mutationFn: async ({ id }) => {
      const res = await downloadFile({ id }).then((res) => res.data);
      return res;
    },
    ...options,
  });
}
