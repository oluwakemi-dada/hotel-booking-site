import Spinner from '@/app/_components/Spinner';

const Loading = () => {
  return (
    <div className='grid items-center justify-center'>
      <Spinner />
      <p className='text-xl text-primary-200'>Loading cabin data...</p>
    </div>
  );
};

export default Loading;
