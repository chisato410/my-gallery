// src/components/ArtworkModal.jsx
import React, { useEffect } from "react";
import { X, ExternalLink } from "lucide-react";
import { VoteButton } from "./VoteButton";
import styles from "./ArtworkModal.module.scss";

export function ArtworkModal({ artwork, onClose }) {
  useEffect(() => {
    if (!artwork) return;
    window.history.pushState({ modal: true }, "");
    const handlePopState = () => onClose();
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [artwork, onClose]);

  useEffect(() => {
    if (!artwork) return;
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [artwork, onClose]);

  if (!artwork) return null;

  const fullUrl = artwork.url.replace("/artworks/previews/", "/artworks/full/");

  return (
    <div className={styles.overlay} onClick={onClose}>
      <button onClick={onClose} className={styles.closeButton}>
        <X size={24} strokeWidth={1.5} />
      </button>

      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        {/* 左側：作品表示エリア */}
        <div className={styles.artworkContainer}>
          <div className={styles.artworkWrapper}>
            <iframe
              src={fullUrl}
              className={styles.iframe}
              title={artwork.title}
            />
          </div>
        </div>

        {/* 右側：情報エリア（キャプション） */}
        <div className={styles.infoArea}>
          <header className={styles.header}>
            <span className={styles.techLabel}>{artwork.tech}</span>
            <h2 className={styles.title}>{artwork.title}</h2>
          </header>

          <div className={styles.body}>
            {artwork.description && (
              <p className={styles.description}>{artwork.description}</p>
            )}

            {artwork.tags?.length > 0 && (
              <div className={styles.tags}>
                {artwork.tags.map((tag, i) => (
                  <span key={i} className={styles.tag}>
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <footer className={styles.actions}>
            <VoteButton artworkId={artwork.id} />
            <button
              onClick={() => window.open(fullUrl, "_blank")}
              className={styles.textButton}
            >
              <ExternalLink size={14} />
              Full Window
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}
