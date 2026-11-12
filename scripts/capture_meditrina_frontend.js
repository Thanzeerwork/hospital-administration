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

  console.log('Navigating to http://localhost:3000/patient-portal ...');
  await page.goto('http://localhost:3000/patient-portal', { waitUntil: 'networkidle2', timeout: 15000 });
  await new Promise(r => setTimeout(r, 1200));

  // 1. Hero & Top Navigation with Essential Floating Cards
  await page.screenshot({
    path: path.join(screenshotDir, 'meditrina_01_hero_and_quick_actions.png'),
    fullPage: false,
  });
  console.log('Captured meditrina_01_hero_and_quick_actions.png');

  // 2. Quick Triage Appointment Widget & About Meditrina
  await page.evaluate(() => {
    const el = document.querySelector('form');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({
    path: path.join(screenshotDir, 'meditrina_02_triage_and_about.png'),
    fullPage: false,
  });
  console.log('Captured meditrina_02_triage_and_about.png');

  // 3. Specialties & Health Packages
  await page.evaluate(() => {
    const el = document.getElementById('specialties');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({
    path: path.join(screenshotDir, 'meditrina_03_specialties_and_packages.png'),
    fullPage: false,
  });
  console.log('Captured meditrina_03_specialties_and_packages.png');

  // 4. Facilities, Testimonials & Hospital Branches
  await page.evaluate(() => {
    const el = document.getElementById('facilities');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({
    path: path.join(screenshotDir, 'meditrina_04_facilities_and_testimonials.png'),
    fullPage: false,
  });
  console.log('Captured meditrina_04_facilities_and_testimonials.png');

  // 5. Complete Full Page Screenshot
  await page.screenshot({
    path: path.join(screenshotDir, 'meditrina_05_full_page_overview.png'),
    fullPage: true,
  });
  console.log('Captured meditrina_05_full_page_overview.png');

  await browser.close();
  console.log('Finished capturing all Meditrina Hospital screenshots!');
}

capture();
