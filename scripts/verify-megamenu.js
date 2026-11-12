const puppeteer = require('puppeteer');
const path = require('path');

const ARTIFACTS_DIR = 'C:/Users/thanz/.gemini/antigravity/brain/6b399ae1-5295-416c-a628-20f486388a6a';

async function verifyMegaMenus() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1600, height: 950 });

    console.log('Navigating to http://localhost:3000/patient-portal...');
    await page.goto('http://localhost:3000/patient-portal', { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 1500));

    const menus = [
      { name: 'hospitals', label: 'Our Hospitals', file: 'verify_mega_hospitals.png' },
      { name: 'specialities', label: 'Specialities', file: 'verify_mega_specialities.png' },
      { name: 'about', label: 'About', file: 'verify_mega_about.png' },
      { name: 'resources', label: 'Resources', file: 'verify_mega_resources.png' }
    ];

    for (const menu of menus) {
      console.log(`Hovering on: ${menu.label}...`);
      
      // Find button by text
      const buttons = await page.$$('header nav button');
      let targetButton = null;
      for (const btn of buttons) {
        const text = await page.evaluate(el => el.textContent, btn);
        if (text && text.includes(menu.label)) {
          targetButton = btn;
          break;
        }
      }

      if (!targetButton) {
        console.error(`Could not find button for ${menu.label}`);
        continue;
      }

      await targetButton.hover();
      await new Promise(r => setTimeout(r, 600));

      const outPath = path.join(ARTIFACTS_DIR, menu.file);
      await page.screenshot({ path: outPath, clip: { x: 0, y: 0, width: 1600, height: 650 } });
      console.log(`Captured ${menu.file} successfully!`);
    }

    console.log('All mega menu screenshots captured!');
  } catch (err) {
    console.error('Error verifying mega menu:', err);
  } finally {
    await browser.close();
  }
}

verifyMegaMenus();

