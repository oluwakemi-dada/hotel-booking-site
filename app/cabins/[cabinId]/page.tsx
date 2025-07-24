import Cabin from '@/app/_components/Cabin';
import Reservation from '@/app/_components/Reservation';
import Spinner from '@/app/_components/Spinner';
import { getCabin, getCabins } from '@/app/_lib/data-service';
import { Suspense } from 'react';

type Props = {
  params: Promise<{ cabinId: string }>;
};

export const generateMetadata = async ({ params }: Props) => {
  const { cabinId } = await params;
  const { name } = await getCabin(cabinId);

  return {
    title: `Cabin ${name}`,
  };
};

// For builds
export const generateStaticParams = async () => {
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => ({
    cabinId: String(cabin.id),
  }));

  return ids;
};

const Page = async ({ params }: Props) => {
  const { cabinId } = await params;
  const cabin = await getCabin(cabinId);
  const { name } = cabin;

  return (
    <div className="mx-auto mt-8 max-w-6xl">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-accent-400 mb-10 text-center text-5xl font-semibold">
          Reserve {name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
