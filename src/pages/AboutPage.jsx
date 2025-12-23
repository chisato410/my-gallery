// src/pages/AboutPage.jsx
import React from "react";
import styles from "./AboutPage.module.scss";
import { BackToTop } from "../components/BackToTop";

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <article className={styles.content}>
        <h2 className={styles.title}>About</h2>

        <section className={styles.section}>
          <h3>Concept</h3>
          <p>
            本サイトは、プログラムによって描画されるジェネレーティブアートのアーカイブサイトです。
            卒業制作として制作され、Web上で鑑賞できるインタラクティブな作品群を収集・展示しています。
          </p>
          <p>
            「Thousand
            Fragments」というキャッチコピーの通り、小さなコードの集まりが積み重なることで生まれる多様な表現を楽しんでいただければ幸いです。{" "}
          </p>
        </section>

        <section className={styles.section}>
          <h3>Functions</h3>
          <ul className={styles.featureList}>
            <li>
              <strong>Filter</strong>{" "}
              <span>タグを選択して、特定の表現を絞り込めます。</span>
            </li>
            <li>
              <strong>Sort</strong>{" "}
              <span>制作順やランダムなど、並び順を変更できます。</span>
            </li>
            <li>
              <strong>Background</strong>{" "}
              <span>
                OPTIONパネルから背景色を切り替え、作品の印象の変化を楽しめます。
              </span>
            </li>
            <li>
              <strong>Detail</strong>{" "}
              <span>クリックすることで、作品を大きく表示できます。</span>
            </li>{" "}
          </ul>
        </section>

        <section className={styles.techLinkSection}>
          <p>Implementation and Performance</p>
          <a href="/tech" className={styles.techButton}>
            READ TECH STACK
          </a>
        </section>
      </article>
      <BackToTop />
    </div>
  );
}
