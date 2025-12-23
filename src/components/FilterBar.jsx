import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import styles from "./FilterBar.module.scss";

export function FilterBar({
  filter,
  setFilter,
  sortBy,
  setSortBy,
  totalCount,
  selectedTags = [],
  allTags = [],
  tagCounts = {},
  onTagClick,
  onClearTags,
}) {
  const [optionsOpen, setOptionsOpen] = useState(false);
  // Contextから現在のテーマと変更関数を取得
  const { theme, setTheme } = useTheme();

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          {/* 左側: ソート */}
          <div className={styles.leftSection}>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={styles.select}
            >
              <option value="newest">Newest</option>
              <option value="popular">Most Popular</option>
              <option value="title">Title (A-Z)</option>
            </select>
          </div>

          {/* 右側: 作品数とオプションボタン */}
          <div className={styles.rightSection}>
            <div className={styles.tagFilterInfo}>
              {selectedTags.length > 0 ? (
                <>
                  <span className={styles.resultCount}>
                    {totalCount} {totalCount === 1 ? "art" : "arts"}
                  </span>
                  <button onClick={onClearTags} className={styles.clearButton}>
                    Clear ({selectedTags.length})
                  </button>
                </>
              ) : (
                <span className={styles.totalCount}>
                  {totalCount} {totalCount === 1 ? "art" : "arts"}
                </span>
              )}
            </div>

            <button
              className={styles.optionButton}
              onClick={() => setOptionsOpen(!optionsOpen)}
            >
              OPTION
            </button>
          </div>
        </div>
      </div>

      {/* 背景ぼかし（オーバーレイ） */}
      {optionsOpen && (
        <div className={styles.overlay} onClick={() => setOptionsOpen(false)} />
      )}

      {/* 全画面オプションパネル */}
      <div
        className={`${styles.optionsPanel} ${optionsOpen ? styles.open : ""}`}
      >
        <button
          className={styles.closeButton}
          onClick={() => setOptionsOpen(false)}
          aria-label="Close options"
        >
          ✕
        </button>

        <div className={styles.panelContent}>
          {/* 背景色切り替えセクション */}
          <div className={styles.optionSection}>
            <h4>Background</h4>
            <div className={styles.bgButtons}>
              <button
                onClick={() => setTheme("white")}
                className={`${styles.bgButton} ${
                  theme === "white" ? styles.active : ""
                }`}
              >
                White
              </button>
              <button
                onClick={() => setTheme("black")}
                className={`${styles.bgButton} ${
                  theme === "black" ? styles.active : ""
                }`}
              >
                Black
              </button>
            </div>
          </div>

          {/* タグリストセクション */}
          <div className={styles.optionSection}>
            <h4>Tags ({allTags.length})</h4>
            <div className={styles.tagList}>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => onTagClick(tag)}
                  className={`${styles.tag} ${
                    selectedTags.includes(tag) ? styles.tagActive : ""
                  }`}
                >
                  {tag}{" "}
                  <span className={styles.tagCount}>({tagCounts[tag]})</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
