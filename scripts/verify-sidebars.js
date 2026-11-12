const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Doctor Portal
  console.log('Testing Doctor Portal Sidebar...');
  await page.goto('http://localhost:3000/doctor-portal', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({
    path: 'C:/Users/thanz/.gemini/antigravity/brain/6b399ae1-5295-416c-a628-20f486388a6a/test_logo_06_doctor_portal.png',
    fullPage: false
  });

  // 2. Admin Portal
  console.log('Testing Admin Portal Sidebar...');
  await page.goto('http://localhost:3000/admin-portal', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({
    path: 'C:/Users/thanz/.gemini/antigravity/brain/6b399ae1-5295-416c-a628-20f486388a6a/test_logo_07_admin_portal.png',
    fullPage: false
  });

  await browser.close();
  console.log('Sidebar screenshots captured!');
})();

