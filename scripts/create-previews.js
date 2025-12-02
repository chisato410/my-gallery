/* eslint-env node */
const fs = require("fs");
const path = require("path");

const fullDir = path.join(__dirname, "../public/artworks/full");
const previewDir = path.join(__dirname, "../public/artworks/previews");

if (!fs.existsSync(previewDir)) {
  fs.mkdirSync(previewDir, { recursive: true });
}

function lightweightHTML(content) {
  return content
    .replace(/frameRate\s*\(\s*60\s*\)/g, "frameRate(30)")
    .replace(
      /for\s*\(\s*let\s+(\w+)\s*=\s*0\s*;\s*\1\s*<\s*(\d+)/g,
      (match, varName, count) => {
        const reduced = Math.max(50, Math.floor(count / 5));
        return `for (let ${varName} = 0; ${varName} < ${reduced}`;
      }
    )
    .replace(
      /new\s+THREE\.SphereGeometry\s*\(\s*([^,]+),\s*(\d+),\s*(\d+)\s*\)/g,
      (match, radius, widthSeg, heightSeg) => {
        const w = Math.max(8, Math.floor(widthSeg / 4));
        const h = Math.max(8, Math.floor(heightSeg / 4));
        return `new THREE.SphereGeometry(${radius}, ${w}, ${h})`;
      }
    )
    .replace(/pixelDensity\s*\(\s*.*?\s*\)/g, "pixelDensity(1)")
    .replace(/setPixelRatio\s*\(\s*.*?\s*\)/g, "setPixelRatio(1)")
    .replace(/antialias\s*:\s*true/g, "antialias: false")
    .replace(/shadowMap\.enabled\s*=\s*true/g, "shadowMap.enabled = false")
    .replace(/castShadow\s*=\s*true/g, "castShadow = false")
    .replace(/receiveShadow\s*=\s*true/g, "receiveShadow = false");
}

function createPreviews() {
  const files = fs.readdirSync(fullDir).filter((f) => f.endsWith(".html"));

  console.log(`🔍 Found ${files.length} HTML files`);
  console.log("🔄 Creating lightweight previews...\n");

  let successCount = 0;

  files.forEach((filename, index) => {
    try {
      const fullPath = path.join(fullDir, filename);
      const previewPath = path.join(previewDir, filename);

      const content = fs.readFileSync(fullPath, "utf8");
      const lightContent = lightweightHTML(content);

      fs.writeFileSync(previewPath, lightContent);

      successCount++;

      if ((index + 1) % 100 === 0) {
        console.log(`✅ Processed ${index + 1}/${files.length} files`);
      }
    } catch (error) {
      console.error(`❌ Error processing ${filename}:`, error.message);
    }
  });

  console.log(`\n🎉 Successfully created ${successCount} preview files!`);
}

createPreviews();
