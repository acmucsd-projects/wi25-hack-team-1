import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(firebaseApp);

export { auth };
