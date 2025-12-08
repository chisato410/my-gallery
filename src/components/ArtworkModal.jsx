// src/components/ArtworkModal.jsx
import React, { useEffect } from "react";
import { X, ExternalLink } from "lucide-react";
import { VoteButton } from "./VoteButton";

export function ArtworkModal({ artwork, onClose }) {
  // ブラウザの戻るボタンでモーダルを閉じる
  useEffect(() => {
    if (!artwork) return;

    // モーダルが開いたときに履歴にエントリを追加
    window.history.pushState({ modal: true }, "");

    const handlePopState = (event) => {
      onClose();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [artwork, onClose]);

  // ESCキーでも閉じられるように
  useEffect(() => {
    if (!artwork) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [artwork, onClose]);

  if (!artwork) return null;

  const openArtwork = () => {
    window.open(artwork.url, "_blank");
  };

  return (
    <div
      className="fixed inset-0 bg-black flex items-center justify-center p-8 overflow-y-auto"
      style={{
        zIndex: 9999,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
      }}
      onClick={onClose}
    >
      {/* 閉じるボタン */}
      <button
        onClick={onClose}
        className="absolute top-8 right-8 p-3 hover:bg-white/10 rounded-full transition-colors bg-black/50 backdrop-blur-sm"
        style={{ zIndex: 10001 }}
        aria-label="Close modal"
      >
        <X size={28} className="text-white" />
      </button>

      <div
        className="max-w-6xl w-full my-auto"
        onClick={(e) => e.stopPropagation()}
        // style={{ maxHeight: "90vh" }}
      >
        {/* アートワーク表示エリア */}
        <div className="w-full max-w-4xl mx-auto aspect-square rounded-xl mb-8 overflow-hidden bg-black relative border border-gray-700 shadow-2xl">
          <iframe
            src={artwork.url}
            className="absolute inset-0 w-full h-full"
            style={{ border: "none" }}
            title={artwork.title}
            allow="autoplay"
          />
        </div>

        {/* 情報エリア */}
        <div className="space-y-6 px-4">
          {/* タイトルと技術スタック */}
          <div className="text-center">
            <h2 className="text-5xl font-light mb-4 text-white">
              {artwork.title}
            </h2>
            <div className="flex items-center justify-center gap-4 text-base">
              <span className="px-4 py-2 bg-blue-500/30 text-blue-200 rounded-full border border-blue-400/50 font-medium">
                {artwork.tech}
              </span>
              <span className="text-gray-300">
                {new Date(artwork.createdAt).toLocaleDateString("ja-JP")}
              </span>
            </div>
          </div>

          {/* タグ */}
          {artwork.tags && artwork.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center">
              {artwork.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-800/50 text-gray-300 rounded-full text-sm border border-gray-700 hover:bg-gray-700/50 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* 説明文（もしあれば） */}
          {artwork.description && (
            <p className="text-gray-300 text-center max-w-2xl mx-auto">
              {artwork.description}
            </p>
          )}

          {/* アクションボタン */}
          <div className="flex gap-4 justify-center items-center flex-wrap pt-2">
            <VoteButton artworkId={artwork.id} />

            <button
              onClick={openArtwork}
              className="px-8 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors font-semibold flex items-center gap-2 shadow-lg"
            >
              <ExternalLink size={20} />
              Open Fullscreen
            </button>

            <button
              onClick={onClose}
              className="px-8 py-3 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors font-semibold shadow-lg"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
