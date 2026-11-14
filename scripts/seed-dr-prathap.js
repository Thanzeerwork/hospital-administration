const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyACOEzgg7HXr05sWCVYNC-DSuWNO70HsuU",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "hospitaladministration-41b48.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "hospitaladministration-41b48",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "hospitaladministration-41b48.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "546800743524",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:546800743524:web:040f5a69e82ec9ca951b71",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-684GETQ5FF"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const getFutureDate = (daysFromNow) => {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().split('T')[0];
};

const prathapDoctor = {
  id: 'doc-prathap',
  name: 'Dr. N Prathap Kumar',
  specializationId: 'spec-cardiology',
  specializationName: 'Cardiology',
  experienceYears: 28,
  rating: 4.99,
  reviewCount: 342,
  profileImage: 'https://cdn.sanity.io/images/0xgev689/production/fd9f32234202abc3fc11098c1fee7804e1b6e9fa-403x442.png',
  bio: 'Chairman & Chief Interventional Cardiologist of InspireZest Group of Hospitals. Pioneer with over 28 years of clinical leadership and 16,000+ complex coronary angioplasties performed with exceptional clinical outcomes.',
  email: 'prathap.kumar@inspirezest.com',
  phone: '+91 9567333266',
  room: 'Chairman Suite, Executive Wing 501',
  username: 'dr.prathap',
  password: 'password123',
  availableDates: [
    getFutureDate(1),
    getFutureDate(2),
    getFutureDate(3),
    getFutureDate(5),
    getFutureDate(8),
    getFutureDate(10),
    getFutureDate(12),
    getFutureDate(15),
  ],
  timeSlots: ['09:00 AM', '10:30 AM', '11:45 AM', '02:00 PM', '03:30 PM'],
  consultationFee: 200,
};

async function run() {
  await setDoc(doc(db, 'doctors', prathapDoctor.id), prathapDoctor, { merge: true });
  console.log('Successfully seeded Dr. N Prathap Kumar to Firestore collection "doctors"!');
}

run().catch(console.error);

