const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const artifactDir = 'C:/Users/thanz/.gemini/antigravity/brain/6b399ae1-5295-416c-a628-20f486388a6a';

  console.log('Navigating to http://localhost:3000/patient-portal ...');
  await page.goto('http://localhost:3000/patient-portal', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  // Explicitly set patient logged out in localStorage
  await page.evaluate(() => {
    localStorage.setItem('inspirezest_hospital_v1_patient_auth', 'false');
    localStorage.removeItem('inspirezest_hospital_v1_patient_user');
  });

  console.log('Navigating to http://localhost:3000/patient-portal/appointments ...');
  await page.goto('http://localhost:3000/patient-portal/appointments', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));

  const screenshotPath = `${artifactDir}/test_req2_logged_out_appointments_protected.png`;
  await page.screenshot({ path: screenshotPath, fullPage: false });
  console.log(`Saved screenshot to: ${screenshotPath}`);

  // Also verify clicking "Health Packages" and "About" in header
  console.log('Testing Header links...');
  await page.goto('http://localhost:3000/patient-portal', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  // Click Health Packages
  const buttons = await page.$$('button');
  for (const b of buttons) {
    const text = await (await b.getProperty('textContent')).jsonValue();
    if (text.trim() === 'Health Packages') {
      await b.click();
      console.log('Clicked Health Packages');
      break;
    }
  }
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: `${artifactDir}/test_req3_health_packages_scrolled.png`, fullPage: false });

  // Click About
  const buttons2 = await page.$$('button');
  for (const b of buttons2) {
    const text = await (await b.getProperty('textContent')).jsonValue();
    if (text.trim() === 'About') {
      await b.click();
      console.log('Clicked About');
      break;
    }
  }
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: `${artifactDir}/test_req3_about_scrolled.png`, fullPage: false });

  await browser.close();
  console.log('Done!');
})();

