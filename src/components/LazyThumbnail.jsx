// src/components/LazyThumbnail.jsx
import React, { useState, useEffect, useRef } from "react";
import { VoteButton } from "./VoteButton";

export function LazyThumbnail({ artwork, onSelect }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const thumbnailRef = useRef(null);

  // GIFのパスを生成（filename の .html を .gif に置き換え）
  const gifPath = `/artworks/thumbnails/${artwork.filename.replace(
    ".html",
    ".gif"
  )}`;

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

    const currentElement = thumbnailRef.current;

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  return (
    <div
      ref={thumbnailRef}
      className="relative w-full h-full"
      style={{
        width: "100%",
        height: "100%",
        minHeight: 0,
        minWidth: 0,
      }}
    >
      {/* VoteButton - 絶対位置 */}
      <div className="absolute top-3 right-3 z-20">
        <VoteButton artworkId={artwork.id} compact />
      </div>

      {/* メインボタン - 親要素いっぱいに広がる */}
      <button
        onClick={() => onSelect(artwork)}
        className="group w-full h-full overflow-hidden rounded-lg border border-gray-800 hover:border-gray-600 transition-all"
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        {isVisible ? (
          <>
            {/* GIF画像を表示 */}
            {!hasError ? (
              <img
                src={gifPath}
                alt={artwork.title}
                className="w-full h-full object-cover"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
                loading="lazy"
                onLoad={() => setIsLoaded(true)}
                onError={() => {
                  setHasError(true);
                  console.warn(`Failed to load GIF: ${gifPath}`);
                }}
              />
            ) : (
              // GIFが見つからない場合はiframeにフォールバック
              <iframe
                src={artwork.previewUrl}
                className="w-full h-full pointer-events-none"
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  display: "block",
                }}
                loading="lazy"
                onLoad={() => setIsLoaded(true)}
                title={artwork.title}
              />
            )}

            {/* ローディング中のプレースホルダー */}
            {!isLoaded && (
              <div
                className="absolute inset-0 bg-linear-to-br from-gray-800 to-gray-900 animate-pulse flex items-center justify-center"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
              >
                <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              </div>
            )}

            {/* ホバー時のオーバーレイ */}
            <div
              className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors flex flex-col items-center justify-center p-4 text-center"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            >
              <h3 className="font-semibold text-lg mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {artwork.title}
              </h3>
              {/* <p className="text-xs mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {artwork.tech}
              </p>
              <div className="flex flex-wrap gap-1 justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                {artwork.tags.slice(0, 3).map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs bg-white/20 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div> */}
            </div>
          </>
        ) : (
          // 表示前のプレースホルダー
          <div
            className="absolute inset-0 bg-linear-to-br from-gray-800 to-gray-900 opacity-70"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          </div>
        )}
      </button>
    </div>
  );
}
