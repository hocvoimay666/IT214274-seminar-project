export type AppUser = {
  id: string;
  email: string | null;
  displayName: string | null;
  photoUrl?: string | null;
};

export type AuthCredentials = { email: string; password: string };
