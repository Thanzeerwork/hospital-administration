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

const blogs = [
  {
    id: 'blog-1',
    title: 'Your Liver Speaks Before Symptoms Do',
    category: 'Gastroenterology',
    tagColor: '#00829B',
    date: '10 November 2026',
    author: 'Dr. Rahul Menon, Chief Hepatologist',
    image: 'https://cdn.sanity.io/images/0xgev689/production/fbba20467ff290d573a6acefbfd7856a2e5ab852-524x280.png',
    excerpt: 'Early screening and expert care to detect, manage, and reverse fatty liver disease before irreversible damage occurs.',
    content: 'Non-alcoholic fatty liver disease (NAFLD) is rapidly rising across urban populations. Often asymptomatic in early stages, advanced FibroScan diagnostics allow clinical detection of early fibrosis when lifestyle modifications and therapeutic interventions can completely reverse tissue damage.',
    readTime: '4 min read',
  },
  {
    id: 'blog-2',
    title: 'Move Freely, Live Pain-Free, and Reclaim Your Active Life',
    category: 'Orthopaedics & Spine',
    tagColor: '#22A06B',
    date: '02 November 2026',
    author: 'Dr. Anand K., Senior Spine Surgeon',
    image: 'https://cdn.sanity.io/images/0xgev689/production/9fef3635bfcf9b3fa373caa595cf9f78fd2b97ef-524x280.png',
    excerpt: 'Comprehensive spine care focused on relieving chronic pain, restoring posture, and non-surgical mobility restoration.',
    content: 'Chronic lumbar discomfort often stems from postural fatigue and disc degeneration. Our multimodal rehabilitation protocol combines targeted physical therapy, minimally invasive decompression, and core stabilization techniques to restore daily movement without open surgery.',
    readTime: '5 min read',
  },
  {
    id: 'blog-3',
    title: 'Building Healthier Futures for Every Child',
    category: 'Paediatrics & NICU',
    tagColor: '#E9A23B',
    date: '28 October 2026',
    author: 'Dr. Elena Rostova, Senior Pediatrician',
    image: 'https://cdn.sanity.io/images/0xgev689/production/ebb32e86916cc4a8301e44b4f2f559faf579dc8e-524x280.png',
    excerpt: 'From specialized pediatric developmental treatments to compassionate neonatal care, we protect your child\'s brightest smiles.',
    content: 'Early childhood milestones and timely immunization schedules form the cornerstone of lifelong immune resilience. InspireZest\'s level-3 neonatal intensive care and developmental pediatrics wing provides round-the-clock specialized support for premature infants and growing children.',
    readTime: '3 min read',
  },
];

async function seed() {
  for (const b of blogs) {
    await setDoc(doc(db, 'blogs', b.id), b, { merge: true });
    console.log(`Seeded blog: ${b.title}`);
  }
  console.log('All blogs seeded to Firestore!');
}

seed().catch(console.error);

