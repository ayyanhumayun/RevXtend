// import { initializeApp, getApps, getApp } from 'firebase/app';
// import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
// import { getFirestore, collection, doc, setDoc, deleteDoc } from "firebase/firestore";
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBPnISJoJ-ylzZLxWEFLYvAF4hDIY-SXUs",
//   authDomain: "revxtend.firebaseapp.com",
//   projectId: "revxtend",
//   storageBucket: "revxtend.firebasestorage.app",
//   messagingSenderId: "377579345103",
//   appId: "1:377579345103:web:59bdb78292889d242313ba",
//   measurementId: "G-8BXBGR433V",
// };

// // Initialize Firebase App and Auth only once
// const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage), // Persist Auth state
// });

// export { app, auth };  // Export both app and auth

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPnISJoJ-ylzZLxWEFLYvAF4hDIY-SXUs",
  authDomain: "revxtend.firebaseapp.com",
  projectId: "revxtend",
  storageBucket: "revxtend.appspot.com", // ✅ Fixed incorrect storageBucket
  messagingSenderId: "377579345103",
  appId: "1:377579345103:web:59bdb78292889d242313ba",
  measurementId: "G-8BXBGR433V",
};

// Initialize Firebase App only once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app); // ✅ Using getAuth for better compatibility
const db = getFirestore(app); // ✅ Firestore initialized and exported

export { app, auth, db }; // ✅ Exporting Firestore (db) for usage in other files
