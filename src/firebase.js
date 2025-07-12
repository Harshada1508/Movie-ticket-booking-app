// ✅ src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // optional if using Firestore

const firebaseConfig = {
  apiKey: "AIzaSyAi89vtzxJDzNDnYkY-BlSoEJqfLWMyteQ",
  authDomain: "ticket-booking-app-4a937.firebaseapp.com",
  projectId: "ticket-booking-app-4a937",
  storageBucket: "ticket-booking-app-4a937.appspot.com", // ✅ FIXED
  messagingSenderId: "936976237094",
  appId: "1:936976237094:web:ccb60745bc486d459c9ce7",
  measurementId: "G-4J3JKNLJ3J",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app); // export db if using Firestore
