const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const { getAuth, onAuthStateChanged } = require("firebase/auth");

const firebaseConfig = {
  apiKey: process.env.BOT_FIREBASE_KEY,
  authDomain: "testbot-firebase-80fa5.firebaseapp.com",
  projectId: "testbot-firebase-80fa5",
  storageBucket: "testbot-firebase-80fa5.appspot.com",
  messagingSenderId: process.env.BOT_FIREBASE_SENDER_ID,
  appId: process.env.BOT_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

module.exports = { app, db, auth };
