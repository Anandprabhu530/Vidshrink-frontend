// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  appId: process.env.NEXT_PUBLIC_APPID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGE_SENDER_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export async function Signinwithgoogle() {
  return await signInWithPopup(auth, new GoogleAuthProvider());
}

export function signOut() {
  return auth.signOut();
}

export function onStatechangedAuth(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}
