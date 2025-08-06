import { api } from '../axios/mutator';

interface FileUoladdParams {
  id: string | number;
}
export const downloadFile = async (params?: FileUoladdParams) => {
  const data = await api<any>({
    url: `/file/download/${params?.id}`,
    method: 'GET',
    responseType: 'blob',
  });

  return data;
};
