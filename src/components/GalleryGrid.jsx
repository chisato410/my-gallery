// src/components/GalleryGrid.jsx
import React, { forwardRef } from "react";
import { VirtuosoGrid } from "react-virtuoso";
import { LazyThumbnail } from "./LazyThumbnail";

// グリッドコンポーネント（コンポーネント外で定義）
const GridComponents = {
  List: forwardRef(({ style, children, ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "1.5rem",
        padding: "0 1.5rem",
        maxWidth: "1580px", // 200px × 5 + 1.5rem × 4 + padding × 2 = 1180px
        margin: "0 auto",
        ...style,
      }}
    >
      {children}
    </div>
  )),
  Item: ({ children, ...props }) => (
    <div
      {...props}
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        aspectRatio: "1 / 1", // 正方形を保証
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
      style={{ height: "calc(100vh - 120px)" }}
      overscan={1000}
      totalCount={artworks.length}
      components={GridComponents}
      itemContent={(index) => {
        const artwork = artworks[index];
        return (
          <LazyThumbnail
            key={artwork.id}
            artwork={artwork}
            onSelect={onSelectArt}
          />
        );
      }}
    />
  );
}
