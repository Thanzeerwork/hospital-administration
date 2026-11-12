# hospital-administration

InspireZest Multispeciality Healthcare Administration & Clinical Hospital Management System.

## Features

- **Patient Portal**:
  - Doctor search and filtering across 22 medical specialties
  - Consultation booking with real-time doctor availability
  - Secure Patient Authentication with Email OTP powered by **Resend**
  - Digital e-prescriptions reader and appointment tracking
  - Dynamic Hero Banner with customizable background image or cinematic autoplay video

- **Doctor Portal**:
  - Outpatient availability calendar and date scheduling
  - Appointment queue management and status transitions
  - Digital prescription creation (medicines, dosage, instructions, follow-up dates)
  - Physician profile and bio configuration

- **Admin Portal**:
  - Executive operations overview and clinical metrics
  - Doctor CRUD management
  - Patient directory and medical records
  - Medical specialties catalog management
  - Hero background & video media management (integrated with Cloudflare R2 and Firebase Firestore)
  - Hospital blogs and health breakthrough updates management

## Tech Stack

- **Framework**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, Lucide Icons, React Bits BlurText
- **Database & Cloud**: Firebase Cloud Firestore
- **Object Storage**: Cloudflare R2 (S3-compatible API)
- **Email & Auth**: Resend API for OTP authorization
