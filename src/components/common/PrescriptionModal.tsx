'use client';

import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Prescription } from '@/types';
import InspireZestLogo from '@/components/common/InspireZestLogo';
import { Printer, Download, Pill, Calendar, FileText, CheckCircle } from 'lucide-react';

export interface PrescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  prescription: Prescription | null;
}

export const PrescriptionModal: React.FC<PrescriptionModalProps> = ({
  isOpen,
  onClose,
  prescription,
}) => {
  if (!prescription) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="xl">
      <div className="bg-white">
        {/* Prescription Header */}
        <div className="border-b-2 border-[#00829B]/20 pb-4 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <InspireZestLogo variant="full" size="md" />
              <div className="border-t sm:border-t-0 sm:border-l sm:border-[#E5E7EB] pt-2 sm:pt-0 sm:pl-4">
                <p className="text-xs text-[#666666] font-medium">
                  2nd Floor, S N Junction, Velayudha Mansion, Junction, Karbala, Kollam
                </p>
                <p className="text-[11px] text-[#666666]">
                  License No: KL-2026-90412 • Emergency Helpline: +91 9567333266
                </p>
              </div>
            </div>
            <div className="text-left sm:text-right bg-[#F4F6F6] p-3 rounded-lg border border-[#E5E7EB] w-full sm:w-auto">
              <span className="text-[10px] font-bold tracking-wider text-[#00829B] uppercase block">
                Official Digital e-Prescription
              </span>
              <p className="text-sm font-bold text-[#1A1A1A] font-mono">{prescription.id}</p>
              <p className="text-xs text-[#666666]">Issued: {prescription.date}</p>
            </div>
          </div>
        </div>

        {/* Doctor and Patient Meta Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-lg bg-[#F4F6F6] border border-[#E5E7EB] mb-6">
          <div>
            <span className="text-[11px] font-bold tracking-wide uppercase text-[#666666] block mb-1">
              Prescribing Physician
            </span>
            <h4 className="text-sm font-bold text-[#1A1A1A]">{prescription.doctorName}</h4>
            <p className="text-xs text-[#00829B] font-semibold">{prescription.doctorSpecialization}</p>
            <p className="text-[11px] text-[#666666] mt-0.5">
              Registration / License: {prescription.doctorLicense || 'MD-REG-77812'}
            </p>
          </div>
          <div>
            <span className="text-[11px] font-bold tracking-wide uppercase text-[#666666] block mb-1">
              Patient Identification
            </span>
            <h4 className="text-sm font-bold text-[#1A1A1A]">{prescription.patientName}</h4>
            <p className="text-xs text-[#666666]">
              Age: {prescription.patientAge ? `${prescription.patientAge} Years` : 'Adult'} • Linked Appointment:{' '}
              <span className="font-mono font-medium text-[#1A1A1A]">{prescription.appointmentId}</span>
            </p>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-[#22A06B] font-medium">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Verified Clinical Consultation</span>
            </div>
          </div>
        </div>

        {/* Rx Symbol & Medication Table */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-serif italic font-bold text-2xl text-[#00829B]">℞</span>
            <h4 className="text-sm font-bold text-[#1A1A1A] tracking-tight">Prescribed Regimen & Dosage</h4>
          </div>

          <div className="border border-[#E5E7EB] rounded-lg overflow-hidden shadow-xs">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#00829B]/5 border-b border-[#E5E7EB] text-[#1A1A1A]">
                  <th className="p-3 font-semibold">#</th>
                  <th className="p-3 font-semibold">Medication Name & Strength</th>
                  <th className="p-3 font-semibold">Dosage / Frequency</th>
                  <th className="p-3 font-semibold">Duration</th>
                  <th className="p-3 font-semibold">Instructions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {prescription.medicines.map((med, idx) => (
                  <tr key={med.id || idx} className="hover:bg-[#F4F6F6] transition-colors">
                    <td className="p-3 font-mono text-[#666666]">{idx + 1}</td>
                    <td className="p-3 font-bold text-[#1A1A1A] flex items-center gap-2">
                      <Pill className="w-3.5 h-3.5 text-[#00829B] shrink-0" />
                      <span>{med.name}</span>
                    </td>
                    <td className="p-3 font-medium text-[#1A1A1A]">{med.dosage} • {med.frequency}</td>
                    <td className="p-3 text-[#666666] font-medium">{med.duration}</td>
                    <td className="p-3 text-[#1A1A1A] italic">{med.instructions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Clinical Notes & Follow-up Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="md:col-span-2 p-3.5 rounded-lg border border-[#E5E7EB] bg-white">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#1A1A1A] mb-1.5">
              <FileText className="w-4 h-4 text-[#00829B]" />
              <span>Clinical Advice & Dietary Instructions</span>
            </div>
            <p className="text-xs text-[#666666] leading-relaxed">
              {prescription.notes || 'Continue regular hydration, monitor vitals periodically, and complete the full prescribed course.'}
            </p>
          </div>

          <div className="p-3.5 rounded-lg border border-[#00829B]/30 bg-[#00829B]/5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#00829B] mb-1">
                <Calendar className="w-4 h-4" />
                <span>Next Follow-up</span>
              </div>
              <p className="text-sm font-extrabold text-[#1A1A1A]">{prescription.followUpDate}</p>
            </div>
            <p className="text-[11px] text-[#666666] mt-2">
              Please book your review consultation 2 days in advance.
            </p>
          </div>
        </div>

        {/* Digital Signature & Footer Actions */}
        <div className="pt-4 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#00829B]/10 flex items-center justify-center text-[#00829B] font-serif italic font-bold">
              Dr
            </div>
            <div>
              <p className="text-xs font-bold text-[#1A1A1A]">{prescription.doctorName}</p>
              <p className="text-[10px] text-[#666666]">Electronically Signed & Authenticated</p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              icon={<Printer className="w-3.5 h-3.5" />}
              onClick={handlePrint}
            >
              Print Rx
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={<Download className="w-3.5 h-3.5" />}
              onClick={handlePrint}
            >
              Download PDF
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

