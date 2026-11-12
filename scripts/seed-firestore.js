const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');
const https = require('https');

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyACOEzgg7HXr05sWCVYNC-DSuWNO70HsuU",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "hospitaladministration-41b48.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "hospitaladministration-41b48",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "hospitaladministration-41b48.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "546800743524",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:546800743524:web:040f5a69e82ec9ca951b71",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-684GETQ5FF"
};

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function seed() {
  console.log('Connecting to Firebase Firestore (project: hospitaladministration-41b48)...');
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  console.log('Fetching live Cloudflare R2 datasets...');
  const specs = await fetchJson('https://pub-f6697a3e2acd4048a86b5ed54d969979.r2.dev/data/specializations.json');
  const doctors = await fetchJson('https://pub-f6697a3e2acd4048a86b5ed54d969979.r2.dev/data/doctors.json');
  const patients = await fetchJson('https://pub-f6697a3e2acd4048a86b5ed54d969979.r2.dev/data/patients.json');
  const appointments = await fetchJson('https://pub-f6697a3e2acd4048a86b5ed54d969979.r2.dev/data/appointments.json');

  console.log(`\nSeeding ${specs.length} Specializations to Firestore...`);
  for (const s of specs) {
    await setDoc(doc(db, 'specializations', s.id), s, { merge: true });
    console.log(`✓ Seeded Specialization: ${s.name} (${s.id})`);
  }

  console.log(`\nSeeding ${doctors.length} Doctors to Firestore...`);
  for (const d of doctors) {
    await setDoc(doc(db, 'doctors', d.id), d, { merge: true });
    console.log(`✓ Seeded Doctor: ${d.name} (${d.id})`);
  }

  console.log(`\nSeeding ${patients.length} Patients to Firestore...`);
  for (const p of patients) {
    await setDoc(doc(db, 'patients', p.id), p, { merge: true });
    console.log(`✓ Seeded Patient: ${p.name} (${p.id})`);
  }

  console.log(`\nSeeding ${appointments.length} Appointments to Firestore...`);
  for (const a of appointments) {
    await setDoc(doc(db, 'appointments', a.id), a, { merge: true });
    console.log(`✓ Seeded Appointment: ${a.id} (${a.patientName} -> ${a.doctorName})`);
    if (a.prescription) {
      await setDoc(doc(db, 'prescriptions', a.prescription.id), a.prescription, { merge: true });
      console.log(`  ✓ Seeded Linked Prescription: ${a.prescription.id}`);
    }
  }

  console.log('\n🎉 ALL COLLECTIONS SUCCESSFULLY SEEDED TO GOOGLE FIREBASE FIRESTORE!');
}

seed().catch(err => {
  console.error('\n⚠️ Firestore Seeding Note:');
  console.error(err.message);
  if (err.code === 'permission-denied') {
    console.error('\nNOTE: Firestore Security Rules on project "hospitaladministration-41b48" currently restrict writes.');
    console.error('Please visit Firebase Console -> Firestore Database -> Rules and set:');
    console.error('allow read, write: if true;');
    console.error('Then re-run: npm run seed:firestore');
  }
  process.exit(1);
});

