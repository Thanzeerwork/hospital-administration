'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useHospital } from '@/context/HospitalContext';
import InspireZestLogo from '@/components/common/InspireZestLogo';
import {
  LayoutDashboard,
  CalendarCheck,
  CalendarRange,
  FileSpreadsheet,
  UserCog,
  LogOut,
  Stethoscope,
  ChevronRight,
} from 'lucide-react';

export type DoctorTab =
  | 'dashboard'
  | 'appointments'
  | 'availability'
  | 'prescriptions'
  | 'profile';

export const DoctorSidebar: React.FC = () => {
  const pathname = usePathname();
  const { doctorUser, logout } = useHospital();

  const navItems = [
    {
      href: '/doctor-portal',
      exact: true,
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      href: '/doctor-portal/appointments',
      exact: false,
      label: 'Appointments',
      icon: <CalendarCheck className="w-4 h-4" />,
    },
    {
      href: '/doctor-portal/availability',
      exact: false,
      label: 'Availability Schedule',
      icon: <CalendarRange className="w-4 h-4" />,
    },
    {
      href: '/doctor-portal/prescriptions',
      exact: false,
      label: 'Prescription Entry',
      icon: <FileSpreadsheet className="w-4 h-4" />,
    },
    {
      href: '/doctor-portal/profile',
      exact: false,
      label: 'Doctor Profile Settings',
      icon: <UserCog className="w-4 h-4" />,
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-[#E5E7EB] flex flex-col shrink-0 min-h-screen">
      {/* Doctor Brand / Clinic Wing */}
      <div className="p-5 border-b border-[#E5E7EB]">
        <Link href="/doctor-portal" className="block group">
          <InspireZestLogo variant="full" size="sm" className="mb-2" />
          <div className="flex items-center gap-1.5 pt-1 border-t border-[#E5E7EB]/60">
            <span className="text-[11px] font-bold text-[#00829B] block truncate">
              Doctor OPD Portal • {doctorUser?.specializationName || 'Cardiology'}
            </span>
          </div>
        </Link>

        {/* Doctor Status Indicator */}
        <div className="mt-3.5 flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#F4F6F6] border border-[#E5E7EB] text-[11px]">
          <span className="text-[#666666] font-medium">On-Duty Status:</span>
          <span className="inline-flex items-center gap-1.5 font-bold text-[#22A06B]">
            <span className="w-2 h-2 rounded-full bg-[#22A06B] animate-pulse" />
            Active OPD
          </span>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <p className="px-3 py-1.5 text-[11px] font-bold text-[#666666] uppercase tracking-wider">
          Clinical Operations
        </p>
        {navItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                isActive
                  ? 'bg-[#00829B] text-white shadow-sm'
                  : 'text-[#1A1A1A] hover:bg-[#F4F6F6] hover:text-[#00829B]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className={isActive ? 'text-white' : 'text-[#666666]'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>
              {isActive && <ChevronRight className="w-3.5 h-3.5 text-white/80" />}
            </Link>
          );
        })}
      </nav>

      {/* Doctor Summary Footer */}
      <div className="p-3 border-t border-[#E5E7EB] bg-[#F4F6F6]/50">
        <div className="flex items-center gap-3 p-2 rounded-lg bg-white border border-[#E5E7EB] mb-2">
          {doctorUser?.profileImage ? (
            <img
              src={doctorUser.profileImage}
              alt={doctorUser.name}
              className="w-9 h-9 rounded-full object-cover border border-[#E5E7EB]"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-[#00829B]/15 text-[#00829B] flex items-center justify-center font-bold text-xs">
              Dr
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-[#1A1A1A] truncate">
              {doctorUser?.name || 'Dr. Alexander Wright'}
            </p>
            <p className="text-[11px] text-[#666666] truncate">
              {doctorUser?.room || 'Suite 302'}
            </p>
          </div>
        </div>

        <button
          onClick={() => logout('doctor')}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-[#DC5555] hover:bg-[#DC5555]/10 rounded-lg transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Doctor Logout</span>
        </button>
      </div>
    </aside>
  );
};
