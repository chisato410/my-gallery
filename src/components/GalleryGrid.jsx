// src/components/GalleryGrid.jsx
import React, { forwardRef, useCallback } from "react";
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
    // スクロールイベントハンドラ
    const handleScroll = useCallback(
      (e) => {
        if (setIsScrolled) {
          // 30px以上スクロールしたら縮小（この数値を変更可能）
          const scrollTop = e.target.scrollTop || 0;
          setIsScrolled(scrollTop > 30);
        }
      },
      [setIsScrolled]
    );

    // scrollerRefのコールバック
    const scrollerRef = useCallback(
      (element) => {
        if (element) {
          element.addEventListener("scroll", handleScroll);
          return () => element.removeEventListener("scroll", handleScroll);
        }
      },
      [handleScroll]
    );

    return (
      <VirtuosoGrid
        ref={virtuosoRef}
        scrollerRef={scrollerRef}
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
);
