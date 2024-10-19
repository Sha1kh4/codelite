import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyATHcDk7UFfHaet77rmnXlasaYkzw8PgyM",
    authDomain: "careerfit-a865f.firebaseapp.com",
    projectId: "careerfit-a865f",
    storageBucket: "careerfit-a865f.appspot.com",
    messagingSenderId: "410607832020",
    appId: "1:410607832020:web:c15a64d312a3d1cde8a441",
    measurementId: "G-MZGKQHS3JE"
};

const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);
export const auth = getAuth(app);


