// scripts/exportFirebaseToJson.js
import { config } from "dotenv";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import fs from "fs";

// .env ファイルを読み込む
config();

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

console.log("Firebase Config:", firebaseConfig); // デバッグ用

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function exportToJson() {
  try {
    console.log("Firebase からデータを取得中...");

    const querySnapshot = await getDocs(collection(db, "artworks"));

    console.log("ドキュメント数:", querySnapshot.size);

    if (querySnapshot.empty) {
      console.log(
        "❌ Firebase に artworks コレクションが存在しないか、データが空です"
      );
      return;
    }

    const artworks = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    console.log(`${artworks.length} 件のデータを取得しました`);

    fs.writeFileSync(
      "./src/data/artworks.json",
      JSON.stringify(artworks, null, 2),
      "utf-8"
    );

    console.log("✅ artworks.json に保存しました！");
    process.exit(0);
  } catch (error) {
    console.error("❌ エラー:", error);
    process.exit(1);
  }
}

exportToJson();
