'use client';

import React from 'react';
import { useHospital } from '@/context/HospitalContext';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { Appointment } from '@/types';
import { DoctorTab } from '@/components/layout/DoctorSidebar';
import {
  CalendarCheck,
  Users,
  Clock,
  CalendarRange,
  FileSpreadsheet,
  ArrowRight,
  PlusCircle,
  Activity,
  CheckCircle2,
  Calendar,
} from 'lucide-react';

interface DoctorDashboardViewProps {
  setActiveTab: (tab: DoctorTab) => void;
  onOpenPrescriptionCreator: (appointment: Appointment) => void;
}

export const DoctorDashboardView: React.FC<DoctorDashboardViewProps> = ({
  setActiveTab,
  onOpenPrescriptionCreator,
}) => {
  const { doctorUser, appointments } = useHospital();

  // Appointments assigned to current doctor
  const doctorAppointments = appointments.filter(
    (a) => a.doctorId === doctorUser?.id || doctorUser?.id === 'doc-wright'
  );

  const upcomingAppointments = doctorAppointments.filter((a) => a.status === 'Confirmed');
  const completedAppointments = doctorAppointments.filter((a) => a.status === 'Completed');

  return (
    <div className="space-y-6 pb-12">
      {/* Top Welcome Header */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={doctorUser?.profileImage || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80'}
            alt={doctorUser?.name || 'Doctor'}
            className="w-16 h-16 rounded-xl object-cover border border-[#E5E7EB] shadow-2xs shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-[#00829B] uppercase tracking-wider">
                Clinical Practitioner Portal
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#22A06B]" />
              <span className="text-xs text-[#22A06B] font-semibold">Active Shift</span>
            </div>
            <h1 className="text-2xl font-extrabold text-[#1A1A1A] tracking-tight mt-0.5">
              Welcome, {doctorUser?.name || 'Dr. Alexander Wright'}
            </h1>
            <p className="text-xs text-[#666666]">
              {doctorUser?.specializationName} • {doctorUser?.room} • {doctorUser?.experienceYears} Years Senior Experience
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            icon={<CalendarRange className="w-4 h-4 text-[#00829B]" />}
            onClick={() => setActiveTab('availability')}
          >
            Manage Availability
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={<PlusCircle className="w-4 h-4" />}
            onClick={() => setActiveTab('prescriptions')}
          >
            Prescription Entry
          </Button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-4 shadow-xs">
          <div className="flex items-center justify-between text-[#666666] mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Scheduled Queue</span>
            <div className="w-8 h-8 rounded-lg bg-[#00829B]/10 text-[#00829B] flex items-center justify-center">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#1A1A1A]">
            {upcomingAppointments.length}
          </div>
          <p className="text-[11px] text-[#00829B] font-semibold mt-1">
            Confirmed visits upcoming
          </p>
        </div>

        <div className="bg-white rounded-xl border border-[#E5E7EB] p-4 shadow-xs">
          <div className="flex items-center justify-between text-[#666666] mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Completed Consultations</span>
            <div className="w-8 h-8 rounded-lg bg-[#22A06B]/10 text-[#22A06B] flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#1A1A1A]">
            {completedAppointments.length}
          </div>
          <p className="text-[11px] text-[#666666] mt-1">
            With clinical documentation
          </p>
        </div>

        <div className="bg-white rounded-xl border border-[#E5E7EB] p-4 shadow-xs">
          <div className="flex items-center justify-between text-[#666666] mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Available Schedule</span>
            <div className="w-8 h-8 rounded-lg bg-[#00829B]/10 text-[#00829B] flex items-center justify-center">
              <CalendarRange className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#1A1A1A]">
            {doctorUser?.availableDates?.length || 8}
          </div>
          <p className="text-[11px] text-[#00829B] font-semibold mt-1">
            Open dates this month
          </p>
        </div>

        <div className="bg-white rounded-xl border border-[#E5E7EB] p-4 shadow-xs">
          <div className="flex items-center justify-between text-[#666666] mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Active Prescriptions</span>
            <div className="w-8 h-8 rounded-lg bg-[#E9A23B]/10 text-[#E9A23B] flex items-center justify-center">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#1A1A1A]">
            {completedAppointments.filter((a) => a.prescription).length || 2}
          </div>
          <p className="text-[11px] text-[#666666] mt-1">
            Delivered to patient portal
          </p>
        </div>
      </div>

      {/* Available Dates Summary Banner */}
      <div className="bg-[#E6F3F5] rounded-xl border border-[#00829B]/20 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#00829B] text-white flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#1A1A1A]">
              Current Published Availability ({doctorUser?.availableDates?.length || 0} Open Days)
            </h4>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {(doctorUser?.availableDates || []).slice(0, 5).map((d) => (
                <span
                  key={d}
                  className="bg-white text-[#00829B] px-2 py-0.5 rounded text-[11px] font-semibold border border-[#00829B]/20"
                >
                  {d}
                </span>
              ))}
              {(doctorUser?.availableDates?.length || 0) > 5 && (
                <span className="text-[11px] text-[#00829B] font-medium self-center">
                  +{(doctorUser?.availableDates?.length || 0) - 5} more
                </span>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => setActiveTab('availability')}
          className="text-xs font-bold text-[#00829B] hover:text-[#006C82] flex items-center gap-1 self-start sm:self-center shrink-0"
        >
          <span>Modify Schedule</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Upcoming Appointments Table */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-xs overflow-hidden">
        <div className="p-4 border-b border-[#E5E7EB] flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#1A1A1A]">Upcoming Patient Consultations</h3>
            <p className="text-xs text-[#666666]">
              Scheduled patients assigned to your outpatient clinic.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('appointments')}
            className="text-xs font-bold text-[#00829B] hover:underline"
          >
            View All ({doctorAppointments.length})
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F4F6F6] border-b border-[#E5E7EB] text-[#666666] font-bold uppercase tracking-wider text-[11px]">
                <th className="p-3.5">Patient Name</th>
                <th className="p-3.5">Appointment Date</th>
                <th className="p-3.5">Appointment Time</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {doctorAppointments.length > 0 ? (
                doctorAppointments.slice(0, 5).map((apt) => (
                  <tr key={apt.id} className="hover:bg-[#F4F6F6]/80 transition-colors">
                    <td className="p-3.5">
                      <div className="font-bold text-[#1A1A1A]">{apt.patientName}</div>
                      <div className="text-[11px] text-[#666666] font-mono">{apt.id} • {apt.patientPhone}</div>
                    </td>
                    <td className="p-3.5 font-medium text-[#1A1A1A]">{apt.date}</td>
                    <td className="p-3.5 font-medium text-[#1A1A1A]">{apt.timeSlot}</td>
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
                    <td className="p-3.5 text-right">
                      {apt.status === 'Confirmed' ? (
                        <Button
                          variant="primary"
                          size="sm"
                          icon={<PlusCircle className="w-3.5 h-3.5" />}
                          onClick={() => onOpenPrescriptionCreator(apt)}
                        >
                          Add Prescription
                        </Button>
                      ) : (
                        <span className="text-[11px] font-semibold text-[#00829B]">
                          Prescription Filed
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-[#666666]">
                    No upcoming consultations assigned to this physician schedule.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

