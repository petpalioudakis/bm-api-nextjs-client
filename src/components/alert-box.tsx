'use client';
import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';

const AlertBox = ({
  children,
  theme = '',
  initiallyOpen = false,
  onClickHandler,
}: {
  children: React.ReactNode;
  theme?: 'success' | 'danger' | 'warning' | '';
  initiallyOpen?: boolean;
  onClickHandler?: () => void;
}) => {
  const [open, setOpen] = useState(initiallyOpen);
  let wrapperClasses;
  switch (theme) {
    case 'success':
      wrapperClasses = 'bg-emerald-500 text-white';
      break;
    case 'danger':
      wrapperClasses = 'bg-red-400 text-white';
      break;
    case 'warning':
      wrapperClasses = 'bg-yellow-400';
      break;
    default:
      wrapperClasses = 'bg-gray-300';
      break;
  }
  return (
    <div
      className={`mb-2 rounded px-1.5 py-1.5 pb-6 transition sm:py-1.5 ${
        !open && 'hidden'
      } ${wrapperClasses}`}
    >
      <div className={'relative sm:px-8'}>
        <div className={'right-0 top-0 text-right sm:absolute'}>
          <button
            className={'mt-1.5 p-0.5 text-2xl hover:bg-white/25'}
            onClick={() => {
              setOpen(false);
              if (onClickHandler) {
                onClickHandler();
              }
            }}
          >
            <MdClose />
          </button>
        </div>
        <div className={'text-center sm:py-2'}>{children ?? 'no content'}</div>
      </div>
    </div>
  );
};

export default AlertBox;
