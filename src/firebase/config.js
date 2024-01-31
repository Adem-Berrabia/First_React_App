// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBzNL27CzmXIjtf4oyN2yIa6bdjRkg7cQ",
  authDomain: "react2-lesson8.firebaseapp.com",
  projectId: "first-react-project-ccf70",
  storageBucket: "react2-lesson8.appspot.com",
  messagingSenderId: "910926898717",
  appId: "1:910926898717:web:290c914dc006219a7a08f4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
