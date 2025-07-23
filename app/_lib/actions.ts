'use server';

import { auth, signIn, signOut } from './auth';
import { supabase } from './supabase';

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

  const { data, error } = await supabase
    .from('guests')
    .update(updateData)
    .eq('id', session.user.guestId);

  if (error) throw new Error('Guest could not be updated');
};

export const signInAction = async () => {
  await signIn('google', { redirectTo: '/account' });
};

export const signOutAction = async () => {
  await signOut({ redirectTo: '/' });
};
