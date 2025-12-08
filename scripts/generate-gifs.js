// scripts/generate-gifs.js
/* eslint-env node */
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const { promisify } = require("util");

const execAsync = promisify(exec);
const artworksMetadata = require("./artworks-metadata.json");

// 設定
const CONCURRENT_LIMIT = 5;
const CAPTURE_DURATION = 3000; // 3秒
const FRAME_RATE = 10;
const OUTPUT_WIDTH = 400;
const OUTPUT_HEIGHT = 400;

const thumbnailsDir = path.join(__dirname, "../public/artworks/thumbnails");
const framesDir = path.join(__dirname, "../temp-frames");

// フォルダ作成
[thumbnailsDir, framesDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// waitForTimeout の代替関数
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function generateGif(artwork, index) {
  const url = `http://localhost:5173/artworks/full/${artwork.filename}`;
  const workDir = path.join(framesDir, `work-${index}`);
  const outputPath = path.join(
    thumbnailsDir,
    artwork.filename.replace(".html", ".gif")
  );

  // 既に存在する場合はスキップ
  if (fs.existsSync(outputPath)) {
    console.log(`⏭️  Skipping ${artwork.title} (already exists)`);
    return { success: true, skipped: true };
  }

  let browser;
  try {
    console.log(
      `🎬 [${index + 1}/${artworksMetadata.length}] Capturing: ${artwork.title}`
    );

    // 作業フォルダ作成
    if (!fs.existsSync(workDir)) {
      fs.mkdirSync(workDir, { recursive: true });
    }

    // Puppeteerでキャプチャ
    browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: OUTPUT_WIDTH, height: OUTPUT_HEIGHT });

    try {
      await page.goto(url, { waitUntil: "networkidle2", timeout: 10000 });
      await delay(500); // 少し待機
    } catch (error) {
      console.warn(`⚠️  Loading issue for ${artwork.title}, continuing...`);
    }

    // フレームをキャプチャ
    const frameCount = Math.floor((CAPTURE_DURATION / 1000) * FRAME_RATE);
    const frameDelay = 1000 / FRAME_RATE;

    for (let i = 0; i < frameCount; i++) {
      const framePath = path.join(
        workDir,
        `frame${String(i).padStart(4, "0")}.png`
      );
      await page.screenshot({ path: framePath });
      await delay(frameDelay);
    }

    await browser.close();
    browser = null;

    // ffmpegでGIF変換
    console.log(`🎨 Converting to GIF: ${artwork.title}`);

    try {
      await execAsync(
        `ffmpeg -framerate ${FRAME_RATE} -i "${workDir}/frame%04d.png" -vf "scale=${OUTPUT_WIDTH}:${OUTPUT_HEIGHT}:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" -loop 0 "${outputPath}" -y`
      );
      console.log(`✅ Completed: ${artwork.title}`);
    } catch (error) {
      console.error(`❌ GIF conversion failed for ${artwork.title}`);
      return { success: false, error: error.message };
    }

    // 作業フォルダを削除
    fs.rmSync(workDir, { recursive: true, force: true });

    return { success: true };
  } catch (error) {
    console.error(`❌ Error processing ${artwork.title}:`, error.message);
    if (browser) {
      await browser.close();
    }
    if (fs.existsSync(workDir)) {
      fs.rmSync(workDir, { recursive: true, force: true });
    }
    return { success: false, error: error.message };
  }
}

async function generateAllGifs() {
  console.log("🚀 Starting GIF generation...");
  console.log(`📊 Total artworks: ${artworksMetadata.length}`);
  console.log(`⚡ Concurrent limit: ${CONCURRENT_LIMIT}\n`);

  const startTime = Date.now();
  const results = { success: 0, failed: 0, skipped: 0 };

  // バッチ処理
  for (let i = 0; i < artworksMetadata.length; i += CONCURRENT_LIMIT) {
    const batch = artworksMetadata.slice(i, i + CONCURRENT_LIMIT);

    console.log(
      `\n📦 Batch ${Math.floor(i / CONCURRENT_LIMIT) + 1}/${Math.ceil(
        artworksMetadata.length / CONCURRENT_LIMIT
      )}`
    );

    const promises = batch.map((artwork, batchIndex) =>
      generateGif(artwork, i + batchIndex)
    );

    const batchResults = await Promise.all(promises);

    batchResults.forEach((result) => {
      if (result.skipped) results.skipped++;
      else if (result.success) results.success++;
      else results.failed++;
    });

    console.log(
      `Progress: ${Math.min(i + CONCURRENT_LIMIT, artworksMetadata.length)}/${
        artworksMetadata.length
      }`
    );
  }

  // クリーンアップ
  if (fs.existsSync(framesDir)) {
    fs.rmSync(framesDir, { recursive: true, force: true });
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);

  console.log("\n" + "=".repeat(50));
  console.log("🎉 GIF Generation Complete!");
  console.log("=".repeat(50));
  console.log(`✅ Success: ${results.success}`);
  console.log(`⏭️  Skipped: ${results.skipped}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log(`⏱️  Time: ${elapsed}s`);
  console.log(`📁 Output: ${thumbnailsDir}`);
  console.log("=".repeat(50));
}

generateAllGifs().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
