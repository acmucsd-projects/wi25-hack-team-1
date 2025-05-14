// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLS0fKbspElmOgCpAzGQiEyjvgy4-UXA4",
  authDomain: "rydeshare25.firebaseapp.com",
  projectId: "rydeshare25",
  storageBucket: "rydeshare25.firebasestorage.app",
  messagingSenderId: "731304531277",
  appId: "1:731304531277:web:28be9c316cfbd360ab5304",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
