// https://console.firebase.google.com/

// npm i firebase
// npm i react-firebase-hooks


// ------------------- roote/ firebase.js---------------------//

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD7sP6MrjVwCBglCn5q5UrwSAP2muMjzE8",
  authDomain: "stripe-payment-app-83b00.firebaseapp.com",
  projectId: "stripe-payment-app-83b00",
  storageBucket: "stripe-payment-app-83b00.appspot.com",
  messagingSenderId: "891148714117",
  appId: "1:891148714117:web:31f89b34f15054ac4ae9ec",
};

const app = initializeApp(firebaseConfig);

export const initFirebase = () => {
  return app;
};


// ------------------ components/ Navbar.jsx -------------------------//
("use client");
import { initFirebase } from "@/firebase";
import { useRouter } from "next/navigation";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function Header() {
  const app = initFirebase();
  const auth = getAuth(app);
  const router = useRouter();
  const googleAuthProvider = new GoogleAuthProvider();

  const signIn = async () => {
    const result = await signInWithPopup(auth, googleAuthProvider);
    const user = result.user;

    if (user) {
      router.push("/products");
    }
  };

  return (
    <button
      onClick={signIn}
    >
      Login
    </button>
  );
}
