'use client';

import React from 'react';
import { useHospital } from '@/context/HospitalContext';
import { DoctorSidebar } from '@/components/layout/DoctorSidebar';
import { DoctorAuth } from '@/components/doctor/DoctorAuth';
import { DoctorAvailabilityView } from '@/components/doctor/DoctorAvailabilityView';

export default function DoctorPortalAvailabilityPage() {
  const { isDoctorAuthenticated } = useHospital();

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
          <DoctorAvailabilityView />
        </div>
      </main>
    </div>
  );
}

