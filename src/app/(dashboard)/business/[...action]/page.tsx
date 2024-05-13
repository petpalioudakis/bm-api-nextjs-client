import { getBusiness } from '@/actions/business';
import ContentWrapper from '@/components/content-wrapper';
import SingleBusinessForm from '@/components/forms/single-business-form';
import { auth } from '@/utils/auth';
import { notFound, redirect } from 'next/navigation';

export default async function ManageBusinessPage({
  params,
}: {
  params: { action: any };
}) {
  const { action } = params;
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  let business = null;

  if (action[0] === 'edit' && action[1]) {
    business = await getBusiness(parseInt(action[1]));
    if (!business) {
      return notFound();
    }
  } else if (action[0] !== 'add') {
    return notFound();
  }

  return (
    <main>
      <ContentWrapper
        extraClasses={'py-8 bg-white flex flex-col '}
        narrow={true}
      >
        <div className='w-96'>
          <div
            className={
              'm-auto mt-12 grid max-w-4/5 grid-cols-1 gap-6 border-t pb-4 pt-6'
            }
          >
            <SingleBusinessForm business={business} />
          </div>
        </div>
      </ContentWrapper>
    </main>
  );
}
