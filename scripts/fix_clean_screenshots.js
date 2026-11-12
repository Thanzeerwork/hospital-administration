const puppeteer = require('puppeteer');
const path = require('path');

async function fixScreenshots() {
  const outputDir = path.resolve(__dirname, '../public/screenshots');
  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: { width: 1440, height: 960 },
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 600));

  // Helper
  const clickText = async (text) => {
    await page.evaluate((t) => {
      const els = Array.from(document.querySelectorAll('button, a, span'));
      const found = els.find((el) => el.textContent.trim() === t || el.textContent.includes(t));
      if (found) found.click();
    }, text);
  };

  // 1. Switch to Doctor Portal
  await clickText('Doctor Portal');
  await new Promise((r) => setTimeout(r, 700));

  // Click Availability Schedule
  await clickText('Availability Schedule');
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outputDir, '08_doctor_availability_calendar.png') });

  // Click Prescription Entry
  await clickText('Prescription Entry');
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outputDir, '09_doctor_prescription_entry.png') });

  // 2. Switch to Admin Portal
  await clickText('Admin Portal');
  await new Promise((r) => setTimeout(r, 700));

  // Doctor Management
  await clickText('Doctor Management');
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outputDir, '11_admin_doctor_management.png') });

  // Patient Management
  await clickText('Patient Management');
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outputDir, '12_admin_patient_management.png') });

  // Specializations
  await clickText('Specializations');
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outputDir, '13_admin_specializations.png') });

  // Appointments Master
  await clickText('Appointments Master');
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outputDir, '14_admin_appointments_master.png') });

  await browser.close();
  console.log('Clean screenshots updated!');
}

fixScreenshots().catch(console.error);

