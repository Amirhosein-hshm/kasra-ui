import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getMentor } from '@/lib/services';

import type {
  GetProjectMentorProjectsGetParams,
  GetReportsMentorReportsProjectIdGetParams,
  GetAllReportsMentorAllReportsGetParams,
  ProjectResponse,
} from '@/lib/types';

/**
 * Get list of projects assigned to mentor
 */
export function useMentorProjects(
  params?: GetProjectMentorProjectsGetParams,
  options?: UseQueryOptions<ProjectResponse[], Error>
) {
  return useQuery({
    queryKey: ['mentorProjects', params],
    queryFn: () =>
      getMentor()
        .getProjectMentorProjectsGet(params)
        .then((res) => res.data),
    ...options,
  });
}

/**
 * Get reports for a specific project (mentor view)
 */
export function useMentorReportsByProject(
  projectId: number,
  params?: GetReportsMentorReportsProjectIdGetParams,
  options?: UseQueryOptions<unknown, Error>
) {
  return useQuery({
    queryKey: ['mentorReportsByProject', projectId, params],
    queryFn: () =>
      getMentor()
        .getReportsMentorReportsProjectIdGet(projectId, params)
        .then((res) => res.data),
    enabled: !!projectId,
    ...options,
  });
}

/**
 * Get all reports assigned to mentor
 */
export function useAllMentorReports(
  params?: GetAllReportsMentorAllReportsGetParams,
  options?: UseQueryOptions<unknown, Error>
) {
  return useQuery({
    queryKey: ['allMentorReports', params],
    queryFn: () =>
      getMentor()
        .getAllReportsMentorAllReportsGet(params)
        .then((res) => res.data),
    ...options,
  });
}
