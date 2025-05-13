const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const lessDir = path.join(__dirname, 'less');
const cssDir = path.join(__dirname, 'css');
const mainFile = path.join(lessDir, 'style.less');
const outputFile = path.join(cssDir, 'style.css');
const localLessBin = path.join(__dirname, 'node_modules', '.bin', 'lessc');

// Ensure CSS directory exists
if (!fs.existsSync(cssDir)) {
  fs.mkdirSync(cssDir, { recursive: true });
}

// Compile LESS to CSS
function compileLess() {
  console.log('Compiling LESS to CSS...');
  exec(`"${localLessBin}" "${mainFile}" "${outputFile}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Error: ${stderr}`);
      return;
    }
    console.log('LESS compiled successfully!');
  });
}

// Initial compilation
compileLess();

// Watch for changes in LESS files
console.log(`Watching for changes in ${lessDir}...`);
fs.watch(lessDir, { recursive: true }, (eventType, filename) => {
  if (filename && filename.endsWith('.less')) {
    console.log(`File ${filename} changed, recompiling...`);
    compileLess();
  }
});

console.log('LESS watch process started. Press Ctrl+C to stop.'); 