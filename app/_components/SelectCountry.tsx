'use client';

import { Country } from '@/app/types';

type Props = {
  nationality: string;
  setNationality: (value: string) => void;
  setCountryFlag: (value: string) => void;
  countries: Country[];
  className: string;
};

const SelectCountry = ({
  nationality,
  setNationality,
  setCountryFlag,
  countries,
  className,
}: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [name, flag] = e.target.value.split('%');
    setNationality(name);
    setCountryFlag(flag);
  };

  return (
    <select
      value={`${nationality}%${countries.find((c) => c.name === nationality)?.flag ?? ''}`}
      onChange={handleChange}
      className={className}
    >
      <option value="">Select country...</option>
      {countries.map((c) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  );
};

export default SelectCountry;
