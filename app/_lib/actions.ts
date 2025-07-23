'use server';

import { revalidatePath } from 'next/cache';
import { auth, signIn, signOut } from './auth';
import { supabase } from './supabase';
import { getBookings } from './data-service';
import { redirect } from 'next/navigation';

export const updateGuest = async (formData: FormData) => {
  const session = await auth();
  if (!session) throw new Error('You must be logged in');

  const nationality = formData.get('nationality');
  const countryFlag = formData.get('countryFlag');
  const nationalID = formData.get('nationalID');
  const regex = /^[a-zA-Z0-9]{6,12}$/;

  if (typeof nationalID !== 'string' || !regex.test(nationalID))
    throw new Error('Please provide a valid national ID');

  const updateData = {
    nationality,
    countryFlag,
    nationalID,
  };

  const { error } = await supabase
    .from('guests')
    .update(updateData)
    .eq('id', session.user.guestId);

  if (error) throw new Error('Guest could not be updated');
};

export const deleteReservation = async (bookingId: number) => {
  const session = await auth();
  if (!session) throw new Error('You must be logged in');

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error('You are not allowed to delete this booking');

  const { error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', bookingId);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }

  revalidatePath('/account/reservations');
};

export const updateBooking = async (formData: FormData) => {
  const session = await auth();
  if (!session) throw new Error('You must be logged in');

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  const bookingId = Number(formData.get('bookingId'));

  if (!guestBookingIds.includes(bookingId))
    throw new Error('You are not allowed to update this booking');

  const updateData = {
    numGuests: Number(formData.get('numGuests')),
    observations: formData.get('observations')?.slice(0, 1000),
  };

  const { error } = await supabase
    .from('bookings')
    .update(updateData)
    .eq('id', bookingId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }

  revalidatePath('/account/reservations');
  revalidatePath(`/account/reservations/edit${bookingId}`);
  redirect('/account/reservations');
};

export const signInAction = async () => {
  await signIn('google', { redirectTo: '/account' });
};

export const signOutAction = async () => {
  await signOut({ redirectTo: '/' });
};
