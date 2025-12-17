# Thousand Fragments

> A generative art archive featuring over 500 algorithmically generated works.

「Thousand Fragments（千の断片）」は、プログラムによって描画されるジェネレーティブアートのアーカイブサイトです。

---

## 🛠 Tech Stack

### Frontend

- **React (Vite)** - 高速な開発環境とコンポーネントベースの設計
- **SCSS Modules** - CSS 変数（Custom Properties）を活用した動的テーマシステム
- **React Virtuoso** - 500 点以上の要素を扱うための仮想スクロール実装
- **Lucide React** - 一貫性のあるミニマルなアイコンシステム

### Backend

- **Firebase Firestore** - 作品メタデータと投票（Votes）システムの管理
- **Firebase Storage** - サムネイル（GIF）およびフル解像度作品のホスティング

---

## 🚀 Key Features

### 1. High Performance Rendering (Virtual Scrolling)

500 を超える DOM 要素を一度に読み込むことによるブラウザの遅延を避けるため、**仮想スクロール（Virtual Scrolling）**を導入。画面外の要素を動的に破棄・再利用することで、膨大なデータセットにおいても常に 60fps の滑らかな描画パフォーマンスを維持しています。

### 2. Automated Asset Pipeline

制作・公開プロセスを効率化するため、Node.js ベースの独自パイプラインを構築しました。

- **Auto Capture:** Puppeteer を用い、HTML 形式の作品をヘッドレスブラウザで実行。
- **GIF Optimization:** FFmpeg によるパレット最適化を行い、プレビュー用の高品質かつ軽量な GIF を自動生成。
- **Database Sync:** ローカルの JSON と Firestore を同期する CLI ツールを自作し、データ管理を自動化。

### 3. Dynamic Theming & UX

CSS 変数を全面的に採用。背景色の切り替え（Light/Dark/Color）に連動して、文字色やアクセントカラー、モーダルの透過度までが滑らかに変化します。また、モーダルにはブラウザの「戻る」ボタン対応や、ESC キーによる閉じる操作など、ネイティブアプリに近い UX を実装しました。

---

## 📦 Project Structure

```bash
├── public/              # 静的アセット（作品本体・GIFサムネイル）
├── scripts/             # 🛠 自動化スクリプト（Puppeteer / FFmpeg / Firebase）
├── src/
│   ├── components/      # UIコンポーネント
│   ├── data/            # 作品メタデータ (JSON)
│   ├── hooks/           # カスタムフック（Firestore連携など）
│   ├── pages/           # ページ構成（About / Tech / Gallery）
│   └── styles/          # グローバルテーマ設定（SCSS）
└── artworks-metadata.json # 全作品のマスターデータ
```

---

## 🛠 Setup & Development

### Installation

```bash

npm install

```

### Run Development Server

```bash
npm run dev

```

### Run Asset Pipeline

#### 作品 HTML からプレビュー GIF を一括生成

```bash

node scripts/generate-gifs.js
```

#### Firestore へデータを同期

```bash

node scripts/init-firestore.js

```

## 🎨 About the Artworks

本アーカイブに収められている作品は、p5.js や Vanilla JS を用いて描かれたものです。個々の作品は独立した sandbox 環境として public/artworks/ 内に保持されており、メインサイトからは iframe を通じて安全かつ動的に展開されます。

この設計により、各作品のライブラリ依存関係やグローバル変数がメインサイトの実行環境に干渉することなく、500 点以上の多様なプログラムを同一ブラウザタブ内でシームレスに切り替えて鑑賞することが可能になっています。

## ⚖️ License

MIT License.

Copyright (c) 2025 Chisato Machino
