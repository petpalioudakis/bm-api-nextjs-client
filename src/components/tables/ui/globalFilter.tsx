import { MdClose, MdOutlineFilterAlt } from 'react-icons/md';
import React from 'react';
import DebouncedInput from '@/components/tables/ui/debouncedInput';

export default function GlobalFilter({
  value,
  changeHandler,
  placeholder,
}: {
  value: string;
  changeHandler: (value: any) => void;
  placeholder: string;
}) {
  return (
    <div className={'relative mb-2 flex w-56 items-center gap-1'}>
      <DebouncedInput
        value={value}
        onChange={changeHandler}
        className={'peer w-full rounded border border-gray-300 px-8 py-1.5'}
        placeholder={placeholder}
      />
      <span
        className={
          'absolute left-2 text-xl text-gray-400 peer-focus:text-black'
        }
      >
        <MdOutlineFilterAlt />
      </span>
      {value?.length > 0 && (
        <button
          onClick={(e: any) => {
            const { parentElement } = e.target!;
            const input = parentElement.getElementsByTagName('input')[0];
            input.value = '';
            changeHandler('');
          }}
          className={'absolute right-0 h-full w-6 text-center'}
        >
          <MdClose className={'pointer-events-none'} />
        </button>
      )}
    </div>
  );
}
