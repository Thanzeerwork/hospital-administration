'use client';

import React, { useState, useEffect } from 'react';
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
  Menu,
  X,
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
  const [mobileOpen, setMobileOpen] = useState(false);

  // Auto-close drawer on route navigation
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

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
    <>
      {/* 1. Mobile Top Sticky Header (< md) */}
      <header className="md:hidden sticky top-0 z-30 w-full bg-white text-[#1A1A1A] border-b border-[#E5E7EB] px-4 py-3 flex items-center justify-between shadow-xs shrink-0">
        <Link href="/doctor-portal" className="flex items-center gap-2">
          <InspireZestLogo variant="full" size="sm" />
        </Link>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E6F3F5] text-[#00829B] border border-[#00829B]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22A06B] animate-pulse" />
            Active OPD
          </span>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg bg-[#F4F6F6] text-[#1A1A1A] hover:bg-[#E5E7EB] transition-colors focus:outline-none"
            aria-label="Open doctor navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* 2. Mobile Drawer Backdrop Overlay (< md) */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-xs transition-opacity"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* 3. Mobile Slide-Over Drawer (< md) */}
      <div
        className={`md:hidden fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-white text-[#1A1A1A] shadow-2xl flex flex-col border-r border-[#E5E7EB] transform transition-transform duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 border-b border-[#E5E7EB] flex items-center justify-between">
          <Link href="/doctor-portal" onClick={() => setMobileOpen(false)}>
            <InspireZestLogo variant="full" size="sm" />
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="p-1.5 rounded-lg text-[#666666] hover:text-[#1A1A1A] hover:bg-[#F4F6F6] transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Doctor Status Indicator in Drawer */}
        <div className="px-4 py-2.5 bg-[#F4F6F6] border-b border-[#E5E7EB] flex items-center justify-between text-xs">
          <span className="text-[#666666] font-medium">On-Duty Status:</span>
          <span className="inline-flex items-center gap-1.5 font-bold text-[#22A06B]">
            <span className="w-2 h-2 rounded-full bg-[#22A06B] animate-pulse" />
            Active OPD • {doctorUser?.specializationName || 'Cardiology'}
          </span>
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
                onClick={() => setMobileOpen(false)}
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
            onClick={() => {
              setMobileOpen(false);
              logout('doctor');
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-[#DC5555] hover:bg-[#DC5555]/10 rounded-lg transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Doctor Logout</span>
          </button>
        </div>
      </div>

      {/* 4. Desktop Fixed Sidebar (>= md) */}
      <aside className="hidden md:flex w-64 bg-white border-r border-[#E5E7EB] flex-col fixed inset-y-0 left-0 h-screen z-30">
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

      {/* 5. Desktop Spacer to preserve layout flow beside fixed sidebar */}
      <div className="hidden md:block w-64 shrink-0" aria-hidden="true" />
    </>
  );
};
