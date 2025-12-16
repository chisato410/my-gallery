import React, { useState, forwardRef } from "react";
import { FilterBar } from "../components/FilterBar";
import { GalleryGrid } from "../components/GalleryGrid";
import { ArtworkModal } from "../components/ArtworkModal";
import { useArtworks } from "../hooks/useArtworks";

const GalleryPage = forwardRef(
  ({ setArtworks, setIsScrolled }, virtuosoRef) => {
    const [filter, setFilter] = useState("all");
    const [sortBy, setSortBy] = useState("newest");
    const [selectedArt, setSelectedArt] = useState(null);

    const { artworks, loading } = useArtworks(sortBy);

    if (loading) return <div>Loading...</div>;

    return (
      <>
        <FilterBar
          filter={filter}
          setFilter={setFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          totalCount={artworks.length}
        />

        <GalleryGrid
          ref={virtuosoRef}
          artworks={artworks}
          onSelectArt={setSelectedArt}
          setIsScrolled={setIsScrolled}
        />

        <ArtworkModal
          artwork={selectedArt}
          onClose={() => setSelectedArt(null)}
        />
      </>
    );
  }
);

export default GalleryPage;
