// src/App.jsx
import React, { useState } from "react";
import { Header } from "./components/Header";
import { FilterBar } from "./components/FilterBar";
import { GalleryGrid } from "./components/GalleryGrid";
import { ArtworkModal } from "./components/ArtworkModal";
import { BottomNav } from "./components/BottomNav";
import { useArtworks } from "./hooks/useArtworks";

export default function App() {
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedArt, setSelectedArt] = useState(null);

  const { artworks, loading } = useArtworks(sortBy);

  // フィルタリング
  const filteredArtworks =
    filter === "all" ? artworks : artworks.filter((art) => art.tech === filter);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <FilterBar
        filter={filter}
        setFilter={handleFilterChange}
        sortBy={sortBy}
        setSortBy={handleSortChange}
        totalCount={filteredArtworks.length}
      />

      <main className="max-w-7xl mx-auto py-8 pb-32">
        <GalleryGrid artworks={filteredArtworks} onSelectArt={setSelectedArt} />
      </main>

      <BottomNav />

      <ArtworkModal
        artwork={selectedArt}
        onClose={() => setSelectedArt(null)}
      />
    </div>
  );
}
