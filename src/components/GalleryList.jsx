// src/components/GalleryList.jsx
import React from "react";
import { VoteButton } from "./VoteButton";

export function GalleryList({ artworks, onSelectArt }) {
  return (
    <div className="space-y-2">
      {artworks.map((artwork) => (
        <button
          key={artwork.id}
          onClick={() => onSelectArt(artwork)}
          className="w-full flex items-center gap-4 p-4 bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors text-left"
        >
          <div className="w-16 h-16 rounded overflow-hidden shrink-0 relative">
            <iframe
              src={artwork.previewUrl}
              className="absolute inset-0 w-full h-full pointer-events-none scale-150"
              loading="lazy"
              style={{ border: "none" }}
              title={artwork.title}
            />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{artwork.title}</h3>
            <p className="text-sm text-gray-400">{artwork.author}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs bg-gray-800 px-3 py-1 rounded-full">
              {artwork.tech}
            </span>
            <VoteButton artworkId={artwork.id} compact />
          </div>
        </button>
      ))}
    </div>
  );
}
