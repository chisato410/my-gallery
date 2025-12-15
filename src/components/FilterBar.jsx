// src/components/FilterBar.jsx
import React from "react";
import styles from "./FilterBar.module.scss";

export function FilterBar({
  filter,
  setFilter,
  sortBy,
  setSortBy,
  totalCount,
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* フィルタボタン群（将来復活用）
        <div className={styles.filters}>
          <button
            onClick={() => setFilter("all")}
            className={`${styles.filterButton} ${
              filter === "all" ? styles.active : ""
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("p5.js")}
            className={`${styles.filterButton} ${
              filter === "p5.js" ? styles.active : ""
            }`}
          >
            p5.js
          </button>
          <button
            onClick={() => setFilter("Three.js")}
            className={`${styles.filterButton} ${
              filter === "Three.js" ? styles.active : ""
            }`}
          >
            Three.js
          </button>
          <span className={styles.count}>{totalCount} works</span>
        </div>
        */}

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
    </div>
  );
}
