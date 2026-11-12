'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useHospital } from '@/context/HospitalContext';
import InspireZestLogo from '@/components/common/InspireZestLogo';
import {
  Calendar,
  User,
  LogOut,
  Menu,
  X,
  MapPin,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles,
  HeartPulse,
} from 'lucide-react';

interface PatientNavProps {
  onOpenAuthModal?: () => void;
  onOpenBookingModal?: () => void;
}

export const PatientNav: React.FC<PatientNavProps> = ({
  onOpenAuthModal,
  onOpenBookingModal,
}) => {
  const pathname = usePathname();
  const { isPatientAuthenticated, patientUser, logout } = useHospital();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Dropdown states
  const [hospitalDropdownOpen, setHospitalDropdownOpen] = useState(false);
  const [specialtiesDropdownOpen, setSpecialtiesDropdownOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setHospitalDropdownOpen(false);
        setSpecialtiesDropdownOpen(false);
        setAboutDropdownOpen(false);
        setResourcesDropdownOpen(false);
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const closeAllDropdowns = () => {
    setHospitalDropdownOpen(false);
    setSpecialtiesDropdownOpen(false);
    setAboutDropdownOpen(false);
    setResourcesDropdownOpen(false);
    setProfileDropdownOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    closeAllDropdowns();
    setMobileMenuOpen(false);
    if (pathname === '/' || pathname === '/patient-portal') {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.location.href = `/patient-portal#${sectionId}`;
  };

  const hospitalsList = [
    { name: 'InspireZest Hospital, Kollam', city: 'Karbala, Kollam, Kerala' },
    { name: 'InspireZest Hospital, Trivandrum', city: 'Trivandrum, Kerala' },
    { name: 'InspireZest Hospital, Palakkad', city: 'Palakkad, Kerala' },
    { name: 'InspireZest Hospital, Panchkula', city: 'Panchkula, Haryana' },
    { name: 'InspireZest Hospital, Ambala', city: 'Ambala, Haryana' },
    { name: 'InspireZest Hospital, Jamshedpur', city: 'Jamshedpur, Jharkhand' },
  ];

  const isHomePage = pathname === '/patient-portal' || pathname === '/';

  return (
    <header
      ref={navRef}
      className={`z-50 transition-all duration-300 ${
        isHomePage
          ? `fixed top-0 left-0 right-0 ${
              isScrolled
                ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#EAEAEA]'
                : 'bg-transparent'
            }`
          : 'sticky top-0 bg-white border-b border-[#EAEAEA] shadow-xs'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-14">
        <div className="flex items-center justify-between py-2.5 sm:py-3 lg:py-2">
          {/* 1. Left Logo (InspireZest Official Logo) */}
          <div className="shrink-0 flex items-center pr-4 xl:pr-8 py-0.5">
            <Link href="/patient-portal" onClick={closeAllDropdowns} className="inline-block hover:opacity-95 transition-opacity">
              <InspireZestLogo
                variant="full"
                size="lg"
                onDark={false}
                priority
              />
            </Link>
          </div>

          {/* 2. Right Two-Tier Header (Exact Meditrina Layout & Placements) */}
          <div className="hidden lg:inline-flex flex-col items-end">
            {/* Top Row: Utility Ribbon */}
            <div className="flex items-center gap-4 text-[12px] font-medium text-[#1A1A1A] pb-1.5 pt-0.5">
              {/* Location Pill */}
              <div
                onClick={() => setHospitalDropdownOpen(!hospitalDropdownOpen)}
                className="flex items-center gap-1 hover:text-[#00829B] transition-colors cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-[#1A1A1A]" />
                <span>Kollam</span>
              </div>

              <span className="text-[#AAAAAA] font-light">|</span>

              {/* International Patients */}
              <button
                type="button"
                onClick={() => scrollToSection('facilities')}
                className="hover:text-[#00829B] transition-colors cursor-pointer text-left"
              >
                International Patients
              </button>

              <span className="text-[#AAAAAA] font-light">|</span>

              {/* Contact */}
              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="hover:text-[#00829B] transition-colors cursor-pointer text-left"
              >
                Contact
              </button>

              <span className="text-[#AAAAAA] font-light">|</span>

              {/* Emergency Helpline */}
              <a
                href="tel:9567333266"
                className="flex items-center gap-1 hover:text-[#00829B] transition-colors"
              >
                <span>Emergency 24x7:</span>
                <span className="font-bold text-[#1A1A1A] hover:text-[#00829B]">+91 9567333266</span>
              </a>
            </div>

            {/* Horizontal Thin Divider Line (Right below top ribbon) */}
            <div className="w-full border-b border-black/15 my-1" />

            {/* Bottom Row: Main Navigation Links & CTA */}
            <div className="flex items-center gap-6 xl:gap-8 pt-1 w-full justify-end">
              <nav className="flex items-center gap-5 xl:gap-7 text-[14px] font-medium text-[#1A1A1A]">
                {/* 1. Our Hospitals ⌵ */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setHospitalDropdownOpen(!hospitalDropdownOpen);
                      setSpecialtiesDropdownOpen(false);
                      setAboutDropdownOpen(false);
                      setResourcesDropdownOpen(false);
                    }}
                    className="flex items-center gap-1 hover:text-[#00829B] py-1.5 transition-colors cursor-pointer"
                  >
                    <span>Our Hospitals</span>
                    <ChevronDown className="w-3.5 h-3.5 text-[#555555]" />
                  </button>

                  {hospitalDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-[#E5E7EB] py-2 z-50 animate-fade-in">
                      <p className="px-4 py-1.5 text-[10px] font-bold text-[#888] uppercase tracking-wider">
                        Hospital Locations
                      </p>
                      {hospitalsList.map((h, i) => (
                        <div
                          key={i}
                          onClick={() => setHospitalDropdownOpen(false)}
                          className="px-4 py-2 hover:bg-[#F4F6F6] cursor-pointer"
                        >
                          <p className="text-xs font-bold text-[#1A1A1A]">{h.name}</p>
                          <p className="text-[11px] text-[#777]">{h.city}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 2. Specialities ⌵ */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setSpecialtiesDropdownOpen(!specialtiesDropdownOpen);
                      setHospitalDropdownOpen(false);
                      setAboutDropdownOpen(false);
                      setResourcesDropdownOpen(false);
                    }}
                    className="flex items-center gap-1 hover:text-[#00829B] py-1.5 transition-colors cursor-pointer"
                  >
                    <span>Specialities</span>
                    <ChevronDown className="w-3.5 h-3.5 text-[#555555]" />
                  </button>

                  {specialtiesDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-[#E5E7EB] py-2 z-50 animate-fade-in">
                      <button
                        type="button"
                        onClick={() => scrollToSection('specialities')}
                        className="w-full text-left block px-4 py-2 text-xs font-medium text-[#1A1A1A] hover:bg-[#F4F6F6] hover:text-[#00829B]"
                      >
                        Cardiology & Cathlab
                      </button>
                      <button
                        type="button"
                        onClick={() => scrollToSection('specialities')}
                        className="w-full text-left block px-4 py-2 text-xs font-medium text-[#1A1A1A] hover:bg-[#F4F6F6] hover:text-[#00829B]"
                      >
                        Paediatrics & Neonatology
                      </button>
                      <button
                        type="button"
                        onClick={() => scrollToSection('specialities')}
                        className="w-full text-left block px-4 py-2 text-xs font-medium text-[#1A1A1A] hover:bg-[#F4F6F6] hover:text-[#00829B]"
                      >
                        Obstetrics & Gynaecology
                      </button>
                      <button
                        type="button"
                        onClick={() => scrollToSection('specialities')}
                        className="w-full text-left block px-4 py-2 text-xs font-medium text-[#1A1A1A] hover:bg-[#F4F6F6] hover:text-[#00829B]"
                      >
                        Orthopaedics & Spine
                      </button>
                      <div className="border-t border-gray-100 mt-1 pt-1">
                        <button
                          type="button"
                          onClick={() => scrollToSection('specialities')}
                          className="w-full text-left block px-4 py-1.5 text-[11px] font-bold text-[#00829B]"
                        >
                          View all 22+ Specialities →
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. About ⌵ */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setAboutDropdownOpen(!aboutDropdownOpen);
                      setHospitalDropdownOpen(false);
                      setSpecialtiesDropdownOpen(false);
                      setResourcesDropdownOpen(false);
                    }}
                    className="flex items-center gap-1 hover:text-[#00829B] py-1.5 transition-colors cursor-pointer"
                  >
                    <span>About</span>
                    <ChevronDown className="w-3.5 h-3.5 text-[#555555]" />
                  </button>

                  {aboutDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-[#E5E7EB] py-2 z-50 animate-fade-in">
                      <button
                        type="button"
                        onClick={() => scrollToSection('about')}
                        className="w-full text-left block px-4 py-2 text-xs font-medium text-[#1A1A1A] hover:bg-[#F4F6F6] hover:text-[#00829B]"
                      >
                        About InspireZest Hospital
                      </button>
                      <button
                        type="button"
                        onClick={() => scrollToSection('about')}
                        className="w-full text-left block px-4 py-2 text-xs font-medium text-[#1A1A1A] hover:bg-[#F4F6F6] hover:text-[#00829B]"
                      >
                        Vision, Mission & Leadership
                      </button>
                      <button
                        type="button"
                        onClick={() => scrollToSection('about')}
                        className="w-full text-left block px-4 py-2 text-xs font-medium text-[#1A1A1A] hover:bg-[#F4F6F6] hover:text-[#00829B]"
                      >
                        NABH & NABL Accreditations
                      </button>
                    </div>
                  )}
                </div>

                {/* 4. Find a Doctor (No Chevron) */}
                <Link
                  href="/patient-portal/doctors"
                  onClick={closeAllDropdowns}
                  className="hover:text-[#00829B] py-1.5 transition-colors"
                >
                  Find a Doctor
                </Link>

                {/* 5. Resources ⌵ */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setResourcesDropdownOpen(!resourcesDropdownOpen);
                      setHospitalDropdownOpen(false);
                      setSpecialtiesDropdownOpen(false);
                      setAboutDropdownOpen(false);
                    }}
                    className="flex items-center gap-1 hover:text-[#00829B] py-1.5 transition-colors cursor-pointer"
                  >
                    <span>Resources</span>
                    <ChevronDown className="w-3.5 h-3.5 text-[#555555]" />
                  </button>

                  {resourcesDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-[#E5E7EB] py-2 z-50 animate-fade-in">
                      <button
                        type="button"
                        onClick={() => scrollToSection('packages')}
                        className="w-full text-left block px-4 py-2 text-xs font-medium text-[#1A1A1A] hover:bg-[#F4F6F6] hover:text-[#00829B]"
                      >
                        Health Packages
                      </button>
                      <button
                        type="button"
                        onClick={() => scrollToSection('updates')}
                        className="w-full text-left block px-4 py-2 text-xs font-medium text-[#1A1A1A] hover:bg-[#F4F6F6] hover:text-[#00829B]"
                      >
                        Updates & Breakthroughs
                      </button>
                      <Link
                        href="/patient-portal/appointments"
                        onClick={closeAllDropdowns}
                        className="block px-4 py-2 text-xs font-medium text-[#1A1A1A] hover:bg-[#F4F6F6] hover:text-[#00829B]"
                      >
                        My Consultations
                      </Link>
                    </div>
                  )}
                </div>
              </nav>

              {/* Meditrina Exact Cyan Pill Button */}
              <button
                type="button"
                onClick={onOpenBookingModal}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00829B] hover:bg-[#006C82] text-white text-[13px] font-bold tracking-tight shadow-md hover:shadow-cyan-900/30 transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Book an Appointment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Patient Auth Profile or Login Button */}
              {isPatientAuthenticated && patientUser ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-1.5 p-1 rounded-full hover:bg-black/5 transition-colors cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#00829B] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                      {patientUser.name.charAt(0)}
                    </div>
                    <ChevronDown className="w-3 h-3 text-[#555]" />
                  </button>

                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-[#E5E7EB] py-2 z-50 animate-fade-in">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-xs font-bold text-[#1A1A1A]">{patientUser.name}</p>
                        <p className="text-[11px] text-[#777] truncate">{patientUser.email}</p>
                      </div>
                      <Link
                        href="/patient-portal/appointments"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs text-[#1A1A1A] hover:bg-[#F4F6F6] hover:text-[#00829B]"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>My Appointments</span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          logout('patient');
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-xs text-[#DC5555] hover:bg-red-50 text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={onOpenAuthModal}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-300 text-xs font-medium text-[#1A1A1A] hover:border-[#00829B] hover:text-[#00829B] transition-colors cursor-pointer whitespace-nowrap"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Login</span>
                </button>
              )}
            </div>
          </div>

          {/* 3. Mobile View Actions & Hamburger */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              type="button"
              onClick={onOpenBookingModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#00829B] text-white text-xs font-bold shadow-sm"
            >
              <span>Book</span>
              <ArrowRight className="w-3 h-3" />
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:bg-black/5"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#EAEAEA] px-5 py-6 space-y-4 shadow-xl animate-fade-in max-h-[80vh] overflow-y-auto">
          {/* Top Utility items in mobile drawer */}
          <div className="pb-3 border-b border-gray-100 space-y-2 text-xs">
            <div className="flex items-center justify-between text-[#1A1A1A]">
              <span className="flex items-center gap-1.5 font-bold">
                <MapPin className="w-3.5 h-3.5 text-[#00829B]" />
                <span>InspireZest Hospital, Kollam</span>
              </span>
              <a href="tel:9567333266" className="text-[#00829B] font-bold">
                +91 9567333266
              </a>
            </div>
          </div>

          {/* Nav links in mobile drawer */}
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => scrollToSection('facilities')}
              className="w-full text-left py-2 text-sm font-semibold text-[#1A1A1A] hover:text-[#00829B]"
            >
              International Patients
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('specialities')}
              className="w-full text-left py-2 text-sm font-semibold text-[#1A1A1A] hover:text-[#00829B]"
            >
              Specialities
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('about')}
              className="w-full text-left py-2 text-sm font-semibold text-[#1A1A1A] hover:text-[#00829B]"
            >
              About InspireZest
            </button>
            <Link
              href="/patient-portal/doctors"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-[#1A1A1A] hover:text-[#00829B]"
            >
              Find a Doctor
            </Link>
            <button
              type="button"
              onClick={() => scrollToSection('packages')}
              className="w-full text-left py-2 text-sm font-semibold text-[#1A1A1A] hover:text-[#00829B]"
            >
              Health Packages
            </button>
            <Link
              href="/patient-portal/appointments"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-[#1A1A1A] hover:text-[#00829B]"
            >
              My Appointments
            </Link>
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="w-full text-left py-2 text-sm font-semibold text-[#1A1A1A] hover:text-[#00829B]"
            >
              Contact
            </button>
          </div>

          {/* Mobile Auth button */}
          <div className="pt-3 border-t border-gray-100">
            {isPatientAuthenticated && patientUser ? (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#1A1A1A]">{patientUser.name}</p>
                  <p className="text-[11px] text-[#777]">{patientUser.email}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout('patient');
                  }}
                  className="px-3 py-1.5 text-xs text-[#DC5555] font-semibold hover:bg-red-50 rounded"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuthModal?.();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full border border-gray-300 text-xs font-bold text-[#1A1A1A] hover:border-[#00829B]"
              >
                <User className="w-4 h-4" />
                <span>Patient Login</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default PatientNav;
