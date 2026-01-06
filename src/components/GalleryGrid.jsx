// src/components/GalleryGrid.jsx
import React, { forwardRef, useCallback, useRef, useEffect } from "react";
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
        paddingLeft: "24px", // padding: "0 24px" を分割
        paddingRight: "24px", // padding: "0 24px" を分割
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
    const scrollTimeoutRef = useRef(null);
    const lastScrollTopRef = useRef(0);

    const handleScroll = useCallback(
      (e) => {
        if (!setIsScrolled) return;

        const scrollTop = e.target.scrollTop || 0;
        const shouldShrink = scrollTop > 30;
        const wasShrunk = lastScrollTopRef.current > 30;

        if (shouldShrink !== wasShrunk) {
          setIsScrolled(shouldShrink);
        }

        lastScrollTopRef.current = scrollTop;
      },
      [setIsScrolled]
    );

    const handleScrollOptimized = useCallback(
      (e) => {
        if (scrollTimeoutRef.current) {
          return;
        }

        scrollTimeoutRef.current = requestAnimationFrame(() => {
          handleScroll(e);
          scrollTimeoutRef.current = null;
        });
      },
      [handleScroll]
    );

    const scrollerRef = useCallback(
      (element) => {
        if (element) {
          element.addEventListener("scroll", handleScrollOptimized, {
            passive: true,
          });
        }
      },
      [handleScrollOptimized]
    );

    useEffect(() => {
      return () => {
        if (scrollTimeoutRef.current) {
          cancelAnimationFrame(scrollTimeoutRef.current);
        }
      };
    }, []);

    return (
      <VirtuosoGrid
        ref={virtuosoRef}
        scrollerRef={scrollerRef}
        style={{
          height: "calc(100vh - 120px)",
          width: "100%",
        }}
        overscan={300}
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
