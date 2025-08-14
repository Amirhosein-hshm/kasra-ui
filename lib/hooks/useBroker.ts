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
  UserInfoResponse,
} from 'lib/types';

/** Centralized query keys */
export const brokerQueryKeys = {
  rfps: (params?: SearchRfpsEndpointBrokerRfpsGetParams) =>
    ['broker', 'rfps', params] as const,
  rfp: (rfpId?: number) => ['broker', 'rfp', rfpId] as const,

  allocates: (params?: GetAllocatesBrokerAllocatesGetParams) =>
    ['broker', 'allocates', params] as const,
  allocate: (allocateId?: number) =>
    ['broker', 'allocate', allocateId] as const,

  users: ['broker', 'users'] as const,
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
  rfpId?: number,
  options?: UseQueryOptions<RFPResponse, Error>
) {
  return useQuery({
    queryKey: brokerQueryKeys.rfp(rfpId),
    queryFn: async () => {
      if (rfpId === undefined || rfpId === null)
        throw new Error('rfpId is required');
      const res = await getBroker().searchRfpsBrokerSingleRfpRfpIdGet(rfpId);
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
      // تازه‌سازی لیست تخصیص‌ها
      qc.invalidateQueries({ queryKey: ['broker', 'allocates'] });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
}

/** List/Get Allocates (with filters) */
export function useBrokerAllocates(
  userTypeId: number,
  params?: GetAllocatesBrokerAllocatesGetParams,
  options?: UseQueryOptions<AllocateResponse[], Error>
) {
  return useQuery({
    queryKey: brokerQueryKeys.allocates(params),
    enabled: !!userTypeId && userTypeId === 1,
    queryFn: async () => {
      const res = await getBroker().getAllocatesBrokerAllocatesGet(params);
      return res.data;
    },
    ...options,
  });
}

/** Get single Allocate by id */
export function useBrokerAllocate(
  userTypeId: number,
  allocateId?: number,
  options?: UseQueryOptions<AllocateResponse, Error>
) {
  return useQuery({
    queryKey: brokerQueryKeys.allocate(allocateId),
    queryFn: async () => {
      if (allocateId === undefined || allocateId === null)
        throw new Error('allocateId is required');
      const res =
        await getBroker().singleAllocateBrokerSingleAllocateAllocateIdGet(
          allocateId
        );
      return res.data;
    },
    enabled: typeof allocateId === 'number' && userTypeId == 1,
    ...options,
  });
}

/** Read master users (broker/users) */
export function useBrokerUsers(
  options?: UseQueryOptions<UserInfoResponse[], Error>
) {
  return useQuery({
    queryKey: brokerQueryKeys.users,
    queryFn: async () => {
      const res = await getBroker().readUsersMasterBrokerUsersGet();
      return res.data;
    },
    ...options,
  });
}
