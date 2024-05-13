import { getAllBusinesses } from '@/actions/business';
import ContentWrapper from '@/components/content-wrapper';
import AccountsTable from '@/components/tables/business';
import { auth } from '@/utils/auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Accounts() {
  const session = await auth();
  if (!session) {
    redirect('/login');
  }

  const businesses = await getAllBusinesses();

  let content = <p>No businesses found</p>;
  if (businesses.length) {
    content = <AccountsTable data={businesses} />;
  }
  return (
    <main className='mt-16'>
      <div className={'mb-4 flex items-center justify-between pt-16'}>
        <h1 className={'text-3xl font-bold'}>Businesses</h1>
        <Link
          href={`/business/add`}
          className='items-end rounded bg-gray-950 px-4 py-2 text-white hover:bg-gray-700'
        >
          Add a new business
        </Link>
      </div>

      <ContentWrapper>{content}</ContentWrapper>
    </main>
  );
}
