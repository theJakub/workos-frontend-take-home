import { useState } from 'react';
import { useGetRoles } from '../queries/useGetRoles';
import { RolesContext } from './rolesContext';

export const RolesProvider = ({ children }: { children: React.ReactNode }) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  // TODO: add onError handler
  const { data, isLoading, isError, error, refetch } = useGetRoles({
    page,
    search,
  });

  const value = {
    roles: data?.data || {},
    pagination: {
      page,
      setPage,
      next: data?.next,
      prev: data?.prev,
      pages: data?.pages,
    },
    search: {
      value: search,
      setSearch,
    },
    isLoading,
    isError,
    error,
    refetch,
  };

  return (
    <RolesContext.Provider value={value}>{children}</RolesContext.Provider>
  );
};
