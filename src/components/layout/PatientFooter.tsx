'use client';

import React from 'react';
import Link from 'next/link';
import InspireZestLogo from '@/components/common/InspireZestLogo';
import {
  PhoneCall,
  MapPin,
  Clock,
  ShieldCheck,
  Award,
  Mail,
  ChevronRight,
  ArrowRight,
  HeartPulse,
} from 'lucide-react';

export const PatientFooter: React.FC = () => {
  return (
    <footer id="contact" className="bg-[#111111] text-white pt-16 pb-10 border-t border-neutral-800 font-sans scroll-mt-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* 1. InspireZest Top Highlight Banner */}
        <div className="border-b border-neutral-800 pb-12 mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="flex items-center gap-5">
              <InspireZestLogo variant="full" size="md" onDark={true} />
              <div className="border-l border-neutral-700 pl-4 hidden sm:block">
                <span className="text-sm text-neutral-300 font-medium block">
                  Where Every Life Matters • Accredited Tertiary Care
                </span>
                <span className="text-xs text-[#00829B]">
                  InspireZest Group of Hospitals
                </span>
              </div>
            </div>

            {/* Tagline & CTA */}
            <div className="flex flex-wrap items-center gap-5">
              <span className="text-sm sm:text-base font-medium italic text-neutral-300">
                Driven by Care, Defined by Excellence
              </span>
              <Link
                href="/patient-portal#specialities"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#00829B] hover:bg-[#006C82] text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-md"
              >
                <span>Book an Appointment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* 2. Four Main Navigation Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-neutral-800 text-xs">
          {/* Col 1: Corporate Summary */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              InspireZest Hospitals
            </h4>
            <p className="text-neutral-400 leading-relaxed max-w-sm">
              Delivering compassionate, world-class healthcare across South India and the Maldives
              since 1996. Pioneers in 24/7 cardiac intervention, minimally invasive surgery, and
              mother & child care.
            </p>

            <div className="space-y-2 pt-2">
              <div className="flex items-start gap-2.5 text-neutral-300">
                <MapPin className="w-4 h-4 text-[#00829B] shrink-0 mt-0.5" />
                <span>2nd Floor, S N Junction, Velayudha Mansion, Junction, Karbala, Kollam</span>
              </div>
              <div className="flex items-center gap-2.5 text-neutral-300">
                <PhoneCall className="w-4 h-4 text-[#00829B] shrink-0" />
                <a href="tel:+919567333266" className="hover:text-[#00829B] transition-colors">
                  +91 9567333266
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-neutral-300">
                <Mail className="w-4 h-4 text-[#00829B] shrink-0" />
                <span>info.klm@inspirezest.com</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-300">
                <Award className="w-3.5 h-3.5 text-[#E9A23B]" />
                <span>NABH & NABL Accredited Healthcare Network</span>
              </span>
            </div>
          </div>

          {/* Col 2: About */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-neutral-800 pb-2">
              About
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <Link href="/patient-portal" className="hover:text-[#00829B] transition-colors">
                  About InspireZest
                </Link>
              </li>
              <li>
                <Link href="/patient-portal" className="hover:text-[#00829B] transition-colors">
                  Leadership Team
                </Link>
              </li>
              <li>
                <Link href="/patient-portal" className="hover:text-[#00829B] transition-colors">
                  Quality & Safety
                </Link>
              </li>
              <li>
                <Link href="/patient-portal" className="hover:text-[#00829B] transition-colors">
                  CSR Initiatives
                </Link>
              </li>
              <li>
                <Link href="/patient-portal" className="hover:text-[#00829B] transition-colors">
                  Careers at InspireZest
                </Link>
              </li>
              <li>
                <Link href="/patient-portal" className="hover:text-[#00829B] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Specialities */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-neutral-800 pb-2">
              Specialities
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <Link
                  href="/patient-portal/doctors?category=Cardiology"
                  className="hover:text-[#00829B] transition-colors"
                >
                  Cardiology & Cathlab
                </Link>
              </li>
              <li>
                <Link
                  href="/patient-portal/doctors?category=Paediatrics%20%26%20Neonatology"
                  className="hover:text-[#00829B] transition-colors"
                >
                  Paediatrics & Neonatology
                </Link>
              </li>
              <li>
                <Link
                  href="/patient-portal/doctors?category=Obstetrics%20%26%20Gynaecology"
                  className="hover:text-[#00829B] transition-colors"
                >
                  Obstetrics & Gynaecology
                </Link>
              </li>
              <li>
                <Link
                  href="/patient-portal/doctors?category=Orthopaedics"
                  className="hover:text-[#00829B] transition-colors"
                >
                  Orthopaedics & Spine
                </Link>
              </li>
              <li>
                <Link
                  href="/patient-portal/doctors?category=Neurology"
                  className="hover:text-[#00829B] transition-colors"
                >
                  Neurology & Neurosurgery
                </Link>
              </li>
              <li>
                <Link
                  href="/patient-portal/doctors?category=Gastroenterology"
                  className="hover:text-[#00829B] transition-colors"
                >
                  Gastroenterology
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Access & Hospitals */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-neutral-800 pb-2">
              Our Hospitals
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <span className="font-semibold text-white">InspireZest Hospital, Kollam</span>
                <p className="text-[10px] text-neutral-500">2nd Floor, S N Junction, Velayudha Mansion, Karbala, Kollam</p>
              </li>
              <li>
                <span className="font-semibold text-white">InspireZest Hospital, Trivandrum</span>
                <p className="text-[10px] text-neutral-500">Pattom, Thiruvananthapuram</p>
              </li>
              <li>
                <span className="font-semibold text-white">InspireZest Hospital, Palakkad</span>
                <p className="text-[10px] text-neutral-500">Stadium Stand, Palakkad</p>
              </li>
              <li>
                <span className="font-semibold text-white">IGMH InspireZest, Maldives</span>
                <p className="text-[10px] text-neutral-500">Male, Republic of Maldives</p>
              </li>
            </ul>
          </div>
        </div>

        {/* 3. Bottom Copyright & Legal Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} InspireZest Hospital. All Rights Reserved</p>
          <div className="flex items-center gap-6">
            <Link href="/patient-portal" className="hover:text-neutral-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/patient-portal" className="hover:text-neutral-300 transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/patient-portal/login" className="hover:text-[#00829B] transition-colors font-medium">
              Patient Login
            </Link>
            <Link href="/doctor-portal/login" className="hover:text-[#00829B] transition-colors font-medium">
              Doctor Login
            </Link>
            <Link href="/admin-portal/login" className="hover:text-[#00829B] transition-colors font-medium">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
