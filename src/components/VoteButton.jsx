// src/components/VoteButton.jsx
import React, { useState } from "react";
import { ThumbsUp } from "lucide-react";
import { useVotes } from "../hooks/useVotes";
import styles from "./VoteButton.module.scss";

export function VoteButton({ artworkId, compact = false }) {
  const { votes, vote, loading } = useVotes(artworkId);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleVote = async (e) => {
    e.stopPropagation();

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);

    await vote();
  };

  if (loading) {
    return (
      <div
        className={`${styles.loading} ${
          compact ? styles.compact : styles.normal
        }`}
      >
        <ThumbsUp size={compact ? 14 : 16} />
        <span>...</span>
      </div>
    );
  }

  return (
    <button
      onClick={handleVote}
      className={`${styles.button} ${compact ? styles.compact : styles.normal}`}
    >
      {/* 波紋エフェクト */}
      {isAnimating && <span className={styles.ripple} />}

      {/* 表示コンテンツ */}
      <span className={styles.content}>
        <ThumbsUp size={compact ? 14 : 16} />
        <span className={styles.votes}>{votes}</span>
      </span>
    </button>
  );
}
