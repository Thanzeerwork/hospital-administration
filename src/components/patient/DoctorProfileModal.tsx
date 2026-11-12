'use client';

import React from 'react';
import { Modal } from '@/components/common/Modal';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { Doctor } from '@/types';
import {
  Calendar,
  Clock,
  Mail,
  Phone,
  MapPin,
  Award,
  Star,
  CheckCircle2,
  CalendarCheck,
} from 'lucide-react';

interface DoctorProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: Doctor | null;
  onBookAppointment: (doctor: Doctor) => void;
}

export const DoctorProfileModal: React.FC<DoctorProfileModalProps> = ({
  isOpen,
  onClose,
  doctor,
  onBookAppointment,
}) => {
  if (!doctor) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="lg">
      <div className="space-y-6">
        {/* Top Profile Card */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 p-5 bg-[#F4F6F6] rounded-xl border border-[#E5E7EB]">
          <img
            src={doctor.profileImage}
            alt={doctor.name}
            className="w-28 h-28 rounded-xl object-cover border-2 border-white shadow-card shrink-0"
          />
          <div className="flex-1 text-center sm:text-left min-w-0">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
              <Badge variant="teal">{doctor.specializationName}</Badge>
              <span className="flex items-center gap-1 text-xs font-bold text-[#E9A23B]">
                <Star className="w-3.5 h-3.5 fill-current" />
                {doctor.rating} ({doctor.reviewCount} verified reviews)
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-[#1A1A1A]">{doctor.name}</h3>
            <p className="text-xs text-[#00829B] font-semibold mt-0.5">
              Senior Consultant • {doctor.experienceYears} Years Clinical Experience
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 pt-3 border-t border-[#E5E7EB] text-xs text-[#666666]">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#00829B]" />
                <span className="truncate">{doctor.room}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#00829B]" />
                <span className="truncate">{doctor.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#00829B]" />
                <span className="truncate">{doctor.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-[#00829B]" />
                <span>Consultation: ${doctor.consultationFee}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Biography Section */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#666666] mb-2">
            Physician Biography & Background
          </h4>
          <p className="text-xs sm:text-sm text-[#1A1A1A] leading-relaxed bg-white p-4 rounded-lg border border-[#E5E7EB]">
            {doctor.bio}
          </p>
        </div>

        {/* Available Dates Preview */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#666666] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#00829B]" />
              <span>Doctor Available Consultation Dates</span>
            </h4>
            <span className="text-xs text-[#00829B] font-medium">
              {doctor.availableDates.length} upcoming days open
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {doctor.availableDates.slice(0, 6).map((date) => (
              <div
                key={date}
                className="px-3 py-1.5 bg-[#E6F3F5] border border-[#00829B]/20 text-[#00829B] rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
              >
                <CheckCircle2 className="w-3 h-3 text-[#22A06B]" />
                <span>{date}</span>
              </div>
            ))}
            {doctor.availableDates.length > 6 && (
              <span className="px-2.5 py-1.5 text-xs text-[#666666] font-medium">
                +{doctor.availableDates.length - 6} more days
              </span>
            )}
          </div>
        </div>

        {/* Action CTA Bar */}
        <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between gap-3">
          <div>
            <span className="text-[11px] text-[#666666] block">Fee per visit:</span>
            <span className="text-base font-extrabold text-[#1A1A1A]">
              ${doctor.consultationFee} <span className="text-xs font-normal text-[#666666]">/ session</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="md" onClick={onClose}>
              Close
            </Button>
            <Button
              variant="primary"
              size="md"
              icon={<CalendarCheck className="w-4 h-4" />}
              onClick={() => {
                onClose();
                onBookAppointment(doctor);
              }}
            >
              Book Appointment Now
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

