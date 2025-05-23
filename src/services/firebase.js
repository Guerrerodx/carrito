import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwhum8dxyfIdZtvm12PUeNppElHxKwQSU",
  authDomain: "carrito-auth.firebaseapp.com",
  projectId: "carrito-auth",
  storageBucket: "carrito-auth.appspot.com",
  messagingSenderId: "1083839993668",
  appId: "1:1083839993668:web:b9832489de44f4083e6911"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
