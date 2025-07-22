import { getBookedDatesByCabinId, getSettings } from '@/app/_lib/data-service';
import { Cabin } from '@/app/types';
import DateSelector from './DateSelector';
import ReservationForm from './ReservationForm';
import { auth } from '@/app/_lib/auth';
import LoginMessage from './LoginMessage';

type Props = {
  cabin: Cabin;
};

const Reservation = async ({ cabin }: Props) => {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);

  const session = await auth();

  return (
    <div className="border-primary-800 grid min-h-[400px] grid-cols-2 border">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {session?.user ? (
        <ReservationForm cabin={cabin} user={session.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
};

export default Reservation;
