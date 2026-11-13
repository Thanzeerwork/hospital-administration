'use client';

import React, { useState, useMemo } from 'react';
import { useHospital } from '@/context/HospitalContext';
import { Button } from '@/components/common/Button';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Save,
  RotateCcw,
  Sparkles,
  Info,
} from 'lucide-react';

export const DoctorAvailabilityView: React.FC = () => {
  const { doctorUser, updateDoctorAvailability } = useHospital();

  const [availableDates, setAvailableDates] = useState<string[]>(
    doctorUser?.availableDates || []
  );
  const [currentCalendarDate, setCurrentCalendarDate] = useState<Date>(new Date());
  const [isSaving, setIsSaving] = useState(false);

  const year = currentCalendarDate.getFullYear();
  const month = currentCalendarDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const calendarDays = useMemo(() => {
    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days: { dayNumber: number; dateString: string; isCurrentMonth: boolean; dayOfWeek: number }[] = [];

    // Pad before start of month
    for (let i = 0; i < firstDayIndex; i++) {
      days.push({ dayNumber: 0, dateString: '', isCurrentMonth: false, dayOfWeek: i });
    }

    // Days in current month
    for (let d = 1; d <= daysInMonth; d++) {
      const monthStr = String(month + 1).padStart(2, '0');
      const dayStr = String(d).padStart(2, '0');
      const dateString = `${year}-${monthStr}-${dayStr}`;
      const dayOfWeek = new Date(year, month, d).getDay();
      days.push({ dayNumber: d, dateString, isCurrentMonth: true, dayOfWeek });
    }

    return days;
  }, [year, month]);

  const toggleDate = (dateString: string) => {
    setAvailableDates((prev) =>
      prev.includes(dateString)
        ? prev.filter((d) => d !== dateString)
        : [...prev, dateString].sort()
    );
  };

  const handlePrevMonth = () => {
    setCurrentCalendarDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentCalendarDate(new Date(year, month + 1, 1));
  };

  const handleSelectAllWeekdays = () => {
    const weekdayDates = calendarDays
      .filter((d) => d.isCurrentMonth && d.dayOfWeek >= 1 && d.dayOfWeek <= 5)
      .map((d) => d.dateString);

    setAvailableDates((prev) => Array.from(new Set([...prev, ...weekdayDates])).sort());
  };

  const handleClearMonth = () => {
    const currentMonthDates = calendarDays
      .filter((d) => d.isCurrentMonth)
      .map((d) => d.dateString);

    setAvailableDates((prev) => prev.filter((d) => !currentMonthDates.includes(d)));
  };

  const handleSave = () => {
    if (!doctorUser) return;
    setIsSaving(true);
    setTimeout(() => {
      updateDoctorAvailability(doctorUser.id, availableDates);
      setIsSaving(false);
    }, 400);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1A1A1A] tracking-tight">
            Clinical Availability Management
          </h1>
          <p className="text-xs text-[#666666] mt-0.5">
            Click on any calendar day to toggle your outpatient consultation availability.
          </p>
        </div>

        <Button
          variant="primary"
          icon={<Save className="w-4 h-4" />}
          onClick={handleSave}
          isLoading={isSaving}
        >
          Save Availability Schedule
        </Button>
      </div>

      {/* Info Banner */}
      <div className="p-3.5 bg-[#E6F3F5] rounded-xl border border-[#00829B]/20 flex items-start gap-3">
        <Info className="w-5 h-5 text-[#00829B] shrink-0 mt-0.5" />
        <div className="text-xs text-[#1A1A1A]">
          <span className="font-bold text-[#00829B]">Live Portal Synchronization:</span> Changes
          saved here are immediately synchronized with the Patient Portal booking calendar. Patients
          will only be permitted to book visits on highlighted available dates.
        </div>
      </div>

      {/* Calendar Card */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-xs p-6 space-y-6">
        {/* Month Navigation & Preset Quick Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-[#1A1A1A]">
              {monthNames[month]} {year}
            </h2>
            <div className="flex items-center gap-1">
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

          {/* Quick Helper Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleSelectAllWeekdays}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#F4F6F6] border border-[#E5E7EB] text-[#1A1A1A] hover:bg-[#E6F3F5] hover:text-[#00829B] hover:border-[#00829B]/30 transition-colors"
            >
              + Select All Weekdays
            </button>
            <button
              onClick={handleClearMonth}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#F4F6F6] border border-[#E5E7EB] text-[#DC5555] hover:bg-[#DC5555]/10 hover:border-[#DC5555]/30 transition-colors"
            >
              Clear This Month
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="border border-[#E5E7EB] rounded-xl overflow-hidden p-2 sm:p-4 bg-[#F4F6F6]/30">
          {/* Day of Week Header */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-[11px] sm:text-xs font-bold text-[#666666] uppercase tracking-wider mb-2 sm:mb-3">
            <span className="text-[#DC5555]">Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span className="text-[#DC5555]">Sat</span>
          </div>

          {/* Calendar Cells */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {calendarDays.map((item, idx) => {
              if (!item.isCurrentMonth) {
                return (
                  <div
                    key={`blank-${idx}`}
                    className="h-12 sm:h-16 rounded-lg bg-transparent"
                  />
                );
              }

              const isAvailable = availableDates.includes(item.dateString);

              return (
                <button
                  key={item.dateString}
                  onClick={() => toggleDate(item.dateString)}
                  className={`h-12 sm:h-16 rounded-lg sm:rounded-xl p-1 sm:p-2 flex flex-col justify-between text-left transition-all duration-150 border ${
                    isAvailable
                      ? 'bg-[#00829B] text-white border-[#00829B] shadow-sm ring-2 ring-[#00829B]/20'
                      : 'bg-white text-[#1A1A1A] border-[#E5E7EB] hover:border-[#00829B]/40 hover:bg-[#F4F6F6]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs sm:text-sm font-bold">{item.dayNumber}</span>
                    {isAvailable && (
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#22A06B]" />
                    )}
                  </div>
                  <div className="text-[9px] sm:text-[10px] font-semibold truncate">
                    <span className="hidden sm:inline">{isAvailable ? '✓ Open OPD' : 'Unavailable'}</span>
                    <span className="sm:hidden">{isAvailable ? '✓ Open' : 'Off'}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Legend & Summary */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 text-xs">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded bg-[#00829B]" />
              <span className="font-semibold text-[#1A1A1A]">Available for Consultations</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded bg-white border border-[#E5E7EB]" />
              <span className="text-[#666666]">Unavailable / Clinic Closed</span>
            </div>
          </div>

          <div className="text-xs font-semibold text-[#00829B]">
            Total Scheduled Available Days: {availableDates.length} Days
          </div>
        </div>
      </div>
    </div>
  );
};

