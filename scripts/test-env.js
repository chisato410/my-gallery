// scripts/test-env.js
/* eslint-env node */
require("dotenv").config();

console.log("📋 Testing .env file...\n");
console.log("Current directory:", process.cwd());
console.log("");

console.log("Environment variables:");
console.log(
  "FIREBASE_PROJECT_ID:",
  process.env.FIREBASE_PROJECT_ID || "❌ Missing"
);
console.log(
  "FIREBASE_API_KEY:",
  process.env.FIREBASE_API_KEY
    ? "✅ Set (length: " + process.env.FIREBASE_API_KEY.length + ")"
    : "❌ Missing"
);
console.log(
  "FIREBASE_AUTH_DOMAIN:",
  process.env.FIREBASE_AUTH_DOMAIN || "❌ Missing"
);
console.log(
  "FIREBASE_STORAGE_BUCKET:",
  process.env.FIREBASE_STORAGE_BUCKET || "❌ Missing"
);
console.log(
  "FIREBASE_MESSAGING_SENDER_ID:",
  process.env.FIREBASE_MESSAGING_SENDER_ID || "❌ Missing"
);
console.log(
  "FIREBASE_APP_ID:",
  process.env.FIREBASE_APP_ID ? "✅ Set" : "❌ Missing"
);
