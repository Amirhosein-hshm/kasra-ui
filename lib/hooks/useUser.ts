import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { getUser } from '@/lib/services';
import type {
  ProjectResponse,
  ReadProjectsUsersProjectsGetParams,
  ProposalRequest,
  ProposalResponse,
  ProposalUserUpdateRequest,
  ReportRequest,
  ReportResponse,
  RFPResponse,
  SearchRfpsEndpointUsersRfpsGetParams,
} from '@/lib/types';

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

export function useUserReportsByProject(
  projectId: number,
  options?: UseQueryOptions<ReportResponse[], Error>
) {
  return useQuery({
    queryKey: ['userReportsByProject', projectId],
    queryFn: () =>
      getUser()
        .readReportsUsersReportsByProjectProjectIdGet(projectId)
        .then((res) => res.data),
    enabled: !!projectId,
    ...options,
  });
}

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
