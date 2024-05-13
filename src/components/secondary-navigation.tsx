'use client';
import NavLink from '@/components/nav-link';
import { logout } from '@/actions/user';
import { useSession } from 'next-auth/react';
import React from 'react';
import { AiOutlineLogout, AiOutlineUser } from 'react-icons/ai';

function SecondaryNavigation() {
  const { data: session } = useSession();

  const username = session?.user?.email;
  const logoutHandler = async () => {
    await logout();
  };
  const iconClasses = 'text-xl lg:text-2xl';
  return (
    <div className={'flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-6'}>
      <NavLink target={'#'}>
        <AiOutlineUser className={iconClasses} />
        <span>{username}</span>
      </NavLink>
      <NavLink target={'#'}>
        <AiOutlineLogout className={iconClasses} />
        <span onClick={logoutHandler}>Logout</span>
      </NavLink>
    </div>
  );
}

export default SecondaryNavigation;
