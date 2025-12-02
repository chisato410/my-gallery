// src/App.jsx
import React, { useState } from "react";
import { Header } from "./components/Header";
import { FilterBar } from "./components/FilterBar";
import { GalleryGrid } from "./components/GalleryGrid";
import { GalleryList } from "./components/GalleryList";
import { ArtworkModal } from "./components/ArtworkModal";
import { BottomNav } from "./components/BottomNav";
import { Pagination } from "./components/Pagination";
import { useArtworks } from "./hooks/useArtworks";

export default function App() {
  const [viewMode, setViewMode] = useState("grid");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArt, setSelectedArt] = useState(null);

  const { artworks, loading } = useArtworks(sortBy);
  const itemsPerPage = 24;

  // フィルタリング
  const filteredArtworks =
    filter === "all" ? artworks : artworks.filter((art) => art.tech === filter);

  // ページネーション
  const totalPages = Math.ceil(filteredArtworks.length / itemsPerPage);
  const displayedArtworks = filteredArtworks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    setCurrentPage(1);
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
        viewMode={viewMode}
        setViewMode={setViewMode}
        sortBy={sortBy}
        setSortBy={handleSortChange}
        totalCount={filteredArtworks.length}
      />

      <main className="max-w-7xl mx-auto px-6 py-8 pb-32">
        {viewMode === "grid" ? (
          <GalleryList
            artworks={displayedArtworks}
            onSelectArt={setSelectedArt}
          />
        ) : (
          <GalleryGrid
            artworks={displayedArtworks}
            onSelectArt={setSelectedArt}
          />
        )}

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </main>

      <BottomNav />

      <ArtworkModal
        artwork={selectedArt}
        onClose={() => setSelectedArt(null)}
      />
    </div>
  );
}
