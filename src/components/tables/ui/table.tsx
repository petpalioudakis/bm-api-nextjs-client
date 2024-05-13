import { PaginationControls } from '@/components/tables/ui/paginationControls';
import TableStructure from '@/components/tables/ui/tableStructure';
import { fuzzyFilter, generateAutoIncrement } from '@/utils/tableUtils';
import {
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo } from 'react';

const Table = ({
  data,
  columns,
  columnFilters,
  setColumnFilters,
  setGlobalFilter,
}: {
  data: any;
  columns: any;
  columnFilters: any;
  globalFilter: any;
  setColumnFilters: any;
  setGlobalFilter: any;
}) => {
  const table = useReactTable({
    data: useMemo(() => generateAutoIncrement(data), [data]),
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
  });
  return (
    <>
      <div
        className={'m-auto mb-4 flex max-w-4/5 items-center overflow-x-auto '}
      >
        <TableStructure table={table} />
      </div>
      <div
        className={
          'm-auto mb-4 ml-2 flex max-w-4/5 items-center justify-end overflow-x-auto pt-8 '
        }
      >
        <PaginationControls table={table} />
      </div>
    </>
  );
};

export default Table;
