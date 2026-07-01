//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, 'app/data/automated-changelog.json');
const VIEWS_DIR = path.join(__dirname, 'app/views');

function getPageTitle(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const match = content.match(/{%\s*block\s+pageTitle\s*%}(.*?){%\s*endblock\s*%}/s);
    return match ? match[1].replace(/-\s*{{.*?}}/g, '').trim() : path.basename(filePath);
  } catch (e) {
    return path.basename(filePath);
  }
}

function logChange(changedPath) {
  if (!changedPath.endsWith('.html') && !changedPath.endsWith('.njk')) return;
  if (changedPath.includes('changelog') || changedPath.includes('index.html')) return;

  const absolutePath = path.resolve(changedPath);
  const relativeUrl = '/' + path.relative(VIEWS_DIR, absolutePath).replace(/\\/g, '/').replace(/\.(html|njk)$/, '');
  const pageTitle = getPageTitle(absolutePath);

  let changelog = [];
  if (fs.existsSync(LOG_FILE)) {
    try { changelog = JSON.parse(fs.readFileSync(LOG_FILE, 'utf8')); } catch (e) {}
  }

  const timestamp = new Date().toLocaleString('en-GB', { hour12: false });
  
  // Update existing entry or prepend a new one
  const existingIdx = changelog.findIndex(item => item.url === relativeUrl);
  if (existingIdx !== -1) {
    changelog[existingIdx].timestamp = timestamp;
    changelog[existingIdx].title = pageTitle;
// Clean up arguments passed by chokidar-cli and run
const args = process.argv.slice(2);
if (args.length > 0) {
  // Join all parts in case the path contains spaces
  const targets = args.join(' ');
  logChange(targets);
}
  // Limit file size to last 30 changes
  if (changelog.length > 30) changelog.pop();

  fs.mkdirSync(path.dirname(LOG_FILE), { recursive: true });
  fs.writeFileSync(LOG_FILE, JSON.stringify(changelog, null, 2));
}

// Accept file updates sent via the terminal command line
if (process.argv[2]) {
  logChange(process.argv[2]);
}
