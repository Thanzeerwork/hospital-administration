'use client';

import React, { useState } from 'react';
import { useHospital } from '@/context/HospitalContext';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { ConfirmationModal } from '@/components/common/ConfirmationModal';
import { Appointment, Prescription } from '@/types';
import {
  Calendar,
  Clock,
  FileText,
  AlertCircle,
  XCircle,
  Eye,
  CheckCircle2,
  CalendarCheck,
  MapPin,
  Pill,
} from 'lucide-react';

interface MyAppointmentsProps {
  onViewPrescription: (prescription: Prescription) => void;
  onBookNewAppointment: () => void;
  onOpenAuthModal?: () => void;
}

export const MyAppointments: React.FC<MyAppointmentsProps> = ({
  onViewPrescription,
  onBookNewAppointment,
  onOpenAuthModal,
}) => {
  const { appointments, cancelAppointment, patientUser, isPatientAuthenticated } = useHospital();
  const [filterTab, setFilterTab] = useState<'all' | 'upcoming' | 'completed'>('all');
  const [cancellingAppointmentId, setCancellingAppointmentId] = useState<string | null>(null);

  // If patient is logged out, strictly protect records and prompt for authentication
  if (!isPatientAuthenticated || !patientUser) {
    return (
      <div className="py-16 px-4 max-w-xl mx-auto text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#E6F3F5] text-[#00829B] flex items-center justify-center mx-auto mb-5 shadow-sm border border-[#00829B]/20">
          <Calendar className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">Patient Sign-In Required</h2>
        <p className="text-sm text-[#666666] leading-relaxed mb-6">
          To protect patient confidentiality and view your personal consultation schedule,
          clinical visit history, and e-prescriptions, please sign in to your InspireZest
          patient account.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {onOpenAuthModal && (
            <Button
              variant="primary"
              size="md"
              onClick={onOpenAuthModal}
              className="w-full sm:w-auto"
            >
              Sign In to Patient Portal
            </Button>
          )}
          <Button
            variant="outline"
            size="md"
            onClick={onBookNewAppointment}
            className="w-full sm:w-auto"
          >
            Book New Appointment
          </Button>
        </div>
      </div>
    );
  }

  // Filter strictly for the logged-in patient only
  const patientAppointments = appointments.filter(
    (apt) =>
      (patientUser.email &&
        apt.patientEmail &&
        apt.patientEmail.toLowerCase() === patientUser.email.toLowerCase()) ||
      apt.patientId === patientUser.id ||
      (patientUser.name &&
        apt.patientName &&
        apt.patientName.toLowerCase() === patientUser.name.toLowerCase())
  );

  const filteredList = patientAppointments.filter((apt) => {
    if (filterTab === 'upcoming') return apt.status === 'Confirmed';
    if (filterTab === 'completed') return apt.status === 'Completed';
    return true;
  });

  const handleConfirmCancel = () => {
    if (cancellingAppointmentId) {
      cancelAppointment(cancellingAppointmentId);
      setCancellingAppointmentId(null);
    }
  };

  const getStatusBadge = (status: Appointment['status']) => {
    switch (status) {
      case 'Confirmed':
        return <Badge variant="confirmed">Confirmed</Badge>;
      case 'Completed':
        return <Badge variant="completed">Completed</Badge>;
      case 'Cancelled':
        return <Badge variant="cancelled">Cancelled</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Page Title & Filter Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1A1A1A] tracking-tight">
            My Hospital Appointments
          </h1>
          <p className="text-xs text-[#666666] mt-0.5">
            Track confirmed clinical visits, reschedule consultations, and access doctor prescriptions.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={<CalendarCheck className="w-4 h-4" />}
          onClick={onBookNewAppointment}
        >
          Book New Appointment
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E5E7EB] pb-2">
        {[
          { id: 'all', label: 'All Consultations', count: patientAppointments.length },
          {
            id: 'upcoming',
            label: 'Upcoming Visits',
            count: patientAppointments.filter((a) => a.status === 'Confirmed').length,
          },
          {
            id: 'completed',
            label: 'Completed / Records',
            count: patientAppointments.filter((a) => a.status === 'Completed').length,
          },
        ].map((tab) => {
          const isActive = filterTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setFilterTab(tab.id as 'all' | 'upcoming' | 'completed')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                isActive
                  ? 'bg-[#00829B] text-white shadow-xs'
                  : 'text-[#666666] hover:text-[#1A1A1A] hover:bg-[#F4F6F6]'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-[#E5E7EB] text-[#1A1A1A]'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Appointment Cards List */}
      {filteredList.length > 0 ? (
        <div className="space-y-4">
          {filteredList.map((apt) => (
            <div
              key={apt.id}
              className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-xs hover:shadow-card transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
            >
              {/* Doctor & Info */}
              <div className="flex items-start gap-4 min-w-0">
                <img
                  src={apt.doctorImage}
                  alt={apt.doctorName}
                  className="w-16 h-16 rounded-xl object-cover border border-[#E5E7EB] shrink-0"
                />
                <div className="space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#666666]">
                      {apt.id}
                    </span>
                    {getStatusBadge(apt.status)}
                    {apt.prescription && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#00829B] bg-[#E6F3F5] px-2 py-0.5 rounded-md">
                        <Pill className="w-3 h-3 text-[#00829B]" />
                        Prescription Attached
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-[#1A1A1A] truncate">
                    {apt.doctorName}
                  </h3>
                  <p className="text-xs font-semibold text-[#00829B]">
                    {apt.doctorSpecialization}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#666666] pt-1">
                    <span className="flex items-center gap-1.5 font-medium text-[#1A1A1A]">
                      <Calendar className="w-3.5 h-3.5 text-[#00829B]" />
                      {apt.date}
                    </span>
                    <span className="flex items-center gap-1.5 font-medium text-[#1A1A1A]">
                      <Clock className="w-3.5 h-3.5 text-[#00829B]" />
                      {apt.timeSlot}
                    </span>
                  </div>

                  {apt.reason && (
                    <p className="text-[11px] text-[#666666] italic mt-1">
                      Reason: &quot;{apt.reason}&quot;
                    </p>
                  )}
                </div>
              </div>

              {/* Actions Area */}
              <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0 border-[#E5E7EB]">
                {/* View Prescription Button (when available) */}
                {apt.prescription && (
                  <Button
                    variant="primary"
                    size="sm"
                    icon={<FileText className="w-3.5 h-3.5" />}
                    onClick={() => onViewPrescription(apt.prescription!)}
                  >
                    View Prescription
                  </Button>
                )}

                {/* Cancel option for upcoming visits */}
                {apt.status === 'Confirmed' && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-[#DC5555] hover:bg-[#DC5555]/10 hover:border-[#DC5555]/30"
                    icon={<XCircle className="w-3.5 h-3.5" />}
                    onClick={() => setCancellingAppointmentId(apt.id)}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-xl border border-dashed border-[#E5E7EB] p-12 text-center max-w-md mx-auto">
          <div className="w-12 h-12 rounded-full bg-[#00829B]/10 text-[#00829B] flex items-center justify-center mx-auto mb-3">
            <Calendar className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-[#1A1A1A]">No appointments recorded</h4>
          <p className="text-xs text-[#666666] mt-1 mb-4">
            You currently do not have any appointments in this view category.
          </p>
          <Button variant="primary" size="sm" onClick={onBookNewAppointment}>
            Book an Appointment
          </Button>
        </div>
      )}

      {/* Confirmation Modal for cancelling appointment */}
      <ConfirmationModal
        isOpen={Boolean(cancellingAppointmentId)}
        onClose={() => setCancellingAppointmentId(null)}
        onConfirm={handleConfirmCancel}
        title="Cancel This Appointment?"
        message="Are you sure you wish to cancel this hospital appointment? Your reserved slot will be released back to the clinical schedule."
        confirmText="Yes, Cancel Appointment"
        variant="danger"
      />
    </div>
  );
};

