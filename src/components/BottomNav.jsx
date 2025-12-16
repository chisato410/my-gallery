// src/components/BottomNav.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./BottomNav.module.scss";

export default function BottomNav({ artworks = [], setBgColor, virtuosoRef }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(false);

  const location = useLocation();

  const allTags = Array.from(
    new Set(artworks.flatMap((art) => art.tags || []))
  );

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
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Gallery
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setMenuOpen(false)}>
              About
            </Link>
          </li>
        </ul>
      </div>

      {/* オプションパネル */}
      <div className={`${styles.navPanel} ${optionsOpen ? styles.active : ""}`}>
        <div className={styles.options}>
          <h4>Tags</h4>
          <div className={styles.tagList}>
            {allTags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>

          <h4>Background</h4>
          <div className={styles.bgButtons}>
            <button onClick={() => setBgColor("white")}>White</button>
            <button onClick={() => setBgColor("black")}>Black</button>
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
