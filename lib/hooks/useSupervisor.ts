// src/lib/hooks/supervisor.ts
import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
  useQueryClient,
  keepPreviousData,
} from '@tanstack/react-query';
import { getSupervisor } from '@/lib/services';

import type {
  EditReportSupervisorReportsReportIdPutParams,
  ProjectResponse,
  ReadProjectsSupervisorProjectsGetParams,
  ReportResponse,
  ReportUpdate,
} from '@/lib/types';

/** Centralized query keys */
export const supervisorQueryKeys = {
  projects: (params?: ReadProjectsSupervisorProjectsGetParams) =>
    ['supervisor', 'projects', params] as const,
  project: (projectId?: number) =>
    ['supervisor', 'project', projectId] as const,
  reportsByProject: (projectId?: number) =>
    ['supervisor', 'reportsByProject', projectId] as const,
  report: (reportId?: number) => ['supervisor', 'report', reportId] as const,
};

/** Read projects (list)
 *  NOTE: userTypeId برای سازگاری با کدهای قبلی حفظ شده اما در فراخوانی سرویس استفاده نمی‌شود.
 */
export function useSupervisorProjects(
  // kept for backward compatibility (unused)
  userTypeId: number,
  params?: ReadProjectsSupervisorProjectsGetParams,
  options?: UseQueryOptions<ProjectResponse[], Error>
) {
  return useQuery({
    enabled: userTypeId == 4,
    placeholderData: keepPreviousData,
    queryKey: supervisorQueryKeys.projects(params),
    queryFn: async () => {
      const res = await getSupervisor().readProjectsSupervisorProjectsGet(
        params
      );
      return res.data;
    },
    ...options,
  });
}

/** Read single project by id */
export function useSupervisorSingleProject(
  projectId?: number,
  options?: UseQueryOptions<ProjectResponse, Error>
) {
  return useQuery({
    queryKey: supervisorQueryKeys.project(projectId),
    queryFn: async () => {
      if (projectId === undefined || projectId === null) {
        throw new Error('projectId is required');
      }
      const res =
        await getSupervisor().readProjectsSupervisorSingleProjectProjectIdGet(
          projectId
        );
      return res.data;
    },
    enabled: typeof projectId === 'number',
    ...options,
  });
}

/** Read reports by project id */
export function useSupervisorReportsByProject(
  projectId?: number,
  options?: UseQueryOptions<ReportResponse[], Error>
) {
  return useQuery({
    queryKey: supervisorQueryKeys.reportsByProject(projectId),
    queryFn: async () => {
      if (projectId === undefined || projectId === null) {
        throw new Error('projectId is required');
      }
      const res =
        await getSupervisor().readReportsByProjectSupervisorReportsByProjectProjectIdGet(
          projectId
        );
      return res.data;
    },
    enabled: typeof projectId === 'number',
    ...options,
  });
}

/** Read single report by id */
export function useSupervisorSingleReport(
  reportId?: number,
  options?: UseQueryOptions<ReportResponse, Error>
) {
  return useQuery({
    queryKey: supervisorQueryKeys.report(reportId),
    queryFn: async () => {
      if (reportId === undefined || reportId === null) {
        throw new Error('reportId is required');
      }
      const res = await getSupervisor().readReportSupervisorSingleReportIdGet(
        reportId
      );
      return res.data;
    },
    enabled: typeof reportId === 'number',
    ...options,
  });
}

export function useEditSupervisorReport(
  options?: UseMutationOptions<
    ReportResponse,
    Error,
    {
      reportId: number;
      data: ReportUpdate;
      params: EditReportSupervisorReportsReportIdPutParams;
    }
  >
) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ reportId, data, params }) => {
      const res = await getSupervisor().editReportSupervisorReportsReportIdPut(
        reportId,
        data,
        params ?? ({} as EditReportSupervisorReportsReportIdPutParams)
      );
      return res.data;
    },
    onSuccess: (data, vars, ctx) => {
      qc.invalidateQueries({
        queryKey: supervisorQueryKeys.report(vars.reportId),
      });
      qc.invalidateQueries({ queryKey: ['supervisor', 'reportsByProject'] });
      options?.onSuccess?.(data, vars, ctx);
    },
    ...options,
  });
}
