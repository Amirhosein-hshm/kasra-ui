import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getMentor } from '@/lib/services/mentor/mentor';
import {
  ProjectResponseOutput,
  GetProjectMentorProjectsGetParams,
} from 'lib/types';

export function useMentorProjects(
  params?: GetProjectMentorProjectsGetParams,
  options?: UseQueryOptions<ProjectResponseOutput[], Error>
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
