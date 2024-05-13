import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function NavLink({
  children,
  target,
}: {
  children: React.ReactNode;
  target?: string;
}) {
  const pathName = usePathname();
  const active =
    pathName === target
      ? 'lg:border-b lg:font-normal font-bold lg:py-4 transition ease-in-out delay-150'
      : '';

  return (
    <Link
      href={target ?? '#'}
      className={`flex items-center gap-1  no-underline  ${active}`}
    >
      {children}
    </Link>
  );
}

export default NavLink;
