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
  ChevronRight,
  ArrowRight,
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

  // Active Expanding Mega Menu state: 'hospitals' | 'specialities' | 'about' | 'resources' | null
  const [activeMegaMenu, setActiveMegaMenu] = useState<
    'hospitals' | 'specialities' | 'about' | 'resources' | null
  >(null);

  const navRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside to close menus
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMegaMenu(null);
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseEnter = (menu: 'hospitals' | 'specialities' | 'about' | 'resources') => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setActiveMegaMenu(menu);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 180);
  };

  const handlePanelMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
  };

  const closeAllMenus = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setActiveMegaMenu(null);
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    closeAllMenus();
    if (pathname === '/' || pathname === '/patient-portal') {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.location.href = `/patient-portal#${sectionId}`;
  };

  // Hospital Network Locations
  const hospitalsList = [
    { name: 'InspireZest Hospital, Kollam', city: 'Karbala, Kollam, Kerala' },
    { name: 'InspireZest Hospital, Trivandrum', city: 'Trivandrum, Kerala' },
    { name: 'InspireZest Hospital, Palakkad', city: 'Palakkad, Kerala' },
    { name: 'InspireZest Hospital, Ambala', city: 'Ambala, Haryana' },
    { name: 'InspireZest Hospital, Faridabad', city: 'Faridabad, Haryana' },
    { name: 'InspireZest Hospital, Jamshedpur', city: 'Jamshedpur, Jharkhand' },
    { name: 'InspireZest Hospital, Panchkula', city: 'Panchkula, Haryana' },
    { name: 'InspireZest Hospital, Gurugram', city: 'Gurugram, Haryana' },
    { name: 'InspireZest Hospital, Dehradun', city: 'Dehradun, Uttarakhand' },
    { name: 'InspireZest Hospital, Male', city: 'Male, Maldives' },
  ];

  // 21 Meditrina Specialities in 3 columns
  const specialitiesCol1 = [
    'Anaesthesiology & Critical Care',
    'Clinical Pathology',
    'ENT',
    'General Surgery',
    'Neurology',
    'Orthopaedics',
    'Pulmonology',
    'Urology',
  ];

  const specialitiesCol2 = [
    'Cardiology',
    'Dentistry',
    'Gastroenterology',
    'Infertility and Reproductive Medicine',
    'Neurosurgery',
    'Paediatrics & Neonatology',
    'Radiology',
  ];

  const specialitiesCol3 = [
    'Cardiothoracic Vascular Surgery',
    'Dermatology',
    'General Medicine',
    'Nephrology',
    'Obstetrics & Gynaecology',
    'Psychiatry',
    'Surgical Gastroenterology',
  ];

  const isHomePage = pathname === '/patient-portal' || pathname === '/';
  const isNavbarTransparent = isHomePage && !isScrolled && !activeMegaMenu && !mobileMenuOpen;

  return (
    <header
      ref={navRef}
      onMouseLeave={handleMouseLeave}
      className={`z-50 transition-all duration-300 ${
        isHomePage
          ? `fixed top-0 left-0 right-0 ${
              isScrolled || activeMegaMenu || mobileMenuOpen
                ? 'bg-[#FAFAFA] shadow-sm border-b border-[#EAEAEA] text-[#1A1A1A] backdrop-blur supports-backdrop-filter:bg-[#FAFAFA]'
                : 'bg-transparent text-white'
            }`
          : 'sticky top-0 bg-[#FAFAFA] border-b border-[#EAEAEA] shadow-xs text-[#1A1A1A]'
      }`}
    >
      <div className="mx-auto w-full max-w-[90rem] 2xl:max-w-[110rem] px-4 sm:px-8 lg:px-10 2xl:px-15 3xl:max-w-[120rem] 3xl:px-20 pt-3 xl:pt-5 pb-4 xl:pb-5">
        
        {/* Tier 1: Utility Ribbon (Hidden on < xl, Visible on xl+) */}
        <div>
          <div className="relative z-50 hidden xl:block">
            <div
              className={`ml-auto flex max-w-full flex-wrap items-center justify-end gap-3 pb-2 text-sm 2xl:gap-4 2xl:text-base ${
                isNavbarTransparent ? 'text-white' : 'text-[#1A1A1A]'
              }`}
            >
              {/* Location Pill */}
              <div
                onClick={() =>
                  setActiveMegaMenu((prev) => (prev === 'hospitals' ? null : 'hospitals'))
                }
                className="inline-flex items-center gap-1.5 font-medium transition-colors duration-200 hover:text-sky-500 cursor-pointer"
              >
                <MapPin className="w-4 h-4" />
                <span>Kollam</span>
              </div>

              <span
                className={`mx-3 hidden h-4 w-px sm:block ${
                  isNavbarTransparent ? 'bg-white/40' : 'bg-[#6E6E6E]'
                }`}
                aria-hidden="true"
              />

              {/* International Patients */}
              <button
                type="button"
                onClick={() => scrollToSection('facilities')}
                className="font-medium transition-colors duration-200 hover:text-sky-500 cursor-pointer text-left"
              >
                International Patients
              </button>

              <span
                className={`mx-3 hidden h-4 w-px sm:block ${
                  isNavbarTransparent ? 'bg-white/40' : 'bg-[#6E6E6E]'
                }`}
                aria-hidden="true"
              />

              {/* Contact */}
              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="font-medium transition-colors duration-200 hover:text-sky-500 cursor-pointer text-left"
              >
                Contact
              </button>

              <span
                className={`mx-3 hidden h-4 w-px sm:block ${
                  isNavbarTransparent ? 'bg-white/40' : 'bg-[#6E6E6E]'
                }`}
                aria-hidden="true"
              />

              {/* Emergency Helpline */}
              <a
                href="tel:9567333266"
                className="font-medium transition-colors duration-200 hover:text-sky-500"
              >
                <span>Emergency 24x7: </span>
                <span className="font-bold">+91 9567333266</span>
              </a>
            </div>
          </div>
        </div>

        {/* Tier 2: Main Navigation Bar Row (h-24 on mobile/tablet, xl:h-23 on desktop matching Meditrina exact dimensions) */}
        <div className="relative z-10 flex h-24 min-w-0 items-center xl:h-23">
          {/* 1. Left Logo (InspireZest Official Logo with Meditrina sizing & positioning) */}
          <Link
            href="/patient-portal"
            onClick={closeAllMenus}
            className="-mt-1 inline-flex shrink-0 items-center xl:-mt-10 hover:opacity-95 transition-opacity"
          >
            <InspireZestLogo
              variant="full"
              size="lg"
              onDark={isNavbarTransparent}
              priority
              className="h-auto w-[175px] sm:w-[195px] xl:w-[273px] block"
            />
          </Link>

          {/* 2. Desktop Navigation Menu on Right (hidden on < xl, visible xl:flex) */}
          <div
            className={`ml-auto hidden min-w-0 max-w-[calc(100%-11.5rem)] items-center gap-3 border-t pt-5 xl:flex 2xl:max-w-none 2xl:gap-8 ${
              isNavbarTransparent ? 'border-white/20' : 'border-black/20'
            }`}
          >
            <nav
              className={`flex min-w-0 flex-1 flex-wrap items-center justify-end gap-x-3 gap-y-2 pr-2 text-sm font-medium 2xl:gap-x-6 2xl:text-base ${
                isNavbarTransparent ? 'text-white' : 'text-[#1A1A1A]'
              }`}
            >
              {/* 1. Our Hospitals ⌵ */}
              <div
                className="relative py-2 -mx-2 -mb-8 -mt-2 px-2 pb-8 pt-2"
                onMouseEnter={() => handleMouseEnter('hospitals')}
              >
                <button
                  type="button"
                  onClick={() =>
                    setActiveMegaMenu((prev) => (prev === 'hospitals' ? null : 'hospitals'))
                  }
                  className={`inline-flex items-center gap-1 tracking-wide transition-colors duration-200 cursor-pointer ${
                    activeMegaMenu === 'hospitals'
                      ? 'text-sky-500'
                      : isNavbarTransparent
                      ? 'text-white hover:text-sky-400'
                      : 'text-black hover:text-sky-500'
                  }`}
                >
                  <span>Our Hospitals</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeMegaMenu === 'hospitals' ? 'rotate-180 text-sky-500' : ''
                    }`}
                  />
                </button>
              </div>

              {/* 2. Specialities ⌵ */}
              <div
                className="relative py-2 -mx-2 -mb-8 -mt-2 px-2 pb-8 pt-2"
                onMouseEnter={() => handleMouseEnter('specialities')}
              >
                <button
                  type="button"
                  onClick={() =>
                    setActiveMegaMenu((prev) => (prev === 'specialities' ? null : 'specialities'))
                  }
                  className={`inline-flex items-center gap-1 tracking-wide transition-colors duration-200 cursor-pointer ${
                    activeMegaMenu === 'specialities'
                      ? 'text-sky-500'
                      : isNavbarTransparent
                      ? 'text-white hover:text-sky-400'
                      : 'text-black hover:text-sky-500'
                  }`}
                >
                  <span>Specialities</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeMegaMenu === 'specialities' ? 'rotate-180 text-sky-500' : ''
                    }`}
                  />
                </button>
              </div>

              {/* 3. About ⌵ */}
              <div
                className="relative py-2 -mx-2 -mb-8 -mt-2 px-2 pb-8 pt-2"
                onMouseEnter={() => handleMouseEnter('about')}
              >
                <button
                  type="button"
                  onClick={() =>
                    setActiveMegaMenu((prev) => (prev === 'about' ? null : 'about'))
                  }
                  className={`inline-flex items-center gap-1 tracking-wide transition-colors duration-200 cursor-pointer ${
                    activeMegaMenu === 'about'
                      ? 'text-sky-500'
                      : isNavbarTransparent
                      ? 'text-white hover:text-sky-400'
                      : 'text-black hover:text-sky-500'
                  }`}
                >
                  <span>About</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeMegaMenu === 'about' ? 'rotate-180 text-sky-500' : ''
                    }`}
                  />
                </button>
              </div>

              {/* 4. Find a Doctor (No Chevron) */}
              <Link
                href="/patient-portal/doctors"
                onMouseEnter={() => setActiveMegaMenu(null)}
                onClick={closeAllMenus}
                className={`tracking-wide transition-colors duration-200 py-1.5 ${
                  isNavbarTransparent
                    ? 'text-white hover:text-sky-400'
                    : 'text-black hover:text-sky-500'
                }`}
              >
                Find a Doctor
              </Link>

              {/* 5. Resources ⌵ */}
              <div
                className="relative py-2 -mx-2 -mb-8 -mt-2 px-2 pb-8 pt-2"
                onMouseEnter={() => handleMouseEnter('resources')}
              >
                <button
                  type="button"
                  onClick={() =>
                    setActiveMegaMenu((prev) => (prev === 'resources' ? null : 'resources'))
                  }
                  className={`inline-flex items-center gap-1 tracking-wide transition-colors duration-200 cursor-pointer ${
                    activeMegaMenu === 'resources'
                      ? 'text-sky-500'
                      : isNavbarTransparent
                      ? 'text-white hover:text-sky-400'
                      : 'text-black hover:text-sky-500'
                  }`}
                >
                  <span>Resources</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeMegaMenu === 'resources' ? 'rotate-180 text-sky-500' : ''
                    }`}
                  />
                </button>
              </div>
            </nav>

            {/* CTAs: Meditrina Exact Cyan Pill Button & Patient Auth */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={onOpenBookingModal}
                className="group relative inline-flex items-center gap-2.5 rounded-full border border-[#0E88AA] bg-[#0E88AA] text-white hover:border-[#0B6F8E] hover:bg-[#0B6F8E] font-medium transition-[background-color,border-color,color,box-shadow] duration-300 ease-out shadow-sm hover:scale-[1.02] active:scale-[0.98] cursor-pointer whitespace-nowrap px-5 py-2.5 text-sm 2xl:px-7 2xl:py-3 2xl:text-[15px]"
              >
                <span>Book an Appointment</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>

              {/* Patient Auth Profile or Login Button */}
              {isPatientAuthenticated && patientUser ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-1.5 p-1 rounded-full hover:bg-black/5 transition-colors cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#00829B] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                      {patientUser.name.charAt(0)}
                    </div>
                    <ChevronDown
                      className={`w-3.5 h-3.5 ${isNavbarTransparent ? 'text-white' : 'text-[#555]'}`}
                    />
                  </button>

                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-[#E5E7EB] py-2 z-50 animate-fade-in text-[#1A1A1A]">
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
                        className="w-full flex items-center gap-2 px-4 py-2 text-xs text-[#DC5555] hover:bg-red-50 text-left cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/patient-portal/login"
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    isNavbarTransparent
                      ? 'border-white/40 text-white hover:border-[#00829B] hover:bg-white/10'
                      : 'border-gray-300 text-[#1A1A1A] hover:border-[#00829B] hover:text-[#00829B]'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>

          {/* 3. Mobile/Tablet Navigation Right Section (xl:hidden) */}
          <div className="ml-auto flex items-center gap-2 sm:gap-3 xl:hidden">
            {/* Location Pill for mobile/tablet */}
            <div
              onClick={() =>
                setActiveMegaMenu((prev) => (prev === 'hospitals' ? null : 'hospitals'))
              }
              className={`hidden sm:inline-flex items-center gap-1.5 text-sm font-medium cursor-pointer ${
                isNavbarTransparent ? 'text-white' : 'text-[#1A1A1A]'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Kollam</span>
            </div>

            <button
              type="button"
              onClick={onOpenBookingModal}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-[#00829B] hover:bg-[#006C82] text-white text-xs font-bold shadow-sm whitespace-nowrap active:scale-95 transition-all"
            >
              <span>Book</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Auth status or avatar */}
            {isPatientAuthenticated && patientUser ? (
              <Link
                href="/patient-portal/appointments"
                className="w-8 h-8 rounded-full bg-[#00829B] text-white flex items-center justify-center font-bold text-xs shadow-sm"
              >
                {patientUser.name.charAt(0)}
              </Link>
            ) : null}

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2.5 rounded-lg transition-colors cursor-pointer ${
                isNavbarTransparent
                  ? 'text-white hover:bg-white/10'
                  : 'text-gray-800 hover:bg-black/5'
              }`}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-900" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* FULL-WIDTH MEGA MENU EXPANDING CONTAINER (Exact Meditrina Layout & Structure) */}
      {activeMegaMenu && (
        <div
          onMouseEnter={handlePanelMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="absolute top-full left-0 right-0 z-40 bg-[#FAFAFA] text-black border-b border-gray-200/90 shadow-2xl transition-all duration-200 animate-in fade-in"
        >
          <div className="mx-auto w-full max-w-[90rem] 2xl:max-w-[110rem] px-4 sm:px-8 lg:px-10 2xl:px-15 3xl:max-w-[120rem] 3xl:px-20 py-10 lg:py-14">
            {/* 1. OUR HOSPITALS MEGA MENU */}
            {activeMegaMenu === 'hospitals' && (
              <div className="grid grid-cols-1 md:grid-cols-[340px_1fr] lg:grid-cols-[380px_1fr] gap-12 lg:gap-16 items-start">
                <div>
                  <h3 className="mb-6 text-[36px] lg:text-[40px] leading-[1.05] font-medium text-[#00829B]">
                    Where We Serve
                  </h3>
                  <div className="relative h-[200px] w-[310px] rounded-xl overflow-hidden shadow-sm">
                    <img
                      src="https://www.meditrinahospitals.com/images/home/our-hospital-nav.webp"
                      alt="InspireZest hospital building"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_240px] gap-8 md:gap-12 md:pl-4">
                  <div>
                    <h4 className="mb-8 text-xl font-semibold leading-none text-black">Our Hospitals</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5 text-[15px] font-medium">
                      {hospitalsList.map((h, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => {
                            closeAllMenus();
                            scrollToSection('contact');
                          }}
                          className="text-left text-black hover:text-[#00829B] transition-colors cursor-pointer"
                        >
                          {h.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="hidden w-px self-stretch bg-zinc-300 md:block" aria-hidden="true" />

                  <div className="md:pl-4">
                    <h4 className="mb-8 text-xl font-semibold leading-none text-black">Quick Access</h4>
                    <div className="space-y-5 text-[15px] font-medium">
                      <Link
                        href="/patient-portal/doctors"
                        onClick={closeAllMenus}
                        className="block text-black hover:text-[#00829B] transition-colors"
                      >
                        Find a Doctor
                      </Link>
                      <button
                        type="button"
                        onClick={() => scrollToSection('packages')}
                        className="block text-left text-black hover:text-[#00829B] transition-colors cursor-pointer"
                      >
                        Health Checkup Packages
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          closeAllMenus();
                          onOpenBookingModal?.();
                        }}
                        className="block text-left text-black hover:text-[#00829B] transition-colors cursor-pointer"
                      >
                        Book an Appointment
                      </button>
                      <button
                        type="button"
                        onClick={() => scrollToSection('facilities')}
                        className="block text-left text-black hover:text-[#00829B] transition-colors cursor-pointer"
                      >
                        International Patients
                      </button>
                      <button
                        type="button"
                        onClick={() => scrollToSection('about')}
                        className="block text-left text-black hover:text-[#00829B] transition-colors cursor-pointer"
                      >
                        FAQ
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. SPECIALITIES MEGA MENU */}
            {activeMegaMenu === 'specialities' && (
              <div className="grid grid-cols-1 md:grid-cols-[380px_1fr] lg:grid-cols-[410px_1fr] gap-12 lg:gap-16 items-start">
                <div className="max-w-[390px]">
                  <h3 className="mb-6 text-[36px] lg:text-[40px] leading-[1.05] font-medium text-[#00829B]">
                    Specialized Care for Every Stage of Life
                  </h3>
                  <p className="mb-8 text-[15px] leading-relaxed font-medium text-black">
                    Explore InspireZest’s advanced medical specialties, delivering expert-led treatment,
                    modern technology, and patient-focused care across every discipline.
                  </p>
                  <button
                    type="button"
                    onClick={() => scrollToSection('specialities')}
                    className="group inline-flex items-center gap-3 text-base font-semibold text-black cursor-pointer"
                  >
                    <span className="border-b border-transparent group-hover:border-black transition-all">
                      View Specialities
                    </span>
                    <div className="w-6 h-6 rounded-full bg-[#00829B] group-hover:bg-[#006C82] text-white flex items-center justify-center transition-transform group-hover:scale-110">
                      <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                    </div>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-5 text-[15px] font-medium">
                  {/* Column 1 */}
                  <div className="space-y-4">
                    {specialitiesCol1.map((spec, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          closeAllMenus();
                          window.location.href = `/patient-portal/doctors?category=${encodeURIComponent(spec)}`;
                        }}
                        className="block w-full text-left text-black hover:text-[#00829B] transition-colors cursor-pointer"
                      >
                        {spec}
                      </button>
                    ))}
                  </div>

                  {/* Column 2 */}
                  <div className="space-y-4">
                    {specialitiesCol2.map((spec, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          closeAllMenus();
                          window.location.href = `/patient-portal/doctors?category=${encodeURIComponent(spec)}`;
                        }}
                        className="block w-full text-left text-black hover:text-[#00829B] transition-colors cursor-pointer"
                      >
                        {spec}
                      </button>
                    ))}
                  </div>

                  {/* Column 3 */}
                  <div className="space-y-4">
                    {specialitiesCol3.map((spec, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          closeAllMenus();
                          window.location.href = `/patient-portal/doctors?category=${encodeURIComponent(spec)}`;
                        }}
                        className="block w-full text-left text-black hover:text-[#00829B] transition-colors cursor-pointer"
                      >
                        {spec}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 3. ABOUT MEGA MENU */}
            {activeMegaMenu === 'about' && (
              <div className="grid grid-cols-1 md:grid-cols-[360px_1fr] lg:grid-cols-[395px_1fr] gap-12 lg:gap-16 items-start">
                <div className="max-w-[380px]">
                  <h3 className="mb-6 text-[36px] lg:text-[40px] leading-[1.05] font-medium text-[#00829B]">
                    Driven by Care.
                    <br />
                    Defined by Excellence.
                  </h3>
                  <p className="mb-8 text-[15px] leading-relaxed font-medium text-black">
                    Learn more about InspireZest's journey, values, leadership, and commitment to
                    advanced patient-centered healthcare.
                  </p>
                  <button
                    type="button"
                    onClick={() => scrollToSection('about')}
                    className="group inline-flex items-center gap-3 text-base font-semibold text-black cursor-pointer"
                  >
                    <span className="border-b border-transparent group-hover:border-black transition-all">
                      Learn More About Us
                    </span>
                    <div className="w-6 h-6 rounded-full bg-[#00829B] group-hover:bg-[#006C82] text-white flex items-center justify-center transition-transform group-hover:scale-110">
                      <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                    </div>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_240px] gap-8 md:gap-12 md:pl-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6 text-[15px] font-medium">
                    <div className="space-y-6">
                      <button
                        type="button"
                        onClick={() => scrollToSection('about')}
                        className="block text-left text-black hover:text-[#00829B] transition-colors cursor-pointer"
                      >
                        InspireZest Group
                      </button>
                      <button
                        type="button"
                        onClick={() => scrollToSection('doctors')}
                        className="block text-left text-black hover:text-[#00829B] transition-colors cursor-pointer"
                      >
                        Leadership
                      </button>
                      <button
                        type="button"
                        onClick={() => scrollToSection('about')}
                        className="block text-left text-black hover:text-[#00829B] transition-colors cursor-pointer"
                      >
                        Quality Policy
                      </button>
                      <button
                        type="button"
                        onClick={() => scrollToSection('updates')}
                        className="block text-left text-black hover:text-[#00829B] transition-colors cursor-pointer"
                      >
                        What's New
                      </button>
                    </div>

                    <div className="space-y-6">
                      <button
                        type="button"
                        onClick={() => scrollToSection('facilities')}
                        className="block text-left text-black hover:text-[#00829B] transition-colors cursor-pointer"
                      >
                        Facilities
                      </button>
                      <button
                        type="button"
                        onClick={() => scrollToSection('contact')}
                        className="block text-left text-black hover:text-[#00829B] transition-colors cursor-pointer"
                      >
                        Careers
                      </button>
                      <button
                        type="button"
                        onClick={() => scrollToSection('contact')}
                        className="block text-left text-black hover:text-[#00829B] transition-colors cursor-pointer"
                      >
                        Contact
                      </button>
                    </div>
                  </div>

                  <div className="hidden w-px self-stretch bg-zinc-300 md:block" aria-hidden="true" />

                  <div className="md:pl-4">
                    <h4 className="mb-8 text-xl font-semibold leading-none text-black">Quick Access</h4>
                    <div className="space-y-5 text-[15px] font-medium">
                      <Link
                        href="/patient-portal/doctors"
                        onClick={closeAllMenus}
                        className="block text-black hover:text-[#00829B] transition-colors"
                      >
                        Find a Doctor
                      </Link>
                      <button
                        type="button"
                        onClick={() => scrollToSection('packages')}
                        className="block text-left text-black hover:text-[#00829B] transition-colors cursor-pointer"
                      >
                        Health Checkup Packages
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          closeAllMenus();
                          onOpenBookingModal?.();
                        }}
                        className="block text-left text-black hover:text-[#00829B] transition-colors cursor-pointer"
                      >
                        Book an Appointment
                      </button>
                      <button
                        type="button"
                        onClick={() => scrollToSection('facilities')}
                        className="block text-left text-black hover:text-[#00829B] transition-colors cursor-pointer"
                      >
                        International Patients
                      </button>
                      <button
                        type="button"
                        onClick={() => scrollToSection('about')}
                        className="block text-left text-black hover:text-[#00829B] transition-colors cursor-pointer"
                      >
                        FAQ
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. RESOURCES MEGA MENU */}
            {activeMegaMenu === 'resources' && (
              <div className="grid grid-cols-1 md:grid-cols-[360px_1fr] lg:grid-cols-[395px_1fr] gap-12 lg:gap-16 items-start">
                <div className="max-w-[380px]">
                  <h3 className="mb-6 text-[36px] lg:text-[40px] leading-[1.05] font-medium text-[#00829B]">
                    Your Guide to Better Health
                  </h3>
                  <p className="mb-8 text-[15px] leading-relaxed font-medium text-black">
                    Explore expert health resources, patient guides, awareness campaigns, and educational
                    content designed to help you make informed healthcare decisions.
                  </p>
                  <button
                    type="button"
                    onClick={() => scrollToSection('updates')}
                    className="group inline-flex items-center gap-3 text-base font-semibold text-black cursor-pointer"
                  >
                    <span className="border-b border-transparent group-hover:border-black transition-all">
                      Explore Resources
                    </span>
                    <div className="w-6 h-6 rounded-full bg-[#00829B] group-hover:bg-[#006C82] text-white flex items-center justify-center transition-transform group-hover:scale-110">
                      <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                    </div>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_240px] gap-8 md:gap-12 md:pl-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6 text-[15px] font-medium">
                    <div className="space-y-6">
                      <button
                        type="button"
                        onClick={() => scrollToSection('updates')}
                        className="block text-left text-black hover:text-[#00829B] transition-colors cursor-pointer"
                      >
                        Blogs
                      </button>
                      <button
                        type="button"
                        onClick={() => scrollToSection('updates')}
                        className="block text-left text-black hover:text-[#00829B] transition-colors cursor-pointer"
                      >
                        News & Events
                      </button>
                      <button
                        type="button"
                        onClick={() => scrollToSection('about')}
                        className="block text-left text-black hover:text-[#00829B] transition-colors cursor-pointer"
                      >
                        Patient Testimonials
                      </button>
                    </div>

                    <div className="space-y-6">
                      <button
                        type="button"
                        onClick={() => scrollToSection('about')}
                        className="block text-left text-black hover:text-[#00829B] transition-colors cursor-pointer"
                      >
                        FAQs
                      </button>
                      <button
                        type="button"
                        onClick={() => scrollToSection('facilities')}
                        className="block text-left text-black hover:text-[#00829B] transition-colors cursor-pointer"
                      >
                        Gallery
                      </button>
                    </div>
                  </div>

                  <div className="hidden w-px self-stretch bg-zinc-300 md:block" aria-hidden="true" />

                  <div className="md:pl-4">
                    <h4 className="mb-8 text-xl font-semibold leading-none text-black">Quick Access</h4>
                    <div className="space-y-5 text-[15px] font-medium">
                      <Link
                        href="/patient-portal/doctors"
                        onClick={closeAllMenus}
                        className="block text-black hover:text-[#00829B] transition-colors"
                      >
                        Find a Doctor
                      </Link>
                      <button
                        type="button"
                        onClick={() => scrollToSection('packages')}
                        className="block text-left text-black hover:text-[#00829B] transition-colors cursor-pointer"
                      >
                        Health Checkup Packages
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          closeAllMenus();
                          onOpenBookingModal?.();
                        }}
                        className="block text-left text-black hover:text-[#00829B] transition-colors cursor-pointer"
                      >
                        Book an Appointment
                      </button>
                      <button
                        type="button"
                        onClick={() => scrollToSection('facilities')}
                        className="block text-left text-black hover:text-[#00829B] transition-colors cursor-pointer"
                      >
                        International Patients
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

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
                  <p className="text-[11px] text-[#777] truncate">{patientUser.email}</p>
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
              <Link
                href="/patient-portal/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full border border-gray-300 text-xs font-bold text-[#1A1A1A] hover:border-[#00829B]"
              >
                <User className="w-4 h-4" />
                <span>Patient Login</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default PatientNav;
