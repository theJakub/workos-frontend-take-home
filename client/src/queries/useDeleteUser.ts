import { useMutation, MutateOptions } from '@tanstack/react-query';

interface DeleteParams {
  userId: string;
}

async function deleteUser(userId: string) {
  const response = await fetch(`http://localhost:3002/users/${userId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to delete user');
  }

  return await response.json();
}

export const useDeleteUser = (opts: MutateOptions<unknown, Error, DeleteParams, unknown> = {}) => {
  return useMutation({
    mutationFn: ({ userId }: DeleteParams) => deleteUser(userId),
    ...opts,
  });
};