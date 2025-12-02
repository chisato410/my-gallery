// src/components/LazyThumbnail.jsx
import React, { useState, useEffect, useRef } from "react";
import { VoteButton } from "./VoteButton";

export function LazyThumbnail({ artwork, onSelect }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const thumbnailRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        rootMargin: "100px",
        threshold: 0.01,
      }
    );

    // ⭐ 修正: refの現在の値をコピー
    const currentElement = thumbnailRef.current;

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      // ⭐ 修正: コピーした値を使用
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  return (
    <div ref={thumbnailRef} className="relative">
      <button
        onClick={() => onSelect(artwork)}
        className="group relative aspect-square overflow-hidden rounded-lg border border-gray-800 hover:border-gray-600 transition-all w-full"
      >
        {isVisible ? (
          <>
            <iframe
              src={artwork.previewUrl}
              className="absolute inset-0 w-full h-full pointer-events-none"
              loading="lazy"
              onLoad={() => setIsLoaded(true)}
              style={{ border: "none" }}
              title={artwork.title}
            />

            {!isLoaded && (
              <div
                className={`absolute inset-0 bg-linear-to-br ${artwork.color} animate-pulse`}
              />
            )}

            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors flex flex-col items-center justify-center p-4 text-center">
              <h3 className="font-semibold text-lg mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {artwork.title}
              </h3>
              <p className="text-xs mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {artwork.author}
              </p>
              <span className="text-xs bg-white/20 px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                {artwork.tech}
              </span>
            </div>
          </>
        ) : (
          <div
            className={`absolute inset-0 bg-linear-to-br ${artwork.color} opacity-70`}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          </div>
        )}
      </button>

      <div className="absolute top-3 right-3 z-10">
        <VoteButton artworkId={artwork.id} compact />
      </div>
    </div>
  );
}
