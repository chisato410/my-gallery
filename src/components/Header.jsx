// src/components/Header.jsx
import React from "react";
import styles from "./Header.module.scss";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <p className={styles.subtitle}>Universes of Web Art</p>
        <h1 className={styles.title}>Thousand Fragments</h1>
      </div>
    </header>
  );
}
