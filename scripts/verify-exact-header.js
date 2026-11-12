const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to http://localhost:3000/patient-portal...');
  await page.goto('http://localhost:3000/patient-portal', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));

  // 1. Capture exact top header region on hero
  const headerElem = await page.$('header');
  if (headerElem) {
    await headerElem.screenshot({
      path: 'C:/Users/thanz/.gemini/antigravity/brain/6b399ae1-5295-416c-a628-20f486388a6a/test_header_exact_crop.png'
    });
    console.log('Saved test_header_exact_crop.png');
  }

  // 2. Full viewport hero screenshot
  await page.screenshot({
    path: 'C:/Users/thanz/.gemini/antigravity/brain/6b399ae1-5295-416c-a628-20f486388a6a/test_header_hero_full.png',
    fullPage: false
  });
  console.log('Saved test_header_hero_full.png');

  // 3. Scroll down to test sticky white header
  await page.evaluate(() => window.scrollBy(0, 300));
  await new Promise(r => setTimeout(r, 600));
  if (headerElem) {
    await headerElem.screenshot({
      path: 'C:/Users/thanz/.gemini/antigravity/brain/6b399ae1-5295-416c-a628-20f486388a6a/test_header_scrolled_white.png'
    });
    console.log('Saved test_header_scrolled_white.png');
  }

  await browser.close();
  console.log('All header verification screenshots complete!');
})();

