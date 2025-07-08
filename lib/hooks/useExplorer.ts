import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';

import { getExplorer } from '@/lib/services';

import {
  RFPFieldResponse,
  RFPRequest,
  RFPResponse,
  ReadRfpFieldsExplorerRfpFieldsGetParams,
  SearchRfpsEndpointExplorerRfpsGetParams,
} from 'lib/types';

export function useExplorerRfpFields(
  params?: ReadRfpFieldsExplorerRfpFieldsGetParams,
  options?: UseQueryOptions<RFPFieldResponse[], Error>
) {
  return useQuery({
    queryKey: ['explorerRfpFields', params],
    queryFn: () =>
      getExplorer()
        .readRfpFieldsExplorerRfpFieldsGet(params)
        .then((res) => res.data),
    ...options,
  });
}

export function useSearchExplorerRfps(
  params: SearchRfpsEndpointExplorerRfpsGetParams,
  options?: UseQueryOptions<RFPResponse[], Error>
) {
  return useQuery({
    queryKey: ['explorerRfpsSearch', params],
    queryFn: () =>
      getExplorer()
        .searchRfpsEndpointExplorerRfpsGet(params)
        .then((res) => res.data),
    enabled: !!params,
    ...options,
  });
}

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

export function useGetExplorerRfpById(
  rfpId: number,
  options?: UseQueryOptions<RFPResponse, Error>
) {
  return useQuery({
    queryKey: ['explorerRfpById', rfpId],
    queryFn: () =>
      getExplorer()
        .searchRfpsExplorerSingleRfpRfpIdGet(rfpId)
        .then((res) => res.data),
    enabled: !!rfpId,
    ...options,
  });
}
