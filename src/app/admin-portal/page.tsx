'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useHospital } from '@/context/HospitalContext';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { AdminAuth } from '@/components/admin/AdminAuth';
import { AdminDashboardView } from '@/components/admin/AdminDashboardView';

export default function AdminPortalDashboardPage() {
  const router = useRouter();
  const { isAdminAuthenticated } = useHospital();

  if (!isAdminAuthenticated) {
    return (
      <div className="flex-1 flex flex-col bg-[#F4F6F6]">
        <AdminAuth />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col md:flex-row bg-[#F4F6F6] min-h-screen">
      <AdminSidebar />

      <main className="flex-1 w-full min-w-0 p-4 sm:p-6 md:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <AdminDashboardView
            setActiveTab={(tab) => {
              if (tab === 'doctors') router.push('/admin-portal/doctors');
              else if (tab === 'patients') router.push('/admin-portal/patients');
              else if (tab === 'specializations') router.push('/admin-portal/specializations');
              else if (tab === 'appointments') router.push('/admin-portal/appointments');
              else if (tab === 'blogs') router.push('/admin-portal/blogs');
            }}
          />
        </div>
      </main>
    </div>
  );
}

