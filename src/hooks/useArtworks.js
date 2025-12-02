// src/hooks/useArtworks.js
import { useState, useEffect } from "react";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../lib/firebase";
import artworksData from "../data/artworks.json";

export function useArtworks(sortBy = "newest") {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sortBy === "popular") {
      // Firestoreからリアルタイム取得
      const q = query(collection(db, "artworks"), orderBy("votes", "desc"));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: parseInt(doc.id),
        }));
        setArtworks(data);
        setLoading(false);
      });

      return () => unsubscribe();
    } else {
      // ローカルJSONを使用
      let sorted = [...artworksData];

      if (sortBy === "title") {
        sorted.sort((a, b) => a.title.localeCompare(b.title));
      } else {
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }

      setArtworks(sorted);
      setLoading(false);
    }
  }, [sortBy]);

  return { artworks, loading };
}
