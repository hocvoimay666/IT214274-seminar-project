import { createContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react';

import { firebaseAuth, isFirebaseConfigured } from '@/config/firebase';
import { observeAuth, register, signIn, signOutUser, updateDisplayName } from '@/services/auth-service';
import type { AppUser, AuthCredentials } from '@/types/auth';

type AuthContextValue = {
  user: AppUser | null;
  loading: boolean;
  signIn: (credentials: AuthCredentials) => Promise<void>;
  register: (credentials: AuthCredentials, displayName: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateDisplayName: (name: string) => Promise<void>;
};

// Global auth state for the entire app
export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<AppUser | null>(null);
  // If Firebase is configured, wait for existing session check (loading = true)
  const [loading, setLoading] = useState(isFirebaseConfigured);

  // Subscribe to auth state on app start (auto sign-in if token exists)
  useEffect(() => {
    if (!isFirebaseConfigured || !firebaseAuth) {
      return;
    }
    return observeAuth((nextUser) => {
      setUser(nextUser);
      setLoading(false);
    });
  }, []);

  // Memoize actions & state to avoid unnecessary re-renders
  const value = useMemo<AuthContextValue>(() => ({
    user,
    loading,
    signIn: async (credentials) => { setUser(await signIn(credentials)); },
    register: async (credentials, displayName) => { setUser(await register(credentials, displayName)); },
    signOut: async () => { await signOutUser(); setUser(null); },
    updateDisplayName: async (name) => { setUser(await updateDisplayName(name)); },
  }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
