'use client';

import React from 'react';
import { useHospital } from '@/context/HospitalContext';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { AdminAuth } from '@/components/admin/AdminAuth';
import { AdminAppointmentManagement } from '@/components/admin/AdminAppointmentManagement';

export default function AdminPortalAppointmentsPage() {
  const { isAdminAuthenticated } = useHospital();

  if (!isAdminAuthenticated) {
    return (
      <div className="flex-1 flex flex-col bg-[#F4F6F6]">
        <AdminAuth />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col md:flex-row bg-[#F4F6F6] min-h-screen md:h-screen md:overflow-hidden">
      <AdminSidebar />

      <main className="flex-1 w-full min-w-0 p-4 sm:p-6 md:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <AdminAppointmentManagement />
        </div>
      </main>
    </div>
  );
}

