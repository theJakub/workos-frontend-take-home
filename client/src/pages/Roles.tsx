import { Table } from '@radix-ui/themes';
import { memo } from 'react';
import { useRoles } from '../context/rolesContext';
import { getFormattedDate } from '../utils/date';

const Roles = memo(function Roles() {
  const { roles } = useRoles();

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Created at</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {Object.values(roles).map((role) => (
          <Table.Row key={role.id}>
            <Table.Cell style={{ whiteSpace: 'nowrap' }}>
              {role.name}
            </Table.Cell>
            <Table.Cell>{role.description}</Table.Cell>
            <Table.Cell style={{ whiteSpace: 'nowrap' }}>
              {getFormattedDate(role.createdAt)}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
});

export default Roles;
