import { Skeleton, Table } from '@radix-ui/themes';
import { memo } from 'react';

// TODO: Extend props for column spacings and row/cell heights
// this makes for a less jarring state change
const TableLoading = memo(
  function TableLoading({ rows, columns }: { rows: number; columns: number }) {
    const rowsArr = Array(rows).fill(null);
    const columnsArr = Array(columns).fill(null);
    return rowsArr.map((_, i) => (
      <Table.Row key={`row-${i}`}>
        {columnsArr.map((_, j) => (
          <Table.Cell key={`cell-${i}-${j}`}>
            <Skeleton />
          </Table.Cell>
        ))}
      </Table.Row>
    ));
  },
  () => true,
);

export default TableLoading;
