'use client';

import MainNavigation from '@/components/main-navigation';
import SecondaryNavigation from '@/components/secondary-navigation';
import { useCallback, useEffect, useState } from 'react';
import { MdClose, MdMenu } from 'react-icons/md';

export default function Header() {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => {
    const targetState = !open;
    setOpen(targetState);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const resizeHandler = useCallback(() => {
    if (open) setOpen(false);
  }, [open]);
  useEffect(() => {
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [resizeHandler]);
  return (
    <header className={'fixed z-10 w-full'}>
      <div className={'relative'}>
        <div className={'bg-black text-white'}>
          <div
            className={
              'm-auto flex max-w-4/5 flex-row flex-wrap items-center justify-between pb-7 pt-7 lg:justify-end'
            }
          >
            <div
              className={'content: center; flex items-center justify-center '}
            >
              <p
                className={
                  'logo-copy ml-3 mr-auto text-lg font-bold leading-tight sm:text-xl xl:text-2xl'
                }
              >
                BUSINESS STAFF MANAGEMENT
              </p>
            </div>
            <div
              className={`absolute hidden bg-black lg:relative lg:m-auto lg:mb-2 lg:block  lg:h-16  ${
                !open && 'hidden lg:flex lg:items-center'
              }`}
            >
              <div className={`max-w-screen-xl mx-auto w-full px-2 py-4`}>
                <div className='mb-4 px-2 lg:mb-0'>
                  <MainNavigation />
                </div>
                <div className={'bg-black p-2 py-3 text-white lg:hidden'}>
                  <SecondaryNavigation />
                </div>
              </div>
            </div>

            <div className={'mt-5 hidden text-sm lg:mt-0 lg:block'}>
              <SecondaryNavigation />
            </div>
            <div className={'flex items-center transition-all lg:hidden'}>
              <button onClick={toggleMenu} className={'px-0 pl-2 text-3xl'}>
                {open ? <MdClose /> : <MdMenu />}
              </button>
            </div>
          </div>
        </div>
        <div
          className={`absolute block w-full overflow-y-auto border-b border-gray-300 bg-white transition lg:relative lg:hidden lg:h-16 lg:bg-gray-200 ${
            !open && 'hidden lg:flex lg:items-center'
          }`}
          style={{ maxHeight: 'calc(100vh - 3em)' }}
        >
          <div className={`max-w-screen-xl mx-auto w-full px-2 py-4`}>
            <div className='mb-4 px-2 lg:mb-0'>
              <MainNavigation />
            </div>
            <div className={'bg-black p-2 py-3 text-white lg:hidden'}>
              <SecondaryNavigation />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
