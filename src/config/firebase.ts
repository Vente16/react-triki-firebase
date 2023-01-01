import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const {
  VITE_API_KEY_FIREBASE,
  VITE_APP_ID_FIREBASE,
  VITE_AUTH_DOMAIN_FIREBASE,
  VITE_MEASUREMENTID_FIREBASE,
  // eslint-disable-next-line id-length
  VITE_MESSAGING_SENDER_ID_FIREBASE,
  VITE_PROJECT_ID_FIREBASE,
  VITE_STORAGE_BUCKET_FIREBASE
} = import.meta.env;

const firebaseConfig = {
  apiKey: VITE_API_KEY_FIREBASE,
  authDomain: VITE_AUTH_DOMAIN_FIREBASE,
  projectId: VITE_PROJECT_ID_FIREBASE,
  storageBucket: VITE_STORAGE_BUCKET_FIREBASE,
  messagingSenderId: VITE_MESSAGING_SENDER_ID_FIREBASE,
  appId: VITE_APP_ID_FIREBASE,
  measurementId: VITE_MEASUREMENTID_FIREBASE
};

export const firebaseInit = initializeApp(firebaseConfig);

export const firebaseDB = getDatabase(firebaseInit);
