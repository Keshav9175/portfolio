import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDlDMMZ6TpmGCfkh02yDKfmiAzCrTDJi4o",
    authDomain: "portfolio-keshav-93f5b.firebaseapp.com",
    projectId: "portfolio-keshav-93f5b",
    storageBucket: "portfolio-keshav-93f5b.firebasestorage.app",
    messagingSenderId: "862556433704",
    appId: "1:862556433704:web:998906a5d41ff891f4b41d",
    measurementId: "G-546T35K75B",
};

const app = initializeApp(firebaseConfig);

// ✅ Analytics (keep it)
export const analytics = getAnalytics(app);

// ✅ Firestore (THIS WAS MISSING)
export const db = getFirestore(app);
