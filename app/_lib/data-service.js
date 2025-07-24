import { eachDayOfInterval } from 'date-fns';
import { notFound } from 'next/navigation';
import { supabase } from './supabase';

export const getCabin = async (id) => {
  const { data, error } = await supabase
    .from('cabins')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
};

export const getCabinPricem = async (id) => {
  const { data, error } = await supabase
    .from('cabins')
    .select('regularPrice, discount')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
  }

  return data;
};

export const getCabins = async () => {
  const { data, error } = await supabase
    .from('cabins')
    .select('id, name, maxCapacity, regularPrice, discount, image')
    .order('name');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data;
};

// Guests are uniquely identified by their email address
export const getGuest = async (email) => {
  const { data } = await supabase
    .from('guests')
    .select('*')
    .eq('email', email)
    .single();

  return data;
};

export const getBooking = async (id) => {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not get loaded');
  }

  return data;
};

export const getBookings = async (guestId) => {
  const { data, error } = await supabase
    .from('bookings')
    .select(
      'id, created_at, startDate, endDate, numNights, numGuests, totalPrice, guestId, cabinId, cabins(name, image)',
    )
    .eq('guestId', guestId)
    .order('startDate');

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  const bookings = data.map((item) => ({
    ...item,
    cabin: item.cabins,
    cabins: undefined,
  }));

  return bookings;
};

export const getBookedDatesByCabinId = async (cabinId) => {
  let today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  today = today.toISOString();

  // Getting all bookings
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('cabinId', cabinId)
    .or(`startDate.gte.${today},status.eq.checked-in`);

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  // Converting to actual dates to be displayed in the date picker
  const bookedDates = data
    .map((booking) => {
      return eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      });
    })
    .flat();

  return bookedDates;
};

export const getSettings = async () => {
  const { data, error } = await supabase.from('settings').select('*').single();

  if (error) {
    console.error(error);
    throw new Error('Settings could not be loaded');
  }

  return data;
};

export const getCountries = async () => {
  try {
    const res = await fetch(
      'https://restcountries.com/v2/all?fields=name,flag',
    );
    const countries = await res.json();
    return countries;
  } catch {
    throw new Error('Could not fetch countries');
  }
};

export const createGuest = async (newGuest) => {
  const { data, error } = await supabase.from('guests').insert([newGuest]);

  if (error) {
    console.error(error);
    throw new Error('Guest could not be created');
  }

  return data;
};
