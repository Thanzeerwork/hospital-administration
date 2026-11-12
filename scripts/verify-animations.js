const puppeteer = require('puppeteer');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/thanz/.gemini/antigravity/brain/6b399ae1-5295-416c-a628-20f486388a6a';

async function verify() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to http://localhost:3000/patient-portal...');
  await page.goto('http://localhost:3000/patient-portal', { waitUntil: 'networkidle2' });

  // 1. Capture Hero Section with BlurText animation settled
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'verify_anim_1_hero.png') });
  console.log('Captured Hero');

  // 2. Scroll to Quick Search & What's New
  await page.evaluate(() => window.scrollBy({ top: 800, behavior: 'smooth' }));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'verify_anim_2_whatsnew.png') });
  console.log('Captured Quick Search & Whats New');

  // 3. Scroll to Advanced Specialities
  await page.evaluate(() => window.scrollBy({ top: 750, behavior: 'smooth' }));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'verify_anim_3_specialities.png') });
  console.log('Captured Specialities');

  // 4. Scroll to Facilities & Packages
  await page.evaluate(() => window.scrollBy({ top: 850, behavior: 'smooth' }));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'verify_anim_4_packages.png') });
  console.log('Captured Packages');

  // 5. Scroll to Philosophy (Built for People)
  await page.evaluate(() => window.scrollBy({ top: 950, behavior: 'smooth' }));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'verify_anim_5_philosophy.png') });
  console.log('Captured Philosophy');

  // 6. Scroll to Medical Leadership (Doctors)
  await page.evaluate(() => window.scrollBy({ top: 850, behavior: 'smooth' }));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'verify_anim_6_doctors.png') });
  console.log('Captured Doctors');

  // 7. Scroll to Testimonials & Updates
  await page.evaluate(() => window.scrollBy({ top: 850, behavior: 'smooth' }));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'verify_anim_7_testimonials.png') });
  console.log('Captured Testimonials & Updates');

  // 8. Scroll to Teal Banner & Network
  await page.evaluate(() => window.scrollBy({ top: 850, behavior: 'smooth' }));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'verify_anim_8_banner_network.png') });
  console.log('Captured Teal Banner & Network');

  await browser.close();
  console.log('Verification completed successfully!');
}

verify().catch(err => {
  console.error(err);
  process.exit(1);
});

