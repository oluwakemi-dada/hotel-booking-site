import CabinList from '@/app/_components/CabinList';
import Filter from '@/app/_components/Filter';
import Spinner from '@/app/_components/Spinner';
import { Suspense } from 'react';
import ReservationReminder from '@/app/_components/ReservationReminder';

export type Props = {
  searchParams: Promise<{
    [key: string]: string | undefined;
  }>;
};

export const metadata = {
  title: 'Cabins',
};

const Page = async ({ searchParams }: Props) => {
  const { capacity } = await searchParams;
  const filter = capacity ?? 'all';

  return (
    <div>
      <h1 className="text-accent-400 mb-5 text-4xl font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 mb-10 text-lg">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      <div className="mb-8 flex justify-end">
        <Filter />
      </div>

      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
};

export default Page;
