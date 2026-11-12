const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to http://localhost:3000/patient-portal...');
  await page.goto('http://localhost:3000/patient-portal', { waitUntil: 'networkidle2' });

  // Let the BlurText animation run
  await new Promise(r => setTimeout(r, 600));

  const screenshotPathMid = 'C:/Users/thanz/.gemini/antigravity/brain/6b399ae1-5295-416c-a628-20f486388a6a/test_blurtext_mid_animation.png';
  await page.screenshot({ path: screenshotPathMid, fullPage: false });
  console.log('Mid animation screenshot saved to', screenshotPathMid);

  // Wait for animation to fully settle
  await new Promise(r => setTimeout(r, 1200));

  const screenshotPathSettled = 'C:/Users/thanz/.gemini/antigravity/brain/6b399ae1-5295-416c-a628-20f486388a6a/test_blurtext_hero_settled.png';
  await page.screenshot({ path: screenshotPathSettled, fullPage: false });
  console.log('Settled screenshot saved to', screenshotPathSettled);

  // Check the text content of the h1 BlurText element
  const h1Text = await page.evaluate(() => {
    const el = document.querySelector('.home-hero h1');
    return el ? el.innerText : null;
  });
  console.log('Hero H1 inner text:', JSON.stringify(h1Text));

  await browser.close();
  console.log('Verification complete!');
})();

