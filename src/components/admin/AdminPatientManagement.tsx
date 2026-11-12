'use client';

import React, { useState } from 'react';
import { useHospital } from '@/context/HospitalContext';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { Modal } from '@/components/common/Modal';
import { Patient } from '@/types';
import {
  Search,
  Users2,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Heart,
  Clock,
  Eye,
  FileText,
} from 'lucide-react';

export const AdminPatientManagement: React.FC = () => {
  const { patients, appointments } = useHospital();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Appointments for selected patient
  const patientAppointments = appointments.filter(
    (a) =>
      selectedPatient &&
      (a.patientId === selectedPatient.id ||
        a.patientEmail.toLowerCase() === selectedPatient.email.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="border-b border-[#E5E7EB] pb-4">
        <h1 className="text-2xl font-extrabold text-[#1A1A1A] tracking-tight">
          Patient Directory & Records
        </h1>
        <p className="text-xs text-[#666666] mt-0.5">
          View registered patients, demographic data, emergency contacts, and complete appointment histories.
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#E5E7EB] shadow-xs flex items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#666666] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search patients by name, email, phone, or MRN..."
            className="w-full pl-9 pr-3.5 py-2 text-xs text-[#1A1A1A] bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white"
          />
        </div>
        <div className="text-xs text-[#666666] font-semibold">
          Total Registered: <strong className="text-[#1A1A1A]">{patients.length}</strong>
        </div>
      </div>

      {/* Patient Table */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F4F6F6] border-b border-[#E5E7EB] text-[#666666] font-bold uppercase tracking-wider text-[11px]">
                <th className="p-3.5">Patient Details</th>
                <th className="p-3.5">Age & Gender</th>
                <th className="p-3.5">Blood Group</th>
                <th className="p-3.5">Contact Channels</th>
                <th className="p-3.5">Enrolled Date</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {filteredPatients.length > 0 ? (
                filteredPatients.map((pat) => (
                  <tr key={pat.id} className="hover:bg-[#F4F6F6]/80 transition-colors">
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#00829B]/15 text-[#00829B] flex items-center justify-center font-bold text-xs shrink-0">
                          {pat.name.charAt(0)}
                        </div>
                        <div>
                          <span className="font-bold text-[#1A1A1A] text-sm block">
                            {pat.name}
                          </span>
                          <span className="font-mono text-[10px] text-[#666666]">
                            MRN: {pat.id}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5 text-[#1A1A1A] font-medium">
                      {pat.age} yrs • {pat.gender}
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded-full bg-[#DC5555]/10 text-[#DC5555] font-bold text-[11px] border border-[#DC5555]/20">
                        {pat.bloodGroup}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <div className="text-[#1A1A1A] font-medium">{pat.email}</div>
                      <div className="text-[11px] text-[#666666]">{pat.phone}</div>
                    </td>
                    <td className="p-3.5 text-[#666666] font-mono">
                      {pat.registeredDate}
                    </td>
                    <td className="p-3.5 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        icon={<Eye className="w-3.5 h-3.5" />}
                        onClick={() => setSelectedPatient(pat)}
                      >
                        History & Info
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-[#666666]">
                    No patients found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Patient Detail & Appointment History Modal */}
      {selectedPatient && (
        <Modal
          isOpen={Boolean(selectedPatient)}
          onClose={() => setSelectedPatient(null)}
          title={`Patient Record: ${selectedPatient.name}`}
          subtitle={`Hospital Identification Number: ${selectedPatient.id}`}
          maxWidth="lg"
        >
          <div className="space-y-6 text-xs">
            {/* Demographics Card */}
            <div className="p-4 rounded-xl bg-[#F4F6F6] border border-[#E5E7EB] space-y-3">
              <div className="flex items-center gap-3 pb-3 border-b border-[#E5E7EB]">
                <div className="w-12 h-12 rounded-xl bg-[#00829B] text-white flex items-center justify-center font-bold text-base">
                  {selectedPatient.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1A1A1A]">
                    {selectedPatient.name}
                  </h3>
                  <p className="text-xs text-[#666666]">
                    {selectedPatient.age} Years Old • {selectedPatient.gender} • Blood Type: {selectedPatient.bloodGroup}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[11px] text-[#666666] block">Primary Contact</span>
                  <p className="font-semibold text-[#1A1A1A] mt-0.5">{selectedPatient.email}</p>
                  <p className="text-[11px] text-[#666666]">{selectedPatient.phone}</p>
                </div>
                <div>
                  <span className="text-[11px] text-[#666666] block">Residential Address</span>
                  <p className="font-medium text-[#1A1A1A] mt-0.5">{selectedPatient.address}</p>
                </div>
                <div className="sm:col-span-2 pt-2 border-t border-[#E5E7EB]">
                  <span className="text-[11px] text-[#666666] block">Emergency Contact</span>
                  <p className="font-bold text-[#DC5555] mt-0.5">
                    {selectedPatient.emergencyContact}
                  </p>
                </div>
              </div>
            </div>

            {/* Appointment History */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#666666] mb-3 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#00829B]" />
                <span>Hospital Appointment History ({patientAppointments.length} Recorded)</span>
              </h4>

              {patientAppointments.length > 0 ? (
                <div className="space-y-2.5 max-h-64 overflow-y-auto">
                  {patientAppointments.map((apt) => (
                    <div
                      key={apt.id}
                      className="p-3 bg-white border border-[#E5E7EB] rounded-lg flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#1A1A1A]">{apt.doctorName}</span>
                          <span className="text-[11px] text-[#00829B] font-semibold">
                            ({apt.doctorSpecialization})
                          </span>
                        </div>
                        <div className="text-[11px] text-[#666666] mt-0.5">
                          {apt.date} at {apt.timeSlot} • Ref: {apt.id}
                        </div>
                      </div>
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
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[#666666] bg-white p-4 rounded-lg border border-[#E5E7EB] text-center">
                  No appointments logged for this patient yet.
                </p>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedPatient(null)}>
                Close Record
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

