import {
  keepPreviousData,
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';

import type {
  AllocateResponse,
  EditAllocateResearcherAllocatesAllocateIdPutParams,
  GetAllocatesResearcherAllocatesGetParams,
  GetAllReportsResearcherAllReportsGetParams,
  GetProjectResearcherProjectsGetParams,
  GetReportsResearcherReportsProjectIdGetParams,
  MasterRequest,
  MasterResponse,
  ProjectResponse,
  ProposalResponse,
  ResearcherProjectUpdate,
} from 'lib/types';
import { getResearcher } from '../services/researcher/researcher';

export const researcherQueryKeys = {
  projects: (params?: GetProjectResearcherProjectsGetParams) =>
    ['researcher', 'projects', params] as const,
  reportsByProject: (
    projectId?: number,
    params?: GetReportsResearcherReportsProjectIdGetParams
  ) => ['researcher', 'reportsByProject', projectId, params] as const,
  report: (reportId?: number) => ['researcher', 'report', reportId] as const,
  allReports: (params?: GetAllReportsResearcherAllReportsGetParams) =>
    ['researcher', 'allReports', params] as const,
  // Allocates
  allocates: (params?: GetAllocatesResearcherAllocatesGetParams) =>
    ['researcher', 'allocates', params] as const,
  allocate: (allocateId?: number) =>
    ['researcher', 'allocate', allocateId] as const,
  // Proposals (for edit/create project)
  proposal: (proposalId?: number) =>
    ['researcher', 'proposal', proposalId] as const,
  masters: (params?: GetAllocatesResearcherAllocatesGetParams) =>
    ['researcher', 'masters', params] as const,
};

export function useResearcherProjects(
  userTypeId: number,
  params?: GetProjectResearcherProjectsGetParams,
  options?: UseQueryOptions<ProjectResponse[], Error>
) {
  return useQuery({
    enabled: userTypeId == 5,
    placeholderData: keepPreviousData,
    queryKey: researcherQueryKeys.projects(params),
    queryFn: async () => {
      const res = await getResearcher().getProjectResearcherProjectsGet(params);
      return res.data;
    },
    ...options,
  });
}

export function useEditAcceptingProject(
  options?: UseMutationOptions<
    ProjectResponse,
    Error,
    { projectId: number; researcherProjectUpdate: ResearcherProjectUpdate }
  >
) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ projectId, researcherProjectUpdate }) => {
      const res =
        await getResearcher().editAcceptingProjectResearcherProjectsProjectIdPut(
          projectId,
          researcherProjectUpdate
        );
      return res.data;
    },
    onSuccess: (data, vars, ctx) => {
      qc.invalidateQueries({ queryKey: ['researcher', 'projects'] });
      options?.onSuccess?.(data, vars, ctx);
    },
    ...options,
  });
}
export function useResearcherReportsByProject<T = unknown>(
  projectId?: number,
  params?: GetReportsResearcherReportsProjectIdGetParams,
  options?: UseQueryOptions<T, Error>
) {
  return useQuery({
    queryKey: researcherQueryKeys.reportsByProject(projectId, params),
    queryFn: async () => {
      if (projectId === undefined || projectId === null)
        throw new Error('projectId is required');
      const res = await getResearcher().getReportsResearcherReportsProjectIdGet(
        projectId,
        params
      );
      return res.data as T;
    },
    enabled: typeof projectId === 'number',
    ...options,
  });
}

export function useResearcherReport<T = unknown>(
  reportId?: number,
  options?: UseQueryOptions<T, Error>
) {
  return useQuery({
    queryKey: researcherQueryKeys.report(reportId),
    queryFn: async () => {
      if (reportId === undefined || reportId === null)
        throw new Error('reportId is required');
      const res =
        await getResearcher().getSingleReportsResearcherSingleReportReportIdGet(
          reportId
        );
      return res.data as T;
    },
    enabled: typeof reportId === 'number',
    ...options,
  });
}

export function useResearcherAllReports<T = unknown>(
  params?: GetAllReportsResearcherAllReportsGetParams,
  options?: UseQueryOptions<T, Error>
) {
  return useQuery({
    queryKey: researcherQueryKeys.allReports(params),
    queryFn: async () => {
      const res = await getResearcher().getAllReportsResearcherAllReportsGet(
        params
      );
      return res.data as T;
    },
    ...options,
  });
}

