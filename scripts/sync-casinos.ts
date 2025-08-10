#!/usr/bin/env node

import { syncDatabase } from '../src/lib/casino-database';

async function main() {
  console.log('🔄 Syncing casino database...');
  
  try {
    await syncDatabase();
    console.log('✅ Database sync complete!');
    console.log('📊 All 13 casinos are now available in the admin panel');
  } catch (error) {
    console.error('❌ Error syncing database:', error);
    process.exit(1);
  }
}

main();