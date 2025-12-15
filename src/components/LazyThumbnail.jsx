// src/components/LazyThumbnail.jsx
import React, { useState } from "react";
import { VoteButton } from "./VoteButton";
import styles from "./LazyThumbnail.module.scss";

export function LazyThumbnail({ artwork, onSelect }) {
  const [hasError, setHasError] = useState(false);

  const gifPath = `/artworks/thumbnails/${artwork.filename.replace(
    ".html",
    ".gif"
  )}`;

  return (
    <div className={styles.root}>
      {/* VoteButton */}
      <div className={styles.vote}>
        <VoteButton artworkId={artwork.id} compact />
      </div>

      <button onClick={() => onSelect(artwork)} className={styles.button}>
        {!hasError ? (
          <img
            src={gifPath}
            alt={artwork.title}
            loading="lazy"
            className={styles.media}
            onError={() => setHasError(true)}
          />
        ) : (
          <iframe
            src={artwork.previewUrl}
            className={styles.media}
            title={artwork.title}
          />
        )}

        {/* Hover overlay */}
        <div className={styles.overlay} />
      </button>
    </div>
  );
}
