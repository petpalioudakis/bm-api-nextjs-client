import ContentWrapper from '@/components/content-wrapper';
import StaffTable from '@/components/tables/staff';
import { auth } from '@/utils/auth';
import { getAllStaff } from '@/actions/business';
import { redirect } from 'next/navigation';

export const revalidate = 7200;

export default async function Staff() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  const staff = await getAllStaff();

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
        <h1 className={'text-3xl font-bold'}>All Staff Members</h1>
      </div>
      <ContentWrapper>{content}</ContentWrapper>
    </main>
  );
}
