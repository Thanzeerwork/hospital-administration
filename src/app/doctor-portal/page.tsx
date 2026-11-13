'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useHospital } from '@/context/HospitalContext';
import { DoctorSidebar } from '@/components/layout/DoctorSidebar';
import { DoctorAuth } from '@/components/doctor/DoctorAuth';
import { DoctorDashboardView } from '@/components/doctor/DoctorDashboardView';
import { PrescriptionModal } from '@/components/common/PrescriptionModal';
import { Appointment, Prescription } from '@/types';

export default function DoctorPortalDashboardPage() {
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
    <div className="flex-1 flex flex-col md:flex-row bg-[#F4F6F6] min-h-screen md:h-screen md:overflow-hidden">
      <DoctorSidebar />

      <main className="flex-1 w-full min-w-0 p-4 sm:p-6 md:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <DoctorDashboardView
            setActiveTab={(tab) => {
              if (tab === 'availability') router.push('/doctor-portal/availability');
              else if (tab === 'appointments') router.push('/doctor-portal/appointments');
              else if (tab === 'prescriptions') router.push('/doctor-portal/prescriptions');
              else if (tab === 'profile') router.push('/doctor-portal/profile');
            }}
            onOpenPrescriptionCreator={(apt) => {
              router.push(`/doctor-portal/prescriptions?appointmentId=${apt.id}`);
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

