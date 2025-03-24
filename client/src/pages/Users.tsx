import {
  Avatar,
  Box,
  Button,
  Flex,
  Table,
  Text,
  TextField,
} from '@radix-ui/themes';
import { memo, useCallback, useState } from 'react';
import { useGetUsers } from '../queries/useGetUsers';
import {
  DotsHorizontalIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from '@radix-ui/react-icons';
import { User } from '../types/users';
import { getFormattedDate } from '../utils/date';
import { useRoles } from '../context/rolesContext';
import debounce from 'lodash/debounce';
import TableLoading from '../components/TableLoading';
import Menu from '../components/Menu';
import Modal from '../components/Modal';
import { useDeleteUser } from '../queries/useDeleteUser';

interface DeleteModalState {
  open: boolean;
  user: User;
}

const Users = memo(
  function Users() {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [deleteModalState, setDeleteModalState] = useState<DeleteModalState>({
      open: false,
      user: {} as User,
    });
    const { roles } = useRoles();
    const {
      data: { data: users, next, prev },
      isFetching,
      refetch,
    } = useGetUsers({ page, search: searchTerm });
    const { mutate: deleteUser } = useDeleteUser({
      onSuccess: () => {
        refetch();
      },
    });

    const handleDelete = useCallback(
      (userId: string) => {
        deleteUser({ userId });
      },
      [deleteUser],
    );

    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        debounce(() => {
          setSearchTerm(event.target.value);
        }, 300)();
      },
      [],
    );

    return (
      <Flex direction={'column'} gap={'24px'}>
        <Flex width={'100%'} gap={'8px'} justify={'between'}>
          <TextField.Root
            onChange={handleChange}
            placeholder="Search by name..."
            style={{ flex: 1 }}
          >
            <TextField.Slot>
              <MagnifyingGlassIcon />
            </TextField.Slot>
          </TextField.Root>
          <Button>
            <PlusIcon />
            Add user
          </Button>
        </Flex>
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>User</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Joined</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {isFetching && <TableLoading rows={5} columns={3} />}
            {!isFetching &&
              users?.map((user: User) => (
                <Table.Row key={user.id}>
                  <Table.Cell width={'40%'}>
                    <Avatar
                      radius="full"
                      src={user.photo}
                      fallback={`${user.first[0]}${user.last[0]}`}
                      style={{
                        marginRight: '8px',
                        height: '24px',
                        width: '24px',
                      }}
                    />
                    {`${user.first} ${user.last}`}
                  </Table.Cell>

                  <Table.Cell>{roles[user.roleId]?.name}</Table.Cell>

                  <Table.Cell width={'15%'}>
                    {getFormattedDate(user.createdAt)}
                  </Table.Cell>

                  <Table.Cell justify={'end'}>
                    <Menu
                      items={[
                        {
                          label: 'Edit',
                          onClick: () => console.log('edit'),
                        },
                        {
                          label: 'Delete',
                          onClick: () =>
                            setDeleteModalState({
                              open: true,
                              user,
                            }),
                        },
                      ]}
                      Trigger={
                        <Button
                          color="gray"
                          highContrast
                          mr={'4px'}
                          radius="full"
                          size="1"
                          variant="ghost"
                        >
                          <Box pt={'4px'}>
                            <DotsHorizontalIcon />
                          </Box>
                        </Button>
                      }
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
            <Table.Row>
              <Table.Cell />
              <Table.Cell />
              <Table.Cell />
              <Table.Cell justify={'end'} width={'100px'}>
                {/*
                TODO: adjust the layout for these buttons
                Since they both render in the same cell as the ... menu
                the end cell takes up more space than necessary.
              */}
                <Flex gap={'12px'} justify={'end'}>
                  <Button
                    color="gray"
                    variant="outline"
                    highContrast
                    onClick={() => setPage((current) => current - 1)}
                    disabled={isFetching || !prev}
                  >
                    Previous
                  </Button>
                  <Button
                    color="gray"
                    variant="outline"
                    highContrast
                    onClick={() => setPage((current) => current + 1)}
                    disabled={isFetching || !next}
                  >
                    Next
                  </Button>
                </Flex>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
        <Modal
          actionButtonHandler={() => handleDelete(deleteModalState.user.id)}
          actionButtonTitle={'Delete user'}
          description={
            <Text>
              Are you sure? The user
              <Text weight={'bold'}>
                {` ${deleteModalState.user.first} ${deleteModalState.user.last} `}
              </Text>
              will be permanently deleted.
            </Text>
          }
          onClose={() => setDeleteModalState({ open: false, user: {} as User })}
          open={deleteModalState.open}
          title={'Delete user'}
        />
      </Flex>
    );
  },
  () => true,
);

export default Users;
