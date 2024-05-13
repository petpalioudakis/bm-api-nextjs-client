import { flexRender, Table } from '@tanstack/react-table';
import { MdArrowDownward, MdArrowUpward, MdSort } from 'react-icons/md';
import React from 'react';
import Filter from '@/components/tables/ui/filter';

export default function TableStructure({ table }: { table: Table<any> }) {
  return (
    <table className={'w-full bg-gray-100'}>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const canSort = header.column.getCanSort();
              return (
                <th key={header.id}>
                  <div>
                    {header.column.getCanFilter() ? (
                      <Filter column={header.column} table={table} />
                    ) : null}
                    <div
                      {...{
                        className: canSort
                          ? 'cursor-pointer select-none flex items-center gap-1'
                          : '',
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {{
                        asc: <MdArrowUpward />,
                        desc: <MdArrowDownward />,
                      }[header.column.getIsSorted() as string] ??
                        (canSort ? <MdSort /> : null)}
                    </div>
                  </div>
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
