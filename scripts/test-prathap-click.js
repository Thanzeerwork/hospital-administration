const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to http://localhost:3000/ ...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));

  // Find the Dr. N Prathap Kumar card and click "Profile"
  console.log('Looking for Dr. N Prathap Kumar card...');
  const profileButtons = await page.$$('button');
  let clicked = false;
  
  for (const btn of profileButtons) {
    const text = await (await btn.getProperty('textContent')).jsonValue();
    if (text.trim() === 'Profile') {
      // Check if inside or near Prathap Kumar card
      const parentText = await page.evaluate(el => el.closest('.group')?.innerText || '', btn);
      if (parentText.includes('Prathap Kumar')) {
        console.log('Found Profile button for Dr. N Prathap Kumar! Clicking...');
        await btn.click();
        clicked = true;
        break;
      }
    }
  }

  if (!clicked) {
    console.error('Could not find Profile button for Dr. N Prathap Kumar');
  }

  await new Promise(r => setTimeout(r, 1500));

  // Take screenshot
  const screenshotPath = 'C:/Users/thanz/.gemini/antigravity/brain/6b399ae1-5295-416c-a628-20f486388a6a/test_prathap_profile_fixed.png';
  await page.screenshot({ path: screenshotPath, fullPage: false });
  console.log(`Saved screenshot to: ${screenshotPath}`);

  await browser.close();
  console.log('Done!');
})();

