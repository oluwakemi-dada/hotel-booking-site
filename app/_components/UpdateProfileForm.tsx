'use client';

import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { Country, Guest } from '../types';
import { updateGuest } from '@/app/_lib/actions';
import SelectCountry from './SelectCountry';
import { useFormStatus } from 'react-dom';

type Props = {
  guest: Guest;
  countries: Country[];
};

const UpdateProfileForm = ({ guest, countries }: Props) => {
  const [nationality, setNationality] = useState(guest?.nationality ?? '');
  const [countryFlag, setCountryFlag] = useState(
    countries.find((c) => c.name === guest?.nationality)?.flag ??
      'Country flag',
  );
  const { fullName, email, nationalID } = guest;

  const [_isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formNationality = formData.get('nationality') as string;
    const formCountryFlag = formData.get('countryFlag') as string;

    setNationality(formNationality);
    setCountryFlag(formCountryFlag);

    startTransition(async () => {
      try {
        await updateGuest(formData);
        toast.success('Profile updated');
      } catch (error) {
        console.error('Error updating guest:', error);
        toast.error('Failed to update profile');
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-primary-900 flex flex-col gap-6 px-12 py-8 text-lg"
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          disabled
          name="fullName"
          defaultValue={fullName}
          className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          disabled
          name="email"
          defaultValue={email}
          className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          <img
            src={countryFlag ?? undefined}
            defaultValue={countryFlag ?? ''}
            alt="Country flag"
            className="h-5 rounded-sm"
          />
        </div>

        <input type="hidden" name="nationality" value={nationality} />
        <input type="hidden" name="countryFlag" value={countryFlag} />

        <SelectCountry
          nationality={nationality}
          setNationality={setNationality}
          setCountryFlag={setCountryFlag}
          countries={countries}
          className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          name="nationalID"
          defaultValue={nationalID ?? ''}
          className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm"
        />
      </div>

      <div className="flex items-center justify-end gap-6">
        <Button />
      </div>
    </form>
  );
};

const Button = () => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="bg-accent-500 text-primary-800 hover:bg-accent-600 cursor-pointer px-8 py-4 font-semibold transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
    >
      {pending ? 'Updating...' : 'Update profile'}
    </button>
  );
};

export default UpdateProfileForm;
