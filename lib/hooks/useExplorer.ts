// src/lib/hooks/explorer.ts
import {
  keepPreviousData,
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';

import { getExplorer } from '@/lib/services';

import type {
  AllocateResponse,
  ExplorerCreateUpdateRFP,
  ExplorerUpdateAllocate,
  ExplorerUpdateProposal,
  GetAllocatesExplorerAllocatesGetParams,
  MasterResponse,
  ProposalResponse,
  ReadProposalsExplorerProposalsGetParams,
  ReadRfpFieldsExplorerRfpFieldsGetParams,
  RFPFieldResponse,
  RFPResponse,
  SearchRfpsEndpointExplorerRfpsGetParams,
  UserInfoResponse,
} from 'lib/types';

/** Centralized query keys */
export const explorerQueryKeys = {
  rfpFields: (params?: ReadRfpFieldsExplorerRfpFieldsGetParams) =>
    ['explorer', 'rfpFields', params] as const,
  rfpsSearch: (params?: SearchRfpsEndpointExplorerRfpsGetParams) =>
    ['explorer', 'rfpsSearch', params] as const,
  rfpById: (rfpId?: number) => ['explorer', 'rfpById', rfpId] as const,

  supervisors: ['explorer', 'usersSupervisor'] as const,

  proposals: (params?: ReadProposalsExplorerProposalsGetParams) =>
    ['explorer', 'proposals', params] as const,

  allocates: (params?: GetAllocatesExplorerAllocatesGetParams) =>
    ['explorer', 'allocates', params] as const,
  allocate: (allocateId?: number) =>
    ['explorer', 'allocate', allocateId] as const,

  masters: ['explorer', 'masters'] as const, // ← جدید
};

/** Read RFP fields */
export function useExplorerRfpFields(
  params?: ReadRfpFieldsExplorerRfpFieldsGetParams,
  options?: UseQueryOptions<RFPFieldResponse[], Error>
) {
  return useQuery({
    queryKey: explorerQueryKeys.rfpFields(params),
    queryFn: async () => {
      const res = await getExplorer().readRfpFieldsExplorerRfpFieldsGet(params);
      return res.data;
    },
    ...options,
  });
}

/** Search/List RFPs */
export function useSearchExplorerRfps(
  params?: SearchRfpsEndpointExplorerRfpsGetParams,
  options?: UseQueryOptions<RFPResponse[], Error>
) {
  return useQuery({
    queryKey: explorerQueryKeys.rfpsSearch(params),
    queryFn: async () => {
      const res = await getExplorer().searchRfpsEndpointExplorerRfpsGet(params);
      return res.data;
    },
    placeholderData: keepPreviousData,
    enabled: !!params, // همان رفتار فایل قدیمی
    ...options,
  });
}

/** Add RFP */
export function useAddExplorerRfp(
  options?: UseMutationOptions<RFPResponse, Error, ExplorerCreateUpdateRFP>
) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const res = await getExplorer().addRfpExplorerRfpsPost(payload);
      return res.data;
    },
    onSuccess: (data, variables, context) => {
      // بعد از ایجاد، نتایج جست‌وجو را تازه کن
      qc.invalidateQueries({ queryKey: ['explorer', 'rfpsSearch'] });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
}

/** Edit RFP */
export function useEditExplorerRfp(
  options?: UseMutationOptions<
    RFPResponse,
    Error,
    { rfpId: number; payload: ExplorerCreateUpdateRFP }
  >
) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ rfpId, payload }) => {
      const res = await getExplorer().editRfpExplorerRfpsRfpIdPut(
        rfpId,
        payload
      );
      return res.data;
    },
    onSuccess: (data, vars, ctx) => {
      qc.invalidateQueries({ queryKey: explorerQueryKeys.rfpById(vars.rfpId) });
      qc.invalidateQueries({ queryKey: ['explorer', 'rfpsSearch'] });
      options?.onSuccess?.(data, vars, ctx);
    },
    ...options,
  });
}

/** Get RFP by id */
export function useGetExplorerRfpById(
  rfpId?: number,
  options?: UseQueryOptions<RFPResponse, Error>
) {
  return useQuery({
    queryKey: explorerQueryKeys.rfpById(rfpId),
    queryFn: async () => {
      if (rfpId === undefined || rfpId === null)
        throw new Error('rfpId is required');
      const res = await getExplorer().searchRfpsExplorerSingleRfpRfpIdGet(
        rfpId
      );
      return res.data;
    },
    enabled: typeof rfpId === 'number',
    ...options,
  });
}

