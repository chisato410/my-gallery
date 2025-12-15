// src/components/BottomNav.jsx
import React from "react";
import styles from "./BottomNav.module.scss";

export function BottomNav() {
  return (
    <footer className={styles.bottomNav}>
      <div className={styles.container}>
        {/* MENU */}
        <button className={styles.button}>MENU</button>

        {/* 中央 △ ボタン（両サイドに縦線） */}
        <button className={`${styles.button} ${styles.centerButton}`}>△</button>

        {/* OPTION */}
        <button className={styles.button}>OPTION</button>
      </div>
    </footer>
  );
}
