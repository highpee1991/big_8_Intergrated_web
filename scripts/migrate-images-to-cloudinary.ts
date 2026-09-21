// scripts/migrate-images-to-cloudinary.ts
//
// One-time, safely re-runnable migration:
//   1. Uploads every file in public/images/products and public/images/brands
//      to Cloudinary.
//   2. Rewrites prisma/seed.ts in place, replacing local paths
//      (e.g. "/images/products/valve.png") with the real Cloudinary URL.
//
// After this runs, `npx prisma db seed` pushes the new URLs into the
// database , seed.ts stays the single source of truth, same pattern as
// every other data change in this project.
//
// Re-running is safe: each upload uses the filename (without extension) as
// a stable Cloudinary public_id with overwrite enabled, so re-uploading the
// same file just updates the same asset instead of creating a duplicate.
//
// Run with: npx tsx scripts/migrate-images-to-cloudinary.ts
import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";
import fs from "node:fs";
import path from "node:path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const SEED_PATH = path.join(process.cwd(), "prisma", "seed.ts");
const IMAGE_EXTENSIONS = /\.(png|jpe?g|webp)$/i;

async function uploadFolder(localFolder: string, cloudinaryFolder: string) {
  const dir = path.join(process.cwd(), "public", localFolder);
  const map = new Map<string, string>(); // filename -> Cloudinary secure_url

  if (!fs.existsSync(dir)) {
    console.warn(`Skipping ${localFolder} , folder not found.`);
    return map;
  }

  const files = fs.readdirSync(dir).filter((f) => IMAGE_EXTENSIONS.test(f));
  console.log(`\n${localFolder}: found ${files.length} file(s)`);

  for (const file of files) {
    const publicId = path.parse(file).name; // filename without extension
    const filePath = path.join(dir, file);
    process.stdout.write(`  Uploading ${file}... `);
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: `big8-integrated/${cloudinaryFolder}`,
        public_id: publicId,
        overwrite: true,
        resource_type: "image",
      });
      map.set(file, result.secure_url);
      console.log("done");
    } catch (err) {
      console.log("FAILED");
      console.error(`  Error uploading ${file}:`, err instanceof Error ? err.message : err);
    }
  }

  return map;
}

function rewriteSeedFile(replacementMap: Map<string, string>): number {
  let content = fs.readFileSync(SEED_PATH, "utf-8");
  let totalReplacements = 0;

  for (const [localPath, cloudinaryUrl] of replacementMap) {
    const occurrences = content.split(localPath).length - 1;
    if (occurrences > 0) {
      content = content.split(localPath).join(cloudinaryUrl);
      totalReplacements += occurrences;
    }
  }

  fs.writeFileSync(SEED_PATH, content, "utf-8");
  return totalReplacements;
}

async function main() {
  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    console.error(
      "Missing Cloudinary credentials. Check CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET are set in .env.",
    );
    process.exit(1);
  }

  const productMap = await uploadFolder("images/products", "products");
  const brandMap = await uploadFolder("images/brands", "brands");

  // Build a single map keyed by the full local path (as it appears in
  // seed.ts), not just the bare filename, so replacement is unambiguous.
  const replacementMap = new Map<string, string>();
  for (const [file, url] of productMap) replacementMap.set(`/images/products/${file}`, url);
  for (const [file, url] of brandMap) replacementMap.set(`/images/brands/${file}`, url);

  const replacements = rewriteSeedFile(replacementMap);

  console.log(`\nUploaded ${productMap.size} product image(s) and ${brandMap.size} brand logo(s).`);
  console.log(`Rewrote ${replacements} reference(s) in prisma/seed.ts to Cloudinary URLs.`);
  console.log(`\nNext step: run "npx prisma db seed" to push these URLs into the database.`);
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});