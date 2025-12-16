// src/components/BottomNav.jsx
import React, { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./BottomNav.module.scss";

export default function BottomNav({
  artworks = [],
  setBgColor,
  virtuosoRef,
  selectedTags = [],
  setSelectedTags,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [currentBgColor, setCurrentBgColor] = useState("white");

  const location = useLocation();

  // タグごとの作品数を計算
  const tagCounts = useMemo(() => {
    const counts = {};
    artworks.forEach((artwork) => {
      artwork.tags?.forEach((tag) => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });
    return counts;
  }, [artworks]);

  const allTags = useMemo(() => {
    return Object.keys(tagCounts).sort();
  }, [tagCounts]);

  // フィルター結果の作品数を計算
  const filteredCount = useMemo(() => {
    if (selectedTags.length === 0) {
      return artworks.length;
    }
    return artworks.filter((artwork) =>
      selectedTags.every((tag) => artwork.tags?.includes(tag))
    ).length;
  }, [artworks, selectedTags]);

  // 現在のテーマを取得
  useEffect(() => {
    const theme = document.documentElement.getAttribute("data-theme");
    setCurrentBgColor(theme === "dark" ? "black" : "white");
  }, []);

  const handleBgColorChange = (color) => {
    setBgColor(color);
    setCurrentBgColor(color);
  };

  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      // タグを削除
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      // タグを追加
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const clearAllTags = () => {
    setSelectedTags([]);
  };

  const scrollToTop = () => {
    if (location.pathname === "/" && virtuosoRef?.current) {
      virtuosoRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* 背景ぼかし */}
      {(menuOpen || optionsOpen) && (
        <div
          className={styles.overlay}
          onClick={() => {
            setMenuOpen(false);
            setOptionsOpen(false);
          }}
        />
      )}

      {/* メニュー */}
      <div className={`${styles.navPanel} ${menuOpen ? styles.active : ""}`}>
        <ul className={styles.navList}>
          <li>
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className={location.pathname === "/" ? styles.active : ""}
            >
              Gallery
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
              className={location.pathname === "/about" ? styles.active : ""}
            >
              About
            </Link>
          </li>
        </ul>
      </div>

      {/* オプションパネル */}
      <div className={`${styles.navPanel} ${optionsOpen ? styles.active : ""}`}>
        <div className={styles.options}>
          <h4>Background</h4>
          <div className={styles.bgButtons}>
            <button
              onClick={() => handleBgColorChange("white")}
              className={currentBgColor === "white" ? styles.active : ""}
            >
              White
            </button>
            <button
              onClick={() => handleBgColorChange("black")}
              className={currentBgColor === "black" ? styles.active : ""}
            >
              Black
            </button>
          </div>

          <div className={styles.tagSection}>
            <div className={styles.tagHeader}>
              <h4>Tags ({allTags.length})</h4>
              <div className={styles.tagInfo}>
                {selectedTags.length > 0 && (
                  <span className={styles.resultCount}>
                    {filteredCount} {filteredCount === 1 ? "art" : "arts"}
                  </span>
                )}
                {selectedTags.length > 0 && (
                  <button onClick={clearAllTags} className={styles.clearButton}>
                    Clear All
                  </button>
                )}
              </div>
            </div>
            <div className={styles.tagList}>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
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

      {/* ボトムナビ */}
      <footer className={styles.footer}>
        {/* MENUボタン */}
        <button
          className={styles.btnTextChange}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span>MENU</span>
          <span>{menuOpen ? "CLOSE" : "OPEN"}</span>
        </button>

        {/* ▲トップに戻る */}
        <button
          className={styles.btnTextChange}
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <span>TOP</span>
          <span>BACK TO TOP</span>
        </button>

        {/* OPTIONボタン */}
        <button
          className={styles.btnTextChange}
          onClick={() => setOptionsOpen((prev) => !prev)}
        >
          <span>OPTION</span>
          <span>{optionsOpen ? "CLOSE" : "OPEN"}</span>
        </button>
      </footer>
    </>
  );
}
