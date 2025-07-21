'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ReactNode } from 'react';

type ButtonProps = {
  filter: string;
  handleFilter: (filter: string) => void;
  activeFilter: string;
  children: ReactNode;
};

const Filter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get('capacity') ?? 'all';

  const handleFilter = (filter: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('capacity', filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="border-primary-800 flex border">
      <Button
        filter="all"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        All cabins
      </Button>

      <Button
        filter="small"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        1&mdash;3 guests
      </Button>

      <Button
        filter="medium"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        4&mdash;7 guests
      </Button>

      <Button
        filter="large"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        8&mdash;10 guests
      </Button>
    </div>
  );
};

const Button = ({
  filter,
  handleFilter,
  activeFilter,
  children,
}: ButtonProps) => {
  return (
    <button
      onClick={() => handleFilter(filter)}
      className={`hover:bg-primary-700 cursor-pointer px-5 py-2 ${filter === activeFilter ? 'bg-primary-700 text-primary-500' : ''}`}
    >
      {children}
    </button>
  );
};

export default Filter;
