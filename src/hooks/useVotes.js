// src/hooks/useVotes.js
import { useState, useEffect } from "react";
import { doc, updateDoc, increment, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";

export function useVotes(artworkId) {
  const [votes, setVotes] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("🔍 Listening to artwork:", artworkId); // ← 追加

    const unsubscribe = onSnapshot(
      doc(db, "artworks", String(artworkId)),
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          console.log("📊 Document data:", data); // ← 追加
          setVotes(data.votes || 0);
        } else {
          console.warn("⚠️ Document does not exist:", artworkId); // ← 追加
        }
        setLoading(false);
      },
      (error) => {
        console.error("❌ Error listening to votes:", error); // ← 修正
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [artworkId]);

  const vote = async () => {
    console.log("👍 Attempting to vote for:", artworkId); // ← 追加

    try {
      const docRef = doc(db, "artworks", String(artworkId));
      await updateDoc(docRef, {
        votes: increment(1),
      });
      console.log("✅ Vote successful!"); // ← 追加
    } catch (error) {
      console.error("❌ Vote failed:", error); // ← 修正
      console.error("Error code:", error.code); // ← 追加
      console.error("Error message:", error.message); // ← 追加
    }
  };

  return { votes, vote, loading };
}
