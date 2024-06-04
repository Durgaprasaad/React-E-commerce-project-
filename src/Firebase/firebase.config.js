import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC7sT8vWnKNQj_S8GtpGWpxltu5hIDDCXQ",
  authDomain: "shopify-4e624.firebaseapp.com",
  projectId: "shopify-4e624",
  storageBucket: "shopify-4e624.appspot.com",
  messagingSenderId: "227708140922",
  appId: "1:227708140922:web:f7bd84872de9554fd52ac3",
  measurementId: "G-XNMPZWWSTX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage =  getStorage(app)
const analytics = getAnalytics(app);


export default app