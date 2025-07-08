import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { getSupervisor } from '@/lib/services';
import {
  ReadProjectsSupervisorProjectsGetParams,
  ProjectResponseOutput,
  ProposalResponse,
  ProposalUpdate,
  ReadProposalsSupervisorProposalsGetParams,
  ReadReportsSupervisorReportsGetParams,
  ReportResponse,
  ReportUpdate,
} from 'lib/types';

export function useSupervisorProposals(
  params?: ReadProposalsSupervisorProposalsGetParams,
  options?: UseQueryOptions<ProposalResponse[], Error>
) {
  return useQuery({
    queryKey: ['supervisorProposals', params],
    queryFn: () =>
      getSupervisor()
        .readProposalsSupervisorProposalsGet(params)
        .then((res) => res.data),
    ...options,
  });
}

export function useSupervisorProposal(
  proposalId: number,
  options?: UseQueryOptions<ProposalResponse, Error>
) {
  return useQuery({
    queryKey: ['supervisorProposal', proposalId],
    queryFn: () =>
      getSupervisor()
        .readProposalSupervisorProposalsProposalIdGet(proposalId)
        .then((res) => res.data),
    enabled: !!proposalId,
    ...options,
  });
}

export function useEditSupervisorProposal(
  options?: UseMutationOptions<
    ProposalResponse,
    Error,
    { proposalId: number; proposalUpdate: ProposalUpdate }
  >
) {
  return useMutation({
    mutationFn: ({ proposalId, proposalUpdate }) =>
      getSupervisor()
        .editProposalSupervisorProposalsProposalIdPut(
          proposalId,
          proposalUpdate
        )
        .then((res) => res.data),
    ...options,
  });
}

export function useSupervisorReports(
  params?: ReadReportsSupervisorReportsGetParams,
  options?: UseQueryOptions<ReportResponse[], Error>
) {
  return useQuery({
    queryKey: ['supervisorReports', params],
    queryFn: () =>
      getSupervisor()
        .readReportsSupervisorReportsGet(params)
        .then((res) => res.data),
    ...options,
  });
}

export function useSupervisorReport(
  reportId: number,
  options?: UseQueryOptions<ReportResponse, Error>
) {
  return useQuery({
    queryKey: ['supervisorReport', reportId],
    queryFn: () =>
      getSupervisor()
        .readReportSupervisorReportsReportIdGet(reportId)
        .then((res) => res.data),
    enabled: !!reportId,
    ...options,
  });
}

export function useEditSupervisorReport(
  options?: UseMutationOptions<
    ReportResponse,
    Error,
    { reportId: number; reportUpdate: ReportUpdate }
  >
) {
  return useMutation({
    mutationFn: ({ reportId, reportUpdate }) =>
      getSupervisor()
        .editReportSupervisorReportsReportIdPut(reportId, reportUpdate)
        .then((res) => res.data),
    ...options,
  });
}

export function useSupervisorProjects(
  params?: ReadProjectsSupervisorProjectsGetParams,
  options?: UseQueryOptions<ProjectResponseOutput[], Error>
) {
  return useQuery({
    queryKey: ['supervisorProjects', params],
    queryFn: () =>
      getSupervisor()
        .readProjectsSupervisorProjectsGet(params)
        .then((res) => res.data),
    ...options,
  });
}
