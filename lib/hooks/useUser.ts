import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { getUser } from '@services';
import { ReadProjectsUsersProjectsGetParams } from 'lib/types/readProjectsUsersProjectsGetParams';
import { ProjectResponse } from 'lib/types/projectResponse';
import { ProposalRequest } from 'lib/types/proposalRequest';
import { ProposalResponse } from 'lib/types/proposalResponse';
import { ReportRequest } from 'lib/types/reportRequest';
import { ReportResponse } from 'lib/types/reportResponse';

// لیست پروژه‌های کاربر
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

// افزودن پروپوزال
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

// دریافت یک پروپوزال خاص
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

// لیست گزارش‌های یک پروژه
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

// افزودن گزارش
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

// دریافت یک گزارش خاص
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
