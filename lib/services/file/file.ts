import type { BodyUploadFileFileUploadPost } from '../../types';

import { api } from '../../axios/mutator';

export interface UploadFileOptions {
  /** progress(percentage, loaded, total) */
  onProgress?: (percentage: number, loaded: number, total?: number) => void;
}

export const getFile = () => {
  /**
   * @summary Upload File
   */
  const uploadFileFileUploadPost = (
    bodyUploadFileFileUploadPost: BodyUploadFileFileUploadPost
  ) => {
    const formData = new FormData();
    formData.append(`file`, bodyUploadFileFileUploadPost.file);

    return api<unknown>({
      url: `/file/upload/`,
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData,
    });
  };
  /**
   * @summary Download File
   */

  const uploadFileWithProgress = async (
    body: BodyUploadFileFileUploadPost,
    options: UploadFileOptions = {}
  ) => {
    if (body.file.type !== 'application/pdf') {
      throw new Error('فقط فایل PDF مجاز است');
    }

    const formData = new FormData();
    formData.append('file', body.file);

    const res = await api<UploadFileFileUploadPostResult>({
      url: '/file/upload/',
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData,
      onUploadProgress: (pe) => {
        if (options.onProgress) {
          const percentage = pe.total
            ? Math.round((pe.loaded * 100) / pe.total)
            : 0;
          options.onProgress(percentage, pe.loaded, pe.total);
        }
      },
    });

    return res.data;
  };

  const downloadFileFileDownloadFileIdGet = (fileId: number) => {
    return api<unknown>({ url: `/file/download/${fileId}`, method: 'GET' });
  };
  /**
   * @summary Get File Ids
   */
  const getFileIdsFileFilesGet = () => {
    return api<unknown>({ url: `/file/files`, method: 'GET' });
  };
  return {
    uploadFileFileUploadPost,
    downloadFileFileDownloadFileIdGet,
    getFileIdsFileFilesGet,
    uploadFileWithProgress,
  };
};
export type UploadFileFileUploadPostResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getFile>['uploadFileFileUploadPost']>>
>;
export type DownloadFileFileDownloadFileIdGetResult = NonNullable<
  Awaited<
    ReturnType<ReturnType<typeof getFile>['downloadFileFileDownloadFileIdGet']>
  >
>;
export type GetFileIdsFileFilesGetResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getFile>['getFileIdsFileFilesGet']>>
>;
