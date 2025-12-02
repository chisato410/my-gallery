// src/components/ArtworkModal.jsx
import React from "react";
import { ChevronLeft, ChevronRight, X, ExternalLink } from "lucide-react";
import { VoteButton } from "./VoteButton";

export function ArtworkModal({ artwork, onClose }) {
  if (!artwork) return null;

  const openArtwork = () => {
    window.open(artwork.url, "_blank");
  };

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 hover:bg-gray-800 rounded-full transition-colors z-10"
      >
        <X size={24} />
      </button>

      <div className="max-w-4xl w-full">
        <div className="w-full aspect-video rounded-lg mb-6 overflow-hidden bg-black relative">
          <iframe
            src={artwork.url}
            className="absolute inset-0 w-full h-full"
            style={{ border: "none" }}
            title={artwork.title}
            allow="autoplay"
          />
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-sm text-gray-400">{artwork.tech}</span>
            <span className="text-gray-600">•</span>
            <span className="text-sm text-gray-400">{artwork.author}</span>
          </div>
          <h2 className="text-4xl font-light mb-4">{artwork.title}</h2>
          <p className="text-gray-300 text-lg mb-6">{artwork.description}</p>

          <div className="flex gap-4 justify-center items-center">
            <VoteButton artworkId={artwork.id} />
            <button
              onClick={openArtwork}
              className="px-8 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors font-medium flex items-center gap-2"
            >
              <ExternalLink size={18} />
              Open Fullscreen
            </button>
            <button
              onClick={onClose}
              className="px-8 py-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
