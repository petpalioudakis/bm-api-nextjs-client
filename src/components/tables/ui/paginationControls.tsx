import { Table } from '@tanstack/react-table';
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from 'react-icons/md';
import React from 'react';
import PaginationButton from '@/components/tables/ui/paginationButton';

export function PaginationControls({ table }: { table: Table<any> }) {
  return (
    <div
      className={
        'flex flex-wrap items-center justify-center gap-4 md:justify-start'
      }
    >
      <div className={'flex flex-wrap items-center justify-center gap-2'}>
        <div className={'flex items-center justify-center gap-2'}>
          <PaginationButton
            clickHandler={() => table.setPageIndex(0)}
            isDisabled={!table.getCanPreviousPage()}
          >
            <MdKeyboardDoubleArrowLeft />
          </PaginationButton>
          <PaginationButton
            clickHandler={() => table.previousPage()}
            isDisabled={!table.getCanPreviousPage()}
          >
            <MdKeyboardArrowLeft />
          </PaginationButton>
        </div>
        <p className='flex items-center gap-1'>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </p>
        <div className={'flex items-center justify-center gap-2'}>
          <PaginationButton
            clickHandler={() => table.nextPage()}
            isDisabled={!table.getCanNextPage()}
          >
            <MdKeyboardArrowRight />
          </PaginationButton>
          <PaginationButton
            clickHandler={() => table.setPageIndex(table.getPageCount() - 1)}
            isDisabled={!table.getCanNextPage()}
          >
            <MdKeyboardDoubleArrowRight />
          </PaginationButton>
        </div>
      </div>
      <div className='flex items-center gap-1'>
        Go to page:
        <input
          className='h-9 w-20 rounded-full text-center'
          type='number'
          defaultValue={table.getState().pagination.pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            table.setPageIndex(page);
          }}
        />
      </div>
      <select
        className='h-9 rounded-full'
        value={table.getState().pagination.pageSize}
        onChange={(e) => {
          table.setPageSize(Number(e.target.value));
        }}
      >
        {[10, 20, 30, 40, 50, 100, 200].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </div>
  );
}
