import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getAdmin } from '../services/admin/admin';
import {
  ReadUsersAdminUsersGetParams,
  UserInfoResponse,
  UserRoleResponse,
} from '../types';
import { UserType } from '../types/UserType.enum';

export const adminQueryKeys = {
  info: (params?: ReadUsersAdminUsersGetParams) =>
    ['admin', 'users-info', params] as const,
  roles: () => ['admin', 'user-roles'] as const,
};

// Get user roles

export function useAdminUserRoles(
  userTypeId: number,
  options?: Partial<UseQueryOptions<UserRoleResponse[], Error>>
) {
  return useQuery({
    enabled: userTypeId == UserType.Admin,
    queryKey: adminQueryKeys.info(),
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
