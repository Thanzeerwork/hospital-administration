const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/patient-portal#about', { waitUntil: 'networkidle2' });
  await page.evaluate(() => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: 'C:/Users/thanz/.gemini/antigravity/brain/6b399ae1-5295-416c-a628-20f486388a6a/verify_built_for_people_slide0.png' });

  // Click Next Slide button
  const nextBtn = await page.$('button[aria-label="Next slide"]');
  if (nextBtn) {
    await nextBtn.click();
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: 'C:/Users/thanz/.gemini/antigravity/brain/6b399ae1-5295-416c-a628-20f486388a6a/verify_built_for_people_slide1.png' });
  }
  await browser.close();
  console.log('Screenshots taken');
})();

