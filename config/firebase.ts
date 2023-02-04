import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { Auth, getAuth } from "firebase/auth";
import { Analytics, getAnalytics } from "firebase/analytics";

let auth: Auth | undefined;
let db: Firestore | undefined;
let analytics: Analytics | undefined;

try {
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };

  const app = initializeApp(firebaseConfig);

  auth = getAuth(app);
  db = getFirestore(app);
  if (typeof window !== "undefined") analytics = getAnalytics(app);
} catch (error) {
  console.log(
    Error(
      "Error while setting up firebase. Please add .env file with required credentials for firebase setup. Refer README.md for required credentials"
    )
  );
}

export { auth, db, analytics };
