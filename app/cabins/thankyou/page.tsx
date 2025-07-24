'use client';

import { useReservation } from '@/app/_context/ReservationContext';
import Link from 'next/link';
import { useEffect } from 'react';

const Page = () => {
  const { resetRange } = useReservation();

  useEffect(() => {
    resetRange();
  }, [resetRange]);

  return (
    <div className="mt-4 space-y-6 text-center">
      <h1 className="text-3xl font-semibold">
        Thank you for your reservation!
      </h1>
      <Link
        href="/account/reservations"
        className="text-accent-500 inline-block text-xl underline"
      >
        Manage your reservations &rarr;
      </Link>
    </div>
  );
};

export default Page;
