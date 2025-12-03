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

  // Step 2: Build backend with esbuild
  console.log('🔧 Building backend with esbuild...');
  
  // Build server code excluding vite config and dev dependencies
  execSync(
    'npx esbuild server/index.ts ' +
    '--bundle ' +
    '--platform=node ' +
    '--target=node20 ' +
    '--format=cjs ' +
    '--packages=external ' +
    '--external:vite ' +
    '--external:@vitejs/* ' +
    '--external:@replit/* ' +
    '--external:@tailwindcss/* ' +
    '--external:./vite.config.ts ' +
    '--external:../vite.config.ts ' +
    '--outfile=dist/index.cjs',
    {
      cwd: rootDir,
      stdio: 'inherit'
    }
  );
  
  console.log('✅ Backend build complete\n');
  console.log('✨ Build successful! Ready for deployment.\n');
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}
