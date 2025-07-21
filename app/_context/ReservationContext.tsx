'use client';

import { createContext, ReactNode, useContext, useState } from 'react';
import { DateRange } from 'react-day-picker';

type Props = {
  children: ReactNode;
};

type ReservationContextType = {
  range: DateRange | undefined;
  setRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  resetRange: () => void;
};

const initialState = {
  from: undefined,
  to: undefined,
};

const ReservationContext = createContext<ReservationContextType | undefined>(
  undefined,
);

const ReservationProvider = ({ children }: Props) => {
  const [range, setRange] = useState<DateRange | undefined>(initialState);

  const resetRange = () => {
    setRange(initialState);
  };

  return (
    <ReservationContext.Provider
      value={{
        range,
        setRange,
        resetRange,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};

const useReservation = () => {
  const context = useContext(ReservationContext);
  if (context === undefined)
    throw new Error('Context was used outside provider');

  return context;
};

export { ReservationProvider, useReservation };
