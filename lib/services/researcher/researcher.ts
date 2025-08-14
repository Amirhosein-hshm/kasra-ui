import type {
  AllocateResponse,
  EditAllocateResearcherAllocatesAllocateIdPutParams,
  GetAllReportsResearcherAllReportsGetParams,
  GetAllocatesResearcherAllocatesGetParams,
  GetProjectResearcherProjectsGetParams,
  GetReportsResearcherReportsProjectIdGetParams,
  ProjectResponse,
  ProposalResponse,
  ResearcherUpdateProposal,
} from '../../types';

import { api } from '../../axios/mutator';

export const getResearcher = () => {
  /**
   * @summary Get Project
   */
  const getProjectResearcherProjectsGet = (
    params?: GetProjectResearcherProjectsGetParams
  ) => {
    return api<ProjectResponse[]>({
      url: `/researcher/projects/`,
      method: 'GET',
      params,
    });
  };
  /**
   * @summary Get Reports
   */
  const getReportsResearcherReportsProjectIdGet = (
    projectId: number,
    params?: GetReportsResearcherReportsProjectIdGetParams
  ) => {
    return api<unknown>({
      url: `/researcher/reports/${projectId}`,
      method: 'GET',
      params,
    });
  };
  /**
   * @summary Get Single Reports
   */
  const getSingleReportsResearcherSingleReportReportIdGet = (
    reportId: number
  ) => {
    return api<unknown>({
      url: `/researcher/single-report/${reportId}`,
      method: 'GET',
    });
  };
  /**
   * @summary Get All Reports
   */
  const getAllReportsResearcherAllReportsGet = (
    params?: GetAllReportsResearcherAllReportsGetParams
  ) => {
    return api<unknown>({
      url: `/researcher/all-reports/`,
      method: 'GET',
      params,
    });
  };
  /**
   * @summary Edit Allocate
   */
  const editAllocateResearcherAllocatesAllocateIdPut = (
    allocateId: number,
    params?: EditAllocateResearcherAllocatesAllocateIdPutParams
  ) => {
    return api<AllocateResponse>({
      url: `/researcher/allocates/${allocateId}`,
      method: 'PUT',
      params,
    });
  };
  /**
   * @summary Get Allocates
   */
  const getAllocatesResearcherAllocatesGet = (
    params?: GetAllocatesResearcherAllocatesGetParams
  ) => {
    return api<AllocateResponse[]>({
      url: `/researcher/allocates/`,
      method: 'GET',
      params,
    });
  };
  /**
   * @summary Single Allocate
   */
  const singleAllocateResearcherSingleAllocateAllocateIdGet = (
    allocateId: number
  ) => {
    return api<AllocateResponse>({
      url: `/researcher/single-allocate/${allocateId}`,
      method: 'GET',
    });
  };
  /**
   * @summary Edit Accepting Project
   */
  const editAcceptingProjectResearcherProjectsProjectIdPut = (
    projectId: number
  ) => {
    return api<ProjectResponse>({
      url: `/researcher/projects/${projectId}`,
      method: 'PUT',
    });
  };
  /**
   * @summary Edit Proposal And Create Project
   */
  const editProposalAndCreateProjectResearcherProposalProposalIdPut = (
    proposalId: number,
    researcherUpdateProposal: ResearcherUpdateProposal
  ) => {
    return api<ProposalResponse>({
      url: `/researcher/proposal/${proposalId}`,
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      data: researcherUpdateProposal,
    });
  };
  return {
    getProjectResearcherProjectsGet,
    getReportsResearcherReportsProjectIdGet,
    getSingleReportsResearcherSingleReportReportIdGet,
    getAllReportsResearcherAllReportsGet,
    editAllocateResearcherAllocatesAllocateIdPut,
    getAllocatesResearcherAllocatesGet,
    singleAllocateResearcherSingleAllocateAllocateIdGet,
    editAcceptingProjectResearcherProjectsProjectIdPut,
    editProposalAndCreateProjectResearcherProposalProposalIdPut,
  };
};
export type GetProjectResearcherProjectsGetResult = NonNullable<
  Awaited<
    ReturnType<
      ReturnType<typeof getResearcher>['getProjectResearcherProjectsGet']
    >
  >
>;
export type GetReportsResearcherReportsProjectIdGetResult = NonNullable<
  Awaited<
    ReturnType<
      ReturnType<
        typeof getResearcher
      >['getReportsResearcherReportsProjectIdGet']
    >
  >
>;
export type GetSingleReportsResearcherSingleReportReportIdGetResult =
  NonNullable<
    Awaited<
      ReturnType<
        ReturnType<
          typeof getResearcher
        >['getSingleReportsResearcherSingleReportReportIdGet']
      >
    >
  >;
export type GetAllReportsResearcherAllReportsGetResult = NonNullable<
  Awaited<
    ReturnType<
      ReturnType<typeof getResearcher>['getAllReportsResearcherAllReportsGet']
    >
  >
>;
export type EditAllocateResearcherAllocatesAllocateIdPutResult = NonNullable<
  Awaited<
    ReturnType<
      ReturnType<
        typeof getResearcher
      >['editAllocateResearcherAllocatesAllocateIdPut']
    >
  >
>;
export type GetAllocatesResearcherAllocatesGetResult = NonNullable<
  Awaited<
    ReturnType<
      ReturnType<typeof getResearcher>['getAllocatesResearcherAllocatesGet']
    >
  >
>;
export type SingleAllocateResearcherSingleAllocateAllocateIdGetResult =
  NonNullable<
    Awaited<
      ReturnType<
        ReturnType<
          typeof getResearcher
        >['singleAllocateResearcherSingleAllocateAllocateIdGet']
      >
    >
  >;
export type EditAcceptingProjectResearcherProjectsProjectIdPutResult =
  NonNullable<
    Awaited<
      ReturnType<
        ReturnType<
          typeof getResearcher
        >['editAcceptingProjectResearcherProjectsProjectIdPut']
      >
    >
  >;
export type EditProposalAndCreateProjectResearcherProposalProposalIdPutResult =
  NonNullable<
    Awaited<
      ReturnType<
        ReturnType<
          typeof getResearcher
        >['editProposalAndCreateProjectResearcherProposalProposalIdPut']
      >
    >
  >;
