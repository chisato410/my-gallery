/* eslint-env node */
require("dotenv").config();
const { initializeApp } = require("firebase/app");
const { getFirestore, doc, setDoc, getDoc } = require("firebase/firestore");
const artworks = require("../src/data/artworks.json");

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function addNewArtwork() {
  const lastArtwork = artworks[artworks.length - 1];

  console.log("🔥 Adding new artwork to Firestore...");
  console.log(`📄 Title: ${lastArtwork.title}`);
  console.log(`🆔 ID: ${lastArtwork.id}`);

  try {
    const docRef = doc(db, "artworks", String(lastArtwork.id));
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("⚠️  This artwork already exists in Firestore");
      console.log("ℹ️  Skipping to preserve votes...");
    } else {
      await setDoc(docRef, {
        ...lastArtwork,
        votes: 0,
        createdAt: new Date(lastArtwork.createdAt),
      });
      console.log("✅ Successfully added to Firestore!");
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
  }

  process.exit(0);
}

addNewArtwork();
