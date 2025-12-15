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
        ...style, // ← ★ 必須（Virtuoso の transform / height）
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

  Item: ({ style, children, ...props }) => (
    <div
      {...props}
      style={{
        ...style, // ← ★ 必須
        width: "100%",
        aspectRatio: "1 / 1",
        position: "relative",
      }}
    >
      {children}
    </div>
  ),
};

export function GalleryGrid({ artworks, onSelectArt }) {
  return (
    <VirtuosoGrid
      style={{
        height: "calc(100vh - 120px)",
        width: "100%",
      }}
      overscan={1000}
      totalCount={artworks.length}
      components={GridComponents}
      itemContent={(index) => {
        const artwork = artworks[index];
        if (!artwork) return null;

        return <LazyThumbnail artwork={artwork} onSelect={onSelectArt} />;
      }}
    />
  );
}
