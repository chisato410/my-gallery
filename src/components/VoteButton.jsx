// src/components/VoteButton.jsx
import React, { useState } from "react";
import { ThumbsUp } from "lucide-react";
import { useVotes } from "../hooks/useVotes";

export function VoteButton({ artworkId, compact = false }) {
  const { votes, vote, loading } = useVotes(artworkId);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleVote = async (e) => {
    e.stopPropagation();

    // アニメーション開始
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);

    // 投票実行
    await vote();
  };

  if (loading) {
    return (
      <div
        className={`flex items-center gap-2 ${
          compact ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"
        } rounded-full bg-gray-800`}
      >
        <ThumbsUp size={compact ? 14 : 16} />
        <span>...</span>
      </div>
    );
  }

  return (
    <button
      onClick={handleVote}
      className={`flex items-center gap-2 ${
        compact ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"
      } rounded-full transition-all bg-gray-800 hover:bg-blue-500 text-white active:scale-95 relative overflow-hidden`}
    >
      {/* クリック時の波紋エフェクト */}
      {isAnimating && (
        <span className="absolute inset-0 bg-blue-400 animate-ping rounded-full opacity-75" />
      )}

      <ThumbsUp
        size={compact ? 14 : 16}
        className={`relative z-10 transition-transform ${
          isAnimating ? "scale-125" : "scale-100"
        }`}
      />
      <span className="font-medium relative z-10">{votes}</span>
    </button>
  );
}
