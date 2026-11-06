export type AppUser = {
  id: string;
  email: string | null;
  displayName: string | null;
};

export type AuthCredentials = { email: string; password: string };
