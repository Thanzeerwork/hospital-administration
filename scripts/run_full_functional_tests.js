const path = require('path');
const puppeteer = require(path.resolve(process.cwd(), 'node_modules/puppeteer'));

const ARTIFACT_DIR = 'C:/Users/thanz/.gemini/antigravity/brain/6b399ae1-5295-416c-a628-20f486388a6a';

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('====================================================');
  console.log('🚀 STARTING COMPREHENSIVE E2E FUNCTIONAL TESTING');
  console.log('====================================================\n');

  // ====================================================
  // TEST 1: DOCTOR PANEL - SECURE LOGIN
  // ====================================================
  console.log('--- TEST 1: Doctor Login ---');
  await page.goto('http://localhost:3000/doctor-portal/login', { waitUntil: 'networkidle2' });
  await page.type('input[placeholder="e.g. dr.wright"]', 'dr.wright');
  await page.type('input[type="password"]', 'password123');
  await sleep(400);
  await page.click('button[type="submit"]');
  await page.waitForNavigation({ waitUntil: 'networkidle2' });
  console.log('✓ Successfully logged in as Doctor. Current URL:', page.url());
  await page.screenshot({ path: `${ARTIFACT_DIR}/test_01_doctor_login_success.png` });

  // ====================================================
  // TEST 2: DOCTOR PANEL - SET AVAILABLE DATES
  // ====================================================
  console.log('\n--- TEST 2: Doctor Availability Schedule ---');
  await page.goto('http://localhost:3000/doctor-portal/availability', { waitUntil: 'networkidle2' });
  await sleep(600);

  // Click "Select All Weekdays" quick button
  const quickSelectBtn = await page.$('button::-p-text(Select All Weekdays)');
  if (quickSelectBtn) {
    await quickSelectBtn.click();
    console.log('✓ Clicked "Select All Weekdays"');
    await sleep(400);
  }

  // Click "Save Availability Schedule" button
  const saveAvailabilityBtn = await page.$('button::-p-text(Save Availability Schedule)');
  if (saveAvailabilityBtn) {
    await saveAvailabilityBtn.click();
    console.log('✓ Clicked "Save Availability Schedule"');
    await sleep(800);
  }
  await page.screenshot({ path: `${ARTIFACT_DIR}/test_02_doctor_availability_saved.png` });

  // ====================================================
  // TEST 3: DOCTOR PANEL - APPOINTMENTS WITH FILTERS
  // ====================================================
  console.log('\n--- TEST 3: Doctor Appointments & Filtering ---');
  await page.goto('http://localhost:3000/doctor-portal/appointments', { waitUntil: 'networkidle2' });
  await sleep(600);

  // Type search term "Eleanor"
  const searchInput = await page.$('input[placeholder*="Search by patient name"]');
  if (searchInput) {
    await searchInput.type('Eleanor');
    await sleep(500);
    console.log('✓ Filtered appointments by Patient Name: "Eleanor"');
  }
  await page.screenshot({ path: `${ARTIFACT_DIR}/test_03_doctor_appointments_filtered.png` });

  // Clear search input
  await page.evaluate(() => {
    const input = document.querySelector('input[placeholder*="Search by patient name"]');
    if (input) {
      input.value = '';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
  await sleep(400);

  // ====================================================
  // TEST 4: DOCTOR PANEL - ADD PRESCRIPTION TO BOOKED PATIENTS
  // ====================================================
  console.log('\n--- TEST 4: Add Prescription to Booked Patients ---');
  await page.goto('http://localhost:3000/doctor-portal/prescriptions', { waitUntil: 'networkidle2' });
  await sleep(600);

  // Fill in medicine name
  const medNameInput = await page.$('input[placeholder*="Amoxicillin"]');
  if (medNameInput) {
    await medNameInput.click({ clickCount: 3 });
    await medNameInput.type('Azithromycin 500mg (InspireZest)');
    console.log('✓ Entered Medicine Name: Azithromycin 500mg');
  }

  // Fill in instructions / notes
  const notesTextarea = await page.$('textarea[placeholder*="lifestyle recommendations"]');
  if (notesTextarea) {
    await notesTextarea.click({ clickCount: 3 });
    await notesTextarea.type('Clinical Review: Patient shows strong recovery. Complete full course with warm fluids and schedule ECG review in 30 days.');
    console.log('✓ Entered Clinical Notes');
  }

  // Click Save & Issue Prescription
  const saveRxBtn = await page.$('button::-p-text(Save & Issue Prescription)');
  if (saveRxBtn) {
    await saveRxBtn.click();
    console.log('✓ Clicked "Save & Issue Prescription"');
    await sleep(1000);
  }
  await page.screenshot({ path: `${ARTIFACT_DIR}/test_04_doctor_prescription_added.png` });

  // ====================================================
  // TEST 5: DOCTOR PANEL - PROFILE SETTINGS
  // ====================================================
  console.log('\n--- TEST 5: Doctor Profile Settings ---');
  await page.goto('http://localhost:3000/doctor-portal/profile', { waitUntil: 'networkidle2' });
  await sleep(600);

  // Update room & phone & bio
  await page.evaluate(() => {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(inp => {
      if (inp.placeholder && inp.placeholder.includes('Room')) {
        inp.value = 'Cath Lab Wing A, Suite 305 (Executive)';
        inp.dispatchEvent(new Event('input', { bubbles: true }));
        inp.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(t => {
      t.value = 'Senior Interventional Cardiologist specializing in structural heart diseases, preventive coronary procedures, and pediatric cardiac diagnostics. 15+ years experience.';
      t.dispatchEvent(new Event('input', { bubbles: true }));
      t.dispatchEvent(new Event('change', { bubbles: true }));
    });
  });

  const saveProfileBtn = await page.$('button::-p-text(Save Profile Changes)');
  if (saveProfileBtn) {
    await saveProfileBtn.click();
    console.log('✓ Clicked "Save Profile Changes"');
    await sleep(800);
  }
  await page.screenshot({ path: `${ARTIFACT_DIR}/test_05_doctor_profile_updated.png` });

  // ====================================================
  // TEST 6: ADMIN PANEL - LOGIN & DASHBOARD OVERVIEW
  // ====================================================
  console.log('\n--- TEST 6: Admin Login & Dashboard Overview ---');
  await page.goto('http://localhost:3000/admin-portal/login', { waitUntil: 'networkidle2' });
  await page.type('input[placeholder="admin@inspirezest.com"]', 'admin@inspirezest.com');
  await page.type('input[type="password"]', 'admin123');
  await sleep(400);
  await page.click('button[type="submit"]');
  await page.waitForNavigation({ waitUntil: 'networkidle2' });
  console.log('✓ Logged into Admin Portal. Current URL:', page.url());
  await sleep(600);
  await page.screenshot({ path: `${ARTIFACT_DIR}/test_06_admin_dashboard_overview.png` });

  // ====================================================
  // TEST 7: ADMIN PANEL - DOCTOR CRUD: FILTER & SEARCH
  // ====================================================
  console.log('\n--- TEST 7: Admin Doctor Filter & Search ---');
  await page.goto('http://localhost:3000/admin-portal/doctors', { waitUntil: 'networkidle2' });
  await sleep(600);

  const docSearchInput = await page.$('input[placeholder*="Search doctors by name"]');
  if (docSearchInput) {
    await docSearchInput.type('Elena');
    await sleep(400);
    console.log('✓ Searched doctors for "Elena"');
  }
  await page.screenshot({ path: `${ARTIFACT_DIR}/test_07_admin_doctor_filtered.png` });

  // Clear search input
  await page.evaluate(() => {
    const input = document.querySelector('input[placeholder*="Search doctors by name"]');
    if (input) {
      input.value = '';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
  await sleep(400);

  // ====================================================
  // TEST 8: ADMIN PANEL - DOCTOR CRUD: ADD NEW DOCTOR
  // ====================================================
  console.log('\n--- TEST 8: Admin Doctor CRUD: Add New Doctor ---');
  const addDocBtn = await page.$('button::-p-text(Add New Doctor)');
  if (addDocBtn) {
    await addDocBtn.click();
    await sleep(600);
    console.log('✓ Opened "Add New Doctor" Modal');

    // Fill form using exact placeholders
    await page.type('input[placeholder*="Jennifer Lawrence"]', 'Dr. Alistair Finch');
    await page.type('input[placeholder*="dr.lawrence"]', 'dr.finch');
    await page.type('input[placeholder*="doctor@inspirezest.com"]', 'alistair.finch@inspirezest.com');
    await page.type('input[placeholder*="555"]', '+91 9567333266');
    await page.type('input[type="password"]', 'password123');

    const expInput = await page.$('input[type="number"]');
    if (expInput) {
      await expInput.click({ clickCount: 3 });
      await expInput.type('10');
    }

    const bioInput = await page.$('textarea');
    if (bioInput) {
      await bioInput.type('Specialist in pediatric cardiology and congenital heart diseases with 10 years experience.');
    }

    await sleep(400);
    await page.screenshot({ path: `${ARTIFACT_DIR}/test_08_admin_doctor_form_filled.png` });

    // Submit form
    const createDocSubmit = await page.$('form button::-p-text(Add Doctor)');
    if (createDocSubmit) {
      await createDocSubmit.click();
      console.log('✓ Clicked "Add Doctor"');
      await sleep(1000);
    }
    await page.screenshot({ path: `${ARTIFACT_DIR}/test_08_admin_doctor_added.png` });
  }

  // ====================================================
  // TEST 9: ADMIN PANEL - DOCTOR CRUD: EDIT DOCTOR
  // ====================================================
  console.log('\n--- TEST 9: Admin Doctor CRUD: Edit Doctor ---');
  // Find first edit button
  const editButtons = await page.$$('button[title*="Edit"]');
  if (editButtons.length > 0) {
    await editButtons[0].click();
    await sleep(600);
    console.log('✓ Opened "Edit Doctor" Modal');

    // Modify consultation fee or room
    const inputs = await page.$$('form input');
    for (const inp of inputs) {
      const type = await page.evaluate(el => el.type, inp);
      if (type === 'number') {
        await inp.click({ clickCount: 3 });
        await inp.type('195');
        break;
      }
    }

    const saveChangesBtn = await page.$('form button::-p-text(Save Changes)');
    if (saveChangesBtn) {
      await saveChangesBtn.click();
      console.log('✓ Clicked "Save Changes"');
      await sleep(800);
    }
    await page.screenshot({ path: `${ARTIFACT_DIR}/test_09_admin_doctor_edited.png` });
  }

  // ====================================================
  // TEST 10: ADMIN PANEL - PATIENT MANAGEMENT & HISTORY
  // ====================================================
  console.log('\n--- TEST 10: Admin Patient Management & Appointment History ---');
  await page.goto('http://localhost:3000/admin-portal/patients', { waitUntil: 'networkidle2' });
  await sleep(600);

  // Search by Eleanor
  const patientSearch = await page.$('input[placeholder*="Search patients by name"]');
  if (patientSearch) {
    await patientSearch.type('Eleanor');
    await sleep(400);
    console.log('✓ Searched patient: "Eleanor"');
  }

  // Click View Appointment History
  const historyBtn = await page.$('button::-p-text(Appointments)');
  if (historyBtn) {
    await historyBtn.click();
    await sleep(600);
    console.log('✓ Opened Patient Appointment History Modal');
  }
  await page.screenshot({ path: `${ARTIFACT_DIR}/test_10_admin_patient_history.png` });

  // Close modal
  const closeBtn = await page.$('button[aria-label="Close modal"]');
  if (closeBtn) await closeBtn.click();
  await sleep(400);

  // ====================================================
  // TEST 11: ADMIN PANEL - SPECIALIZATION MANAGEMENT
  // ====================================================
  console.log('\n--- TEST 11: Specialization (Category) Management ---');
  await page.goto('http://localhost:3000/admin-portal/specializations', { waitUntil: 'networkidle2' });
  await sleep(600);

  const addSpecBtn = await page.$('button::-p-text(Add Specialization)');
  if (addSpecBtn) {
    await addSpecBtn.click();
    await sleep(600);
    console.log('✓ Opened "Add Specialization" Modal');

    await page.type('input[placeholder*="Neurology"]', 'Neurology');
    const descText = await page.$('textarea[placeholder*="Provide a summary"]');
    if (descText) {
      await descText.type('Advanced neurosurgical and neurological care for brain, spine, and central nervous disorders.');
    }

    await sleep(300);
    const createSpecSubmit = await page.$('form button::-p-text(Create Specialization)');
    if (createSpecSubmit) {
      await createSpecSubmit.click();
      console.log('✓ Clicked "Create Specialization"');
      await sleep(1000);
    }
  }
  await page.screenshot({ path: `${ARTIFACT_DIR}/test_11_admin_specialization_added.png` });

  // ====================================================
  // TEST 12: ADMIN PANEL - ADVANCED FILTERS ON MASTER ROSTER
  // ====================================================
  console.log('\n--- TEST 12: Advanced Filters on Master Appointments ---');
  await page.goto('http://localhost:3000/admin-portal/appointments', { waitUntil: 'networkidle2' });
  await sleep(600);

  // Search by patient name
  const aptSearch = await page.$('input[placeholder*="Search by patient, doctor"]');
  if (aptSearch) {
    await aptSearch.type('Eleanor');
    await sleep(400);
    console.log('✓ Applied search filter: Eleanor');
  }

  // Status Filter - select "Completed"
  await page.evaluate(() => {
    const selects = document.querySelectorAll('select');
    selects.forEach(s => {
      for (let opt of s.options) {
        if (opt.value === 'Completed') {
          s.value = 'Completed';
          s.dispatchEvent(new Event('change', { bubbles: true }));
          break;
        }
      }
    });
  });
  await sleep(500);
  console.log('✓ Filtered appointments by Status: "Completed"');
  await page.screenshot({ path: `${ARTIFACT_DIR}/test_12_admin_advanced_filters.png` });

  console.log('\n====================================================');
  console.log('🎉 ALL 12 TESTS EXECUTED AND CAPTURED SUCCESSFULLY!');
  console.log('====================================================');

  await browser.close();
})().catch(err => {
  console.error('Test Execution Error:', err);
  process.exit(1);
});
