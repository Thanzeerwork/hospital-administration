# InspireZest Multispeciality Healthcare System
### Enterprise Hospital Administration & Clinical Management Platform

[![Next.js](https://img.shields.io/badge/Next.js-14.2.15-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3.1-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.19-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth_%26_Firestore-FFCA28?style=flat&logo=firebase)](https://firebase.google.com/)
[![Cloudflare R2](https://img.shields.io/badge/Cloudflare_R2-S3_Compatible-F38020?style=flat&logo=cloudflare)](https://www.cloudflare.com/products/r2/)
[![Resend](https://img.shields.io/badge/Resend-Email_OTP-000000?style=flat&logo=resend)](https://resend.com/)

---

## 🌟 Overview

**InspireZest Multispeciality Healthcare System** is a full-stack, enterprise-grade hospital administration and clinical management platform designed to connect Patients, Doctors, and Administrators into a unified digital healthcare ecosystem.

Engineered with high-impact clinical design, full-bleed mega menus, smooth motion micro-interactions, dynamic video/image hero media, Firebase Email/Password authentication, Resend-powered passwordless OTP authorization, and Cloudflare R2 object storage.

---

## 🏛️ Tripartite Portal Architecture

```
+-------------------------------------------------------------------------+
|                  INSPIREZEST HEALTHCARE ECOSYSTEM                       |
+--------------------+---------------------+------------------------------+
|   PATIENT PORTAL   |    DOCTOR PORTAL    |         ADMIN PORTAL         |
|  - Doctor Search   |  - Clinical Queue   |  - Executive Analytics       |
|  - Slot Booking    |  - Availability     |  - Doctor & Patient CRUD     |
|  - Firebase & OTP  |  - e-Prescriptions  |  - Credential Governance     |
|  - Prescription Rx |  - Profile & Bio    |  - Hero Video / Image Toggle |
|  - Mega Menus      |  - Fixed Sidebar    |  - Cloudflare R2 Uploads     |
+--------------------+---------------------+------------------------------+
```

### 1. 🏥 Patient Portal (`/patient-portal`)
- **Dedicated Sign In & Registration**: Separate Google Stitch-styled authentication pages (`/patient-portal/login` and `/patient-portal/signup`) with complete clinical demographics intake (Age, Gender, Blood Group, Address, Emergency Contact).
- **Dual Authentication Engine**: Firebase Email & Password authentication combined with Resend transactional 6-digit OTP delivery.
- **Doctor Directory & Filtering**: Search across 22+ medical specialities with real-time filters by experience, fees, and patient reviews.
- **Real-Time Appointment Booking**: Interactive appointment scheduling with slot selection and immediate digital confirmation.
- **Digital Prescription Hub**: View, download, and review clinical prescriptions, diagnosis summaries, and follow-up consultation dates.
- **Enterprise Mega Menus**: Full-bleed expandable navigation drawers for *Our Hospitals*, *Specialities*, *About*, and *Resources*.
- **Dynamic Media Hero**: Seamless live switching between cinematic video background and curated image carousel.

### 2. 🩺 Doctor Portal (`/doctor-portal`)
- **Outpatient Consultation Queue**: Real-time triage of pending, confirmed, and completed appointments.
- **Interactive Availability Calendar**: Toggle active clinical practice dates and customize daily consultation hours.
- **Digital e-Prescriptions Creator**: Multi-row medication table with drug name, dosage, frequency, duration, instructions, and follow-up date.
- **Physician Profile Configuration**: Bio, consulting room, fees, and contact details management.
- **Fixed Viewport Sidebar**: Stationary desktop sidebar with full mobile drawer responsiveness for uninterrupted navigation.

### 3. ⚙️ Admin Portal (`/admin-portal`)
- **Executive Operations Dashboard**: Total revenue, patient registrations, active doctors, and consultation volume metrics.
- **Doctor Credential & Registry Management**: Complete physician directory with credential administration and password visibility/copy controls.
- **Patient Directory & Security Management**: Full patient records including clinical history, demographics, credential inspection, and administrative password modification/reset.
- **Fixed Sidebar Layout Architecture**: Desktop layout guarantees the sidebar never scrolls away when navigating large registries.
- **Specialization & Department CMS**: Real-time synchronization of 23+ hospital departments with banner images and doctor allocations.
- **Hero Media Settings Manager**: Switch between video and image banner modes, configure overlay opacity, and upload MP4 videos directly to Cloudflare R2.

---

## 📊 System Architecture Diagram

```mermaid
flowchart TD
    subgraph Client["Frontend Client (Next.js 14 App Router)"]
        P_UI["Patient Portal (/patient-portal)"]
        D_UI["Doctor Portal (/doctor-portal)"]
        A_UI["Admin Portal (/admin-portal)"]
        State["HospitalContext (Unified State & LocalStorage Sync)"]
    end

    subgraph Auth["Authentication Engine"]
        FB_Auth["Firebase Authentication (Email/Password)"]
        OTP_Send["/api/auth/send-otp (Resend)"]
        OTP_Verify["/api/auth/verify-otp"]
    end

    subgraph APIs["Serverless Next.js API Routes"]
        Upload["/api/upload (Cloudflare R2 Multipart)"]
    end

    subgraph Cloud["External Cloud Infrastructure"]
        Resend_API["Resend Email Service"]
        Firestore_DB["Firebase Firestore Cloud Database"]
        R2_Bucket["Cloudflare R2 Object Storage"]
    end

    P_UI --> State
    D_UI --> State
    A_UI --> State

    State --> FB_Auth
    State --> OTP_Send
    State --> OTP_Verify
    A_UI --> Upload

    OTP_Send --> Resend_API
    OTP_Send --> Firestore_DB
    OTP_Verify --> Firestore_DB
    Upload --> R2_Bucket
    State <--> Firestore_DB
```

---

## 🛠️ Tech Stack & Key Libraries

| Layer | Tools / Libraries |
| :--- | :--- |
| **Framework** | Next.js 14 (App Router), React 18, TypeScript |
| **UI & Styling** | Tailwind CSS, Lucide React, React Bits BlurText |
| **Animations** | `motion/react` (Framer Motion v14) |
| **Authentication** | Firebase Auth (Email/Password) & Resend (Email OTP) |
| **Cloud Storage** | Cloudflare R2 via `@aws-sdk/client-s3` |
| **Database** | Firebase Firestore NoSQL Database |
| **Date & Calendar** | `date-fns` |

---

## 🔑 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Resend API for Email OTP
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
RESEND_FROM_EMAIL="InspireZest Hospitals <onboarding@resend.dev>"

# Cloudflare R2 S3 Object Storage
CLOUDFLARE_R2_ACCOUNT_ID="your_cloudflare_account_id"
CLOUDFLARE_R2_ACCESS_KEY_ID="your_cloudflare_access_key_id"
CLOUDFLARE_R2_SECRET_ACCESS_KEY="your_cloudflare_secret_access_key"
CLOUDFLARE_R2_BUCKET="hospitaladministration"
NEXT_PUBLIC_R2_PUBLIC_URL="https://pub-f6697a3e2acd4048a86b5ed54d969979.r2.dev"

# Firebase Auth & Firestore Configuration
NEXT_PUBLIC_FIREBASE_API_KEY="your_firebase_api_key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="hospitaladministration.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="hospitaladministration"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="hospitaladministration.firebasestorage.app"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="546800743524"
NEXT_PUBLIC_FIREBASE_APP_ID="your_firebase_app_id"
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="your_measurement_id"
```

---

## 🚀 Quick Start Guide

### 1. Clone & Install
```bash
git clone https://github.com/Thanzeerwork/hospital-administration.git
cd hospital-administration
npm install
```

### 2. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

- **Patient Portal**: `http://localhost:3000/patient-portal`
- **Doctor Portal**: `http://localhost:3000/doctor-portal`
- **Admin Portal**: `http://localhost:3000/admin-portal`
- **Patient Sign In**: `http://localhost:3000/patient-portal/login`
- **Patient Sign Up**: `http://localhost:3000/patient-portal/signup`

### 3. Production Build
```bash
npm run build
npm run start -p 3000
```

---

## 📁 Project Structure

```
hospital-administration/
├── public/                     # Static assets, SVG vector logos, video files
│   └── images/                 # Hospital branding, doctor avatars
├── src/
│   ├── app/
│   │   ├── admin-portal/       # Executive metrics, doctors/patients CRUD, hero settings
│   │   ├── doctor-portal/      # Consultation queue, calendar availability, e-prescriptions
│   │   ├── patient-portal/     # Doctor search, slot booking, auth, prescription viewer
│   │   │   ├── login/          # Dedicated Google Stitch patient sign-in page
│   │   │   └── signup/         # Dedicated patient registration with demographics intake
│   │   ├── api/
│   │   │   ├── auth/send-otp/  # Resend OTP sender endpoint
│   │   │   ├── auth/verify-otp/# OTP validation endpoint
│   │   │   └── upload/         # Cloudflare R2 S3 multipart upload endpoint
│   │   ├── layout.tsx          # Root layout & providers
│   │   └── page.tsx            # Portal selector landing page
│   ├── components/
│   │   ├── admin/              # Admin dashboard, doctor/patient/specialization managers
│   │   ├── common/             # InspireZestLogo, Toast, Modal, ConfirmationModal, BlurText
│   │   ├── doctor/             # Doctor appointments, availability calendar, prescription entry
│   │   ├── layout/             # PatientNav, AdminSidebar (fixed), DoctorSidebar (fixed)
│   │   └── patient/            # PatientHome, DoctorListing, AppointmentBookingModal
│   ├── context/
│   │   └── HospitalContext.tsx # Unified multi-role state, Firebase auth & Firestore sync
│   ├── lib/
│   │   ├── cloudData.ts        # Cloudflare R2 seed endpoints & clinical datasets
│   │   ├── firebase.ts         # Firebase Auth & Firestore connection & mutations
│   │   └── r2.ts               # S3Client setup and Cloudflare R2 file uploader
│   └── types/
│       └── index.ts            # Clinical TypeScript data models & schemas
├── README.md                   # Repository overview
└── package.json
```

---

## 📄 License
InspireZest Multispeciality Healthcare System is proprietary clinical software. All rights reserved.
