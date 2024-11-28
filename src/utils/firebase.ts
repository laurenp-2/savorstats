import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA0Lrj9AGEFM_mFyrgAnkR3Dx2e_V5Wze4",
    authDomain: "savorstats-89306.firebaseapp.com",
    projectId: "savorstats-89306",
    storageBucket: "savorstats-89306.firebasestorage.app",
    messagingSenderId: "365513376934",
    appId: "1:365513376934:web:9497093c5c7cc882caa067",
    measurementId: "G-Q85GL0LE7K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const analytics = getAnalytics(app);
const database = getFirestore(app); 


export { auth, analytics, database };
