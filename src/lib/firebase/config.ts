import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Debug: Log all environment variables
console.log('Environment Variables Check:', {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? 'Set' : 'Not Set',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? 'Set' : 'Not Set',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? 'Set' : 'Not Set',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ? 'Set' : 'Not Set',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ? 'Set' : 'Not Set',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ? 'Set' : 'Not Set',
});

// Check if we're in a browser environment
if (typeof window !== 'undefined') {
  console.log('Running in browser environment');
} else {
  console.log('Running in server environment');
}

// Temporary hardcoded config for testing
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY, // Replace with your actual API key
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID, // Replace with your actual project ID
  storageBucket:process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET, // Replace with your actual storage bucket
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID, // Replace with your actual messaging sender ID
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID // Replace with your actual app ID
};

 

 

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
console.log('Firebase initialized successfully'); 