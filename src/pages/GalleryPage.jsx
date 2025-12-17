import React, { useState, forwardRef, useMemo } from "react";
import { FilterBar } from "../components/FilterBar";
import { GalleryGrid } from "../components/GalleryGrid";
import { ArtworkModal } from "../components/ArtworkModal";
import { useArtworks } from "../hooks/useArtworks";

const GalleryPage = forwardRef(
  (
    {
      setArtworks,
      setIsScrolled,
      selectedTags = [],
      setSelectedTags,
      currentBgColor,
      setBgColor,
    },
    virtuosoRef
  ) => {
    const [filter, setFilter] = useState("all");
    const [sortBy, setSortBy] = useState("newest");
    const [selectedArt, setSelectedArt] = useState(null);

    const { artworks, loading } = useArtworks(sortBy);

    // タグごとの作品数を計算
    const tagCounts = useMemo(() => {
      const counts = {};
      artworks.forEach((artwork) => {
        artwork.tags?.forEach((tag) => {
          counts[tag] = (counts[tag] || 0) + 1;
        });
      });
      return counts;
    }, [artworks]);

    const allTags = useMemo(() => {
      return Object.keys(tagCounts).sort();
    }, [tagCounts]);

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

    const handleTagClick = (tag) => {
      if (selectedTags.includes(tag)) {
        setSelectedTags(selectedTags.filter((t) => t !== tag));
      } else {
        setSelectedTags([...selectedTags, tag]);
      }
    };

    const clearAllTags = () => {
      setSelectedTags([]);
    };

    if (loading) return <div>Loading...</div>;

    return (
      <>
        <FilterBar
          filter={filter}
          setFilter={setFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          totalCount={filteredArtworks.length}
          selectedTags={selectedTags}
          allTags={allTags}
          tagCounts={tagCounts}
          onTagClick={handleTagClick}
          onClearTags={clearAllTags}
          currentBgColor={currentBgColor}
          onBgColorChange={setBgColor}
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
