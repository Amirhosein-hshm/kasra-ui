// src/lib/hooks/researcher.ts
import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
  useQueryClient,
  keepPreviousData,
} from '@tanstack/react-query';
import { getResearcher } from '@/lib/services';

import type {
  AllocateResponse,
  EditAllocateResearcherAllocatesAllocateIdPutParams,
  GetAllReportsResearcherAllReportsGetParams,
  GetAllocatesResearcherAllocatesGetParams,
  GetProjectResearcherProjectsGetParams,
  GetReportsResearcherReportsProjectIdGetParams,
  ProjectResponse,
  ProposalResponse,
  ResearcherUpdateProposal,
} from 'lib/types';

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
};

export function useResearcherProjects(
  params?: GetProjectResearcherProjectsGetParams,
  options?: UseQueryOptions<ProjectResponse[], Error>
) {
  return useQuery({
    queryKey: researcherQueryKeys.projects(params),
    queryFn: async () => {
      const res = await getResearcher().getProjectResearcherProjectsGet(params);
      return res.data;
    },
    ...options,
  });
}

export function useEditAcceptingProject(
  options?: UseMutationOptions<ProjectResponse, Error, { projectId: number }>
) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ projectId }) => {
      const res =
        await getResearcher().editAcceptingProjectResearcherProjectsProjectIdPut(
          projectId
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
    { proposalId: number; payload: ResearcherUpdateProposal }
  >
) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ proposalId, payload }) => {
      const res =
        await getResearcher().editProposalAndCreateProjectResearcherProposalProposalIdPut(
          proposalId,
          payload
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
