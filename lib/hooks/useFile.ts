import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getFile } from '@/lib/services/file'; // مسیر دقیق را با پروژه خود تنظیم کن

import type {
  DownloadFileFileDownloadFileIdGetResult,
  GetFileIdsFileFilesGetResult,
} from '@/lib/services/file/file'; // مسیر درست فایل orval-generated

// دانلود فایل
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

// دریافت لیست فایل‌ها
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
