'use client';

import React from 'react';
import { useHospital } from '@/context/HospitalContext';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { AdminTab } from '@/components/layout/AdminSidebar';
import {
  CalendarDays,
  Users2,
  Stethoscope,
  TrendingUp,
  Activity,
  Bed,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Building2,
} from 'lucide-react';

interface AdminDashboardViewProps {
  setActiveTab: (tab: AdminTab) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  setActiveTab,
}) => {
  const { appointments, patients, doctors, specializations } = useHospital();

  const totalAppointments = appointments.length;
  const confirmedAppointments = appointments.filter((a) => a.status === 'Confirmed').length;
  const completedAppointments = appointments.filter((a) => a.status === 'Completed').length;
  const cancelledAppointments = appointments.filter((a) => a.status === 'Cancelled').length;

  const totalAvailableSlots = doctors.reduce(
    (acc, doc) => acc + (doc.availableDates?.length || 0),
    0
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-[#00829B] uppercase tracking-wider">
              Executive Healthcare Command Center
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#22A06B]" />
            <span className="text-xs text-[#22A06B] font-semibold">Hospital Systems Normal</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#1A1A1A] tracking-tight mt-0.5">
            Hospital Operations Dashboard
          </h1>
          <p className="text-xs text-[#666666]">
            Live administrative telemetry for appointments, rostered specialists, and clinical departments.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveTab('blogs')}
          >
            Updates & Blogs
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveTab('doctors')}
          >
            Manage Doctors
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setActiveTab('appointments')}
          >
            All Appointments
          </Button>
        </div>
      </div>

      {/* Primary KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Appointments */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[#666666] mb-1">
              <span className="text-xs font-bold uppercase tracking-wider">
                Total Appointments
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#00829B]/10 text-[#00829B] flex items-center justify-center">
                <CalendarDays className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-[#1A1A1A]">
              {totalAppointments}
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-[#E5E7EB] flex items-center justify-between text-[11px]">
            <span className="text-[#22A06B] font-bold">{confirmedAppointments} Confirmed</span>
            <span className="text-[#666666]">{completedAppointments} Completed</span>
          </div>
        </div>

        {/* Active Patients */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[#666666] mb-1">
              <span className="text-xs font-bold uppercase tracking-wider">Active Patients</span>
              <div className="w-8 h-8 rounded-lg bg-[#00829B]/10 text-[#00829B] flex items-center justify-center">
                <Users2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-[#1A1A1A]">
              {patients.length}
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-[#E5E7EB] flex items-center justify-between text-[11px]">
            <span className="text-[#00829B] font-semibold">100% Verified Demographics</span>
            <button
              onClick={() => setActiveTab('patients')}
              className="text-[#00829B] font-bold hover:underline"
            >
              View Roster →
            </button>
          </div>
        </div>

        {/* Doctor Availability */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[#666666] mb-1">
              <span className="text-xs font-bold uppercase tracking-wider">Doctor Availability</span>
              <div className="w-8 h-8 rounded-lg bg-[#22A06B]/10 text-[#22A06B] flex items-center justify-center">
                <Stethoscope className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-[#1A1A1A]">
              {doctors.length}
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-[#E5E7EB] flex items-center justify-between text-[11px]">
            <span className="text-[#22A06B] font-bold">{totalAvailableSlots} Open Days Scheduled</span>
            <span className="text-[#666666]">4 Specialties</span>
          </div>
        </div>

        {/* Clinical Bed & Facility Occupancy */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[#666666] mb-1">
              <span className="text-xs font-bold uppercase tracking-wider">Facility Capacity</span>
              <div className="w-8 h-8 rounded-lg bg-[#E9A23B]/10 text-[#E9A23B] flex items-center justify-center">
                <Bed className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-[#1A1A1A]">84.5%</div>
          </div>
          <div className="mt-3 pt-3 border-t border-[#E5E7EB] flex items-center justify-between text-[11px]">
            <span className="text-[#1A1A1A] font-semibold">124 / 150 Beds Filled</span>
            <span className="text-[#22A06B] font-bold">Optimal Range</span>
          </div>
        </div>
      </div>

      {/* Middle Row: Department Breakdown & Doctor Availability Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Specialization Distribution */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#1A1A1A]">Department Load & Specialists</h3>
            <button
              onClick={() => setActiveTab('specializations')}
              className="text-xs font-bold text-[#00829B] hover:underline"
            >
              Configure
            </button>
          </div>

          <div className="space-y-3">
            {specializations.map((spec) => {
              const specDoctors = doctors.filter((d) => d.specializationId === spec.id || d.specializationName.toLowerCase() === spec.name.toLowerCase());
              const count = specDoctors.length || spec.doctorCount || 4;
              const percentage = Math.min(100, Math.round((count / doctors.length) * 100));

              return (
                <div key={spec.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#1A1A1A]">{spec.name}</span>
                    <span className="text-[#666666] font-mono">{count} Specialists ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-[#E5E7EB] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#00829B] h-full rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Doctor Availability Live Summary */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#1A1A1A]">Physician Roster Availability</h3>
              <p className="text-xs text-[#666666]">
                Open days published by attending consultants.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('doctors')}
              className="text-xs font-bold text-[#00829B] hover:underline"
            >
              Manage All Doctors →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {doctors.slice(0, 4).map((doc) => (
              <div
                key={doc.id}
                className="p-3 rounded-lg border border-[#E5E7EB] bg-[#F4F6F6] flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={doc.profileImage}
                    alt={doc.name}
                    className="w-10 h-10 rounded-lg object-cover border border-[#E5E7EB]"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-[#1A1A1A]">{doc.name}</h4>
                    <p className="text-[11px] text-[#00829B] font-semibold">
                      {doc.specializationName}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-0.5 rounded-full bg-[#E6F3F5] text-[#00829B] font-mono font-bold text-[11px] border border-[#00829B]/20">
                    {doc.availableDates?.length || 0} Open Days
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Appointments Overview Table */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-xs overflow-hidden">
        <div className="p-4 border-b border-[#E5E7EB] flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#1A1A1A]">Recent Hospital Appointments</h3>
            <p className="text-xs text-[#666666]">
              Real-time feed of patient bookings across all departments.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('appointments')}
            className="text-xs font-bold text-[#00829B] hover:underline"
          >
            Open Appointment Master ({appointments.length})
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F4F6F6] border-b border-[#E5E7EB] text-[#666666] font-bold uppercase tracking-wider text-[11px]">
                <th className="p-3.5">Reference & Patient</th>
                <th className="p-3.5">Attending Doctor</th>
                <th className="p-3.5">Specialization</th>
                <th className="p-3.5">Appointment Date</th>
                <th className="p-3.5">Time Slot</th>
                <th className="p-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {appointments.slice(0, 5).map((apt) => (
                <tr key={apt.id} className="hover:bg-[#F4F6F6]/80 transition-colors">
                  <td className="p-3.5">
                    <span className="font-bold text-[#1A1A1A] block">{apt.patientName}</span>
                    <span className="font-mono text-[10px] text-[#666666]">{apt.id}</span>
                  </td>
                  <td className="p-3.5 font-semibold text-[#1A1A1A]">{apt.doctorName}</td>
                  <td className="p-3.5 text-[#00829B] font-semibold">{apt.doctorSpecialization}</td>
                  <td className="p-3.5 font-medium text-[#1A1A1A]">{apt.date}</td>
                  <td className="p-3.5 font-medium text-[#666666]">{apt.timeSlot}</td>
                  <td className="p-3.5">
                    <Badge
                      variant={
                        apt.status === 'Confirmed'
                          ? 'confirmed'
                          : apt.status === 'Completed'
                          ? 'completed'
                          : 'cancelled'
                      }
                    >
                      {apt.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

