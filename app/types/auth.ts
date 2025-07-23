export type User = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export type Guest = {
  countryFlag: string | null;
  created_at: string;
  email: string;
  fullName: string;
  id: number;
  nationalID: string | null;
  nationality: string;
};

export type Country = {
  name: string;
  flag: string;
};