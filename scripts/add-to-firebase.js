// scripts/add-to-firebase.js
const { initializeApp } = require("firebase/app");
const { getFirestore, doc, setDoc } = require("firebase/firestore");
const artworks = require("../src/data/artworks.json");

// 最後の作品だけアップロード
const lastArtwork = artworks[artworks.length - 1];

// Firebase設定
const app = initializeApp({
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
});
const db = getFirestore(app);

async function addNewArtwork() {
  await setDoc(doc(db, "artworks", String(lastArtwork.id)), {
    ...lastArtwork,
    votes: 0,
    createdAt: new Date(lastArtwork.createdAt),
  });
  console.log("✅ Added:", lastArtwork.title);
  process.exit(0);
}

addNewArtwork();
