// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp, getApps, getApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
let app: FirebaseApp;
let analytics: Analytics | null = null;

try {
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
    console.log("Firebase initialized successfully");
  } else {
    app = getApp();
    console.log("Firebase app already initialized");
  }

  // Initialize Analytics only in browser environment
  if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
  }
} catch (error) {
  console.error("Error initializing Firebase:", error);
}

export { app, analytics };
