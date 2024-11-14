/* eslint-disable @typescript-eslint/no-unused-vars */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyCspGxmwtVMae1hH7_TXqyEiYVra9bi-oQ",
    authDomain: "savorstats.firebaseapp.com",
    projectId: "savorstats",
    storageBucket: "savorstats.firebasestorage.app",
    messagingSenderId: "743274692857",
    appId: "1:743274692857:web:2499efd0af92641e5b2228"
  };
  
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized
  }