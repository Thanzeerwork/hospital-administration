'use client';

import React, { useState } from 'react';
import { useHospital } from '@/context/HospitalContext';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { Modal } from '@/components/common/Modal';
import { Appointment } from '@/types';
import {
  Search,
  Filter,
  Calendar,
  Clock,
  User,
  PlusCircle,
  FileText,
  Eye,
  CheckCircle,
  XCircle,
} from 'lucide-react';

interface DoctorAppointmentsViewProps {
  onOpenPrescriptionCreator: (appointment: Appointment) => void;
  onViewPrescription: (appointment: Appointment) => void;
}

export const DoctorAppointmentsView: React.FC<DoctorAppointmentsViewProps> = ({
  onOpenPrescriptionCreator,
  onViewPrescription,
}) => {
  const { doctorUser, appointments, updateAppointmentStatus } = useHospital();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDateFilter, setSelectedDateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Confirmed' | 'Completed' | 'Cancelled'>('All');
  const [selectedPatientApt, setSelectedPatientApt] = useState<Appointment | null>(null);

  const doctorAppointments = appointments.filter(
    (a) => a.doctorId === doctorUser?.id || doctorUser?.id === 'doc-wright'
  );

  const filteredAppointments = doctorAppointments.filter((apt) => {
    const matchesName =
      apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate = !selectedDateFilter || apt.date === selectedDateFilter;
    const matchesStatus = statusFilter === 'All' || apt.status === statusFilter;

    return matchesName && matchesDate && matchesStatus;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="border-b border-[#E5E7EB] pb-4">
        <h1 className="text-2xl font-extrabold text-[#1A1A1A] tracking-tight">
          Doctor Appointment Roster
        </h1>
        <p className="text-xs text-[#666666] mt-0.5">
          Manage clinical consultation queue, inspect patient records, and author digital prescriptions.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#E5E7EB] shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#666666] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by patient name or appointment ID..."
            className="w-full pl-9 pr-3.5 py-2 text-xs text-[#1A1A1A] bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white"
          />
        </div>

        {/* Date Filter */}
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#666666] shrink-0" />
          <input
            type="date"
            value={selectedDateFilter}
            onChange={(e) => setSelectedDateFilter(e.target.value)}
            className="text-xs p-2 bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#00829B]"
          />
          {selectedDateFilter && (
            <button
              onClick={() => setSelectedDateFilter('')}
              className="text-xs text-[#DC5555] font-semibold hover:underline"
            >
              Clear
            </button>
          )}
        </div>

        {/* Status Dropdown */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-[#666666]">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as 'All' | 'Confirmed' | 'Completed' | 'Cancelled')
            }
            className="text-xs p-2 bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg text-[#1A1A1A] font-semibold focus:outline-none focus:ring-2 focus:ring-[#00829B]"
          >
            <option value="All">All Statuses</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Modern Data Table */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F4F6F6] border-b border-[#E5E7EB] text-[#666666] font-bold uppercase tracking-wider text-[11px]">
                <th className="p-3.5">Patient Details</th>
                <th className="p-3.5">Appointment Date & Time</th>
                <th className="p-3.5">Consultation Reason</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-[#F4F6F6]/80 transition-colors">
                    <td className="p-3.5">
                      <div className="font-bold text-[#1A1A1A] text-sm">{apt.patientName}</div>
                      <div className="text-[11px] text-[#666666] font-mono mt-0.5">
                        Ref: {apt.id} • {apt.patientPhone}
                      </div>
                    </td>
                    <td className="p-3.5">
                      <div className="font-semibold text-[#1A1A1A]">{apt.date}</div>
                      <div className="text-[11px] text-[#666666]">{apt.timeSlot}</div>
                    </td>
                    <td className="p-3.5 max-w-xs">
                      <p className="truncate text-xs text-[#1A1A1A]">
                        {apt.reason || 'General Health Consultation'}
                      </p>
                    </td>
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
                    <td className="p-3.5 text-right space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedPatientApt(apt)}
                      >
                        Patient Info
                      </Button>

                      {apt.status === 'Confirmed' ? (
                        <Button
                          variant="primary"
                          size="sm"
                          icon={<PlusCircle className="w-3.5 h-3.5" />}
                          onClick={() => onOpenPrescriptionCreator(apt)}
                        >
                          Write Rx
                        </Button>
                      ) : apt.prescription ? (
                        <Button
                          variant="secondary"
                          size="sm"
                          icon={<FileText className="w-3.5 h-3.5" />}
                          onClick={() => onViewPrescription(apt)}
                        >
                          View Rx
                        </Button>
                      ) : null}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-[#666666]">
                    No appointments found matching your filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Patient Information Details Modal */}
      {selectedPatientApt && (
        <Modal
          isOpen={Boolean(selectedPatientApt)}
          onClose={() => setSelectedPatientApt(null)}
          title="Patient Clinical Profile"
          subtitle={`Appointment Reference: ${selectedPatientApt.id}`}
          maxWidth="md"
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-[#F4F6F6] border border-[#E5E7EB] space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#00829B]/15 text-[#00829B] flex items-center justify-center font-bold text-sm">
                  {selectedPatientApt.patientName.charAt(0)}
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#1A1A1A]">
                    {selectedPatientApt.patientName}
                  </h4>
                  <p className="text-xs text-[#666666]">{selectedPatientApt.patientEmail}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#E5E7EB]">
                <div>
                  <span className="text-[11px] text-[#666666] block">Contact Phone:</span>
                  <span className="font-semibold text-[#1A1A1A]">
                    {selectedPatientApt.patientPhone}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-[#666666] block">Appointment Schedule:</span>
                  <span className="font-semibold text-[#00829B]">
                    {selectedPatientApt.date} at {selectedPatientApt.timeSlot}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#E5E7EB]">
                <span className="text-[11px] text-[#666666] block">Presented Symptoms / Notes:</span>
                <p className="font-medium text-[#1A1A1A] mt-1 bg-white p-2.5 rounded-lg border border-[#E5E7EB]">
                  {selectedPatientApt.reason || 'None specified.'}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedPatientApt(null)}>
                Close
              </Button>
              {selectedPatientApt.status === 'Confirmed' && (
                <Button
                  variant="primary"
                  size="sm"
                  icon={<PlusCircle className="w-3.5 h-3.5" />}
                  onClick={() => {
                    const target = selectedPatientApt;
                    setSelectedPatientApt(null);
                    onOpenPrescriptionCreator(target);
                  }}
                >
                  Proceed to Prescription
                </Button>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

