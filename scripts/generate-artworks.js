/* eslint-env node */
const fs = require("fs");
const path = require("path");

const metadataPath = path.join(__dirname, "artworks-metadata.json");
const fullDir = path.join(__dirname, "../public/artworks/full");
const previewDir = path.join(__dirname, "../public/artworks/previews");
const outputPath = path.join(__dirname, "../src/data/artworks.json");

function generateArtworks() {
  console.log("🔍 Loading metadata...");

  const metadata = JSON.parse(fs.readFileSync(metadataPath, "utf8"));

  console.log(`📁 Found ${metadata.length} artworks in metadata`);

  const artworks = [];
  const errors = [];

  metadata.forEach((item, index) => {
    try {
      const fullPath = path.join(fullDir, item.filename);
      const previewPath = path.join(previewDir, item.filename);

      if (!fs.existsSync(fullPath)) {
        errors.push(`❌ File not found: ${item.filename}`);
        return;
      }

      if (!fs.existsSync(previewPath)) {
        console.log(`⚠️  Preview not found for: ${item.filename}`);
      }

      const artwork = {
        id: index + 1,
        title: item.title,
        description: item.description,
        author: item.author,
        tech: item.tech,
        color: item.color,
        createdAt: item.createdAt,
        tags: item.tags || [],
        url: `/artworks/full/${item.filename}`,
        previewUrl: `/artworks/previews/${item.filename}`,
        filename: item.filename,
      };

      artworks.push(artwork);

      if ((index + 1) % 100 === 0) {
        console.log(`✅ Processed ${index + 1}/${metadata.length} artworks`);
      }
    } catch (error) {
      errors.push(`❌ Error processing ${item.filename}: ${error.message}`);
    }
  });

  if (errors.length > 0) {
    console.log("\n⚠️  Errors:");
    errors.forEach((err) => console.log(err));
  }

  const dataDir = path.dirname(outputPath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(artworks, null, 2));

  console.log(`\n🎉 Successfully generated ${artworks.length} artworks!`);
  console.log(`📄 Output: ${outputPath}`);
}

generateArtworks();
