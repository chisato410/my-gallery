// scripts/test-firebase.js
/* eslint-env node */
require("dotenv").config();
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs } = require("firebase/firestore");

console.log("🔍 Testing Firebase connection...\n");

// 環境変数を確認
console.log("📋 Environment variables:");
console.log("FIREBASE_PROJECT_ID:", process.env.FIREBASE_PROJECT_ID);
console.log(
  "FIREBASE_API_KEY:",
  process.env.FIREBASE_API_KEY ? "✅ Set" : "❌ Missing"
);
console.log("FIREBASE_AUTH_DOMAIN:", process.env.FIREBASE_AUTH_DOMAIN);
console.log("");

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

async function testConnection() {
  try {
    console.log("🔥 Connecting to Firestore...");

    // コレクション一覧を取得してみる
    const testCollection = collection(db, "artworks");
    const snapshot = await getDocs(testCollection);

    console.log("✅ Connection successful!");
    console.log(`📊 Found ${snapshot.size} documents in 'artworks' collection`);
  } catch (error) {
    console.error("❌ Connection failed!");
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);

    if (error.code === "invalid-argument") {
      console.log("\n💡 Troubleshooting:");
      console.log(
        "1. Check if Firestore Database is created in Firebase Console"
      );
      console.log("2. Verify .env file has correct Firebase config");
      console.log("3. Make sure projectId matches your Firebase project");
    }
  }

  process.exit(0);
}

testConnection();
