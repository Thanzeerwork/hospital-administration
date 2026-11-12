const puppeteer = require('puppeteer');
const path = require('path');

async function captureRealHospital() {
  const outputDir = path.resolve(__dirname, '../public/screenshots');
  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: { width: 1440, height: 1100 },
  });

  const page = await browser.newPage();
  console.log('Navigating to http://localhost:3000/patient-portal ...');
  await page.goto('http://localhost:3000/patient-portal', { waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 1000));

  console.log('Capturing real hospital patient portal...');
  await page.screenshot({ path: path.join(outputDir, '01_patient_portal_home_real_hospital.png'), fullPage: false });

  // Scroll to footer and capture
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outputDir, '01_patient_portal_footer.png'), fullPage: false });

  await browser.close();
  console.log('Captured!');
}

captureRealHospital().catch(console.error);

