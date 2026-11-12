const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function capture() {
  const outputDir = path.resolve(__dirname, '../public/screenshots');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: { width: 1440, height: 960 },
  });

  const page = await browser.newPage();

  console.log('Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 1000));

  // Helper to click by text
  const clickByText = async (text, tag = 'button') => {
    return page.evaluate((t, elTag) => {
      const elements = Array.from(document.querySelectorAll(elTag));
      const match = elements.find((el) => el.textContent.includes(t));
      if (match) {
        match.click();
        return true;
      }
      return false;
    }, text, tag);
  };

  // 1. Patient Portal Home
  console.log('Capturing 01_patient_portal_home.png ...');
  await page.screenshot({ path: path.join(outputDir, '01_patient_portal_home.png') });

  // 2. Doctor Listing
  console.log('Navigating to Find Doctors...');
  await clickByText('Find Doctors');
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outputDir, '02_doctor_listing.png') });

  // 3. Doctor Profile Modal
  console.log('Opening Doctor Profile modal...');
  await clickByText('View Profile');
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outputDir, '03_doctor_profile_modal.png') });

  // 4. Booking Modal
  console.log('Opening Booking Modal...');
  await clickByText('Book Appointment Now');
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outputDir, '04_appointment_booking_modal.png') });

  // Close modal
  const closeBtn = await page.$('button[aria-label="Close modal"]');
  if (closeBtn) await closeBtn.click();
  await new Promise((r) => setTimeout(r, 400));

  // 5. My Appointments
  console.log('Navigating to My Appointments...');
  await clickByText('My Appointments');
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outputDir, '05_my_appointments.png') });

  // 6. View Prescription Modal
  console.log('Opening Prescription Viewer...');
  await clickByText('View Prescription');
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outputDir, '06_prescription_viewer.png') });

  // Close prescription modal
  const closeRxBtn = await page.$('button[aria-label="Close modal"]');
  if (closeRxBtn) await closeRxBtn.click();
  await new Promise((r) => setTimeout(r, 400));

  // 7. Doctor Portal
  console.log('Switching to Doctor Portal...');
  await clickByText('Doctor Portal');
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outputDir, '07_doctor_dashboard.png') });

  // 8. Doctor Availability Calendar
  console.log('Doctor Availability Schedule...');
  await clickByText('Availability Schedule');
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outputDir, '08_doctor_availability_calendar.png') });

  // 9. Doctor Prescription Entry
  console.log('Doctor Prescription Entry...');
  await clickByText('Prescription Entry');
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outputDir, '09_doctor_prescription_entry.png') });

  // 10. Admin Portal Dashboard
  console.log('Switching to Admin Portal...');
  await clickByText('Admin Portal');
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outputDir, '10_admin_dashboard.png') });

  // 11. Admin Doctor Management
  console.log('Admin Doctor Management...');
  await clickByText('Doctor Management');
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outputDir, '11_admin_doctor_management.png') });

  // 12. Admin Patient Management
  console.log('Admin Patient Management...');
  await clickByText('Patient Management');
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outputDir, '12_admin_patient_management.png') });

  // 13. Admin Specializations
  console.log('Admin Specializations...');
  await clickByText('Specializations');
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outputDir, '13_admin_specializations.png') });

  // 14. Admin Appointments Master
  console.log('Admin Appointments Master...');
  await clickByText('Appointments Master');
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outputDir, '14_admin_appointments_master.png') });

  await browser.close();
  console.log('All 14 complete portal screenshots captured successfully in public/screenshots/!');
}

capture().catch((err) => {
  console.error('Error capturing screenshots:', err);
  process.exit(1);
});
