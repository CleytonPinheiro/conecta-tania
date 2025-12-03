import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.dirname(__dirname);

console.log('🔨 Building Conecta Tânia...\n');

try {
  // Step 1: Build frontend with Vite
  console.log('📦 Building frontend with Vite...');
  execSync('vite build', {
    cwd: rootDir,
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' }
  });
  console.log('✅ Frontend build complete\n');

  // Step 2: Create production server entry
  console.log('🔧 Creating production server entry...');
  
  const distDir = path.join(rootDir, 'dist');
  fs.mkdirSync(distDir, { recursive: true });
  
  // Simple production wrapper - just import and run the server
  const productionEntry = `const path = require('path');
const rootDir = path.dirname(__dirname);

// Set up tsx to handle TypeScript
require('tsx');

// Import and start the server
import(path.join(rootDir, 'server/index.ts')).catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
`;
  
  fs.writeFileSync(path.join(distDir, 'index.cjs'), productionEntry);
  
  console.log('✅ Production entry created\n');
  console.log('✨ Build successful! Ready for deployment.\n');
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}
