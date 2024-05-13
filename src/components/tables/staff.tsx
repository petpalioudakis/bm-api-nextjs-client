'use client';

import Table from '@/components/tables/ui/table';
import { Staff } from '@/types/staff.type';
import * as actions from '@/actions/business';
import { ColumnDef, ColumnFiltersState } from '@tanstack/react-table';
import { createColumnHelper } from '@tanstack/table-core';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

export default function StaffTable({ data }: { data: Staff[] }) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const columnHelper = createColumnHelper<Staff>();

  const columns = useMemo<ColumnDef<Staff, any>[]>(
    () => [
      columnHelper.accessor((row) => `${row.id}`, {
        header: 'ID',
        enableColumnFilter: false,
        enableGlobalFilter: false,
      }),
      columnHelper.accessor((row) => `${row.first_name} ${row.last_name}`, {
        header: 'Name',
      }),
      columnHelper.accessor((row) => `${row.business?.name}`, {
        header: 'Business',
      }),
      columnHelper.display({
        id: 'actions',
        cell: (props) => {
          const buttonClasses = 'transition text-2xl';
          return (
            <div className={'flex items-center gap-3'}>
              <Link
                href={`/staff/business/${props.row.original.business?.id}/edit/${props.row.original.id}`}
                className={`${buttonClasses}`}
              >
                <AiOutlineEdit />
              </Link>
              <form
                action={actions.deleteStaff.bind(
                  null,
                  +props?.row?.original?.id!,
                  +props?.row?.original?.business?.id!
                )}
              >
                <button type='submit' className={`${buttonClasses}`}>
                  <AiOutlineDelete />
                </button>
              </form>
            </div>
          );
        },
        header: 'Actions',
      }),
    ],
    []
  );
  return (
    <>
      <Table
        data={data}
        columns={columns}
        columnFilters={columnFilters}
        globalFilter={globalFilter}
        setColumnFilters={setColumnFilters}
        setGlobalFilter={setGlobalFilter}
      />
    </>
  );
}
