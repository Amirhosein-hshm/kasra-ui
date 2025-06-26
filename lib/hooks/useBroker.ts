import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { getBroker } from 'lib/services/broker/broker';
import { ReadProposalsBrokerProposalsGetParams } from 'lib/types/readProposalsBrokerProposalsGetParams';
import { ProposalResponse } from 'lib/types/proposalResponse';
import { ReadProposalsBrokerProposalsLikeGetParams } from 'lib/types/readProposalsBrokerProposalsLikeGetParams';
import { CommissionRequest } from 'lib/types/commissionRequest';
import { CommissionResponse } from 'lib/types/commissionResponse';

// لیست پروپوزال‌ها
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

// لیست پروپوزال‌های مشابه
export function useBrokerProposalsLike(
  params?: ReadProposalsBrokerProposalsLikeGetParams,
  options?: UseQueryOptions<ProposalResponse[], Error>
) {
  return useQuery({
    queryKey: ['brokerProposalsLike', params],
    queryFn: () =>
      getBroker()
        .readProposalsBrokerProposalsLikeGet(params)
        .then((res) => res.data),
    ...options,
  });
}

// دریافت یک پروپوزال خاص
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

// افزودن کمیسیون
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
