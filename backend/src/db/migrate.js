#!/usr/bin/env node

/**
 * Database migration script
 * Run: npm run db:migrate
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import pool from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function migrate() {
  try {
    console.log('🔄 Running database migrations...');
    
    const schemaSQL = readFileSync(join(__dirname, 'schema.sql'), 'utf-8');
    
    await pool.query(schemaSQL);
    
    console.log('✅ Migrations completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrate();
