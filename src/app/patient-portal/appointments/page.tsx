'use client';

import React, { useState } from 'react';
import { PatientNav } from '@/components/layout/PatientNav';
import { PatientFooter } from '@/components/layout/PatientFooter';
import { MyAppointments } from '@/components/patient/MyAppointments';
import { PrescriptionModal } from '@/components/common/PrescriptionModal';
import { AppointmentBookingModal } from '@/components/patient/AppointmentBookingModal';
import { PatientAuthModal } from '@/components/patient/PatientAuthModal';
import { Prescription, Doctor } from '@/types';

export default function PatientPortalAppointmentsPage() {
  const [activePrescription, setActivePrescription] = useState<Prescription | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col bg-[#F4F6F6]">
      <PatientNav
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onOpenBookingModal={() => setIsBookingModalOpen(true)}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <MyAppointments
          onViewPrescription={(rx) => setActivePrescription(rx)}
          onBookNewAppointment={() => setIsBookingModalOpen(true)}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
        />
      </main>

      <PatientFooter />

      <PrescriptionModal
        isOpen={Boolean(activePrescription)}
        onClose={() => setActivePrescription(null)}
        prescription={activePrescription}
      />

      <AppointmentBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialDoctor={null}
        onBookingSuccess={() => {}}
      />

      <PatientAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}
