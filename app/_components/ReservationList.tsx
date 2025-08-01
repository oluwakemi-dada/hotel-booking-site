'use client';

import { useOptimistic } from 'react';
import ReservationCard from './ReservationCard';
import { Booking } from '@/app/types';
import { deleteBooking } from '../_lib/actions';

type Props = {
  bookings: Booking[];
};

const ReservationList = ({ bookings }: Props) => {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id !== bookingId);
    },
  );

  const handleDelete = async (bookingId: number) => {
    optimisticDelete(bookingId);
    await deleteBooking(bookingId);
  };

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

export default ReservationList;
