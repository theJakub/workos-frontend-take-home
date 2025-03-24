import { useQuery } from '@tanstack/react-query'
import { QueryParams } from '../types/queryParams'

async function getUsers({ page, search }: QueryParams = {}) {
  const params = new URLSearchParams()
  if (page) params.append('page', page.toString())
  if (search) params.append('search', search)

  const response = await fetch(`http://localhost:3002/users?${params.toString()}`)
  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }

  if (response.headers.get('content-type')?.includes('application/json')) {
    return await response.json();
  }
  
  return response;
}

export const useGetUsers = (params = {}) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: async () => await getUsers(params),
    initialData: {
      data: [],
      next: null,
      prev: null,
      pages: 0,
    },
    // 10 retries for initial implementaion
    // automatic retries due to context use
    // TODO: add retry/fetch toast
    retry: 10,
  })
}
