import { auth } from './firebase-config.js';
import { GoogleAuthProvider, signInWithRedirect, getRedirectResult, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';

const provider = new GoogleAuthProvider();

export async function loginWithGoogle() {
  try {
    // For PWA compatibility, use redirect instead of popup
    await signInWithRedirect(auth, provider);
    // Note: User will be redirected to Google, then back to your app
    // getRedirectResult should be called on page load (see app.js)
  } catch (error) {
    console.error('[Auth] Redirect Error:', error);
    throw error;
  }
}

export async function getLoginResult() {
  try {
    const result = await getRedirectResult(auth);
    if (result?.user) {
      console.log('[Auth] Logged in:', result.user.email);
      return result.user;
    }
    return null;
  } catch (error) {
    console.error('[Auth] Error:', error);
    throw error;
  }
}

export async function logout() {
  try {
    await signOut(auth);
    console.log('[Auth] Logged out');
  } catch (error) {
    console.error('[Auth] Error:', error);
    throw error;
  }
}

export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}

export function getCurrentUser() {
  return auth.currentUser;
}
