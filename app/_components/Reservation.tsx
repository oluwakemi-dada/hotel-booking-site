import { getBookedDatesByCabinId, getSettings } from '@/app/_lib/data-service';
import { Cabin } from '@/app/types';
import DateSelector from './DateSelector';
import ReservationForm from './ReservationForm';

type Props = {
  cabin: Cabin;
};

const Reservation = async ({ cabin }: Props) => {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);

  return (
    <div className="border-primary-800 grid min-h-[400px] grid-cols-2 border">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      <ReservationForm cabin={cabin} />
    </div>
  );
};

export default Reservation;
