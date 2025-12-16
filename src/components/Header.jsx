// src/components/Header.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <p className={styles.subtitle}>Universes of Web Art</p>
        <h1 className={styles.title}>Thousand Fragments</h1>

        {/* ナビゲーション */}
        <nav className={styles.nav}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.navLink
            }
          >
            Gallery
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.navLink
            }
          >
            About
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
