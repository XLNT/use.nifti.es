#!/usr/bin/env ts-node

import dotenv from 'dotenv';
dotenv.config();

import { cache } from 'server/lib/metaCache';

const PREFIXES = ['m', 'o', 'r'];
const LOCALES = ['en'];

async function main() {
  const identifier = process.argv[2];

  const results = await Promise.allSettled(
    PREFIXES.flatMap((prefix) =>
      LOCALES.map((locale) => cache.remove(`${prefix}-${identifier}-${locale}`)),
    ),
  );

  console.log(JSON.stringify(results));
  console.log('done');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
