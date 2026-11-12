const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Patient Portal Home (Hero & Nav)
  console.log('Testing Patient Portal Home...');
  await page.goto('http://localhost:3000/patient-portal', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({
    path: 'C:/Users/thanz/.gemini/antigravity/brain/6b399ae1-5295-416c-a628-20f486388a6a/test_logo_01_hero_nav.png',
    fullPage: false
  });

  // 2. Patient Portal Scrolled / Doctors page (White Nav)
  console.log('Testing Patient Portal Doctors (White Nav)...');
  await page.goto('http://localhost:3000/patient-portal/doctors', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({
    path: 'C:/Users/thanz/.gemini/antigravity/brain/6b399ae1-5295-416c-a628-20f486388a6a/test_logo_02_white_nav.png',
    fullPage: false
  });

  // 3. Patient Portal Footer
  console.log('Testing Patient Portal Footer...');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({
    path: 'C:/Users/thanz/.gemini/antigravity/brain/6b399ae1-5295-416c-a628-20f486388a6a/test_logo_03_footer.png',
    fullPage: false
  });

  // 4. Unified Login Page
  console.log('Testing Unified Login Page...');
  await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({
    path: 'C:/Users/thanz/.gemini/antigravity/brain/6b399ae1-5295-416c-a628-20f486388a6a/test_logo_04_unified_login.png',
    fullPage: false
  });

  // 5. Admin Portal Login
  console.log('Testing Admin Portal Login...');
  await page.goto('http://localhost:3000/admin-portal/login', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({
    path: 'C:/Users/thanz/.gemini/antigravity/brain/6b399ae1-5295-416c-a628-20f486388a6a/test_logo_05_admin_login.png',
    fullPage: false
  });

  await browser.close();
  console.log('All logo verification screenshots captured successfully!');
})();

