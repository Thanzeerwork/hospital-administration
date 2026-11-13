'use client';

import React, { useState } from 'react';
import { useHospital } from '@/context/HospitalContext';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { Modal } from '@/components/common/Modal';
import { ConfirmationModal } from '@/components/common/ConfirmationModal';
import { Appointment } from '@/types';
import {
  Search,
  Filter,
  Calendar,
  Clock,
  User,
  CheckCircle,
  XCircle,
  FileText,
  RotateCcw,
  Eye,
} from 'lucide-react';

export const AdminAppointmentManagement: React.FC = () => {
  const { appointments, specializations, updateAppointmentStatus, cancelAppointment } =
    useHospital();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const [selectedAptDetails, setSelectedAptDetails] = useState<Appointment | null>(null);
  const [cancellingAptId, setCancellingAptId] = useState<string | null>(null);

  // Advanced Multi-filtering: Name, Date, Category, Status
  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate = !selectedDate || apt.date === selectedDate;

    const matchesCategory =
      selectedCategory === 'All' ||
      apt.doctorSpecialization.toLowerCase() === selectedCategory.toLowerCase();

    const matchesStatus = selectedStatus === 'All' || apt.status === selectedStatus;

    return matchesSearch && matchesDate && matchesCategory && matchesStatus;
  });

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedDate('');
    setSelectedCategory('All');
    setSelectedStatus('All');
  };

  const handleConfirmCancel = () => {
    if (cancellingAptId) {
      cancelAppointment(cancellingAptId);
      setCancellingAptId(null);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="border-b border-[#E5E7EB] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1A1A1A] tracking-tight">
            Hospital Appointment Master Roster
          </h1>
          <p className="text-xs text-[#666666] mt-0.5">
            Cross-departmental schedule management, audit trail, and status overrides.
          </p>
        </div>

        <div className="text-xs font-semibold text-[#666666]">
          Displaying <strong className="text-[#1A1A1A]">{filteredAppointments.length}</strong> of{' '}
          <strong className="text-[#1A1A1A]">{appointments.length}</strong> Total Records
        </div>
      </div>

      {/* Advanced Search and Filters Bar */}
      <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-[#00829B]" />
            Advanced Criteria & Multi-Filter Controls
          </span>
          <button
            onClick={handleClearFilters}
            className="text-xs font-semibold text-[#00829B] hover:underline flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            Reset All Filters
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Name & Keyword Search */}
          <div>
            <label className="block text-[11px] font-bold text-[#666666] mb-1">
              Search by Patient or Doctor
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-[#666666] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Name or Ref (e.g. APT-10821)..."
                className="w-full pl-9 pr-3 py-2 text-xs text-[#1A1A1A] bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
              />
            </div>
          </div>

          {/* Date Selector */}
          <div>
            <label className="block text-[11px] font-bold text-[#666666] mb-1">
              Appointment Date
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-[#666666] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs text-[#1A1A1A] bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
              />
            </div>
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-[11px] font-bold text-[#666666] mb-1">
              Department / Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 text-xs text-[#1A1A1A] font-semibold bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
            >
              <option value="All">All Categories</option>
              {specializations.map((spec) => (
                <option key={spec.id} value={spec.name}>
                  {spec.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status Dropdown */}
          <div>
            <label className="block text-[11px] font-bold text-[#666666] mb-1">
              Appointment Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full p-2 text-xs text-[#1A1A1A] font-semibold bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
            >
              <option value="All">All Statuses</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Appointment Data Table */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F4F6F6] border-b border-[#E5E7EB] text-[#666666] font-bold uppercase tracking-wider text-[11px]">
                <th className="p-3.5">Reference & Patient</th>
                <th className="p-3.5">Attending Doctor</th>
                <th className="p-3.5">Specialization</th>
                <th className="p-3.5">Date & Slot</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Administrative Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-[#F4F6F6]/80 transition-colors">
                    {/* Patient */}
                    <td className="p-3.5">
                      <div className="font-bold text-[#1A1A1A] text-sm">{apt.patientName}</div>
                      <div className="text-[11px] text-[#666666] font-mono mt-0.5">
                        {apt.id} • {apt.patientPhone}
                      </div>
                    </td>

                    {/* Doctor */}
                    <td className="p-3.5">
                      <div className="font-bold text-[#1A1A1A]">{apt.doctorName}</div>
                      <div className="text-[11px] text-[#666666]">Attending Consultant</div>
                    </td>

                    {/* Specialization */}
                    <td className="p-3.5">
                      <Badge variant="teal">{apt.doctorSpecialization}</Badge>
                    </td>

                    {/* Date & Time */}
                    <td className="p-3.5">
                      <div className="font-semibold text-[#1A1A1A]">{apt.date}</div>
                      <div className="text-[11px] text-[#666666]">{apt.timeSlot}</div>
                    </td>

                    {/* Status */}
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

                    {/* Actions */}
                    <td className="p-3.5 text-right space-x-1.5">
                      <Button
                        variant="outline"
                        size="sm"
                        icon={<Eye className="w-3.5 h-3.5" />}
                        onClick={() => setSelectedAptDetails(apt)}
                      >
                        Inspect
                      </Button>

                      {apt.status === 'Confirmed' && (
                        <>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => updateAppointmentStatus(apt.id, 'Completed')}
                          >
                            Mark Complete
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-[#DC5555] hover:bg-[#DC5555]/10"
                            onClick={() => setCancellingAptId(apt.id)}
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-[#666666]">
                    No appointments found matching your search and filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Appointment Details Modal */}
      {selectedAptDetails && (
        <Modal
          isOpen={Boolean(selectedAptDetails)}
          onClose={() => setSelectedAptDetails(null)}
          title={`Appointment Detail: ${selectedAptDetails.id}`}
          subtitle="Hospital Administration Inspection & Clinical Audit"
          maxWidth="md"
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-[#F4F6F6] border border-[#E5E7EB] space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
                <span className="font-mono text-[#666666]">Ref: {selectedAptDetails.id}</span>
                <Badge
                  variant={
                    selectedAptDetails.status === 'Confirmed'
                      ? 'confirmed'
                      : selectedAptDetails.status === 'Completed'
                      ? 'completed'
                      : 'cancelled'
                  }
                >
                  {selectedAptDetails.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[11px] text-[#666666] block">Patient Information:</span>
                  <p className="font-bold text-[#1A1A1A] mt-0.5">{selectedAptDetails.patientName}</p>
                  <p className="text-[11px] text-[#666666]">{selectedAptDetails.patientEmail}</p>
                  <p className="text-[11px] text-[#666666]">{selectedAptDetails.patientPhone}</p>
                </div>
                <div>
                  <span className="text-[11px] text-[#666666] block">Attending Physician:</span>
                  <p className="font-bold text-[#1A1A1A] mt-0.5">{selectedAptDetails.doctorName}</p>
                  <p className="text-[11px] text-[#00829B] font-semibold">
                    {selectedAptDetails.doctorSpecialization}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#E5E7EB]">
                <div>
                  <span className="text-[11px] text-[#666666] block">Consultation Date:</span>
                  <p className="font-semibold text-[#1A1A1A]">{selectedAptDetails.date}</p>
                </div>
                <div>
                  <span className="text-[11px] text-[#666666] block">Allocated Time Slot:</span>
                  <p className="font-semibold text-[#1A1A1A]">{selectedAptDetails.timeSlot}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-[#E5E7EB]">
                <span className="text-[11px] text-[#666666] block">Clinical Reason:</span>
                <p className="font-medium text-[#1A1A1A] mt-1 bg-white p-2.5 rounded-lg border border-[#E5E7EB]">
                  {selectedAptDetails.reason || 'Routine Health Checkup.'}
                </p>
              </div>

              {selectedAptDetails.prescription && (
                <div className="pt-2 border-t border-[#E5E7EB] bg-[#E6F3F5] p-2.5 rounded-lg text-[11px]">
                  <span className="font-bold text-[#00829B] block">
                    ✓ Prescription Filed: {selectedAptDetails.prescription.id}
                  </span>
                  <span className="text-[#1A1A1A]">
                    Includes {selectedAptDetails.prescription.medicines.length} medications • Next
                    follow-up {selectedAptDetails.prescription.followUpDate}
                  </span>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedAptDetails(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Confirmation Modal for Admin Cancel */}
      <ConfirmationModal
        isOpen={Boolean(cancellingAptId)}
        onClose={() => setCancellingAptId(null)}
        onConfirm={handleConfirmCancel}
        title="Admin Override: Cancel Appointment?"
        message="Are you sure you wish to cancel this appointment from the hospital master ledger? The reserved schedule slot will be freed."
        confirmText="Confirm Cancellation"
        variant="danger"
      />
    </div>
  );
};

