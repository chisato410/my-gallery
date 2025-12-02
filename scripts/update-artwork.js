// scripts/update-artwork.js
/* eslint-env node */
require("dotenv").config();
const { initializeApp } = require("firebase/app");
const { getFirestore, doc, updateDoc } = require("firebase/firestore");

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

async function updateArtwork(artworkId, updates) {
  console.log(`📝 Updating artwork ${artworkId}...`);

  try {
    await updateDoc(doc(db, "artworks", String(artworkId)), updates);
    console.log("✅ Update successful!");
    console.log("Updated fields:", updates);
  } catch (error) {
    console.error("❌ Error:", error.message);
  }

  process.exit(0);
}

// 使い方: 以下の値を編集して実行
const artworkId = 1; // ← 更新したい作品のID

const updates = {
  tags: [
    "neon-colors",
    "dark-background",
    "color-orbits",
    "rotational-motion",
    "orbital-drift",
    "multi-primitive",
    "centripetal-layout",
    "fragment-style",
  ],
};

updateArtwork(artworkId, updates);
