import fs from 'fs';
import path from 'path';
import { camelCase } from 'change-case';

const dir = './lib/types';

fs.readdirSync(dir).forEach((file) => {
  const fullPath = path.join(dir, file);

  if (file === 'index.ts' || !file.endsWith('.ts')) return;

  const code = fs.readFileSync(fullPath, 'utf8');
  const transformed = code.replace(
    /(\s)([a-z0-9_]+)(\?:|:)/g,
    (_, space, key, after) => {
      return `${space}${camelCase(key)}${after}`;
    }
  );

  fs.writeFileSync(fullPath, transformed, 'utf8');
});
