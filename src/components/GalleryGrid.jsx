// src/components/GalleryGrid.jsx
import React from "react";
import { LazyThumbnail } from "./LazyThumbnail";

export function GalleryGrid({ artworks, onSelectArt }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {artworks.map((artwork) => (
        <LazyThumbnail
          key={artwork.id}
          artwork={artwork}
          onSelect={onSelectArt}
        />
      ))}
    </div>
  );
}
