import { copyFileSync, writeFileSync } from 'fs'
try {
  copyFileSync('dist/index.html', 'dist/404.html') 
  writeFileSync('dist/.nojekyll', '')              
  console.log('✔ SPA fallback + .nojekyll OK')
} catch (e) {
  console.error('postbuild error:', e)
  process.exit(1)
}
