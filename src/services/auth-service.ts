import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from 'firebase/auth';

import { firebaseAuth } from '@/config/firebase';
import type { AppUser, AuthCredentials } from '@/types/auth';
// Subject: Firebase Auth
function requireAuth() {
  if (!firebaseAuth) throw new Error('Firebase is not configured. Add the EXPO_PUBLIC_FIREBASE_* values to your environment.');
  return firebaseAuth;
}
// Convert object User of Firebase to AppUser (to maintain easily)
export function toAppUser(user: User): AppUser {
  return { id: user.uid, email: user.email, displayName: user.displayName };
}
// callback: ObserverObserver -> that is listening from user interactioninteractioninteraction (from UI)
export function observeAuth(callback: (user: AppUser | null) => void) {
  return onAuthStateChanged(requireAuth(), (user) => callback(user ? toAppUser(user) : null));
}
// Some auth functions:
export async function signIn(credentials: AuthCredentials) {
  const result = await signInWithEmailAndPassword(requireAuth(), credentials.email.trim(), credentials.password);
  return toAppUser(result.user);
}

export async function register(credentials: AuthCredentials, displayName: string) {
  const result = await createUserWithEmailAndPassword(requireAuth(), credentials.email.trim(), credentials.password);
  const name = displayName.trim();
  if (name) await updateProfile(result.user, { displayName: name });
  return toAppUser(result.user);
}

export function signOutUser() {
  return signOut(requireAuth());
}
// Change user's name
export async function updateDisplayName(displayName: string) {
  const auth = requireAuth();
  if (!auth.currentUser) throw new Error('Pls sign in to edit your profile!');
  await updateProfile(auth.currentUser, { displayName: displayName.trim() });
  return toAppUser(auth.currentUser);
}
