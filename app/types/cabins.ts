export type Cabin = {
  discount: number;
  id: number;
  image: string;
  maxCapacity: number;
  name: string;
  regularPrice: number;
  description?: string;
};

export type Settings = {
  breakfastPrice: number;
  created_at: string;
  id: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  minBookingLength: number;
};
