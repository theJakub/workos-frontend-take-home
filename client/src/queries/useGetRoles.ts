import { useQuery } from '@tanstack/react-query'
import { QueryParams } from '../types/queryParams';
import { Role } from '../types/roles';

async function getRoles({ page, search }: QueryParams = {}) {
  const params = new URLSearchParams()
  if (page) params.append('page', page.toString())
  if (search) params.append('search', search)
  
  const response = await fetch(`http://localhost:3002/roles?${params.toString()}`)
  if (!response.ok) {
    throw new Error('Failed to fetch roles')
  }

  if (response.headers.get('content-type')?.includes('application/json')) {
    return await response.json();
  }
  
  return response;
}

export const useGetRoles = (params = {}) => {
  return useQuery({
    queryKey: ['roles', params],
    queryFn: async () => await getRoles(params),
    select: (data) => {
      const mappedData = data.data.reduce(
        (acc: Record<string, Role>, role: Role) => {
          acc[role.id] = role;
          return acc;
        },
        {}
      );
      return { ...data, data: mappedData };
    },
    // 10 retries for initial implementaion
    // automatic retries due to context use
    // TODO: add retry/fetch toast
    retry: 10,
   })
}
