// src/components/GalleryGrid.jsx
import React, { forwardRef } from "react";
import { VirtuosoGrid } from "react-virtuoso";
import { LazyThumbnail } from "./LazyThumbnail";

const GridComponents = {
  List: forwardRef(({ style, children, ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      style={{
        ...style,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "24px",
        padding: "0 24px",
        maxWidth: "1580px",
        margin: "0 auto",
      }}
    >
      {children}
    </div>
  )),
};

export const GalleryGrid = forwardRef(
  ({ artworks, onSelectArt, setIsScrolled }, virtuosoRef) => {
    // スクロール位置を検知
    const handleRangeChanged = (range) => {
      if (setIsScrolled) {
        // 最初の行が少しでも隠れたら縮小（より敏感）
        setIsScrolled(range.startIndex > 0 || range.startOffset > 0);
      }
    };
    return (
      <VirtuosoGrid
        ref={virtuosoRef}
        style={{
          height: "calc(100vh - 120px)",
          width: "100%",
        }}
        overscan={1000}
        totalCount={artworks.length}
        components={GridComponents}
        rangeChanged={handleRangeChanged}
        itemContent={(index) => {
          const artwork = artworks[index];
          if (!artwork) return null;
          return <LazyThumbnail artwork={artwork} onSelect={onSelectArt} />;
        }}
      />
    );
  }
);