export function useResearcherAllocates(
  userTypeId: number,
  params?: GetAllocatesResearcherAllocatesGetParams,
  options?: UseQueryOptions<AllocateResponse[], Error>
) {
  return useQuery({
    queryKey: researcherQueryKeys.allocates(params),
    placeholderData: keepPreviousData,
    enabled: userTypeId == 5,
    queryFn: async () => {
      const res = await getResearcher().getAllocatesResearcherAllocatesGet(
        params
      );
      return res.data;
    },
    ...options,
  });
}

export function useResearcherAllocate(
  userTypeId: number,
  allocateId?: number,
  options?: UseQueryOptions<AllocateResponse, Error>
) {
  return useQuery({
    queryKey: researcherQueryKeys.allocate(allocateId),
    queryFn: async () => {
      if (allocateId === undefined || allocateId === null)
        throw new Error('allocateId is required');
      const res =
        await getResearcher().singleAllocateResearcherSingleAllocateAllocateIdGet(
          allocateId
        );
      return res.data;
    },
    enabled: typeof allocateId === 'number' && userTypeId == 5,
    ...options,
  });
}

/**
 * ویرایش Allocate (با پارامترهای query/string)
 * توجه: سرویس با `params` کار می‌کند (نه body)
 */
export function useEditResearcherAllocate(
  options?: UseMutationOptions<
    AllocateResponse,
    Error,
    {
      allocateId: number;
      params?: EditAllocateResearcherAllocatesAllocateIdPutParams;
    }
  >
) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ allocateId, params }) => {
      const res =
        await getResearcher().editAllocateResearcherAllocatesAllocateIdPut(
          allocateId,
          params
        );
      return res.data;
    },
    onSuccess: (data, vars, ctx) => {
      qc.invalidateQueries({
        queryKey: researcherQueryKeys.allocate(vars.allocateId),
      });
      qc.invalidateQueries({ queryKey: ['researcher', 'allocates'] });
      options?.onSuccess?.(data, vars, ctx);
    },
    ...options,
  });
}

/* =======================
 *   PROPOSAL → PROJECT
 * ======================= */

/**
 * ویرایش پروپوزال و ایجاد پروژه
 * بعد از موفقیت، لیست پروژه‌ها invalidate می‌شود.
 */
export function useEditProposalAndCreateProject(
  options?: UseMutationOptions<
    ProposalResponse,
    Error,
    { proposalId: number; accept: boolean }
  >
) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ proposalId, accept }) => {
      const res =
        await getResearcher().editProposalAndCreateProjectResearcherProposalProposalIdPut(
          proposalId,
          { accept }
        );
      return res.data;
    },
    onSuccess: (data, vars, ctx) => {
      qc.invalidateQueries({ queryKey: ['researcher', 'projects'] });
      options?.onSuccess?.(data, vars, ctx);
    },
    ...options,
  });
}

export function useResearcherProposals(
  userTypeId: number,
  params?: {
    skip?: number;
    limit?: number;
  },
  options?: Partial<UseQueryOptions<ProposalResponse[], Error>>
) {
  return useQuery({
    enabled: userTypeId == 5,
    placeholderData: keepPreviousData,
    queryKey: researcherQueryKeys.projects(params),
    queryFn: async () => {
      const res = await getResearcher().readProposalsResearcherProposalsGet(
        params
      );
      return res.data;
    },
    ...options,
  });
}

export function useResearcherAddMaster(
  options?: UseMutationOptions<MasterResponse, Error, MasterRequest>
) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (input) => {
      const res = await getResearcher().readProposalsResearcherAddMasterPost(
        input
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

export function useResearcherUpdateMaster(
  options?: UseMutationOptions<
    MasterResponse,
    Error,
    { masterId: number; input: MasterRequest }
  >
) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ masterId, input }) => {
      const res =
        await getResearcher().updateMasterResearcherUpdateMasterMasterIdPut(
          masterId,
          input
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

export function useResearcherMasters(
  params?: {
    skip?: number;
    limit?: number;
  },
  options?: Partial<UseQueryOptions<MasterResponse[], Error>>
) {
  return useQuery({
    placeholderData: keepPreviousData,
    queryKey: researcherQueryKeys.masters(params),
    queryFn: async () => {
      const res = await getResearcher().readMastersResearcherMastersGet(params);
      return res.data;
    },
    ...options,
  });
}
