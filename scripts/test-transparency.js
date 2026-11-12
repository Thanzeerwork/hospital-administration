const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 900, height: 450 });

  const logoDark = fs.readFileSync('public/images/inspirezest-logo-transparent.png').toString('base64');
  const logoLight = fs.readFileSync('public/images/inspirezest-logo-light.png').toString('base64');

  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <body style="margin: 0; padding: 24px; font-family: sans-serif; background: #0f172a; display: flex; flex-direction: column; gap: 24px;">
        <div style="background: #111111; padding: 24px 32px; border-radius: 12px; display: flex; align-items: center; justify-content: space-between;">
          <span style="color: #888; font-size: 13px;">Dark Background (Light Logo):</span>
          <img src="data:image/png;base64,${logoLight}" style="height: 52px;" alt="On Dark" />
        </div>
        <div style="background: #ffffff; padding: 24px 32px; border-radius: 12px; display: flex; align-items: center; justify-content: space-between;">
          <span style="color: #888; font-size: 13px;">White Background (Original Transparent):</span>
          <img src="data:image/png;base64,${logoDark}" style="height: 52px;" alt="On White" />
        </div>
        <div style="background: linear-gradient(180deg, #182830 0%, #2b3e48 100%); padding: 24px 32px; border-radius: 12px; display: flex; align-items: center; justify-content: space-between;">
          <span style="color: #888; font-size: 13px;">Sunset Sky (Light Logo):</span>
          <img src="data:image/png;base64,${logoLight}" style="height: 52px;" alt="On Sunset Sky" />
        </div>
      </body>
    </html>
  `);

  await page.screenshot({
    path: 'C:/Users/thanz/.gemini/antigravity/brain/6b399ae1-5295-416c-a628-20f486388a6a/test_both_variants.png'
  });

  await browser.close();
  console.log('Saved test_both_variants.png');
})();
