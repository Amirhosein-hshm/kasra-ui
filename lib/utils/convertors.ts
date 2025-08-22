import { AddUserFormData } from '@/ui/forms/add-user.validation';
import { UserInfoResponse } from '../types';

export function convertUserInfoResponseToUserFormData(
  input: UserInfoResponse
): Omit<AddUserFormData, 'password'> {
  return {
    active: input?.active ?? false,
    address: input?.address ?? '',
    birth: input?.birth ?? '',
    father_name: input?.fatherName ?? '',
    fname: input?.fname ?? '',
    lname: input?.lname ?? '',
    phone: input?.phone ?? '',
    resume_file_id: input?.resumeFileId ?? -1,
    user_type_id: input?.userTypeId ?? -1,
    username: input?.username ?? '',
  };
}
