'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PatientNav } from '@/components/layout/PatientNav';
import { PatientFooter } from '@/components/layout/PatientFooter';
import { DoctorListing } from '@/components/patient/DoctorListing';
import { PatientAuthModal } from '@/components/patient/PatientAuthModal';
import { DoctorProfileModal } from '@/components/patient/DoctorProfileModal';
import { AppointmentBookingModal } from '@/components/patient/AppointmentBookingModal';
import { Doctor } from '@/types';

function DoctorListingContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category');

  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [viewingDoctorProfile, setViewingDoctorProfile] = useState<Doctor | null>(null);
  const [bookingDoctor, setBookingDoctor] = useState<Doctor | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  return (
    <div className="flex-1 flex flex-col bg-[#F4F6F6]">
      <PatientNav
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onOpenBookingModal={() => {
          setBookingDoctor(null);
          setIsBookingModalOpen(true);
        }}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <DoctorListing
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onViewDoctorProfile={(doc) => setViewingDoctorProfile(doc)}
          onBookAppointment={(doc) => {
            setBookingDoctor(doc);
            setIsBookingModalOpen(true);
          }}
        />
      </main>

      <PatientFooter />

      <PatientAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <DoctorProfileModal
        isOpen={Boolean(viewingDoctorProfile)}
        onClose={() => setViewingDoctorProfile(null)}
        doctor={viewingDoctorProfile}
        onBookAppointment={(doc) => {
          setBookingDoctor(doc);
          setIsBookingModalOpen(true);
        }}
      />

      <AppointmentBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => {
          setIsBookingModalOpen(false);
          setBookingDoctor(null);
        }}
        initialDoctor={bookingDoctor}
        onBookingSuccess={() => {}}
      />
    </div>
  );
}

export default function PatientPortalDoctorsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-[#666666]">Loading specialist directory...</div>}>
      <DoctorListingContent />
    </Suspense>
  );
}
