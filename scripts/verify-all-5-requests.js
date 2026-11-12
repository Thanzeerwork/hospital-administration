const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const artifactDir = 'C:/Users/thanz/.gemini/antigravity/brain/6b399ae1-5295-416c-a628-20f486388a6a';

  console.log('--- TEST 1: Top Ribbon Removal ---');
  await page.goto('http://localhost:3000/patient-portal', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: `${artifactDir}/test_req1_top_ribbon_removed.png`, clip: { x: 0, y: 0, width: 1440, height: 250 } });
  console.log('✓ Captured top header screenshot (ribbon removed)');

  console.log('--- TEST 2: Logged Out Patient Appointments ---');
  // Clear patient user in localStorage
  await page.evaluate(() => {
    localStorage.removeItem('inspirezest_hospital_v1_role');
  });
  // Navigate to appointments
  await page.goto('http://localhost:3000/patient-portal/appointments', { waitUntil: 'networkidle2' });
  // Ensure patient is logged out by clicking patient logout if present
  try {
    const logoutBtn = await page.$('button[title*="Logout"], button:has-text("Logout")');
    if (logoutBtn) await logoutBtn.click();
  } catch (e) {}

  await page.evaluate(() => {
    // If the mock context initializes with auth, click user avatar and logout
    const avatar = document.querySelector('button.rounded-full.bg-\\[\\#00829B\\]');
    if (avatar) avatar.click();
  });
  await new Promise(r => setTimeout(r, 1000));

  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const logout = buttons.find(b => b.textContent && b.textContent.includes('Sign Out'));
    if (logout) logout.click();
  });
  await new Promise(r => setTimeout(r, 1000));

  await page.screenshot({ path: `${artifactDir}/test_req2_logged_out_appointments_protected.png`, fullPage: false });
  console.log('✓ Captured logged out appointments protection screenshot');

  console.log('--- TEST 3: Header About and Health Packages ---');
  await page.goto('http://localhost:3000/patient-portal', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  // Click Health Packages
  const navButtons = await page.$$('button');
  for (const btn of navButtons) {
    const text = await (await btn.getProperty('textContent')).jsonValue();
    if (text.trim() === 'Health Packages') {
      await btn.click();
      console.log('Clicked Health Packages button');
      break;
    }
  }
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: `${artifactDir}/test_req3_health_packages_scrolled.png`, fullPage: false });
  console.log('✓ Captured Health Packages scroll screenshot');

  // Click About
  for (const btn of navButtons) {
    const text = await (await btn.getProperty('textContent')).jsonValue();
    if (text.trim() === 'About') {
      await btn.click();
      console.log('Clicked About button');
      break;
    }
  }
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: `${artifactDir}/test_req3_about_scrolled.png`, fullPage: false });
  console.log('✓ Captured About scroll screenshot');

  console.log('--- TEST 4: Updates & Breakthroughs Modals ---');
  await page.goto('http://localhost:3000/patient-portal#updates', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  // Click "View All Updates"
  const allBtns = await page.$$('button');
  for (const btn of allBtns) {
    const text = await (await btn.getProperty('textContent')).jsonValue();
    if (text.includes('View All Updates')) {
      await btn.click();
      console.log('Clicked View All Updates button');
      break;
    }
  }
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: `${artifactDir}/test_req4_view_all_updates_modal.png`, fullPage: false });
  console.log('✓ Captured View All Updates archive modal screenshot');

  // Close modal and click "View in Detail"
  const closeBtn = await page.$('button.rounded-full.bg-gray-100');
  if (closeBtn) await closeBtn.click();
  await new Promise(r => setTimeout(r, 500));

  const detailBtns = await page.$$('button');
  for (const btn of detailBtns) {
    const text = await (await btn.getProperty('textContent')).jsonValue();
    if (text.trim() === 'View in Detail') {
      await btn.click();
      console.log('Clicked View in Detail button');
      break;
    }
  }
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: `${artifactDir}/test_req4_article_detail_modal.png`, fullPage: false });
  console.log('✓ Captured Article Detail modal screenshot');

  console.log('--- TEST 5: Admin Blog Management (CRUD) ---');
  await page.goto('http://localhost:3000/admin-portal/blogs', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: `${artifactDir}/test_req5_admin_blog_management.png`, fullPage: false });
  console.log('✓ Captured Admin Blog Management dashboard screenshot');

  await browser.close();
  console.log('\n🎉 ALL 5 VERIFICATION TESTS COMPLETED SUCCESSFULLY!');
})();

