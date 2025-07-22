import SignInButton from '@/app/_components/SignInButton';
import { signInAction } from '@/app/_lib/actions';

export const metadata = {
  title: 'Login',
};

const Page = () => {
  return (
    <form action={signInAction}>
      <div className="mt-10 flex flex-col items-center gap-10">
        <h2 className="text-3xl font-semibold">
          Sign in to access your guest area
        </h2>

        <SignInButton />
      </div>
    </form>
  );
};

export default Page;
