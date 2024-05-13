import { Column, Table } from '@tanstack/react-table';
import { MdClose } from 'react-icons/md';
import React from 'react';
import DebouncedInput from '@/components/tables/ui/debouncedInput';
import { AiOutlineSearch } from 'react-icons/ai';

export default function Filter({
  column,
  table,
}: {
  column: Column<any>;
  table: Table<any>;
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  const inputClasses = 'bg-inherit w-full font-normal';

  // @ts-ignore
  return typeof firstValue === 'number' ? (
    <div>
      <div className='flex space-x-2'>
        <DebouncedInput
          type='number'
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[0] ?? ''}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder={`Min ${
            column.getFacetedMinMaxValues()?.[0]
              ? `(${column.getFacetedMinMaxValues()?.[0]})`
              : ''
          }`}
          className={`${inputClasses}`}
        />
        <DebouncedInput
          type='number'
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[1] ?? ''}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder={`Max ${
            column.getFacetedMinMaxValues()?.[1]
              ? `(${column.getFacetedMinMaxValues()?.[1]})`
              : ''
          }`}
          className={`${inputClasses}`}
        />
      </div>
    </div>
  ) : (
    <div className={'max-w-xs relative mb-2 flex w-36 items-center gap-1 '}>
      <DebouncedInput
        type='text'
        value={(columnFilterValue ?? '') as string}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Search`}
        className={`${inputClasses} peer px-6`}
        style={{ fontWeight: 400 }}
        list={column.id + 'list'}
      />
      <span
        className={
          'absolute right-1 pr-3  text-lg text-gray-400 peer-focus:text-black'
        }
      >
        <AiOutlineSearch />
      </span>
      {(column.getFilterValue() as string) && (
        <button
          onClick={(e: any) => {
            const { parentElement } = e.target!;
            const input = parentElement.getElementsByTagName('input')[0];
            input.value = '';
            column.setFilterValue('');
          }}
          className={'absolute right-0 h-full w-6 text-center'}
        >
          <MdClose className={'pointer-events-none'} />
        </button>
      )}
    </div>
  );
}
