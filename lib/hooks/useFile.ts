import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getFile } from '@/lib/services/file';

import type {
  DownloadFileFileDownloadFileIdGetResult,
  GetFileIdsFileFilesGetResult,
} from '@/lib/services/file/file';

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
