import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCspGxmwtVMae1hH7_TXqyEiYVra9bi-oQ",
    authDomain: "savorstats.firebaseapp.com",
    projectId: "savorstats",
    storageBucket:  "savorstats.appspot.com",
    messagingSenderId: "743274692857",
    appId: "1:743274692857:web:2499efd0af92641e5b2228"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const analytics = getAnalytics(app);
const database = getFirestore(app); 


export { auth, analytics, database };
