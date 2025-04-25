// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrVkyrlqI6tkqQb-zrgMhK1exWu_FR3WE",
  authDomain: "kade-mk.firebaseapp.com",
  projectId: "kade-mk",
  storageBucket: "kade-mk.firebasestorage.app",
  messagingSenderId: "825692300573",
  appId: "1:825692300573:web:ff7d4c2452289d6c5eadf4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
export {db, storage};