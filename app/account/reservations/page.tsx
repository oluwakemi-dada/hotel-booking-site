import Link from 'next/link';
import ReservationList from '@/app/_components/ReservationList';
import { auth } from '@/app/_lib/auth';
import { getBookings } from '@/app/_lib/data-service';
import { Booking } from '@/app/types';



export const metadata = {
  title: 'Reservations',
};

const Page = async () => {
  const session = await auth();
  // @ts-expect-error : superbase is inferring object as array
  const bookings: Booking[] = await getBookings(session?.user.guestId);

  return (
    <div>
      <h2 className="text-accent-400 mb-7 text-2xl font-semibold">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{' '}
          <Link className="text-accent-500 underline" href="/cabins">
            luxury cabins &rarr;
          </Link>
        </p>
      ) : (
        <ReservationList bookings={bookings}/>
      )}
    </div>
  );
};

export default Page;
