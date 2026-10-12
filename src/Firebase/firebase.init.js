// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCbbY5uMKcn0X8HXqhWQQ14uJe46uYfzLQ",
    authDomain: "email-pass-auth-31eb9.firebaseapp.com",
    projectId: "email-pass-auth-31eb9",
    storageBucket: "email-pass-auth-31eb9.firebasestorage.app",
    messagingSenderId: "139882097901",
    appId: "1:139882097901:web:56c839ad7582e7d62e70e4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)