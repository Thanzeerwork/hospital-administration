'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useHospital } from '@/context/HospitalContext';
import InspireZestLogo from '@/components/common/InspireZestLogo';
import {
  BarChart3,
  Users2,
  UserSquare2,
  FolderKanban,
  CalendarDays,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Building2,
  Newspaper,
  Video,
} from 'lucide-react';

export type AdminTab =
  | 'dashboard'
  | 'doctors'
  | 'patients'
  | 'specializations'
  | 'appointments'
  | 'blogs'
  | 'hero-settings';

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const { logout, adminUser, doctors, patients, appointments, blogs } = useHospital();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    {
      href: '/admin-portal',
      exact: true,
      label: 'Admin Overview',
      icon: <BarChart3 className="w-4 h-4" />,
    },
    {
      href: '/admin-portal/doctors',
      exact: false,
      label: 'Doctor Management',
      icon: <UserSquare2 className="w-4 h-4" />,
      count: doctors.length,
    },
    {
      href: '/admin-portal/patients',
      exact: false,
      label: 'Patient Management',
      icon: <Users2 className="w-4 h-4" />,
      count: patients.length,
    },
    {
      href: '/admin-portal/specializations',
      exact: false,
      label: 'Specializations',
      icon: <FolderKanban className="w-4 h-4" />,
    },
    {
      href: '/admin-portal/appointments',
      exact: false,
      label: 'Appointments Master',
      icon: <CalendarDays className="w-4 h-4" />,
      count: appointments.length,
    },
    {
      href: '/admin-portal/blogs',
      exact: false,
      label: 'Updates & Blogs',
      icon: <Newspaper className="w-4 h-4" />,
      count: blogs.length,
    },
    {
      href: '/admin-portal/hero-settings',
      exact: false,
      label: 'Hero Media & Video',
      icon: <Video className="w-4 h-4" />,
    },
  ];

  return (
    <aside
      className={`bg-[#0A1A22] text-white flex flex-col shrink-0 min-h-screen transition-all duration-200 border-r border-white/10 ${
        collapsed ? 'w-18' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        {!collapsed && (
          <Link href="/admin-portal" className="flex items-center gap-2 group">
            <InspireZestLogo variant="full" size="sm" onDark={true} />
          </Link>
        )}
        {collapsed && (
          <Link href="/admin-portal" className="mx-auto flex items-center justify-center p-1">
            <InspireZestLogo variant="icon" size="sm" />
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded text-white/60 hover:text-white hover:bg-white/10 transition-colors hidden md:block"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav List */}
      <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
        {!collapsed && (
          <p className="px-3 py-1 text-[10px] font-bold text-white/50 uppercase tracking-wider">
            Governance & Modules
          </p>
        )}
        {navItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`w-full flex items-center ${
                collapsed ? 'justify-center px-2 py-3' : 'justify-between px-3.5 py-2.5'
              } rounded-lg text-xs font-semibold transition-all duration-150 ${
                isActive
                  ? 'bg-[#00829B] text-white shadow-sm'
                  : 'text-white/75 hover:bg-white/5 hover:text-white'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <div className="flex items-center gap-2.5">
                <span className={isActive ? 'text-white' : 'text-white/60'}>
                  {item.icon}
                </span>
                {!collapsed && <span>{item.label}</span>}
              </div>
              {!collapsed && item.count !== undefined && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/15 text-white font-mono">
                  {item.count}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Admin User Footer */}
      <div className="p-3 border-t border-white/10 bg-black/20">
        {!collapsed ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 p-2 rounded-lg bg-white/5">
              <div className="w-8 h-8 rounded-full bg-[#00829B] text-white flex items-center justify-center font-bold text-xs shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-white truncate">
                  {adminUser?.name || 'Hospital Director'}
                </p>
                <p className="text-[10px] text-white/60 truncate">
                  {adminUser?.email || 'admin@inspirezest.com'}
                </p>
              </div>
            </div>
            <button
              onClick={() => logout('admin')}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-[#DC5555] hover:bg-[#DC5555]/10 rounded-lg transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Admin Logout</span>
            </button>
          </div>
        ) : (
          <button
            onClick={() => logout('admin')}
            className="w-full flex items-center justify-center p-2 text-[#DC5555] hover:bg-white/5 rounded-lg"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        )}
      </div>
    </aside>
  );
};
