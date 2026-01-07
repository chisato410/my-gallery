import React from "react";
import Sketch from "react-p5";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  // セットアップ（キャンバスの作成）
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
  };

  // 描画（ここにジェネラティブなロジックを書く）
  const draw = (p5) => {
    p5.background(10, 10, 10, 20); // 少し残像を残す
    p5.stroke(0, 102, 255, 150);
    p5.noFill();

    // マウスの位置や時間で変化する図形
    let x = p5.noise(p5.frameCount * 0.01) * p5.width;
    let y = p5.noise(p5.frameCount * 0.01 + 100) * p5.height;
    p5.ellipse(x, y, 50, 50);
  };

  return (
    <div className="relative min-h-screen bg-neutral-950 overflow-hidden">
      {/* 背後にp5のキャンバスを配置 */}
      <div className="absolute inset-0">
        <Sketch setup={setup} draw={draw} />
      </div>

      {/* 前面にテキストを配置 */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white pointer-events-none">
        <h2 className="text-5xl font-bold mb-4 drop-shadow-lg">404</h2>
        <p className="mb-8 text-neutral-400">Lost in the Generative Void...</p>
        <Link
          to="/"
          className="pointer-events-auto px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-blue-500 hover:text-white transition-all transform hover:scale-110"
        >
          Back to Gallery
        </Link>
      </div>
    </div>
  );
}
