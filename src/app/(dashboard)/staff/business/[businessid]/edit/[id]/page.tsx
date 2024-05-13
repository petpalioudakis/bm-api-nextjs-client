import { getSingleStaff } from '@/actions/business';
import ContentWrapper from '@/components/content-wrapper';
import SingleStaffForm from '@/components/forms/single-staff-form';
import { auth } from '@/utils/auth';
import { notFound, redirect } from 'next/navigation';

export default async function AddStaffPage({
  params,
}: {
  params: { businessid: number; id: number };
}) {
  const session = await auth();
  const { businessid, id } = params;

  if (!session) {
    redirect('/login');
  }

  const staff = await getSingleStaff(id, businessid);
  if (!staff) {
    return notFound();
  }

  return (
    <main>
      <ContentWrapper
        extraClasses={'py-8 bg-white flex flex-col '}
        narrow={true}
      >
        <div className={'mb-4 flex items-center justify-between pt-16'}>
          <p className={'text-3xl font-bold'}>
            Edit A Staff Member for {staff.business?.name}
          </p>
        </div>
        <div className='w-96'>
          <div
            className={
              'm-auto mt-12 grid max-w-4/5 grid-cols-1 gap-6 border-t pb-4 pt-6'
            }
          >
            <SingleStaffForm businessId={businessid} staff={staff} />
          </div>
        </div>
      </ContentWrapper>
    </main>
  );
}
