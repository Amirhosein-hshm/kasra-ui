import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import { getAdmin } from '../services/admin/admin';
import {
  ReadUsersAdminUsersGetParams,
  UserAddRequest,
  UserInfoResponse,
  UserRoleResponse,
} from '../types';

export const adminQueryKeys = {
  info: (params?: ReadUsersAdminUsersGetParams) =>
    ['admin', 'users-info', params] as const,
  roles: () => ['admin', 'user-roles'] as const,
};

// Get user roles

export function useAdminUserRoles(
  options?: Partial<UseQueryOptions<UserRoleResponse[], Error>>
) {
  return useQuery({
    queryKey: adminQueryKeys.roles(),
    queryFn: async () => {
      const res = await getAdmin().readUserRolesAdminUserRolesGet();
      return res.data;
    },
    ...options,
  });
}

// Get users info

export function useAdminUsersInfo(
  params?: ReadUsersAdminUsersGetParams,
  options?: Partial<UseQueryOptions<UserInfoResponse[], Error>>
) {
  return useQuery({
    queryKey: adminQueryKeys.info(params),
    queryFn: async () => {
      const res = await getAdmin().readUsersAdminUsersGet(params);
      return res.data;
    },
    ...options,
  });
}

export function useAdminAddUser(
  options?: Partial<UseMutationOptions<UserInfoResponse, Error, UserAddRequest>>
) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const res = await getAdmin().createUserAdminAddUserPost(payload);
      return res.data;
    },
    onSuccess: (data, variables, context) => {
      qc.invalidateQueries();
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
}
