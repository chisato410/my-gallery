import React from "react";
import Sketch from "react-p5";
import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.scss";

export default function NotFoundPage() {
  let txts = [];
  let webGLGraphics;
  let overAllTexture;
  // 文言をエラーページらしいものに変更
  let sentence = "404 DIMENSION NOT FOUND | LOST IN THE VOID | ".repeat(4);

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.pixelDensity(2);

    webGLGraphics = p5.createGraphics(p5.width, p5.height, p5.WEBGL);
    let textureHeight = 500;

    for (var i = 0; i < 5; i++) {
      txts[i] = p5.createGraphics(1200, textureHeight);
      txts[i].pixelDensity(2);
      // 標準のモノスペースフォントを使用（エンジニアっぽさが出ます）
      txts[i].textFont("monospace");
      txts[i].fill(0);
      txts[i].strokeWeight(2);
      let spanWidth = i * 2 + 1;
      txts[i].rect(0, 250 - spanWidth, 1180, spanWidth * 2);
      txts[i].textSize(45);
      txts[i].text(sentence, 0, textureHeight / 2 + 25);
    }

    // ノイズテクスチャの生成
    overAllTexture = p5.createGraphics(p5.width, p5.height);
    overAllTexture.loadPixels();
    for (var x = 0; x < p5.width + 50; x++) {
      for (var y = 0; y < p5.height + 50; y++) {
        overAllTexture.set(
          x,
          y,
          p5.color(
            100,
            p5.noise(x / 30, y / 30, (x * y) / 50) * p5.random([0, 20, 40, 120])
          )
        );
      }
    }
    overAllTexture.updatePixels();
  };

  const draw = (p5) => {
    webGLGraphics.push();
    webGLGraphics.clear();

    // マウス連動
    let rotX = p5.sin(p5.frameCount / 100 + p5.mouseX / 100);
    let rotY = p5.cos(p5.frameCount / 50 + p5.mouseY / 100);

    webGLGraphics.rotateX(rotX);
    webGLGraphics.rotateY(rotY);
    webGLGraphics.rotateZ(p5.cos(p5.frameCount / 50));

    webGLGraphics.noFill();
    webGLGraphics.stroke(0);
    webGLGraphics.box(20);
    webGLGraphics.noStroke();

    for (var i = 0; i < 15; i++) {
      webGLGraphics.push();
      webGLGraphics.texture(txts[i % 5]);
      webGLGraphics.rotateX(p5.sin(p5.frameCount / 200 + i));
      webGLGraphics.rotateY(p5.cos(p5.frameCount / 100 + i * 5));
      webGLGraphics.rotateZ(p5.cos(p5.frameCount / 100 + i * 3));
      webGLGraphics.sphere(
        250 + i * 10 + p5.noise(i, p5.frameCount / 50) * 20,
        64
      );
      webGLGraphics.pop();
    }
    webGLGraphics.pop();

    p5.background(229, 229, 227);
    p5.image(webGLGraphics, 0, 0, p5.width, p5.height);

    // デバッグ風テキスト
    p5.fill(0);
    p5.noStroke();
    p5.textFont("monospace");
    p5.textSize(14);
    p5.text(
      "STATUS: 404_NOT_FOUND\n" +
        "LOCATION: UNKNOWN_COORDINATES\n" +
        "X:" +
        p5.mouseX +
        " Y:" +
        p5.mouseY,
      40,
      p5.height - 80
    );

    p5.push();
    p5.stroke(0);
    p5.strokeWeight(2);
    p5.noFill();
    p5.rect(20, 20, p5.width - 40, p5.height - 40);
    p5.pop();

    p5.push();
    p5.blendMode(p5.MULTIPLY);
    p5.image(overAllTexture, 0, 0);
    p5.pop();
  };

  const windowResized = (p5) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return (
    <div className={styles.container}>
      <div className={styles.canvasWrapper}>
        <Sketch setup={setup} draw={draw} windowResized={windowResized} />
      </div>

      <div className={styles.content}>
        <Link to="/" className={styles.linkButton}>
          REBOOT SYSTEM
        </Link>
      </div>
    </div>
  );
}
