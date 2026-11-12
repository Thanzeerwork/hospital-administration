'use client';

import React, { useState } from 'react';
import { useHospital } from '@/context/HospitalContext';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { Doctor } from '@/types';
import {
  Search,
  Filter,
  Calendar,
  Star,
  CheckCircle2,
  CalendarCheck,
  User,
  MapPin,
  Clock,
} from 'lucide-react';

interface DoctorListingProps {
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;
  onViewDoctorProfile: (doctor: Doctor) => void;
  onBookAppointment: (doctor: Doctor) => void;
}

export const DoctorListing: React.FC<DoctorListingProps> = ({
  selectedCategory,
  setSelectedCategory,
  onViewDoctorProfile,
  onBookAppointment,
}) => {
  const { doctors, specializations } = useHospital();
  const [searchTerm, setSearchTerm] = useState('');

  // Filtered list
  const filteredDoctors = doctors.filter((doc) => {
    const matchesCategory =
      !selectedCategory ||
      selectedCategory === 'All' ||
      doc.specializationName.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specializationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.bio.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const categories = ['All', ...specializations.map((s) => s.name)];

  return (
    <div className="space-y-6 pb-16">
      {/* Page Title & Filter Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1A1A1A] tracking-tight">
            Hospital Medical Specialists
          </h1>
          <p className="text-xs text-[#666666] mt-0.5">
            Browse certified physicians, check real-time availability, and schedule your appointment.
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#666666] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search doctors by name..."
            className="w-full pl-9 pr-3.5 py-2 text-xs text-[#1A1A1A] bg-white border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B] shadow-2xs"
          />
        </div>
      </div>

      {/* Specialization Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-xs font-bold text-[#666666] uppercase tracking-wider shrink-0 flex items-center gap-1 mr-1">
          <Filter className="w-3.5 h-3.5 text-[#00829B]" />
          Specialty:
        </span>
        {categories.map((cat) => {
          const isSelected =
            (!selectedCategory && cat === 'All') || selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat === 'All' ? null : cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all ${
                isSelected
                  ? 'bg-[#00829B] text-white shadow-xs'
                  : 'bg-white text-[#1A1A1A] border border-[#E5E7EB] hover:bg-[#F4F6F6] hover:border-[#00829B]/30'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Result Count */}
      <div className="text-xs text-[#666666]">
        Showing <span className="font-bold text-[#1A1A1A]">{filteredDoctors.length}</span> doctors
        {selectedCategory && selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
      </div>

      {/* Doctor Grid */}
      {filteredDoctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-sm hover:shadow-xl hover:border-[#00829B]/40 hover:-translate-y-1.5 transition-all duration-300 ease-out flex flex-col justify-between group"
            >
              <div>
                {/* Top: Photo, Badge, Name */}
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden border border-[#E5E7EB] shadow-2xs shrink-0">
                    <img
                      src={doctor.profileImage}
                      alt={doctor.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Badge variant="teal" size="sm">
                      {doctor.specializationName}
                    </Badge>
                    <h3 className="text-base font-bold text-[#1A1A1A] group-hover:text-[#00829B] transition-colors mt-1.5 truncate">
                      {doctor.name}
                    </h3>
                    <p className="text-xs text-[#666666] font-medium mt-0.5">
                      {doctor.experienceYears} Years Clinical Experience
                    </p>
                    <div className="flex items-center gap-1.5 mt-1 text-xs">
                      <Star className="w-3.5 h-3.5 fill-[#E9A23B] text-[#E9A23B]" />
                      <span className="font-bold text-[#1A1A1A]">{doctor.rating}</span>
                      <span className="text-[#666666]">({doctor.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Bio snippet */}
                <p className="text-xs text-[#666666] line-clamp-2 mt-4 leading-relaxed">
                  {doctor.bio}
                </p>

                {/* Availability Info & Room */}
                <div className="mt-4 pt-3 border-t border-[#E5E7EB] space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[#666666] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#00829B]" />
                      Next Available:
                    </span>
                    <span className="font-semibold text-[#00829B] bg-[#E6F3F5] px-2 py-0.5 rounded">
                      {doctor.availableDates[0] || 'Schedule on Request'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#666666]">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      Location:
                    </span>
                    <span className="truncate max-w-[160px] text-[#1A1A1A] font-medium">
                      {doctor.room}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: View Profile & Book Appointment */}
              <div className="flex items-center gap-2 pt-4 mt-4 border-t border-[#E5E7EB]">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => onViewDoctorProfile(doctor)}
                >
                  View Profile
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1"
                  icon={<CalendarCheck className="w-3.5 h-3.5" />}
                  onClick={() => onBookAppointment(doctor)}
                >
                  Book Appointment
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-xl border border-dashed border-[#E5E7EB] p-12 text-center max-w-md mx-auto">
          <div className="w-12 h-12 rounded-full bg-[#F4F6F6] flex items-center justify-center text-[#666666] mx-auto mb-3">
            <Search className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-[#1A1A1A]">No specialists found</h4>
          <p className="text-xs text-[#666666] mt-1 mb-4">
            We could not find any doctors matching your selected filters or search terms.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory(null);
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