/** List Supervisors */
export function useExplorerUsersSupervisor(
  open: boolean,
  options?: UseQueryOptions<UserInfoResponse[], Error>
) {
  return useQuery({
    enabled: open,
    queryKey: explorerQueryKeys.supervisors,
    queryFn: async () => {
      const res =
        await getExplorer().readUsersSupervisorExplorerUsersSupervisorGet();
      return res.data;
    },
    ...options,
  });
}

/** List Proposals */
export function useExplorerProposals(
  userTypeId: number,
  params?: ReadProposalsExplorerProposalsGetParams,
  options?: UseQueryOptions<ProposalResponse[], Error>
) {
  return useQuery({
    enabled: userTypeId == 2,
    placeholderData: keepPreviousData,
    queryKey: explorerQueryKeys.proposals(params),
    queryFn: async () => {
      const res = await getExplorer().readProposalsExplorerProposalsGet(params);
      return res.data;
    },
    ...options,
  });
}

/** Edit Proposal */
export function useAcceptExplorerProposal(
  options?: UseMutationOptions<
    ProposalResponse,
    Error,
    { proposalId: number; payload: ExplorerUpdateProposal }
  >
) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ proposalId, payload }) => {
      const res =
        await getExplorer().editProposalExplorerAcceptProposalProposalIdPut(
          proposalId,
          payload
        );
      return res.data;
    },
    onSuccess: (data, vars, ctx) => {
      qc.invalidateQueries();
      options?.onSuccess?.(data, vars, ctx);
    },
    ...options,
  });
}

/** Edit Proposal */
export function useEditRequestExplorerProposal(
  options?: UseMutationOptions<
    ProposalResponse,
    Error,
    { proposalId: number; comment: string }
  >
) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ proposalId, comment }) => {
      const res =
        await getExplorer().editProposalAndCreateProjectExplorerEditProposalProposalIdPut(
          proposalId,
          { comment }
        );
      return res.data;
    },
    onSuccess: (data, vars, ctx) => {
      qc.invalidateQueries();
      options?.onSuccess?.(data, vars, ctx);
    },
    ...options,
  });
}

/** List Allocates */
export function useExplorerAllocates(
  userTypeId: number,
  params?: GetAllocatesExplorerAllocatesGetParams,
  options?: UseQueryOptions<AllocateResponse[], Error>
) {
  return useQuery({
    queryKey: explorerQueryKeys.allocates(params),
    placeholderData: keepPreviousData,
    enabled: userTypeId == 2,
    queryFn: async () => {
      const res = await getExplorer().getAllocatesExplorerAllocatesGet(params);
      return res.data;
    },
    ...options,
  });
}

/** Single Allocate */
export function useExplorerAllocate(
  userTypeId: number,
  allocateId?: number,
  options?: UseQueryOptions<AllocateResponse, Error>
) {
  return useQuery({
    queryKey: explorerQueryKeys.allocate(allocateId),
    queryFn: async () => {
      if (allocateId === undefined || allocateId === null)
        throw new Error('allocateId is required');
      const res =
        await getExplorer().singleAllocateExplorerSingleAllocateAllocateIdGet(
          allocateId
        );
      return res.data;
    },
    enabled: typeof allocateId === 'number' && userTypeId == 2,
    ...options,
  });
}

/** Edit Allocate */
export function useEditExplorerAllocate(
  options?: UseMutationOptions<
    AllocateResponse,
    Error,
    { allocateId: number; payload: ExplorerUpdateAllocate }
  >
) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ allocateId, payload }) => {
      const res =
        await getExplorer().editAllocateExplorerAllocatesAllocateIdPut(
          allocateId,
          payload
        );
      return res.data;
    },
    onSuccess: (data, vars, ctx) => {
      qc.invalidateQueries({ queryKey: ['explorer', 'allocates'] });
      qc.invalidateQueries({
        queryKey: explorerQueryKeys.allocate(vars.allocateId),
      });
      options?.onSuccess?.(data, vars, ctx);
    },
    ...options,
  });
}

/** Get Masters (جدید) */
export function useExplorerMasters(
  options?: UseQueryOptions<MasterResponse[], Error>
) {
  return useQuery({
    queryKey: explorerQueryKeys.masters,
    queryFn: async () => {
      const res = await getExplorer().getMastersExplorerMastersGet();
      return res.data;
    },
    ...options,
  });
}
