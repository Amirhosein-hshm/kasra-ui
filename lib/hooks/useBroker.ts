import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { getBroker } from '@/lib/services';
import {
  CommissionRequest,
  CommissionResponse,
  ProposalResponse,
  ReadProposalsBrokerProposalsGetParams,
  UserInfoResponse,
} from 'lib/types';

export function useBrokerProposals(
  params?: ReadProposalsBrokerProposalsGetParams,
  options?: UseQueryOptions<ProposalResponse[], Error>
) {
  return useQuery({
    queryKey: ['brokerProposals', params],
    queryFn: () =>
      getBroker()
        .readProposalsBrokerProposalsGet(params)
        .then((res) => res.data),
    ...options,
  });
}

export function useBrokerProposal(
  proposalId: number,
  options?: UseQueryOptions<ProposalResponse, Error>
) {
  return useQuery({
    queryKey: ['brokerProposal', proposalId],
    queryFn: () =>
      getBroker()
        .readProposalBrokerProposalsProposalIdGet(proposalId)
        .then((res) => res.data),
    enabled: !!proposalId,
    ...options,
  });
}

export function useAddBrokerCommission(
  options?: UseMutationOptions<CommissionResponse, Error, CommissionRequest>
) {
  return useMutation({
    mutationFn: (data) =>
      getBroker()
        .addCommissionBrokerCommissionsPost(data)
        .then((res) => res.data),
    ...options,
  });
}

export function useBrokerUsersMaster(
  options?: UseQueryOptions<UserInfoResponse[], Error>
) {
  return useQuery({
    queryKey: ['brokerUsersMaster'],
    queryFn: () =>
      getBroker()
        .readUsersMasterBrokerUsersMasterGet()
        .then((res) => res.data),
    ...options,
  });
}

export function useBrokerUsersDiscoverer(
  options?: UseQueryOptions<UserInfoResponse[], Error>
) {
  return useQuery({
    queryKey: ['brokerUsersDiscoverer'],
    queryFn: () =>
      getBroker()
        .readUsersDiscovererBrokerUsersDiscovererGet()
        .then((res) => res.data),
    ...options,
  });
}

export function useBrokerUsersSupervisor(
  options?: UseQueryOptions<UserInfoResponse[], Error>
) {
  return useQuery({
    queryKey: ['brokerUsersSupervisor'],
    queryFn: () =>
      getBroker()
        .readUsersSupervisorBrokerUsersSupervisorGet()
        .then((res) => res.data),
    ...options,
  });
}
