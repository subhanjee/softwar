// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCDs4VIMNBW7s6n6xWIFaNNMtykt3PIy8c",
  authDomain: "veggie-vibe.firebaseapp.com",
  projectId: "veggie-vibe",
  storageBucket: "veggie-vibe.appspot.com",
  messagingSenderId: "334455015114",
  appId: "1:334455015114:web:f2f1855d8f888a991d5633",
  measurementId: "G-ZB3N55R02Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const Storage = getStorage(app);
