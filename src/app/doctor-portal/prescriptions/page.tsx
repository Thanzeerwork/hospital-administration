'use client';

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useHospital } from '@/context/HospitalContext';
import { DoctorSidebar } from '@/components/layout/DoctorSidebar';
import { DoctorAuth } from '@/components/doctor/DoctorAuth';
import { DoctorPrescriptionView } from '@/components/doctor/DoctorPrescriptionView';

function DoctorPrescriptionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { appointments, isDoctorAuthenticated } = useHospital();

  const appointmentId = searchParams.get('appointmentId');
  const targetApt = appointmentId ? appointments.find((a) => a.id === appointmentId) : null;

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
          <DoctorPrescriptionView
            initialAppointment={targetApt}
            onSuccessReturn={() => router.push('/doctor-portal/appointments')}
          />
        </div>
      </main>
    </div>
  );
}

export default function DoctorPortalPrescriptionsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-[#666666]">Loading prescription entry...</div>}>
      <DoctorPrescriptionContent />
    </Suspense>
  );
}

