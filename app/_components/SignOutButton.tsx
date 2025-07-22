import { ArrowRightCircleIcon } from '@heroicons/react/24/outline';
import { signOutAction } from '@/app/_lib/actions';

const SignOutButton = () => {
  return (
    <form action={signOutAction}>
      <button
        aria-label="Sign out"
        className="hover:bg-primary-900 hover:text-primary-100 text-primary-200 flex w-full cursor-pointer items-center gap-4 px-5 py-3 font-semibold transition-colors"
      >
        <ArrowRightCircleIcon className="text-primary-600 h-5 w-5" />
        <span>Sign out</span>
      </button>
    </form>
  );
};

export default SignOutButton;
