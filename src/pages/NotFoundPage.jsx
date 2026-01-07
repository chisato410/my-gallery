import React from "react";
import Sketch from "react-p5";
import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.scss"; // SCSSをインポート

export default function NotFoundPage() {
  // セットアップ
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
  };

  // 画面リサイズ対応（プロの現場では必須の処理です！）
  const windowResized = (p5) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  // 描画ロジック
  const draw = (p5) => {
    p5.background(10, 10, 10, 20);
    p5.stroke(0, 102, 255, 150);
    p5.noFill();

    let x = p5.noise(p5.frameCount * 0.01) * p5.width;
    let y = p5.noise(p5.frameCount * 0.01 + 100) * p5.height;
    p5.ellipse(x, y, 50, 50);
  };

  return (
    <div className={styles.container}>
      {/* 背後にp5のキャンバスを配置 */}
      <div className={styles.canvasWrapper}>
        <Sketch setup={setup} draw={draw} windowResized={windowResized} />
      </div>

      {/* 前面にテキストを配置 */}
      <div className={styles.content}>
        <h2>404</h2>
        <p>Lost in the Generative Void...</p>
        <Link to="/" className={styles.linkButton}>
          Back to Gallery
        </Link>
      </div>
    </div>
  );
}
