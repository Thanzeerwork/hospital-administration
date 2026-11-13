export type Role = 'patient' | 'doctor' | 'admin';

export interface Specialization {
  id: string;
  name: string;
  description: string;
  image: string;
  doctorCount?: number;
  icon?: string;
}

export interface Doctor {
  id: string;
  name: string;
  specializationId: string;
  specializationName: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  profileImage: string;
  bio: string;
  email: string;
  phone: string;
  room: string;
  username: string;
  password?: string;
  availableDates: string[]; // ISO strings 'YYYY-MM-DD'
  timeSlots?: string[];
  consultationFee: number;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: 'Female' | 'Male' | 'Other';
  bloodGroup: string;
  address: string;
  emergencyContact: string;
  registeredDate: string;
  password?: string;
}

export interface PrescriptionMedicine {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export interface Prescription {
  id: string;
  appointmentId: string;
  patientName: string;
  patientAge?: number;
  doctorName: string;
  doctorSpecialization: string;
  doctorLicense?: string;
  date: string;
  medicines: PrescriptionMedicine[];
  notes: string;
  followUpDate: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialization: string;
  doctorImage: string;
  date: string; // 'YYYY-MM-DD'
  timeSlot: string; // e.g. '09:30 AM'
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  reason?: string;
  prescription?: Prescription;
  createdDate: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  title?: string;
}

export interface HospitalBlog {
  id: string;
  title: string;
  category: string;
  tagColor?: string;
  date: string;
  author: string;
  image: string;
  excerpt: string;
  content: string;
  readTime?: string;
}

export interface HeroMediaConfig {
  mediaType: 'image' | 'video';
  imageUrl: string;
  videoUrl: string;
  mobileImageUrl?: string;
  overlayOpacity?: number; // 0 to 100
  headline?: string;
  subheadline?: string;
  badgeText?: string;
  updatedAt?: string;
}


