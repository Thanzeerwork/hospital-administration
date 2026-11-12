'use client';

import React, { useState } from 'react';
import { useHospital } from '@/context/HospitalContext';
import { Button } from '@/components/common/Button';
import { Appointment, PrescriptionMedicine } from '@/types';
import {
  FileSpreadsheet,
  Plus,
  Trash2,
  Calendar,
  CheckCircle2,
  Pill,
  Save,
  AlertCircle,
} from 'lucide-react';

interface DoctorPrescriptionViewProps {
  initialAppointment?: Appointment | null;
  onSuccessReturn?: () => void;
}

export const DoctorPrescriptionView: React.FC<DoctorPrescriptionViewProps> = ({
  initialAppointment,
  onSuccessReturn,
}) => {
  const { doctorUser, appointments, addPrescription } = useHospital();

  // Find eligible appointments (Confirmed visits with this doctor)
  const eligibleAppointments = appointments.filter(
    (a) =>
      (a.doctorId === doctorUser?.id || doctorUser?.id === 'doc-wright') &&
      a.status === 'Confirmed'
  );

  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string>(
    initialAppointment?.id || eligibleAppointments[0]?.id || ''
  );

  const selectedAppointment = appointments.find((a) => a.id === selectedAppointmentId);

  // Form State
  const [medicines, setMedicines] = useState<PrescriptionMedicine[]>([
    {
      id: 'med-1',
      name: 'Atorvastatin Calcium 20mg',
      dosage: '1 Tablet',
      frequency: 'Once Daily at Bedtime',
      duration: '30 Days',
      instructions: 'Take after meals with water.',
    },
  ]);

  const [notes, setNotes] = useState<string>(
    'Patient instructed to maintain low-sodium diet and record home blood pressure daily in mornings.'
  );

  // Helper date: 30 days ahead
  const defaultFollowUp = () => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split('T')[0];
  };

  const [followUpDate, setFollowUpDate] = useState<string>(defaultFollowUp());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAddMedicine = () => {
    const newMed: PrescriptionMedicine = {
      id: `med-${Date.now()}`,
      name: '',
      dosage: '1 Tablet',
      frequency: 'Twice daily',
      duration: '7 Days',
      instructions: 'Take after food.',
    };
    setMedicines([...medicines, newMed]);
  };

  const handleRemoveMedicine = (id: string) => {
    if (medicines.length <= 1) return;
    setMedicines(medicines.filter((m) => m.id !== id));
  };

  const handleMedicineChange = (
    id: string,
    field: keyof PrescriptionMedicine,
    value: string
  ) => {
    setMedicines(
      medicines.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const handleSavePrescription = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAppointment) return;

    // Validate that medicine names are not blank
    const validMedicines = medicines.filter((m) => m.name.trim().length > 0);
    if (validMedicines.length === 0) {
      alert('Please enter at least one medication name.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      addPrescription(selectedAppointment.id, {
        patientName: selectedAppointment.patientName,
        patientAge: 34,
        doctorName: doctorUser?.name || 'Dr. Alexander Wright',
        doctorSpecialization: doctorUser?.specializationName || 'Cardiology',
        doctorLicense: 'MD-REG-98144',
        medicines: validMedicines,
        notes,
        followUpDate,
      });

      setIsSubmitting(false);
      setIsSuccess(true);
    }, 400);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="border-b border-[#E5E7EB] pb-4">
        <h1 className="text-2xl font-extrabold text-[#1A1A1A] tracking-tight">
          Clinical Prescription Entry
        </h1>
        <p className="text-xs text-[#666666] mt-0.5">
          Generate an authenticated e-prescription for scheduled and attended hospital consultations.
        </p>
      </div>

      {isSuccess ? (
        /* Success Screen */
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-10 text-center max-w-lg mx-auto shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#22A06B]/15 text-[#22A06B] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#1A1A1A]">Prescription Recorded Successfully</h3>
            <p className="text-xs text-[#666666] mt-1">
              The digital e-prescription has been attached to the appointment record and delivered to{' '}
              <strong className="text-[#1A1A1A]">{selectedAppointment?.patientName}</strong> in their Patient Portal.
            </p>
          </div>
          <div className="pt-4 flex items-center justify-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsSuccess(false);
                onSuccessReturn && onSuccessReturn();
              }}
            >
              Return to Appointments
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setIsSuccess(false);
                setMedicines([
                  {
                    id: `med-${Date.now()}`,
                    name: '',
                    dosage: '1 Tablet',
                    frequency: 'Twice daily',
                    duration: '7 Days',
                    instructions: '',
                  },
                ]);
              }}
            >
              Write Another Prescription
            </Button>
          </div>
        </div>
      ) : (
        /* Form */
        <form onSubmit={handleSavePrescription} className="space-y-6">
          {/* Patient Selection Card */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-[#1A1A1A]">1. Patient & Appointment Context</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                  Select Patient Appointment
                </label>
                <select
                  value={selectedAppointmentId}
                  onChange={(e) => setSelectedAppointmentId(e.target.value)}
                  className="w-full p-2.5 text-xs text-[#1A1A1A] font-semibold bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
                  required
                >
                  {eligibleAppointments.map((apt) => (
                    <option key={apt.id} value={apt.id}>
                      {apt.patientName} — {apt.id} ({apt.date} at {apt.timeSlot})
                    </option>
                  ))}
                  {eligibleAppointments.length === 0 && (
                    <option value="">No pending consultations found</option>
                  )}
                </select>
              </div>

              {selectedAppointment && (
                <div className="p-3 bg-[#F4F6F6] rounded-lg border border-[#E5E7EB] text-xs">
                  <span className="text-[11px] text-[#666666] block">Patient Identification:</span>
                  <div className="font-bold text-[#1A1A1A] mt-0.5">
                    {selectedAppointment.patientName} • {selectedAppointment.patientPhone}
                  </div>
                  <div className="text-[11px] text-[#666666] mt-1">
                    Symptoms/Reason: {selectedAppointment.reason || 'General medical follow-up'}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Medicines Builder */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#1A1A1A]">2. Medications & Regimen</h3>
                <p className="text-xs text-[#666666]">
                  Specify drug names, dosage amounts, frequencies, and patient guidelines.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                icon={<Plus className="w-3.5 h-3.5" />}
                onClick={handleAddMedicine}
              >
                Add Medication
              </Button>
            </div>

            <div className="space-y-3">
              {medicines.map((med, index) => (
                <div
                  key={med.id}
                  className="p-4 rounded-xl border border-[#E5E7EB] bg-[#F4F6F6] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#00829B] flex items-center gap-1.5">
                      <Pill className="w-3.5 h-3.5" />
                      Medication #{index + 1}
                    </span>
                    {medicines.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveMedicine(med.id)}
                        className="text-[#DC5555] hover:text-[#B33030] p-1 rounded"
                        title="Remove medication"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="md:col-span-2">
                      <label className="block text-[11px] font-bold text-[#1A1A1A] mb-1">
                        Drug Name & Strength
                      </label>
                      <input
                        type="text"
                        value={med.name}
                        onChange={(e) => handleMedicineChange(med.id, 'name', e.target.value)}
                        placeholder="e.g. Amoxicillin 500mg, Metoprolol 25mg"
                        className="w-full p-2 text-xs text-[#1A1A1A] bg-white border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-[#1A1A1A] mb-1">
                        Dosage & Quantity
                      </label>
                      <input
                        type="text"
                        value={med.dosage}
                        onChange={(e) => handleMedicineChange(med.id, 'dosage', e.target.value)}
                        placeholder="e.g. 1 Tablet / 5 mL"
                        className="w-full p-2 text-xs text-[#1A1A1A] bg-white border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-[#1A1A1A] mb-1">
                        Frequency
                      </label>
                      <input
                        type="text"
                        value={med.frequency}
                        onChange={(e) =>
                          handleMedicineChange(med.id, 'frequency', e.target.value)
                        }
                        placeholder="e.g. Once daily, TID"
                        className="w-full p-2 text-xs text-[#1A1A1A] bg-white border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-[#1A1A1A] mb-1">
                        Duration
                      </label>
                      <input
                        type="text"
                        value={med.duration}
                        onChange={(e) =>
                          handleMedicineChange(med.id, 'duration', e.target.value)
                        }
                        placeholder="e.g. 7 Days, 30 Days"
                        className="w-full p-2 text-xs text-[#1A1A1A] bg-white border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
                        required
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-[#1A1A1A] mb-1">
                        Special Instructions
                      </label>
                      <input
                        type="text"
                        value={med.instructions}
                        onChange={(e) =>
                          handleMedicineChange(med.id, 'instructions', e.target.value)
                        }
                        placeholder="e.g. Take with warm water after breakfast."
                        className="w-full p-2 text-xs text-[#1A1A1A] bg-white border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Clinical Notes & Follow-up */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-[#1A1A1A]">3. Clinical Notes & Review Schedule</h3>

            <div>
              <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                Physician Clinical Notes & Dietary Recommendations
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Enter lifestyle recommendations, precautions, and dietary guidance..."
                className="w-full p-3 text-xs text-[#1A1A1A] bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white"
                required
              />
            </div>

            <div className="max-w-xs">
              <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                Recommended Follow-up Date
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-[#666666] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="date"
                  value={followUpDate}
                  onChange={(e) => setFollowUpDate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs text-[#1A1A1A] bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white"
                  required
                />
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              icon={<Save className="w-4 h-4" />}
              isLoading={isSubmitting}
              disabled={!selectedAppointment}
            >
              Issue Digital Prescription
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

