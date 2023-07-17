import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDU9b_CaoeJzeAWUDO0T8vuTH_27yqSpdw",
  authDomain: "react-authen-dfb48.firebaseapp.com",
  projectId: "react-authen-dfb48",
  storageBucket: "react-authen-dfb48.appspot.com",
  messagingSenderId: "321145226608",
  appId: "1:321145226608:web:ad872dcf34678f18dbbbb5",
  measurementId: "G-8B9EPNPNHW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;