import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { getUser } from '@/lib/services';

import type {
  ProjectResponse,
  ProposalRequest,
  ProposalResponse,
  ProposalUserUpdateRequest,
  RFPResponse,
  ReadProjectsUsersProjectsGetParams,
  ReadProposalsUsersProposalsGetParams,
  ReportRequest,
  ReportResponse,
  SearchRfpsEndpointUsersRfpsGetParams,
} from '@/lib/types';

/**
 * Get all user proposals
 */
export function useUserProposals(
  params?: ReadProposalsUsersProposalsGetParams,
  options?: UseQueryOptions<ProposalResponse[], Error>
) {
  return useQuery({
    queryKey: ['userProposals', params],
    queryFn: () =>
      getUser()
        .readProposalsUsersProposalsGet(params)
        .then((res) => res.data),
    ...options,
  });
}

/**
 * Get single user proposal by ID
 */
export function useUserProposal(
  proposalId: number,
  options?: UseQueryOptions<ProposalResponse, Error>
) {
  return useQuery({
    queryKey: ['userProposal', proposalId],
    queryFn: () =>
      getUser()
        .readProposalUsersProposalsProposalIdGet(proposalId)
        .then((res) => res.data),
    enabled: !!proposalId,
    ...options,
  });
}

/**
 * Add new proposal
 */
export function useAddUserProposal(
  options?: UseMutationOptions<ProposalResponse, Error, ProposalRequest>
) {
  return useMutation({
    mutationFn: (data) =>
      getUser()
        .addProposalUsersProposalsPost(data)
        .then((res) => res.data),
    ...options,
  });
}

/**
 * Edit user proposal
 */
export function useEditUserProposal(
  options?: UseMutationOptions<
    ProposalResponse,
    Error,
    { proposalId: number; data: ProposalUserUpdateRequest }
  >
) {
  return useMutation({
    mutationFn: ({ proposalId, data }) =>
      getUser()
        .editProposalUsersProposalsProposalIdPut(proposalId, data)
        .then((res) => res.data),
    ...options,
  });
}

/**
 * Get all user projects
 */
export function useUserProjects(
  params?: ReadProjectsUsersProjectsGetParams,
  options?: UseQueryOptions<ProjectResponse[], Error>
) {
  return useQuery({
    queryKey: ['userProjects', params],
    queryFn: () =>
      getUser()
        .readProjectsUsersProjectsGet(params)
        .then((res) => res.data),
    ...options,
  });
}

/**
 * Get single user project by ID
 */
export function useUserProjectById(
  projectId: number,
  options?: UseQueryOptions<ProjectResponse[], Error>
) {
  return useQuery({
    queryKey: ['userProjectById', projectId],
    queryFn: () =>
      getUser()
        .readProjectsSingleUsersProjectsProjectIdGet(projectId)
        .then((res) => res.data),
    enabled: !!projectId,
    ...options,
  });
}

/**
 * Get reports by project ID
 */
export function useUserReportsByProject(
  projectId: number,
  options?: UseQueryOptions<ReportResponse[], Error>
) {
  return useQuery({
    queryKey: ['userReportsByProject', projectId],
    queryFn: () =>
      getUser()
        .readReportsByProjectIdUsersReportsByProjectProjectIdGet(projectId)
        .then((res) => res.data),
    enabled: !!projectId,
    ...options,
  });
}

/**
 * Get single report by ID
 */
export function useUserReport(
  reportId: number,
  options?: UseQueryOptions<ReportResponse, Error>
) {
  return useQuery({
    queryKey: ['userReport', reportId],
    queryFn: () =>
      getUser()
        .readReportUsersReportsReportIdGet(reportId)
        .then((res) => res.data),
    enabled: !!reportId,
    ...options,
  });
}

/**
 * Add new report
 */
export function useAddUserReport(
  options?: UseMutationOptions<ReportResponse, Error, ReportRequest>
) {
  return useMutation({
    mutationFn: (data) =>
      getUser()
        .addReportUsersReportsPost(data)
        .then((res) => res.data),
    ...options,
  });
}

/**
 * Search RFPs
 */
export function useSearchRfps(
  params?: SearchRfpsEndpointUsersRfpsGetParams,
  options?: UseQueryOptions<RFPResponse[], Error>
) {
  return useQuery({
    queryKey: ['searchRfps', params],
    queryFn: () =>
      getUser()
        .searchRfpsEndpointUsersRfpsGet(params)
        .then((res) => res.data),
    ...options,
  });
}
