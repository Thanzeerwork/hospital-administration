'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PatientNav } from '@/components/layout/PatientNav';
import { PatientFooter } from '@/components/layout/PatientFooter';
import { PatientHome } from '@/components/patient/PatientHome';
import { PatientAuthModal } from '@/components/patient/PatientAuthModal';
import { DoctorProfileModal } from '@/components/patient/DoctorProfileModal';
import { AppointmentBookingModal } from '@/components/patient/AppointmentBookingModal';
import { Doctor } from '@/types';

export default function PatientPortalHomePage() {
  const router = useRouter();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [viewingDoctorProfile, setViewingDoctorProfile] = useState<Doctor | null>(null);
  const [bookingDoctor, setBookingDoctor] = useState<Doctor | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col w-full bg-white">
      <PatientNav
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onOpenBookingModal={() => {
          setBookingDoctor(null);
          setIsBookingModalOpen(true);
        }}
      />

      <main className="flex-1 w-full">
        <PatientHome
          onSelectCategory={(catName) => {
            router.push(`/patient-portal/doctors?category=${encodeURIComponent(catName)}`);
          }}
          onNavigateDoctors={() => router.push('/patient-portal/doctors')}
          onNavigateAppointments={() => router.push('/patient-portal/appointments')}
          onBookAppointment={(doc) => {
            setBookingDoctor(doc || null);
            setIsBookingModalOpen(true);
          }}
          onViewDoctorProfile={(doc) => setViewingDoctorProfile(doc)}
        />
      </main>

      <PatientFooter />

      {/* Modals */}
      <PatientAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <DoctorProfileModal
        isOpen={Boolean(viewingDoctorProfile)}
        onClose={() => setViewingDoctorProfile(null)}
        doctor={viewingDoctorProfile}
        onBookAppointment={(doc) => {
          setBookingDoctor(doc);
          setIsBookingModalOpen(true);
        }}
      />

      <AppointmentBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => {
          setIsBookingModalOpen(false);
          setBookingDoctor(null);
        }}
        initialDoctor={bookingDoctor}
        onBookingSuccess={() => {}}
      />
    </div>
  );
}
