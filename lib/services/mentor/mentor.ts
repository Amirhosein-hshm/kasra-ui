import type {
  GetAllReportsMentorAllReportsGetParams,
  GetProjectMentorProjectsGetParams,
  GetReportsMentorReportsProjectIdGetParams,
  ProjectResponse,
} from '../../types';

import { api } from '../../axios/mutator';

export const getMentor = () => {
  /**
   * @summary Get Project
   */
  const getProjectMentorProjectsGet = (
    params?: GetProjectMentorProjectsGetParams
  ) => {
    return api<ProjectResponse[]>({
      url: `/mentor/projects/`,
      method: 'GET',
      params,
    });
  };
  /**
   * @summary Get Reports
   */
  const getReportsMentorReportsProjectIdGet = (
    projectId: number,
    params?: GetReportsMentorReportsProjectIdGetParams
  ) => {
    return api<unknown>({
      url: `/mentor/reports/${projectId}`,
      method: 'GET',
      params,
    });
  };
  /**
   * @summary Get All Reports
   */
  const getAllReportsMentorAllReportsGet = (
    params?: GetAllReportsMentorAllReportsGetParams
  ) => {
    return api<unknown>({ url: `/mentor/all-reports/`, method: 'GET', params });
  };
  return {
    getProjectMentorProjectsGet,
    getReportsMentorReportsProjectIdGet,
    getAllReportsMentorAllReportsGet,
  };
};
export type GetProjectMentorProjectsGetResult = NonNullable<
  Awaited<
    ReturnType<ReturnType<typeof getMentor>['getProjectMentorProjectsGet']>
  >
>;
export type GetReportsMentorReportsProjectIdGetResult = NonNullable<
  Awaited<
    ReturnType<
      ReturnType<typeof getMentor>['getReportsMentorReportsProjectIdGet']
    >
  >
>;
export type GetAllReportsMentorAllReportsGetResult = NonNullable<
  Awaited<
    ReturnType<ReturnType<typeof getMentor>['getAllReportsMentorAllReportsGet']>
  >
>;
