const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function capture() {
  const screenshotDir = path.join(__dirname, '..', 'public', 'screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  const routes = [
    { url: 'http://localhost:3000/patient-portal', name: 'clean_01_patient_portal_no_switcher.png' },
    { url: 'http://localhost:3000/patient-portal/login', name: 'auth_01_patient_login.png' },
    { url: 'http://localhost:3000/patient-portal/signup', name: 'auth_02_patient_signup.png' },
    { url: 'http://localhost:3000/doctor-portal/login', name: 'auth_03_doctor_login.png' },
    { url: 'http://localhost:3000/doctor-portal/signup', name: 'auth_04_doctor_signup_r2.png' },
    { url: 'http://localhost:3000/admin-portal/login', name: 'auth_05_admin_login.png' },
    { url: 'http://localhost:3000/admin-portal/signup', name: 'auth_06_admin_signup.png' },
    { url: 'http://localhost:3000/login', name: 'auth_07_unified_login_gateway.png' },
  ];

  for (const item of routes) {
    console.log(`Navigating to ${item.url}...`);
    try {
      await page.goto(item.url, { waitUntil: 'networkidle2', timeout: 15000 });
      await new Promise(r => setTimeout(r, 600));
      const filePath = path.join(screenshotDir, item.name);
      await page.screenshot({ path: filePath, fullPage: false });
      console.log(`Captured ${item.name}`);
    } catch (err) {
      console.error(`Failed to capture ${item.name}:`, err.message);
    }
  }

  await browser.close();
  console.log('Finished capturing all auth & clean screenshots!');
}

capture();

