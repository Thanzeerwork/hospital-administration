import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  query,
  where,
  Timestamp,
} from 'firebase/firestore';
import type { Analytics } from 'firebase/analytics';
import type { Doctor, Patient, Appointment, Prescription, Specialization, HospitalBlog, HeroMediaConfig } from '@/types';

// Web app's Firebase configuration
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyACOEzgg7HXr05sWCVYNC-DSuWNO70HsuU",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "hospitaladministration-41b48.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "hospitaladministration-41b48",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "hospitaladministration-41b48.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "546800743524",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:546800743524:web:040f5a69e82ec9ca951b71",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-684GETQ5FF"
};

// Initialize Firebase (singleton pattern prevents duplicate initializations in Next.js)
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize Analytics conditionally (only client-side)
let analytics: Analytics | null = null;
if (typeof window !== 'undefined') {
  import('firebase/analytics')
    .then(({ getAnalytics, isSupported }) => {
      isSupported().then((supported) => {
        if (supported) {
          analytics = getAnalytics(app);
        }
      });
    })
    .catch(() => {
      // Analytics not supported in this environment
    });
}
export { analytics };

// Firestore Collections Constants
export const COLLECTIONS = {
  DOCTORS: 'doctors',
  PATIENTS: 'patients',
  APPOINTMENTS: 'appointments',
  PRESCRIPTIONS: 'prescriptions',
  SPECIALIZATIONS: 'specializations',
  BLOGS: 'blogs',
  USERS: 'users',
  SITE_SETTINGS: 'site_settings',
  OTPS: 'otps',
};

// Firestore CRUD Helpers with safe fallback handling
export async function syncDoctorsToFirestore(doctors: Doctor[]): Promise<boolean> {
  try {
    for (const docItem of doctors) {
      await setDoc(doc(db, COLLECTIONS.DOCTORS, docItem.id), docItem, { merge: true });
    }
    return true;
  } catch (err) {
    console.warn('Firestore syncDoctors warning (using local fallback):', err);
    return false;
  }
}

export async function fetchDoctorsFromFirestore(): Promise<Doctor[] | null> {
  try {
    const snap = await getDocs(collection(db, COLLECTIONS.DOCTORS));
    if (snap.empty) return null;
    const list: Doctor[] = [];
    snap.forEach((d) => list.push(d.data() as Doctor));
    return list;
  } catch (err) {
    console.warn('Firestore fetchDoctors warning (using local fallback):', err);
    return null;
  }
}

export async function saveDoctorToFirestore(doctor: Doctor): Promise<boolean> {
  try {
    await setDoc(doc(db, COLLECTIONS.DOCTORS, doctor.id), doctor, { merge: true });
    return true;
  } catch (err) {
    console.warn('Firestore saveDoctor warning (using local fallback):', err);
    return false;
  }
}

export async function deleteDoctorFromFirestore(doctorId: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, COLLECTIONS.DOCTORS, doctorId));
    return true;
  } catch (err) {
    console.warn('Firestore deleteDoctor warning (using local fallback):', err);
    return false;
  }
}

export async function savePatientToFirestore(patient: Patient): Promise<boolean> {
  try {
    await setDoc(doc(db, COLLECTIONS.PATIENTS, patient.id), patient, { merge: true });
    return true;
  } catch (err) {
    console.warn('Firestore savePatient warning (using local fallback):', err);
    return false;
  }
}

export async function fetchPatientsFromFirestore(): Promise<Patient[] | null> {
  try {
    const snap = await getDocs(collection(db, COLLECTIONS.PATIENTS));
    if (snap.empty) return null;
    const list: Patient[] = [];
    snap.forEach((d) => list.push(d.data() as Patient));
    return list;
  } catch (err) {
    console.warn('Firestore fetchPatients warning (using local fallback):', err);
    return null;
  }
}

export async function saveAppointmentToFirestore(appointment: Appointment): Promise<boolean> {
  try {
    await setDoc(doc(db, COLLECTIONS.APPOINTMENTS, appointment.id), appointment, { merge: true });
    return true;
  } catch (err) {
    console.warn('Firestore saveAppointment warning (using local fallback):', err);
    return false;
  }
}

export async function fetchAppointmentsFromFirestore(): Promise<Appointment[] | null> {
  try {
    const snap = await getDocs(collection(db, COLLECTIONS.APPOINTMENTS));
    if (snap.empty) return null;
    const list: Appointment[] = [];
    snap.forEach((d) => list.push(d.data() as Appointment));
    return list;
  } catch (err) {
    console.warn('Firestore fetchAppointments warning (using local fallback):', err);
    return null;
  }
}

export async function savePrescriptionToFirestore(prescription: Prescription): Promise<boolean> {
  try {
    await setDoc(doc(db, COLLECTIONS.PRESCRIPTIONS, prescription.id), prescription, { merge: true });
    return true;
  } catch (err) {
    console.warn('Firestore savePrescription warning (using local fallback):', err);
    return false;
  }
}

