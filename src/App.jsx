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
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
        <div className="text-lg tracking-wide opacity-80 animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-neutral-950 text-white flex flex-col">
        {/* ヘッダー */}
        <Header />

        {/* フィルタバー */}
        <div className="border-b border-neutral-800 bg-neutral-900/40 backdrop-blur-md sticky top-0 z-30">
          <FilterBar
            filter={filter}
            setFilter={handleFilterChange}
            sortBy={sortBy}
            setSortBy={handleSortChange}
            totalCount={filteredArtworks.length}
          />
        </div>

        {/* メイン */}
        <main className="max-w-7xl mx-auto w-full px-4 py-8 pb-32">
          <GalleryGrid
            artworks={filteredArtworks}
            onSelectArt={setSelectedArt}
          />
        </main>

        {/* ボトムナビ */}
        <BottomNav />
      </div>

      {/* モーダル */}
      <ArtworkModal
        artwork={selectedArt}
        onClose={() => setSelectedArt(null)}
      />
    </>
  );
}
