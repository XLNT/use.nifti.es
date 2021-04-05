#!/usr/bin/env ts-node

import dotenv from 'dotenv';
dotenv.config();

import { cache } from 'server/lib/metaCache';

async function main() {
  await cache.clear();
  console.log('Cleared!');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
