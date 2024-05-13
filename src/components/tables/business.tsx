'use client';
import Table from '@/components/tables/ui/table';
import { Business } from '@/types/business.type';
import * as actions from '@/actions/business';
import { ColumnDef, ColumnFiltersState } from '@tanstack/react-table';
import { createColumnHelper } from '@tanstack/table-core';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

export default function BusinesssTable({
  data,
}: Readonly<{ data: Business[] }>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const columnHelper = createColumnHelper<Business>();
  const columns = useMemo<ColumnDef<Business, any>[]>(
    () => [
      /*      columnHelper.accessor((row) => `${row.ai}`, {
        header: '#',
        enableColumnFilter: false,
        enableGlobalFilter: false,
      }),*/
      columnHelper.accessor((row) => `${row?.business_type}`, {
        header: 'Business Type',
      }),
      columnHelper.accessor((row) => `${row.name}`, {
        header: 'Business Name',
      }),
      columnHelper.accessor((row) => `${row.location}`, {
        header: 'Location',
      }),
      columnHelper.display({
        id: 'actions',
        cell: (props) => {
          const buttonClasses = 'transition text-2xl';
          return (
            <div className={'flex items-center gap-3'}>
              <Link
                href={`/staff/business/${props.row.original.id}`}
                className={`text-xl`}
              >
                View Staff
              </Link>

              <Link
                href={`/business/edit/${props.row.original.id}`}
                className={`${buttonClasses}`}
              >
                <AiOutlineEdit />
              </Link>
              <form
                action={actions.deleteBusiness.bind(
                  null,
                  +props.row.original.id
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
    <Table
      data={data}
      columns={columns}
      columnFilters={columnFilters}
      globalFilter={globalFilter}
      setColumnFilters={setColumnFilters}
      setGlobalFilter={setGlobalFilter}
    />
  );
}
