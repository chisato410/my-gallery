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

  // プレビュー版のURLをフル版に変換
  const fullUrl = artwork.url.replace("/artworks/previews/", "/artworks/full/");

  const openArtwork = () => {
    window.open(fullUrl, "_blank");
  };

  return (
    <div
      className="fixed bg-black/95 flex flex-col items-center justify-center overflow-hidden"
      style={{
        zIndex: 9999,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
      }}
      onClick={onClose}
    >
      {/* 閉じるボタン */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 p-3 hover:bg-white/10 rounded-full transition-colors bg-black/50 backdrop-blur-sm"
        style={{ zIndex: 10001 }}
        aria-label="Close modal"
      >
        <X size={32} className="text-white" />
      </button>

      <div
        className="w-full h-full flex flex-col items-center justify-center px-4 py-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* アートワーク表示エリア - 画面の大部分を使用 */}
        <div
          className="w-full aspect-square rounded-lg overflow-hidden bg-black relative border border-gray-700 shadow-2xl mb-4"
          style={{
            maxWidth: "min(95vw, calc(100vh - 180px))",
            maxHeight: "calc(100vh - 180px)",
          }}
        >
          <iframe
            src={fullUrl}
            className="absolute in set-0 w-full h-full"
            style={{ border: "none" }}
            title={artwork.title}
            allow="autoplay"
          />
        </div>

        {/* 情報エリア - コンパクトに */}
        <div className="w-full max-w-5xl space-y-3 px-4">
          {/* タイトルと技術スタック */}
          <div className="text-center">
            <h2 className="text-3xl font-light mb-2 text-white">
              {artwork.title}
            </h2>
            <div className="flex items-center justify-center gap-3 text-sm flex-wrap">
              <span className="px-3 py-1 bg-blue-500/30 text-blue-200 rounded-full border border-blue-400/50 font-medium">
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
                  className="px-2 py-0.5 bg-gray-800/50 text-gray-300 rounded-full text-xs border border-gray-700 hover:bg-gray-700/50 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* 説明文（もしあれば） */}
          {artwork.description && (
            <p className="text-gray-300 text-center max-w-2xl mx-auto text-sm">
              {artwork.description}
            </p>
          )}

          {/* アクションボタン */}
          <div className="flex gap-3 justify-center items-center flex-wrap">
            <VoteButton artworkId={artwork.id} />

            <button
              onClick={openArtwork}
              className="px-6 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors font-semibold flex items-center gap-2 shadow-lg text-sm"
            >
              <ExternalLink size={18} />
              Open Fullscreen
            </button>

            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors font-semibold shadow-lg text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
