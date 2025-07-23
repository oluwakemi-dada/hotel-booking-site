'use client';

import { TrashIcon } from '@heroicons/react/24/solid';
import { deleteReservation } from '@/app/_lib/actions';
import { useTransition } from 'react';
import SpinnerMini from './SpinnerMini';

type Props = {
  bookingId: string;
};

const DeleteReservation = ({ bookingId }: Props) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this reservation?'))
      startTransition(() => deleteReservation(bookingId));
  };

  return (
    <button
      onClick={handleDelete}
      className="group text-primary-300 hover:bg-accent-600 hover:text-primary-900 flex flex-grow items-center gap-2 px-3 text-xs font-bold uppercase transition-colors"
    >
      {!isPending ? (
        <>
          <TrashIcon className="text-primary-600 group-hover:text-primary-800 h-5 w-5 transition-colors" />
          <span className="mt-1">Delete</span>
        </>
      ) : (
        <span className="mx-auto">
          <SpinnerMini />
        </span>
      )}
    </button>
  );
};

export default DeleteReservation;
