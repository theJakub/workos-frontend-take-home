import { createContext, useContext } from 'react';
import { Roles } from '../types/roles';

interface RolesContextValue {
  roles: Roles;
  pagination: {
    page: number;
    setPage: (page: number) => void;
    next: boolean | undefined;
    prev: boolean | undefined;
    pages: number | undefined;
  };
  search: {
    value: string;
    setSearch: (search: string) => void;
  };
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  refetch: () => void;
}

export const RolesContext = createContext<RolesContextValue>({
  roles: {},
  pagination: {
    page: 1,
    setPage: () => {},
    next: undefined,
    prev: undefined,
    pages: undefined,
  },
  search: {
    value: '',
    setSearch: () => {},
  },
  isLoading: true,
  isError: false,
  error: null,
  refetch: () => {},
});

export const useRoles = () => {
  const context = useContext(RolesContext);
  if (context === undefined) {
    throw new Error('useRoles must be used within a RolesProvider');
  }
  return context;
};
