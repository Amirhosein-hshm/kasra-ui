import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { getSupervisor } from '@/lib/services';

import type {
  ProjectResponse,
  ProposalResponse,
  ReportResponse,
  ReportUpdate,
  ReadProjectsSupervisorProjectsGetParams,
  ReadProposalsSupervisorProposalsGetParams,
  ReadReportsSupervisorReportsGetParams,
} from '@/lib/types';

/**
 * Get all supervisor proposals
 */
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

/**
 * Get a single proposal by ID (supervisor)
 */
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

/**
 * Get reports by project ID (supervisor)
 */
export function useSupervisorReportsByProject(
  projectId: number,
  options?: UseQueryOptions<ReportResponse[], Error>
) {
  return useQuery({
    queryKey: ['supervisorReportsByProject', projectId],
    queryFn: () =>
      getSupervisor()
        .readReportsByProjectSupervisorReportsByProjectProjectIdGet(projectId)
        .then((res) => res.data),
    enabled: !!projectId,
    ...options,
  });
}

/**
 * Get all reports (supervisor)
 */
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

/**
 * Edit a report (supervisor)
 */
export function useEditSupervisorReport(
  options?: UseMutationOptions<
    ReportResponse,
    Error,
    { reportId: number; data: ReportUpdate }
  >
) {
  return useMutation({
    mutationFn: ({ reportId, data }) =>
      getSupervisor()
        .editReportSupervisorReportsReportIdPut(reportId, data)
        .then((res) => res.data),
    ...options,
  });
}

/**
 * Get all supervisor projects
 */
export function useSupervisorProjects(
  params?: ReadProjectsSupervisorProjectsGetParams,
  options?: UseQueryOptions<ProjectResponse[], Error>
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

/**
 * Get single supervisor projects
 */
export function useSupervisorSingleProject(
  projectId: number,
  options?: UseQueryOptions<ProjectResponse, Error>
) {
  return useQuery({
    queryKey: ['supervisorSingleProject', projectId],
    queryFn: () =>
      getSupervisor()
        .readProjectsSupervisorSingleProjectProjectIdGet(projectId)
        .then((res) => res.data),
    ...options,
  });
}

/**
 * Get single report by id
 */
export function useSupervisorSingleReport(
  reportId: number,
  options?: UseQueryOptions<ReportResponse, Error>
) {
  return useQuery({
    queryKey: ['supervisorSingleReport', reportId],
    queryFn: () =>
      getSupervisor()
        .readReportSupervisorSingleReportIdGet(reportId)
        .then((res) => res.data),
    ...options,
  });
}
