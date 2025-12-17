// src/pages/TechPage.jsx
import React from "react";
import styles from "./AboutPage.module.scss";
import techStyles from "./TechPage.module.scss";
import { BackToTop } from "../components/BackToTop";

export default function TechPage() {
  return (
    <div className={styles.container}>
      <article className={styles.content}>
        <h2 className={styles.title}>Tech Stack</h2>

        {/* 1. 基本構成セクション */}
        <section className={styles.section}>
          <h3>Core Architecture</h3>
          <p>
            大量の作品データを効率的に管理するため、ヘッドレスなシステム構成を採用しています。
            作品のメタデータは Firebase
            で管理され、クライアント側で動的にフェッチ・レンダリングされます。
          </p>
          <div className={techStyles.stackGrid}>
            <div className={techStyles.stackItem}>
              <strong>Framework</strong>
              <span>React / Vite</span>
            </div>
            <div className={techStyles.stackItem}>
              <strong>Backend</strong>
              <span>Firebase (Firestore / Storage)</span>
            </div>
            <div className={techStyles.stackItem}>
              <strong>Styling</strong>
              <span>SCSS Modules / CSS Variables</span>
            </div>
          </div>
        </section>

        {/* 2. パフォーマンス最適化セクション */}
        <section className={styles.section}>
          <h3>Performance</h3>
          <p>
            500点を超える作品をストレスなく閲覧できるよう、描画パフォーマンスの最適化を徹底しています。
          </p>
          <ul className={styles.featureList}>
            <li>
              <strong>Virtual Scrolling</strong>
              <span>
                react-virtuoso
                を使用。表示領域外のDOMを動的に破棄・再利用することで、メモリ消費を最小化し
                60fps の描画を維持しています。
              </span>
            </li>
            <li>
              <strong>Lazy Asset Loading</strong>
              <span>
                IntersectionObserver API
                を活用し、スクロール位置に合わせてアセットをオンデマンドで読み込み、初期通信量を削減しています。
              </span>
            </li>
            <li>
              <strong>Dynamic Theming</strong>
              <span>
                CSS変数をグローバルに定義。JavaScriptからの属性操作のみで再レンダリングを抑えた低負荷なテーマ切り替えを実現しました。
              </span>
            </li>
          </ul>
        </section>

        {/* 3. 自動化パイプライン（スクリプト関連） */}
        <section className={styles.section}>
          <h3>Automation Pipeline</h3>
          <p>
            制作・公開プロセスを効率化するため、Node.jsによる独自パイプラインを構築。
            手作業による管理を排し、アーカイブの保守性を高めています。
          </p>

          <ul className={techStyles.flowList}>
            <li>
              <strong>GIF Generation:</strong>
              Puppeteer を制御し、全作品のヘッドレス・キャプチャを実行。FFmpeg
              によるパレット最適化を経てプレビュー用GIFを自動生成します。
            </li>
            <li>
              <strong>Database Sync:</strong>
              ローカルのJSONデータと Firestore
              を同期するスクリプトを自作。作品追加やデータ修正を一括で反映可能です。
            </li>
          </ul>

          <p className={techStyles.metric}>
            *
            自動化により、1作品あたりの公開作業時間を大幅に短縮（約90%の削減）。
          </p>
        </section>

        {/* 4. GitHubリンク */}
        <section className={styles.techLinkSection}>
          <p>Source code and full documentation.</p>
          <a
            href="https://github.com/chisato410/my-gallery"
            target="_blank"
            rel="noreferrer"
            className={styles.techButton}
          >
            OPEN REPOSITORY
          </a>
        </section>
      </article>
      <BackToTop />
    </div>
  );
}
