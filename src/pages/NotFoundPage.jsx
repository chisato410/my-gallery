import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import p5 from "p5";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  const sketchRef = useRef(null);
  const p5Instance = useRef(null);

  useEffect(() => {
    if (!sketchRef.current) return;

    const sketch = (p) => {
      let txts = [];
      let sentence =
        "THE NEW WORLD DIMENSION | THE NEW WORLD DIMENSION | THE NEW WORLD DIMENSION | THE NEW WORLD DIMENSION | THE NEW WORLD DIMENSION";
      let webGLGraphics;
      let overAllTexture;

      p.setup = () => {
        p.createCanvas(1000, 1000);
        p.pixelDensity(2);
        webGLGraphics = p.createGraphics(p.width, p.height, p.WEBGL);

        let textureHeight = 500;

        for (let i = 0; i < 5; i++) {
          txts[i] = p.createGraphics(1200, textureHeight);
          txts[i].pixelDensity(2);
          txts[i].fill([0, 0, 0, 255][i % 4]);
          txts[i].strokeWeight(2);
          let spanWidth = i * 2 + 1;
          txts[i].rect(0, 250 - spanWidth, 1180, spanWidth * 2);
          txts[i].fill(0);
          txts[i].textSize(16);
          txts[i].text(sentence, 0, textureHeight / 2 + 25);
        }

        webGLGraphics.background(255);
        p.background(0);

        overAllTexture = p.createGraphics(p.width, p.height);
        overAllTexture.loadPixels();

        for (let i = 0; i < p.width + 50; i++) {
          for (let o = 0; o < p.height + 50; o++) {
            overAllTexture.set(
              i,
              o,
              p.color(
                100,
                p.noise(i / 30, o / 30, (i * o) / 50) *
                  p.random([0, 20, 40, 120])
              )
            );
          }
        }
        overAllTexture.updatePixels();
      };

      p.draw = () => {
        webGLGraphics.push();
        webGLGraphics.clear(0, 0, p.width, p.height);
        webGLGraphics.fill(0);
        webGLGraphics.rotateX(p.sin(p.frameCount / 100 + p.mouseX / 100));
        webGLGraphics.rotateY(p.cos(p.frameCount / 50 + p.mouseY / 100));
        webGLGraphics.rotateZ(p.cos(p.frameCount / 50));
        webGLGraphics.stroke(0);

        webGLGraphics.noFill();
        webGLGraphics.box(20);
        webGLGraphics.noStroke();

        for (let i = 0; i < 15; i++) {
          webGLGraphics.push();
          webGLGraphics.texture(txts[i % 5]);
          webGLGraphics.rotateX(p.sin(p.frameCount / 200 + i));
          webGLGraphics.rotateY(p.cos(p.frameCount / 100 + i * 5));
          webGLGraphics.rotateZ(p.cos(p.frameCount / 100 + i * 3));
          webGLGraphics.sphere(
            250 + i * 10 + p.noise(i, p.frameCount / 50) * 20,
            64
          );
          webGLGraphics.pop();
        }
        webGLGraphics.pop();

        p.clear(0, 0, p.width, p.height);
        p.fill(229, 229, 227);
        p.rect(0, 0, p.width, p.height);
        p.image(webGLGraphics, 0, 0);
        p.fill(0);
        p.noStroke();
        p.textSize(20);
        p.text(
          `ROTATE X: ${p.sin(p.frameCount / 200).toFixed(3)}\n` +
            `ROTATE Y: ${p.cos(p.frameCount / 100).toFixed(3)}\n` +
            `ROTATE Z: ${p.cos(p.frameCount / 100).toFixed(3)}\n`,
          40,
          p.height - 100
        );
        p.stroke(0);
        p.noFill();
        p.push();
        p.strokeWeight(2);
        p.rect(20, 20, p.width - 40, p.height - 40);
        p.pop();
        p.push();
        p.blendMode(p.MULTIPLY);
        p.image(overAllTexture, 0, 0);
        p.pop();
      };

      p.windowResized = () => {
        const container = sketchRef.current;
        if (container) {
          const size = Math.min(
            container.clientWidth,
            container.clientHeight,
            1000
          );
          p.resizeCanvas(size, size);
        }
      };
    };

    p5Instance.current = new p5(sketch, sketchRef.current);

    return () => {
      if (p5Instance.current) {
        p5Instance.current.remove();
      }
    };
  }, []);

  return (
    <div className={styles.container}>
      <div ref={sketchRef} className={styles.canvas} />
      <div className={styles.content}>
        <Link to="/" className={styles.linkButton}>
          REBOOT SYSTEM
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
