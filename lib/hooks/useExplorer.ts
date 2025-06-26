import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { getExplorer } from '@services';
import { ReadRfpsExplorerRfpsGetParams } from 'lib/types/readRfpsExplorerRfpsGetParams';
import { RFPResponse } from 'lib/types/rFPResponse';
import { RFPRequest } from 'lib/types/rFPRequest';
import { SearchRfpsEndpointExplorerRfpsSearchGetParams } from 'lib/types/searchRfpsEndpointExplorerRfpsSearchGetParams';

// لیست RFPها
export function useExplorerRfps(
  params?: ReadRfpsExplorerRfpsGetParams,
  options?: UseQueryOptions<RFPResponse[], Error>
) {
  return useQuery({
    queryKey: ['explorerRfps', params],
    queryFn: () =>
      getExplorer()
        .readRfpsExplorerRfpsGet(params)
        .then((res) => res.data),
    ...options,
  });
}

// افزودن RFP
export function useAddExplorerRfp(
  options?: UseMutationOptions<RFPResponse, Error, RFPRequest>
) {
  return useMutation({
    mutationFn: (data) =>
      getExplorer()
        .addRfpExplorerRfpsPost(data)
        .then((res) => res.data),
    ...options,
  });
}

// جستجوی RFP
export function useSearchExplorerRfps(
  params: SearchRfpsEndpointExplorerRfpsSearchGetParams,
  options?: UseQueryOptions<RFPResponse[], Error>
) {
  return useQuery({
    queryKey: ['explorerRfpsSearch', params],
    queryFn: () =>
      getExplorer()
        .searchRfpsEndpointExplorerRfpsSearchGet(params)
        .then((res) => res.data),
    enabled: !!params,
    ...options,
  });
}

// ویرایش RFP
export function useEditExplorerRfp(
  options?: UseMutationOptions<
    RFPResponse,
    Error,
    { rfpId: number; rFPRequest: RFPRequest }
  >
) {
  return useMutation({
    mutationFn: ({ rfpId, rFPRequest }) =>
      getExplorer()
        .editRfpExplorerRfpsRfpIdPut(rfpId, rFPRequest)
        .then((res) => res.data),
    ...options,
  });
}
