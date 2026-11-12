const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 950 });

  await page.goto('http://localhost:3000/patient-portal', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));

  // 1. Screenshot header over hero background
  await page.screenshot({
    path: 'C:/Users/thanz/.gemini/antigravity/brain/6b399ae1-5295-416c-a628-20f486388a6a/live_header_transparent_logo.png',
    clip: { x: 0, y: 0, width: 1600, height: 160 }
  });

  // 2. Zoomed in on logo over hero
  const logoEl = await page.$('header a img');
  if (logoEl) {
    const box = await logoEl.boundingBox();
    await page.screenshot({
      path: 'C:/Users/thanz/.gemini/antigravity/brain/6b399ae1-5295-416c-a628-20f486388a6a/live_logo_zoomed_hero.png',
      clip: {
        x: Math.max(0, box.x - 20),
        y: Math.max(0, box.y - 20),
        width: box.width + 40,
        height: box.height + 40
      }
    });
  }

  // 3. Hover on 'Our Hospitals' to open mega menu and screenshot logo on white
  const buttons = await page.$$('header nav button');
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text && text.includes('Our Hospitals')) {
      await btn.hover();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({
    path: 'C:/Users/thanz/.gemini/antigravity/brain/6b399ae1-5295-416c-a628-20f486388a6a/live_logo_megamenu_white.png',
    clip: { x: 0, y: 0, width: 1600, height: 200 }
  });

  console.log('Live screenshots captured!');
  await browser.close();
})();

