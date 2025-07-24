export type Booking = {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  totalPrice: number;
  numGuests: number;
  guestId: number;
  cabinId: number;
  cabin: {
    name: string;
    image: string;
  };
  status?: 'unconfirmed' | 'confirmed' | 'checked-in' | 'checked-out';
};

export type CreateBookingData = {
  startDate: string;
  endDate: string;
  numNights: number;
  cabinPrice: number;
  cabinId: number;
};
