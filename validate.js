const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const css = fs.readFileSync('css/style.css', 'utf8');
const js = fs.readFileSync('js/main.js', 'utf8');

// 1. Verify IDs
const idMatches = [...html.matchAll(/id=["']([^"']+)["']/g)].map(m => m[1]);
const idSet = new Set(idMatches);
const jsIdMatches = [...js.matchAll(/getElementById\(["']([^"']+)["']\)/g)].map(m => m[1]);
const missingInHtml = [...new Set(jsIdMatches.filter(id => !idSet.has(id)))];

// 2. Verify Anchor Targets
const hrefMatches = [...html.matchAll(/href=["']#([^"']+)["']/g)].map(m => m[1]);
const missingAnchorTargets = [...new Set(hrefMatches.filter(h => !idSet.has(h)))];

// 3. Verify Classes
const classMatches = [...html.matchAll(/class=["']([^"']+)["']/g)];
const classesInHtml = new Set();
classMatches.forEach(m => {
  m[1].split(/\s+/).filter(Boolean).forEach(c => classesInHtml.add(c));
});

const unstyled = [];
classesInHtml.forEach(c => {
  if (!css.includes('.' + c) && !c.startsWith('fa-') && c !== 'fa-solid' && c !== 'fa-brands' && c !== 'fa-regular') {
    unstyled.push(c);
  }
});

console.log('--- AUDIT REPORT ---');
console.log('Total unique IDs:', idSet.size);
console.log('Missing IDs in HTML:', missingInHtml);
console.log('Missing anchor targets in HTML:', missingAnchorTargets);
console.log('Total unique HTML classes:', classesInHtml.size);
console.log('Unstyled classes count:', unstyled.length);
if (unstyled.length > 0) {
  console.log('Unstyled classes sample:', unstyled);
}
