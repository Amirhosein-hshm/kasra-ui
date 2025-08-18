import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
  useQueryClient,
  keepPreviousData,
} from '@tanstack/react-query';
import { getUser } from '@/lib/services';

import type {
  AllocateResponse,
  GetAllocatesUsersAllocatesGetParams,
  ProjectResponse,
  ProposalResponse,
  ReadProjectsUsersProjectsGetParams,
  ReadProposalsUsersProposalsGetParams,
  ReportRequest,
  ReportResponse,
  UserUpdateAllocate,
  UserUpdateProposal,
} from 'lib/types';

/** Centralized query keys */
export const userQueryKeys = {
  proposals: (params?: ReadProposalsUsersProposalsGetParams) =>
    ['user', 'proposals', params] as const,
  proposal: (proposalId?: number) => ['user', 'proposal', proposalId] as const,

  projects: (params?: ReadProjectsUsersProjectsGetParams) =>
    ['user', 'projects', params] as const,
  project: (projectId?: number) => ['user', 'project', projectId] as const,

  reportsByProject: (projectId?: number) =>
    ['user', 'reportsByProject', projectId] as const,
  report: (reportId?: number) => ['user', 'report', reportId] as const,

  allocates: (params?: GetAllocatesUsersAllocatesGetParams) =>
    ['user', 'allocates', params] as const,
  allocate: (allocateId?: number) => ['user', 'allocate', allocateId] as const,
};

/** ===== Proposals ===== */

/** List user proposals */
export function useUserProposals(
  userTypeId: number,
  params?: ReadProposalsUsersProposalsGetParams,
  options?: UseQueryOptions<ProposalResponse[], Error>
) {
  return useQuery({
    enabled: userTypeId == 3,
    placeholderData: keepPreviousData,
    queryKey: userQueryKeys.proposals(params),
    queryFn: async () => {
      const res = await getUser().readProposalsUsersProposalsGet(params);
      return res.data;
    },
    ...options,
  });
}

/** Single user proposal */
export function useUserProposal(
  proposalId?: number,
  options?: UseQueryOptions<ProposalResponse, Error>
) {
  return useQuery({
    queryKey: userQueryKeys.proposal(proposalId),
    queryFn: async () => {
      if (proposalId === undefined || proposalId === null)
        throw new Error('proposalId is required');
      const res = await getUser().readProposalUsersSingleProposalProposalIdGet(
        proposalId
      );
      return res.data;
    },
    enabled: typeof proposalId === 'number',
    ...options,
  });
}

/** Edit user proposal */
export function useEditUserProposal(
  options?: UseMutationOptions<
    ProposalResponse,
    Error,
    { proposalId: number; data: UserUpdateProposal }
  >
) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ proposalId, data }) => {
      const res = await getUser().editProposalUsersProposalsProposalIdPut(
        proposalId,
        data
      );
      return res.data;
    },
    onSuccess: (data, vars, ctx) => {
      qc.invalidateQueries({
        queryKey: userQueryKeys.proposal(vars.proposalId),
      });
      qc.invalidateQueries({ queryKey: ['user', 'proposals'] });
      options?.onSuccess?.(data, vars, ctx);
    },
    ...options,
  });
}

/** ===== Projects ===== */

/** List user projects */
export function useUserProjects(
  useTypeId: number,
  params?: ReadProjectsUsersProjectsGetParams,
  options?: UseQueryOptions<ProjectResponse[], Error>
) {
  return useQuery({
    enabled: useTypeId == 3,
    placeholderData: keepPreviousData,
    queryKey: userQueryKeys.projects(params),
    queryFn: async () => {
      const res = await getUser().readProjectsUsersProjectsGet(params);
      return res.data;
    },
    ...options,
  });
}

