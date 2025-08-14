// src/lib/hooks/supervisor.ts
import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { getSupervisor } from '@/lib/services';

import type {
  ProjectResponse,
  ReportResponse,
  ReportUpdate,
  ReadProjectsSupervisorProjectsGetParams,
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

/** Read projects (list) */
export function useSupervisorProjects(
  params?: ReadProjectsSupervisorProjectsGetParams,
  options?: UseQueryOptions<ProjectResponse[], Error>
) {
  return useQuery({
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
      if (projectId === undefined || projectId === null)
        throw new Error('projectId is required');
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
      if (projectId === undefined || projectId === null)
        throw new Error('projectId is required');
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
      if (reportId === undefined || reportId === null)
        throw new Error('reportId is required');
      const res = await getSupervisor().readReportSupervisorSingleReportIdGet(
        reportId
      );
      return res.data;
    },
    enabled: typeof reportId === 'number',
    ...options,
  });
}

/** Edit a report */
export function useEditSupervisorReport(
  options?: UseMutationOptions<
    ReportResponse,
    Error,
    { reportId: number; data: ReportUpdate }
  >
) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ reportId, data }) => {
      const res = await getSupervisor().editReportSupervisorReportsReportIdPut(
        reportId,
        data
      );
      return res.data;
    },
    onSuccess: (data, vars, ctx) => {
      // تازه‌سازی گزارش تکی و لیست گزارش‌های پروژه‌ی مربوطه
      qc.invalidateQueries({
        queryKey: supervisorQueryKeys.report(vars.reportId),
      });
      // اگر payload شامل projectId نیست و توی UI می‌دونی projectId فعالی وجود داره،
      // می‌تونی به‌جاش invalidate عمومی انجام بدی:
      qc.invalidateQueries({ queryKey: ['supervisor', 'reportsByProject'] });
      options?.onSuccess?.(data, vars, ctx);
    },
    ...options,
  });
}
