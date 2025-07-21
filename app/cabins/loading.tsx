import Spinner from '@/app/_components/Spinner';

const Loading = () => {
  return (
    <div className="grid items-center justify-center">
      <Spinner />
      <p className="text-primary-200 text-xl">Loading cabin data...</p>
    </div>
  );
};

export default Loading;
