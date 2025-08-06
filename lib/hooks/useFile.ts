import { getFile } from '@/lib/services/file';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';

import type {
  DownloadFileFileDownloadFileIdGetResult,
  GetFileIdsFileFilesGetResult,
  UploadFileFileUploadPostResult,
} from '@/lib/services/file/file';

export function useUploadFile(
  options?: UseMutationOptions<
    UploadFileFileUploadPostResult,
    Error,
    { file: File }
  >
) {
  return useMutation<any, any, { file: File }, any>({
    mutationKey: ['uploadFile'],
    mutationFn: async ({ file }: { file: File }) => {
      const response = await getFile().uploadFileFileUploadPost({ file });
      return response.data;
    },
    ...options,
  });
}

export function useDownloadFile(
  fileId: number,
  options?: UseQueryOptions<DownloadFileFileDownloadFileIdGetResult, Error>
) {
  return useQuery({
    queryKey: ['downloadFile', fileId],
    queryFn: () =>
      getFile()
        .downloadFileFileDownloadFileIdGet(fileId)
        .then((res) => res.data as DownloadFileFileDownloadFileIdGetResult),
    enabled: !!fileId,
    ...options,
  });
}

export function useFileIds(
  options?: UseQueryOptions<GetFileIdsFileFilesGetResult, Error>
) {
  return useQuery({
    queryKey: ['fileIds'],
    queryFn: () =>
      getFile()
        .getFileIdsFileFilesGet()
        .then((res) => res.data as GetFileIdsFileFilesGetResult),
    ...options,
  });
}
