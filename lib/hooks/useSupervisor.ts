import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { getSupervisor } from '@/lib/services';
import { ReadProjectsSupervisorProjectsGetParams } from 'lib/types/readProjectsSupervisorProjectsGetParams';
import { ProjectResponse } from 'lib/types/projectResponse';
import { ProposalResponse } from 'lib/types/proposalResponse';
import { ProposalUpdate } from 'lib/types/proposalUpdate';
import { ReadProposalsSupervisorProposalsGetParams } from 'lib/types/readProposalsSupervisorProposalsGetParams';
import { ReadProposalsSupervisorProposalsLikeGetParams } from 'lib/types/readProposalsSupervisorProposalsLikeGetParams';
import { ReadReportsSupervisorReportsGetParams } from 'lib/types/readReportsSupervisorReportsGetParams';
import { ReportResponse } from 'lib/types/reportResponse';
import { ReportUpdate } from 'lib/types/reportUpdate';

// لیست پروپوزال‌ها
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

// لیست پروپوزال‌های مشابه
export function useSupervisorProposalsLike(
  params?: ReadProposalsSupervisorProposalsLikeGetParams,
  options?: UseQueryOptions<ProposalResponse[], Error>
) {
  return useQuery({
    queryKey: ['supervisorProposalsLike', params],
    queryFn: () =>
      getSupervisor()
        .readProposalsSupervisorProposalsLikeGet(params)
        .then((res) => res.data),
    ...options,
  });
}

// دریافت یک پروپوزال خاص
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

// ویرایش پروپوزال
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

// لیست گزارش‌ها
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

// دریافت یک گزارش خاص
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

// ویرایش گزارش
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
