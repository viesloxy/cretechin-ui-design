// Get metrics of admin page elements
const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // First go to login to set session
  await page.goto('http://localhost:3344/admin/login', { waitUntil: 'networkidle0', timeout: 30000 });

  // Try to set admin session in localStorage
  await page.evaluate(() => {
    const adminSess = {
      user: { id: 'admin-1', name: 'Admin Test', email: 'admin@test.com', role: 'super_admin' },
      token: 'fake-token',
      expiresAt: Date.now() + 3600000,
    };
    localStorage.setItem('cretechin_admin_session', JSON.stringify(adminSess));
  });

  await page.goto('http://localhost:3344/admin', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1500));

  const metrics = await page.evaluate(() => {
    const result = {};
    const out = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return {
        sel,
        rect: { x: r.x, y: r.y, w: r.width, h: r.height },
        position: cs.position,
        display: cs.display,
        top: cs.top,
        marginTop: cs.marginTop,
        paddingTop: cs.paddingTop,
        minHeight: cs.minHeight,
      };
    };
    result.html = out('html');
    result.body = out('body');
    result.outerWrap = out('body > div');
    result.sidebar = out('aside.hidden.lg\\:flex');
    result.innerWrap = out('body > div > div');
    result.topbar = out('header');
    result.main = out('main');
    result.firstSection = out('main > section');
    result.statsGrid = out('main > div.grid');
    return JSON.stringify(result, null, 2);
  });

  console.log(metrics);
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
