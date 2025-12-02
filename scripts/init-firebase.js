/* eslint-env node */
require("dotenv").config();
const { initializeApp } = require("firebase/app");
const { getFirestore, doc, setDoc } = require("firebase/firestore");
const artworks = require("../src/data/artworks.json");

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function initFirestore() {
  console.log("🔥 Initializing Firestore...");
  console.log(`📊 Uploading ${artworks.length} artworks...`);

  for (let i = 0; i < artworks.length; i++) {
    const artwork = artworks[i];

    try {
      await setDoc(doc(db, "artworks", String(artwork.id)), {
        ...artwork,
        votes: 0,
        createdAt: new Date(artwork.createdAt),
      });

      if ((i + 1) % 10 === 0 || i === artworks.length - 1) {
        console.log(`✅ Uploaded ${i + 1}/${artworks.length} artworks`);
      }
    } catch (error) {
      console.error(`❌ Error uploading ${artwork.id}:`, error.message);
    }
  }

  console.log("🎉 Firestore initialization complete!");
  process.exit(0);
}

initFirestore();
