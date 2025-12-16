import React, { useState, forwardRef, useMemo } from "react";
import { FilterBar } from "../components/FilterBar";
import { GalleryGrid } from "../components/GalleryGrid";
import { ArtworkModal } from "../components/ArtworkModal";
import { useArtworks } from "../hooks/useArtworks";

const GalleryPage = forwardRef(
  ({ setArtworks, setIsScrolled, selectedTags = [] }, virtuosoRef) => {
    const [filter, setFilter] = useState("all");
    const [sortBy, setSortBy] = useState("newest");
    const [selectedArt, setSelectedArt] = useState(null);

    const { artworks, loading } = useArtworks(sortBy);

    // タグでフィルタリング
    const filteredArtworks = useMemo(() => {
      if (selectedTags.length === 0) {
        return artworks;
      }
      return artworks.filter((artwork) =>
        selectedTags.every((tag) => artwork.tags?.includes(tag))
      );
    }, [artworks, selectedTags]);

    // 親コンポーネントに作品データを渡す
    React.useEffect(() => {
      if (setArtworks) {
        setArtworks(artworks);
      }
    }, [artworks, setArtworks]);

    if (loading) return <div>Loading...</div>;

    return (
      <>
        <FilterBar
          filter={filter}
          setFilter={setFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          totalCount={filteredArtworks.length}
          selectedTagsCount={selectedTags.length}
        />

        <GalleryGrid
          ref={virtuosoRef}
          artworks={filteredArtworks}
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
