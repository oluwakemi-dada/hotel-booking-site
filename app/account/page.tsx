import { auth } from '../_lib/auth';

export const metadata = {
  title: 'Guest area',
};

const Page = async () => {
  const session = await auth();
  const firstname = session?.user?.name?.split(' ').at(0);

  console.log(session);
  
  
  return (
    <div>
      <h2 className="text-accent-400 mb-7 text-2xl font-semibold">
        Welcome, {firstname}
      </h2>
    </div>
  );
};

export default Page;
