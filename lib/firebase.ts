import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDuV38EIfecV6JBk9g2RExE2C1Dxt0uRQk",
  authDomain: "greenexchangeauth.firebaseapp.com",
  projectId: "greenexchangeauth",
  storageBucket: "greenexchangeauth.firebasestorage.app",
  messagingSenderId: "459239628415",
  appId: "1:459239628415:web:6c384dec8e39bd902ce94a",
  measurementId: "G-24Q00PFPC0",
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

export const googleProvider = new GoogleAuthProvider()