/** Single user project */
export function useUserProjectById(
  projectId?: number,
  options?: UseQueryOptions<ProjectResponse, Error>
) {
  return useQuery({
    queryKey: userQueryKeys.project(projectId),
    queryFn: async () => {
      if (projectId === undefined || projectId === null)
        throw new Error('projectId is required');
      const res = await getUser().readProjectsSingleUsersProjectsProjectIdGet(
        projectId
      );
      return res.data;
    },
    enabled: typeof projectId === 'number',
    ...options,
  });
}

/** ===== Reports ===== */

/** Reports by projectId */
export function useUserReportsByProject(
  projectId?: number,
  options?: UseQueryOptions<ReportResponse[], Error>
) {
  return useQuery({
    queryKey: userQueryKeys.reportsByProject(projectId),
    queryFn: async () => {
      if (projectId === undefined || projectId === null)
        throw new Error('projectId is required');
      const res =
        await getUser().readReportsByProjectIdUsersReportsByProjectProjectIdGet(
          projectId
        );
      return res.data;
    },
    enabled: typeof projectId === 'number',
    ...options,
  });
}

/** Single report */
export function useUserReport(
  reportId?: number,
  options?: UseQueryOptions<ReportResponse, Error>
) {
  return useQuery({
    queryKey: userQueryKeys.report(reportId),
    queryFn: async () => {
      if (reportId === undefined || reportId === null)
        throw new Error('reportId is required');
      const res = await getUser().readReportUsersReportsReportIdGet(reportId);
      return res.data;
    },
    enabled: typeof reportId === 'number',
    ...options,
  });
}

/** Add new report */
export function useAddUserReport(
  options?: UseMutationOptions<ReportResponse, Error, ReportRequest>
) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const res = await getUser().addReportUsersReportsPost(payload);
      return res.data;
    },
    onSuccess: (data, vars, ctx) => {
      const projectId = (vars as any)?.projectId ?? (data as any)?.projectId;
      if (typeof projectId === 'number') {
        qc.invalidateQueries({
          queryKey: userQueryKeys.reportsByProject(projectId),
        });
      } else {
        qc.invalidateQueries({ queryKey: ['user', 'reportsByProject'] });
      }
      options?.onSuccess?.(data, vars, ctx);
    },
    ...options,
  });
}

/** ===== Allocates ===== */

/** List allocates */
export function useUserAllocates(
  userTypeId: number,
  params?: GetAllocatesUsersAllocatesGetParams,
  options?: UseQueryOptions<AllocateResponse[], Error>
) {
  return useQuery({
    enabled: !!userTypeId && userTypeId == 3,
    queryKey: userQueryKeys.allocates(params),
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const res = await getUser().getAllocatesUsersAllocatesGet(params);
      return res.data;
    },
    ...options,
  });
}

/** Single allocate */
export function useUserAllocate(
  userTypeId: number,
  allocateId?: number,
  options?: UseQueryOptions<AllocateResponse, Error>
) {
  return useQuery({
    queryKey: userQueryKeys.allocate(allocateId),
    queryFn: async () => {
      if (allocateId === undefined || allocateId === null)
        throw new Error('allocateId is required');
      const res =
        await getUser().singleAllocateUsersSingleAllocateAllocateIdGet(
          allocateId
        );
      return res.data;
    },
    enabled: typeof allocateId === 'number' && userTypeId == 3,
    ...options,
  });
}

/** Edit allocate */
export function useEditUserAllocate(
  options?: UseMutationOptions<AllocateResponse, Error, { allocateId: number }>
) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ allocateId }) => {
      const res = await getUser().editAllocateUsersAllocatesAllocateIdPut(
        allocateId
      );
      return res.data;
    },
    onSuccess: (data, vars, ctx) => {
      qc.invalidateQueries({
        queryKey: userQueryKeys.allocate(vars.allocateId),
      });
      qc.invalidateQueries({ queryKey: ['user', 'allocates'] });
      options?.onSuccess?.(data, vars, ctx);
    },
    ...options,
  });
}
