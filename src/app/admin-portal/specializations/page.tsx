'use client';

import React from 'react';
import { useHospital } from '@/context/HospitalContext';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { AdminAuth } from '@/components/admin/AdminAuth';
import { AdminSpecializationManagement } from '@/components/admin/AdminSpecializationManagement';

export default function AdminPortalSpecializationsPage() {
  const { isAdminAuthenticated } = useHospital();

  if (!isAdminAuthenticated) {
    return (
      <div className="flex-1 flex flex-col bg-[#F4F6F6]">
        <AdminAuth />
      </div>
    );
  }

  return (
    <div className="flex-1 flex bg-[#F4F6F6]">
      <AdminSidebar />

      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <AdminSpecializationManagement />
        </div>
      </main>
    </div>
  );
}

