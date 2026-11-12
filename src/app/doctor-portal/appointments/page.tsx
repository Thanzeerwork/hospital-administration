'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useHospital } from '@/context/HospitalContext';
import { DoctorSidebar } from '@/components/layout/DoctorSidebar';
import { DoctorAuth } from '@/components/doctor/DoctorAuth';
import { DoctorAppointmentsView } from '@/components/doctor/DoctorAppointmentsView';
import { PrescriptionModal } from '@/components/common/PrescriptionModal';
import { Appointment, Prescription } from '@/types';

export default function DoctorPortalAppointmentsPage() {
  const router = useRouter();
  const { isDoctorAuthenticated } = useHospital();
  const [activePrescription, setActivePrescription] = useState<Prescription | null>(null);

  if (!isDoctorAuthenticated) {
    return (
      <div className="flex-1 flex flex-col bg-[#F4F6F6]">
        <DoctorAuth />
      </div>
    );
  }

  return (
    <div className="flex-1 flex bg-[#F4F6F6]">
      <DoctorSidebar />

      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <DoctorAppointmentsView
            onOpenPrescriptionCreator={(apt) => {
              router.push(`/doctor-portal/prescriptions?appointmentId=${apt.id}`);
            }}
            onViewPrescription={(apt) => {
              if (apt.prescription) setActivePrescription(apt.prescription);
            }}
          />
        </div>
      </main>

      <PrescriptionModal
        isOpen={Boolean(activePrescription)}
        onClose={() => setActivePrescription(null)}
        prescription={activePrescription}
      />
    </div>
  );
}

