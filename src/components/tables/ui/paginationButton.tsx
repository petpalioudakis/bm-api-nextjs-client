import React from 'react';

export default function PaginationButton({
  children,
  clickHandler,
  isDisabled,
}: {
  children: React.ReactNode;
  clickHandler: () => void;
  isDisabled: boolean;
}) {
  return (
    <button
      className={`inline-flex items-center rounded rounded-full border p-2.5 transition ${
        isDisabled ? 'text-gray-300' : 'hover:border-black'
      }`}
      onClick={clickHandler}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}
