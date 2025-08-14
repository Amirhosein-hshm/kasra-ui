// src/lib/hooks/broker.ts
import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { getBroker } from '@/lib/services';

import type {
  AllocateResponse,
  BrokerCreateAllocate,
  GetAllocatesBrokerAllocatesGetParams,
  RFPResponse,
  SearchRfpsEndpointBrokerRfpsGetParams,
} from 'lib/types';

/** Centralized query keys */
export const brokerQueryKeys = {
  rfps: (params?: SearchRfpsEndpointBrokerRfpsGetParams) =>
    ['broker', 'rfps', params] as const,
  rfp: (rfpId: number | undefined) => ['broker', 'rfp', rfpId] as const,
  allocates: (params?: GetAllocatesBrokerAllocatesGetParams) =>
    ['broker', 'allocates', params] as const,
  allocate: (allocateId: number | undefined) =>
    ['broker', 'allocate', allocateId] as const,
};

/** List/Search RFPs */
export function useBrokerRfps(
  params?: SearchRfpsEndpointBrokerRfpsGetParams,
  options?: UseQueryOptions<RFPResponse[], Error>
) {
  return useQuery({
    queryKey: brokerQueryKeys.rfps(params),
    queryFn: async () => {
      const res = await getBroker().searchRfpsEndpointBrokerRfpsGet(params);
      return res.data;
    },
    ...options,
  });
}

/** Get single RFP by id */
export function useBrokerRfp(
  rfpId: number | undefined,
  options?: UseQueryOptions<RFPResponse, Error>
) {
  return useQuery({
    queryKey: brokerQueryKeys.rfp(rfpId),
    queryFn: async () => {
      if (!rfpId && rfpId !== 0) throw new Error('rfpId is required');
      const res = await getBroker().searchRfpsBrokerSingleRfpRfpIdGet(rfpId!);
      return res.data;
    },
    enabled: typeof rfpId === 'number',
    ...options,
  });
}

/** Create/Add Allocate (mutation) */
export function useAddAllocate(
  options?: UseMutationOptions<AllocateResponse, Error, BrokerCreateAllocate>
) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const res = await getBroker().addAllocateBrokerAllocatesPost(payload);
      return res.data;
    },
    onSuccess: (data, variables, context) => {
      // Invalidate allocate lists so they refetch
      qc.invalidateQueries({ queryKey: ['broker', 'allocates'] });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
}

/** List/Get Allocates (with filters) */
export function useBrokerAllocates(
  params?: GetAllocatesBrokerAllocatesGetParams,
  options?: UseQueryOptions<AllocateResponse[], Error>
) {
  return useQuery({
    queryKey: brokerQueryKeys.allocates(params),
    queryFn: async () => {
      const res = await getBroker().getAllocatesBrokerAllocatesGet(params);
      return res.data;
    },
    ...options,
  });
}

/** Get single Allocate by id */
export function useBrokerAllocate(
  allocateId: number | undefined,
  options?: UseQueryOptions<AllocateResponse, Error>
) {
  return useQuery({
    queryKey: brokerQueryKeys.allocate(allocateId),
    queryFn: async () => {
      if (!allocateId && allocateId !== 0)
        throw new Error('allocateId is required');
      const res =
        await getBroker().singleAllocateBrokerSingleAllocateAllocateIdGet(
          allocateId!
        );
      return res.data;
    },
    enabled: typeof allocateId === 'number',
    ...options,
  });
}
