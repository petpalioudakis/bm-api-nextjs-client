import ContentWrapper from '@/components/content-wrapper';
import StaffTable from '@/components/tables/staff';
import { auth } from '@/utils/auth';
import { getAllStaff, getBusiness } from '@/actions/business';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';

export default async function Staff({
  params,
}: {
  params: { businessid: number };
}) {
  const { businessid } = params;
  const session = await auth();

  if (!session) {
    redirect('/login');
  }
  const business = await getBusiness(businessid);
  if (!business) {
    return notFound();
  }

  const addStaffButton = (
    <Link
      href={`/staff/business/${businessid}/add`}
      className='z-10 items-end rounded bg-gray-950 px-4 py-2 text-white hover:bg-gray-700'
    >
      Add staff member
    </Link>
  );

  const staff = await getAllStaff(businessid);
  let content = (
    <div className={'flex h-1/2 items-center justify-center'}>
      <p className={'text-2xl'}>No Staff for this business</p>
    </div>
  );
  if (staff.length) {
    content = <StaffTable data={staff} />;
  }

  return (
    <main className='mt-16'>
      <div className={'mb-4 flex items-center justify-between pt-16'}>
        <h1 className={'text-3xl font-bold'}>{business.name} Staff Members</h1>
        {addStaffButton}
      </div>
      <ContentWrapper>{content}</ContentWrapper>
    </main>
  );
}
