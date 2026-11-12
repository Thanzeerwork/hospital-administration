'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useHospital } from '@/context/HospitalContext';
import { Role } from '@/types';
import { UserCheck, Stethoscope, ShieldCheck, RefreshCw, Home } from 'lucide-react';

export const RoleBanner: React.FC = () => {
  const pathname = usePathname();
  const { currentRole, switchRole, patientUser, doctorUser, adminUser, isPatientAuthenticated, isDoctorAuthenticated, isAdminAuthenticated } = useHospital();

  const isPatientActive = pathname.startsWith('/patient');
  const isDoctorActive = pathname.startsWith('/doctor');
  const isAdminActive = pathname.startsWith('/admin');

  const portals = [
    {
      id: 'patient' as Role,
      href: '/patient-portal',
      label: 'Patient Portal',
      icon: <UserCheck className="w-4 h-4" />,
      isActive: isPatientActive,
      summary: isPatientAuthenticated && patientUser ? patientUser.name : 'Guest (OTP Auth)',
    },
    {
      id: 'doctor' as Role,
      href: '/doctor-portal',
      label: 'Doctor Portal',
      icon: <Stethoscope className="w-4 h-4" />,
      isActive: isDoctorActive,
      summary: isDoctorAuthenticated && doctorUser ? doctorUser.name : 'Dr. Alexander Wright',
    },
    {
      id: 'admin' as Role,
      href: '/admin-portal',
      label: 'Admin Portal',
      icon: <ShieldCheck className="w-4 h-4" />,
      isActive: isAdminActive,
      summary: isAdminAuthenticated && adminUser ? 'Hospital Director' : 'Admin Login',
    },
  ];

  return (
    <aside aria-label="Portal Navigation Toolbar" className="bg-[#00829B] text-white border-b border-[#006C82] px-4 py-2 sticky top-0 z-40 text-xs shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Brand & Home Gateway */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white font-bold transition-colors"
            title="Hospital Gateway Home"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Gateway</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#22A06B] animate-pulse" />
            <span className="font-semibold text-white/90">Hospital Management System</span>
            <span className="hidden md:inline text-white/50">•</span>
            <span className="hidden md:inline text-white/70">
              Multi-Page Architecture
            </span>
          </div>
        </div>

        {/* Center: Real Page Route Navigation Switchers */}
        <div className="flex items-center gap-1.5 bg-black/20 p-1 rounded-lg">
          <span className="text-[11px] text-white/70 px-2 font-medium hidden md:inline">
            Direct Routes:
          </span>
          {portals.map((p) => {
            return (
              <Link
                key={p.id}
                href={p.href}
                onClick={() => switchRole(p.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all duration-150 ${
                  p.isActive
                    ? 'bg-white text-[#00829B] shadow-sm'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {p.icon}
                <span>{p.label}</span>
                {p.isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22A06B]" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right: Live Sync Indicator */}
        <div className="hidden lg:flex items-center gap-2 text-[11px] text-white/80">
          <RefreshCw className="w-3 h-3 text-[#00829B]" />
          <span>Real-time State Sync</span>
        </div>
      </div>
    </aside>
  );
};
