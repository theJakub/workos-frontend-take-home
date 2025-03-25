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
import { motion, AnimatePresence } from 'motion/react';

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

    const tableRowVariants = {
      initial: { opacity: 0, y: 20 },
      animate: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: i * 0.05,
          duration: 0.3,
          ease: 'easeOut',
        },
      }),
      exit: {
        opacity: 0,
        x: -10,
        transition: { duration: 0.2 },
      },
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Flex direction={'column'} gap={'24px'}>
          <Flex width={'100%'} gap={'8px'} justify={'between'}>
            <TextField.Root
              onChange={handleChange}
              placeholder="Search by name..."
              style={{
                flex: 1,
                // Add subtle focus animation with CSS instead
                transition: 'transform 0.2s, opacity 0.2s',
              }}
              className="search-field"
            >
              <TextField.Slot>
                <MagnifyingGlassIcon />
              </TextField.Slot>
            </TextField.Root>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button onClick={() => console.log('add user')}>
                <PlusIcon />
                Add user
              </Button>
            </motion.div>
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
              <AnimatePresence mode="wait">
                {isFetching ? (
                  <TableLoading rows={5} columns={3} />
                ) : (
                  <>
                    <AnimatePresence>
                      {users?.map((user: User, index: number) => (
                        <motion.tr
                          key={user.id}
                          custom={index}
                          variants={tableRowVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          style={{
                            display: 'table-row',
                            width: '100%',
                          }}
                        >
                          <Table.Cell width={'40%'}>
                            <motion.div
                              initial={{ scale: 0.9 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.2 }}
                              style={{ display: 'inline-block' }}
                            >
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
                            </motion.div>
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
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </>
                )}
              </AnimatePresence>
              <Table.Row>
                <Table.Cell />
                <Table.Cell />
                <Table.Cell />
                <Table.Cell justify={'end'} width={'100px'}>
                  <Flex gap={'12px'} justify={'end'}>
                    <motion.div
                      whileHover={{ scale: prev ? 1.05 : 1 }}
                      whileTap={{ scale: prev ? 0.95 : 1 }}
                    >
                      <Button
                        color="gray"
                        variant="outline"
                        highContrast
                        onClick={() => setPage((current) => current - 1)}
                        disabled={isFetching || !prev}
                      >
                        Previous
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: next ? 1.05 : 1 }}
                      whileTap={{ scale: next ? 0.95 : 1 }}
                    >
                      <Button
                        color="gray"
                        variant="outline"
                        highContrast
                        onClick={() => setPage((current) => current + 1)}
                        disabled={isFetching || !next}
                      >
                        Next
                      </Button>
                    </motion.div>
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
            onClose={() =>
              setDeleteModalState({ open: false, user: {} as User })
            }
            open={deleteModalState.open}
            title={'Delete user'}
          />
        </Flex>
      </motion.div>
    );
  },
  () => true,
);

export default Users;
