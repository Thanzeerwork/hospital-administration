'use client';

import React, { useState, useMemo } from 'react';
import { useHospital } from '@/context/HospitalContext';
import { Modal } from '@/components/common/Modal';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { Doctor, Appointment } from '@/types';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
  FileText,
  AlertCircle,
  Copy,
  CalendarCheck,
} from 'lucide-react';

interface AppointmentBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDoctor?: Doctor | null;
  onBookingSuccess?: (appointment: Appointment) => void;
}

export const AppointmentBookingModal: React.FC<AppointmentBookingModalProps> = ({
  isOpen,
  onClose,
  initialDoctor,
  onBookingSuccess,
}) => {
  const { doctors, bookAppointment, patientUser, isPatientAuthenticated } = useHospital();

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(initialDoctor ? 2 : 1);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(initialDoctor || doctors[0] || null);
  const [selectedDate, setSelectedDate] = useState<string>(
    initialDoctor?.availableDates?.[0] || doctors[0]?.availableDates?.[0] || ''
  );
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('10:00 AM');
  const [reason, setReason] = useState<string>('General Consultation and Vitals Check');
  const [patientName, setPatientName] = useState<string>(patientUser?.name || 'Eleanor Vance');
  const [patientEmail, setPatientEmail] = useState<string>(patientUser?.email || 'eleanor.vance@example.com');
  const [patientPhone, setPatientPhone] = useState<string>(patientUser?.phone || '+1 (555) 234-5678');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);

  // Calendar month state (defaults to current month)
  const [currentCalendarDate, setCurrentCalendarDate] = useState<Date>(new Date());

  // Keep selected doctor in sync when prop changes
  React.useEffect(() => {
    if (initialDoctor) {
      setSelectedDoctor(initialDoctor);
      if (initialDoctor.availableDates && initialDoctor.availableDates.length > 0) {
        setSelectedDate(initialDoctor.availableDates[0]);
      }
      setStep(2);
    }
  }, [initialDoctor]);

  // Calendar calculations
  const year = currentCalendarDate.getFullYear();
  const month = currentCalendarDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const calendarDays = useMemo(() => {
    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days: { dayNumber: number; dateString: string; isCurrentMonth: boolean }[] = [];

    // Blank padding before 1st of month
    for (let i = 0; i < firstDayIndex; i++) {
      days.push({ dayNumber: 0, dateString: '', isCurrentMonth: false });
    }

    // Days in current month
    for (let d = 1; d <= daysInMonth; d++) {
      const monthStr = String(month + 1).padStart(2, '0');
      const dayStr = String(d).padStart(2, '0');
      const dateString = `${year}-${monthStr}-${dayStr}`;
      days.push({ dayNumber: d, dateString, isCurrentMonth: true });
    }

    return days;
  }, [year, month]);

  const handlePrevMonth = () => {
    setCurrentCalendarDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentCalendarDate(new Date(year, month + 1, 1));
  };

  const handleConfirmBooking = async () => {
    if (!selectedDoctor || !selectedDate) return;
    setIsSubmitting(true);
    try {
      const res = await bookAppointment({
        doctorId: selectedDoctor.id,
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        reason,
        patientName,
        patientEmail,
        patientPhone,
      });

      if (res.success && res.appointment) {
        setConfirmedAppointment(res.appointment);
        setStep(5); // Confirmation screen
        onBookingSuccess && onBookingSuccess(res.appointment);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setConfirmedAppointment(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleReset}
      maxWidth="lg"
      title={step === 5 ? 'Booking Confirmed' : 'Book a Hospital Consultation'}
      subtitle={
        step === 5
          ? 'Your appointment has been successfully placed in the clinical schedule.'
          : `Step ${step} of 4: ${
              step === 1
                ? 'Select Specialist'
                : step === 2
                ? 'Select Appointment Date'
                : step === 3
                ? 'Select Time Slot'
                : 'Confirm Appointment Details'
            }`
      }
    >
      <div className="space-y-6">
        {/* Step Progress Bar (steps 1 - 4) */}
        {step < 5 && (
          <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4">
            {[
              { num: 1, label: 'Doctor' },
              { num: 2, label: 'Date' },
              { num: 3, label: 'Time' },
              { num: 4, label: 'Confirm' },
            ].map((s) => (
              <div key={s.num} className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    step === s.num
                      ? 'bg-[#00829B] text-white shadow-xs'
                      : step > s.num
                      ? 'bg-[#22A06B] text-white'
                      : 'bg-[#E5E7EB] text-[#666666]'
                  }`}
                >
                  {step > s.num ? '✓' : s.num}
                </div>
                <span
                  className={`text-xs font-semibold hidden sm:inline ${
                    step === s.num ? 'text-[#00829B]' : 'text-[#666666]'
                  }`}
                >
                  {s.label}
                </span>
                {s.num < 4 && (
                  <div
                    className={`w-6 sm:w-12 h-0.5 mx-1 ${
                      step > s.num ? 'bg-[#22A06B]' : 'bg-[#E5E7EB]'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* STEP 1: Select Doctor */}
        {step === 1 && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#666666]">
              Choose Available Attending Physician
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto p-1">
              {doctors.map((doc) => {
                const isSelected = selectedDoctor?.id === doc.id;
                return (
                  <div
                    key={doc.id}
                    onClick={() => {
                      setSelectedDoctor(doc);
                      if (doc.availableDates.length > 0) {
                        setSelectedDate(doc.availableDates[0]);
                      }
                    }}
                    className={`p-3.5 rounded-lg border cursor-pointer transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'border-[#00829B] bg-[#E6F3F5] shadow-xs ring-1 ring-[#00829B]'
                        : 'border-[#E5E7EB] bg-white hover:border-[#00829B]/40 hover:bg-[#F4F6F6]'
                    }`}
                  >
                    <img
                      src={doc.profileImage}
                      alt={doc.name}
                      className="w-12 h-12 rounded-lg object-cover border border-[#E5E7EB] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="text-xs font-bold text-[#1A1A1A] truncate">{doc.name}</h5>
                      <p className="text-[11px] font-semibold text-[#00829B] truncate">
                        {doc.specializationName}
                      </p>
                      <p className="text-[10px] text-[#666666] mt-0.5">
                        {doc.experienceYears} yrs experience • ${doc.consultationFee}
                      </p>
                      <span className="inline-block mt-1 text-[10px] text-[#00829B] font-medium">
                        {doc.availableDates.length} days open
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-end pt-3">
              <Button
                variant="primary"
                onClick={() => setStep(2)}
                disabled={!selectedDoctor}
              >
                Continue to Date Selection →
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: Select Date (Modern Interactive Calendar) */}
        {step === 2 && selectedDoctor && (
          <div className="space-y-4">
            {/* Doctor mini banner */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-[#F4F6F6] border border-[#E5E7EB]">
              <div className="flex items-center gap-2.5">
                <img
                  src={selectedDoctor.profileImage}
                  alt={selectedDoctor.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#E5E7EB]"
                />
                <div>
                  <h5 className="text-xs font-bold text-[#1A1A1A]">{selectedDoctor.name}</h5>
                  <p className="text-[11px] text-[#00829B] font-semibold">
                    {selectedDoctor.specializationName} • {selectedDoctor.room}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setStep(1)}
                className="text-xs font-semibold text-[#00829B] hover:underline"
              >
                Change Doctor
              </button>
            </div>

            {/* Interactive Calendar Component */}
            <div className="p-4 bg-white rounded-xl border border-[#E5E7EB] shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-sm font-bold text-[#1A1A1A]">
                    {monthNames[month]} {year}
                  </h4>
                  <p className="text-xs text-[#666666]">
                    Green dates are made available by {selectedDoctor.name}
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handlePrevMonth}
                    className="p-1.5 rounded-md border border-[#E5E7EB] hover:bg-[#F4F6F6] text-[#1A1A1A]"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextMonth}
                    className="p-1.5 rounded-md border border-[#E5E7EB] hover:bg-[#F4F6F6] text-[#1A1A1A]"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Day header */}
              <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-[#666666] uppercase tracking-wider mb-2">
                <span>Sun</span>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
              </div>

              {/* Day cells */}
              <div className="grid grid-cols-7 gap-1.5">
                {calendarDays.map((item, idx) => {
                  if (!item.isCurrentMonth) {
                    return <div key={`empty-${idx}`} className="h-10" />;
                  }

                  const isAvailable = selectedDoctor.availableDates.includes(item.dateString);
                  const isSelected = selectedDate === item.dateString;

                  return (
                    <button
                      key={item.dateString}
                      disabled={!isAvailable}
                      onClick={() => setSelectedDate(item.dateString)}
                      className={`h-11 rounded-lg text-xs font-semibold flex flex-col items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-[#00829B] text-white shadow-sm ring-2 ring-[#00829B]/30'
                          : isAvailable
                          ? 'bg-[#E6F3F5] text-[#00829B] border border-[#00829B]/30 hover:bg-[#00829B] hover:text-white'
                          : 'text-[#B8C2BD] bg-[#F4F6F6] opacity-40 cursor-not-allowed'
                      }`}
                    >
                      <span>{item.dayNumber}</span>
                      {isAvailable && (
                        <span
                          className={`w-1 h-1 rounded-full mt-0.5 ${
                            isSelected ? 'bg-white' : 'bg-[#22A06B]'
                          }`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 mt-4 pt-3 border-t border-[#E5E7EB] text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-[#E6F3F5] border border-[#00829B]/30" />
                  <span className="text-[#1A1A1A]">Doctor Available</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-[#00829B]" />
                  <span className="text-[#1A1A1A] font-semibold">Selected</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-[#F4F6F6] opacity-40" />
                  <span className="text-[#666666]">Unavailable</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Button variant="outline" onClick={() => setStep(1)}>
                ← Back
              </Button>
              <Button
                variant="primary"
                onClick={() => setStep(3)}
                disabled={!selectedDate}
              >
                Continue to Time Slot →
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: Select Time Slot */}
        {step === 3 && selectedDoctor && (
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-[#F4F6F6] border border-[#E5E7EB] flex items-center justify-between">
              <div>
                <span className="text-[11px] text-[#666666] block">Selected Consultation Date</span>
                <span className="text-xs font-bold text-[#00829B]">{selectedDate}</span>
              </div>
              <button
                onClick={() => setStep(2)}
                className="text-xs font-semibold text-[#00829B] hover:underline"
              >
                Change Date
              </button>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#666666] mb-3">
                Available Consultation Slots for {selectedDate}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {(selectedDoctor.timeSlots || [
                  '09:00 AM',
                  '10:00 AM',
                  '11:30 AM',
                  '02:00 PM',
                  '03:30 PM',
                  '04:30 PM',
                ]).map((slot) => {
                  const isSelected = selectedTimeSlot === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`p-3 rounded-lg border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                        isSelected
                          ? 'border-[#00829B] bg-[#00829B] text-white shadow-xs'
                          : 'border-[#E5E7EB] bg-white text-[#1A1A1A] hover:border-[#00829B]/40 hover:bg-[#F4F6F6]'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>{slot}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Optional consultation notes */}
            <div>
              <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                Reason for Visit / Symptoms (Optional)
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={2}
                placeholder="Describe your symptoms or reason for this appointment..."
                className="w-full p-2.5 text-xs text-[#1A1A1A] bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <Button variant="outline" onClick={() => setStep(2)}>
                ← Back
              </Button>
              <Button variant="primary" onClick={() => setStep(4)}>
                Review & Confirm →
              </Button>
            </div>
          </div>
        )}

        {/* STEP 4: Confirm Details */}
        {step === 4 && selectedDoctor && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#666666]">
              Review Appointment Summary
            </h4>

            {/* Detailed summary card */}
            <div className="p-4 rounded-xl border border-[#E5E7EB] bg-[#F4F6F6] space-y-3">
              <div className="flex items-center gap-3 pb-3 border-b border-[#E5E7EB]">
                <img
                  src={selectedDoctor.profileImage}
                  alt={selectedDoctor.name}
                  className="w-12 h-12 rounded-lg object-cover border border-[#E5E7EB]"
                />
                <div>
                  <h4 className="text-sm font-bold text-[#1A1A1A]">{selectedDoctor.name}</h4>
                  <p className="text-xs text-[#00829B] font-semibold">
                    {selectedDoctor.specializationName}
                  </p>
                  <p className="text-[11px] text-[#666666]">{selectedDoctor.room}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[11px] text-[#666666] block">Appointment Date</span>
                  <span className="font-bold text-[#1A1A1A] flex items-center gap-1.5 mt-0.5">
                    <CalendarIcon className="w-3.5 h-3.5 text-[#00829B]" />
                    {selectedDate}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-[#666666] block">Time Slot</span>
                  <span className="font-bold text-[#1A1A1A] flex items-center gap-1.5 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-[#00829B]" />
                    {selectedTimeSlot}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#E5E7EB] text-xs">
                <span className="text-[11px] text-[#666666] block">Patient Information</span>
                <p className="font-semibold text-[#1A1A1A] mt-0.5">
                  {patientName} ({patientEmail} • {patientPhone})
                </p>
                <p className="text-[11px] text-[#666666] mt-1 italic">
                  Note: &quot;{reason}&quot;
                </p>
              </div>

              <div className="pt-2 border-t border-[#E5E7EB] flex items-center justify-between text-xs">
                <span className="text-[#666666]">Estimated Consultation Fee:</span>
                <span className="font-bold text-[#00829B] text-sm">
                  ${selectedDoctor.consultationFee}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Button variant="outline" onClick={() => setStep(3)}>
                ← Back
              </Button>
              <Button
                variant="primary"
                onClick={handleConfirmBooking}
                isLoading={isSubmitting}
                icon={<CalendarCheck className="w-4 h-4" />}
              >
                Confirm & Place Appointment
              </Button>
            </div>
          </div>
        )}

        {/* STEP 5: Success Confirmation Screen */}
        {step === 5 && confirmedAppointment && (
          <div className="flex flex-col items-center text-center p-3 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#22A06B]/15 text-[#22A06B] flex items-center justify-center shadow-sm">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-[11px] font-bold tracking-wider text-[#22A06B] uppercase">
                Appointment Confirmed
              </span>
              <h3 className="text-xl font-extrabold text-[#1A1A1A] mt-0.5">
                You are all set, {confirmedAppointment.patientName}!
              </h3>
              <p className="text-xs text-[#666666] mt-1 max-w-sm">
                A confirmation has been recorded with reference number{' '}
                <span className="font-mono font-bold text-[#1A1A1A]">
                  {confirmedAppointment.id}
                </span>
                .
              </p>
            </div>

            {/* Confirmation summary card */}
            <div className="w-full p-4 rounded-xl border border-[#E5E7EB] bg-[#F4F6F6] text-left text-xs space-y-2.5">
              <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
                <span className="text-[#666666]">Booking Reference:</span>
                <span className="font-mono font-bold text-[#00829B]">
                  {confirmedAppointment.id}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#666666]">Specialist:</span>
                <span className="font-bold text-[#1A1A1A]">
                  {confirmedAppointment.doctorName} ({confirmedAppointment.doctorSpecialization})
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#666666]">Date & Time:</span>
                <span className="font-bold text-[#1A1A1A]">
                  {confirmedAppointment.date} at {confirmedAppointment.timeSlot}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-[#E5E7EB]">
                <span className="text-[#666666]">Status:</span>
                <Badge variant="confirmed">Confirmed</Badge>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full pt-2">
              <Button variant="outline" className="flex-1" onClick={handleReset}>
                Close
              </Button>
              <Button
                variant="primary"
                className="flex-1"
                onClick={handleReset}
              >
                Done
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

