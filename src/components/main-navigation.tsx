import {
  AiOutlineFileText,
  AiOutlineUnorderedList,
  AiOutlinePlusCircle,
} from 'react-icons/ai';

import NavLink from '@/components/nav-link';

function MainNavigation() {
  const iconClasses = 'text-lg';
  return (
    <div className={'flex flex-col gap-4  lg:flex-row xl:gap-8'}>
      <NavLink target={'/business'}>
        <AiOutlineFileText className={iconClasses} />
        <span className='text-xl-sm'>Business</span>
      </NavLink>
      <NavLink target={'/business/add'}>
        <AiOutlinePlusCircle className={iconClasses} />
        <span className='text-xl-sm'>Add Business</span>
      </NavLink>
      <NavLink target={'/staff'}>
        <AiOutlineUnorderedList className={iconClasses} />
        <span className='text-xl-sm'>Staff</span>
      </NavLink>
    </div>
  );
}

export default MainNavigation;
