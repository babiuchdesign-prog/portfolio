const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'out');
const nextDir = path.join(outDir, '_next');
const assetsDir = path.join(outDir, 'assets');

// Rename _next to assets
if (fs.existsSync(nextDir)) {
  fs.renameSync(nextDir, assetsDir);
  console.log('Renamed _next to assets');
}

// Function to recursively find and replace string in files
function replaceInFiles(dir, searchRegex, replacement) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      replaceInFiles(filePath, searchRegex, replacement);
    } else if (file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.css')) {
      let content = fs.readFileSync(filePath, 'utf8');
      if (searchRegex.test(content)) {
        content = content.replace(searchRegex, replacement);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated paths in ${filePath}`);
      }
    }
  }
}

// Replace /_next/ with /assets/
if (fs.existsSync(outDir)) {
  const searchRegex = /\/_next\//g;
  replaceInFiles(outDir, searchRegex, '/assets/');
  
  const searchRegex2 = /"_next\//g;
  replaceInFiles(outDir, searchRegex2, '"assets/');
  
  console.log('Done! Now push the out folder to gh-pages.');
}
