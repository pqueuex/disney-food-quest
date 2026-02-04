import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

/**
 * Create a new user with email/password and a Firestore profile document.
 * @param {string} email
 * @param {string} password
 * @param {string} username
 * @returns {Promise<object>} Created Firebase user
 */
export async function signUp(email, password, username) {
  try {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { user } = credential;

    const userDoc = {
      id: user.uid,
      username,
      email: user.email,
      xp: 0,
      level: 1,
      createdAt: serverTimestamp(),
    };

    await setDoc(doc(db, 'users', user.uid), userDoc);

    return user;
  } catch (error) {
    console.error('Sign up failed:', error);
    throw error;
  }
}

/**
 * Sign in an existing user.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<object>} Signed-in Firebase user
 */
export async function signIn(email, password) {
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return credential.user;
  } catch (error) {
    console.error('Sign in failed:', error);
    throw error;
  }
}

/**
 * Sign out the current user.
 * @returns {Promise<void>}
 */
export async function signOut() {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Sign out failed:', error);
    throw error;
  }
}

/**
 * Get the currently authenticated user.
 * @returns {object|null} Current Firebase user or null
 */
export function getCurrentUser() {
  return auth.currentUser ?? null;
}
