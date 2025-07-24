'use client';

import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from 'date-fns';
import { type DateRange, DayPicker } from 'react-day-picker';

import 'react-day-picker/style.css';
import { Cabin, Settings } from '@/app/types';
import { useReservation } from '@/app/_context/ReservationContext';

type Props = {
  settings: Settings;
  bookedDates: Date[];
  cabin: Cabin;
};

const isAlreadyBooked = (range: DateRange, datesArr: Date[]) => {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, {
        start: range.from as Date,
        end: range.to as Date,
      }),
    )
  );
};

const DateSelector = ({ settings, bookedDates, cabin }: Props) => {
  const { range, setRange, resetRange } = useReservation();

  const displayRange: DateRange | undefined =
    range && isAlreadyBooked(range, bookedDates) ? undefined : range;

  const { regularPrice, discount } = cabin;

  const numNights =
    displayRange && displayRange.from && displayRange.to
      ? differenceInDays(displayRange.to, displayRange.from)
      : 0;
  const cabinPrice = numNights * (regularPrice - discount);

  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="place-self-center pt-12"
        mode="range"
        selected={displayRange}
        onSelect={(range) => setRange(range)}
        min={minBookingLength + 1}
        max={maxBookingLength}
        defaultMonth={new Date()}
        startMonth={new Date(new Date().getFullYear(), 0)}
        endMonth={new Date(new Date().getFullYear() + 5, 11)}
        captionLayout="dropdown"
        numberOfMonths={2}
        disabled={(curDate) =>
          isPast(curDate) ||
          bookedDates.some((date) => isSameDay(date, curDate))
        }
      />

      <div className="bg-accent-500 text-primary-800 flex h-[72px] items-center justify-between px-8">
        <div className="flex items-baseline gap-6">
          <p className="flex items-baseline gap-2">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="text-primary-700 font-semibold line-through">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{' '}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            className="border-primary-800 border px-4 py-2 text-sm font-semibold"
            onClick={() => resetRange()}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default DateSelector;
