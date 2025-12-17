// src/components/BackToTop.jsx
import React, { useState, useEffect } from "react";
import styles from "./BackToTop.module.scss";

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // 指定量スクロールしたら表示
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`${styles.button} ${isVisible ? styles.visible : ""}`}
      onClick={scrollToTop}
    >
      TOP —
    </div>
  );
};
