// One-off helper: crops starter photos out of the design mockups.
// Usage: npm run crop -- "/path/to/mockups/folder"
// Real product photos should replace these. Just drop files in public/images/products/.
import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs';

const src = process.argv[2] || '/Users/kumarp17/Documents/ruca nails';
const out = path.resolve('public/images');
const M = {
  home: 'WhatsApp Image 2026-09-03 at 20.26.47.jpeg',
  shop: 'WhatsApp Image 2026-09-03 at 20.33.17.jpeg',
  shapes: 'WhatsApp Image 2026-09-03 at 20.34.43.jpeg',
};

// [file, outName, left, top, width, height]
const crops = [
  // Shop all mockup, desktop grid
  ['shop', 'products/koramangala-blooms', 264, 153, 144, 141],
  ['shop', 'products/indiranagar-chic', 437, 153, 143, 141],
  ['shop', 'products/cubbon-garden', 609, 153, 144, 141],
  ['shop', 'products/whitefield-minimal', 783, 153, 144, 141],
  ['shop', 'products/mg-road-glam', 437, 396, 143, 131],
  ['shop', 'products/jayanagar-jade', 609, 396, 144, 131],
  ['shop', 'products/bellandur-bronze', 783, 396, 144, 131],
  ['shop', 'products/church-street-chrome', 264, 628, 144, 138],
  ['shop', 'products/frazer-petals', 437, 628, 143, 138],
  ['shop', 'products/cooke-town-nude', 609, 628, 144, 138],
  ['shop', 'products/ub-city-noir', 783, 628, 144, 138],
  // Shop all mockup, mobile grid (extra designs)
  ['shop', 'products/ulsoor-ombre', 1019, 358, 96, 103],
  ['shop', 'products/frazer-pearls', 1135, 549, 96, 102],
  // Nail shapes mockup
  ['shapes', 'shapes/almond', 74, 192, 131, 177],
  ['shapes', 'shapes/squoval', 366, 192, 132, 177],
  ['shapes', 'shapes/coffin', 657, 192, 132, 177],
  ['shapes', 'shapes/square', 74, 388, 131, 175],
  ['shapes', 'shapes/stiletto', 366, 388, 132, 175],
  ['shapes', 'shapes/oval', 657, 388, 132, 175],
  // Home mockup hero (right side, clear of the pop-up)
  ['home', 'hero', 703, 104, 261, 315],
];

for (const [file, name, left, top, width, height] of crops) {
  const dest = path.join(out, `${name}.webp`);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const scale = name === 'hero' ? 2.5 : 4;
  await sharp(path.join(src, M[file]))
    .extract({ left, top, width, height })
    .resize(Math.round(width * scale), Math.round(height * scale), { kernel: 'lanczos3' })
    .sharpen()
    .webp({ quality: 85 })
    .toFile(dest);
  console.log('wrote', path.relative(process.cwd(), dest));
}
