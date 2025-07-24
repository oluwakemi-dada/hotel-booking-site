import UpdateProfileForm from '@/app/_components/UpdateProfileForm';
import { auth } from '@/app/_lib/auth';
import { getCountries, getGuest } from '@/app/_lib/data-service';
import { Country, Guest } from '@/app/types';

export const metadata = {
  title: 'Update profile',
};

const Page = async () => {
  const session = await auth();
  const guest: Guest = await getGuest(session?.user?.email);
  const countries: Country[] = await getCountries();

  return (
    <div>
      <h2 className="text-accent-400 mb-4 text-2xl font-semibold">
        Update your guest profile
      </h2>

      <p className="text-primary-200 mb-8 text-lg">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      <UpdateProfileForm guest={guest} countries={countries} />
    </div>
  );
};

export default Page;
