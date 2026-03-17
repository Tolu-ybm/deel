// firebase-config.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration object (replace with your config)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// Function for signing up to the waitlist
export const signupWaitlist = async (email) => {
    try {
        const docRef = await setDoc(doc(db, "waitlist", email), { timestamp: new Date() });
        console.log("Waitlist signup successful: ", docRef.id);
    } catch (error) {
        console.error("Error signing up for waitlist: ", error);
    }
};

// Function for tracking referrals
export const trackReferral = async (referrerId, newUserId) => {
    try {
        await updateDoc(doc(db, "referrals", referrerId), {
            referredUsers: arrayUnion(newUserId)
        });
        console.log("Referral tracked successfully.");
    } catch (error) {
        console.error("Error tracking referral: ", error);
    }
};

// Function for retrieving user data
export const getUserData = async (userId) => {
    try {
        const docSnap = await getDoc(doc(db, "users", userId));
        if (docSnap.exists()) {
            console.log("User data: ", docSnap.data());
            return docSnap.data();
        } else {
            console.log("No such user!");
            return null;
        }
    } catch (error) {
        console.error("Error retrieving user data: ", error);
        return null;
    }
};