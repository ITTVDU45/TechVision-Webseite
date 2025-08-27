// Simple smoke test: fetch a list of URLs and report status
const urls = [
  '/',
  '/case-studies',
  '/case-studies/cybersecurityberatung',
  '/case-studies/cms-webentwicklung',
  '/case-studies/ki-transformation',
  '/marketing',
  '/impressum',
  '/datenschutz'
];

const base = process.env.SMOKE_BASE || 'http://localhost:3000';

async function run() {
  let ok = true;
  for (const path of urls) {
    const url = base + path;
    try {
      const res = await fetch(url, { method: 'GET' });
      console.log(`${res.status} ${res.statusText} - ${url}`);
      if (!res.ok) ok = false;
    } catch (e) {
      console.error(`ERROR ${url} ->`, e.message || e);
      ok = false;
    }
  }
  process.exit(ok ? 0 : 2);
}

run();


