import { readdirSync, existsSync } from 'fs';
import { join, parse } from 'path';
import sharp from 'sharp';

const dirs = ['public/images', 'public/images/screenshots'];

for (const dir of dirs) {
  if (!existsSync(dir)) continue;
  for (const file of readdirSync(dir)) {
    const ext = parse(file).ext.toLowerCase();
    if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue;
    const input = join(dir, file);
    const output = join(dir, parse(file).name + '.webp');
    if (existsSync(output)) continue;
    sharp(input)
      .webp({ quality: 80 })
      .toFile(output)
      .then(() => console.log(`✅ ${file} → ${parse(file).name}.webp`))
      .catch(err => console.error(`❌ ${file}: ${err.message}`));
  }
}
