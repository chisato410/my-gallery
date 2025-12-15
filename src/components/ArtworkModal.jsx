import React, { useEffect } from "react";
import { X, ExternalLink } from "lucide-react";
import { VoteButton } from "./VoteButton";
import styles from "./ArtworkModal.module.scss";

export function ArtworkModal({ artwork, onClose }) {
  // 戻るボタン対応
  useEffect(() => {
    if (!artwork) return;

    window.history.pushState({ modal: true }, "");

    const handlePopState = () => {
      onClose();
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [artwork, onClose]);

  // ESCキー対応
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

  const openArtwork = () => {
    window.open(fullUrl, "_blank");
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      {/* 閉じるボタン */}
      <button
        onClick={onClose}
        className={styles.closeButton}
        aria-label="Close modal"
      >
        <X size={32} />
      </button>

      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        {/* アートワーク */}
        <div className={styles.artworkWrapper}>
          <iframe
            src={fullUrl}
            className={styles.iframe}
            title={artwork.title}
            allow="autoplay"
          />
        </div>

        {/* 情報エリア */}
        <div className={styles.info}>
          <div className={styles.header}>
            <h2 className={styles.title}>{artwork.title}</h2>
            <div className={styles.meta}>
              <span className={styles.tech}>{artwork.tech}</span>
              <span className={styles.date}>
                {new Date(artwork.createdAt).toLocaleDateString("ja-JP")}
              </span>
            </div>
          </div>

          {/* タグ */}
          {artwork.tags?.length > 0 && (
            <div className={styles.tags}>
              {artwork.tags.map((tag, index) => (
                <span key={index} className={styles.tag}>
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* 説明 */}
          {artwork.description && (
            <p className={styles.description}>{artwork.description}</p>
          )}

          {/* アクション */}
          <div className={styles.actions}>
            <VoteButton artworkId={artwork.id} />

            <button onClick={openArtwork} className={styles.primaryButton}>
              <ExternalLink size={18} />
              Open Fullscreen
            </button>

            <button onClick={onClose} className={styles.secondaryButton}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