export async function fetchPrescriptionsFromFirestore(): Promise<Prescription[] | null> {
  try {
    const snap = await getDocs(collection(db, COLLECTIONS.PRESCRIPTIONS));
    if (snap.empty) return null;
    const list: Prescription[] = [];
    snap.forEach((d) => list.push(d.data() as Prescription));
    return list;
  } catch (err) {
    console.warn('Firestore fetchPrescriptions warning (using local fallback):', err);
    return null;
  }
}

export async function saveSpecializationToFirestore(spec: Specialization): Promise<boolean> {
  try {
    await setDoc(doc(db, COLLECTIONS.SPECIALIZATIONS, spec.id), spec, { merge: true });
    return true;
  } catch (err) {
    console.warn('Firestore saveSpecialization warning (using local fallback):', err);
    return false;
  }
}

export async function deleteSpecializationFromFirestore(specId: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, COLLECTIONS.SPECIALIZATIONS, specId));
    return true;
  } catch (err) {
    console.warn('Firestore deleteSpecialization warning (using local fallback):', err);
    return false;
  }
}

export async function fetchSpecializationsFromFirestore(): Promise<Specialization[] | null> {
  try {
    const snap = await getDocs(collection(db, COLLECTIONS.SPECIALIZATIONS));
    if (snap.empty) return null;
    const list: Specialization[] = [];
    snap.forEach((d) => list.push(d.data() as Specialization));
    return list;
  } catch (err) {
    console.warn('Firestore fetchSpecializations warning (using local fallback):', err);
    return null;
  }
}

export async function saveBlogToFirestore(blog: HospitalBlog): Promise<boolean> {
  try {
    await setDoc(doc(db, COLLECTIONS.BLOGS, blog.id), blog, { merge: true });
    return true;
  } catch (err) {
    console.warn('Firestore saveBlog warning (using local fallback):', err);
    return false;
  }
}

export async function deleteBlogFromFirestore(blogId: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, COLLECTIONS.BLOGS, blogId));
    return true;
  } catch (err) {
    console.warn('Firestore deleteBlog warning (using local fallback):', err);
    return false;
  }
}

export async function fetchBlogsFromFirestore(): Promise<HospitalBlog[] | null> {
  try {
    const snap = await getDocs(collection(db, COLLECTIONS.BLOGS));
    if (snap.empty) return null;
    const list: HospitalBlog[] = [];
    snap.forEach((d) => list.push(d.data() as HospitalBlog));
    return list;
  } catch (err) {
    console.warn('Firestore fetchBlogs warning (using local fallback):', err);
    return null;
  }
}

// Hero Media Config Helpers
export async function saveHeroConfigToFirestore(config: HeroMediaConfig): Promise<boolean> {
  try {
    await setDoc(doc(db, COLLECTIONS.SITE_SETTINGS, 'hero_config'), {
      ...config,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
    return true;
  } catch (err) {
    console.warn('Firestore saveHeroConfig warning (using local fallback):', err);
    return false;
  }
}

export async function fetchHeroConfigFromFirestore(): Promise<HeroMediaConfig | null> {
  try {
    const snap = await getDoc(doc(db, COLLECTIONS.SITE_SETTINGS, 'hero_config'));
    if (!snap.exists()) return null;
    return snap.data() as HeroMediaConfig;
  } catch (err) {
    console.warn('Firestore fetchHeroConfig warning (using local fallback):', err);
    return null;
  }
}

// OTP Security Verification Helpers
export async function saveOtpToFirestore(email: string, otp: string): Promise<boolean> {
  try {
    const safeKey = email.toLowerCase().trim().replace(/[^a-z0-9]/g, '_');
    await setDoc(doc(db, COLLECTIONS.OTPS, safeKey), {
      email: email.toLowerCase().trim(),
      otp: otp.trim(),
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // 10 minutes
    });
    return true;
  } catch (err) {
    console.warn('Firestore saveOtp warning (using memory fallback):', err);
    return false;
  }
}

export async function verifyOtpInFirestore(email: string, otp: string): Promise<boolean> {
  try {
    const safeKey = email.toLowerCase().trim().replace(/[^a-z0-9]/g, '_');
    const snap = await getDoc(doc(db, COLLECTIONS.OTPS, safeKey));
    if (!snap.exists()) return false;
    const data = snap.data();
    if (!data || !data.otp) return false;
    // Check expiration
    if (data.expiresAt && new Date(data.expiresAt).getTime() < Date.now()) {
      return false;
    }
    return data.otp.toString().trim() === otp.trim();
  } catch (err) {
    console.warn('Firestore verifyOtp warning (using fallback):', err);
    return false;
  }
}


