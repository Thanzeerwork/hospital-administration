'use client';

import React from 'react';
import Link from 'next/link';
import InspireZestLogo from '@/components/common/InspireZestLogo';
import {
  HeartPulse,
  Stethoscope,
  Building2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  UserPlus,
} from 'lucide-react';

export default function UnifiedSignupPage() {
  return (
    <div className="min-h-screen bg-[#F4F6F6] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto w-full text-center">
        {/* Brand */}
        <div className="flex justify-center mb-6">
          <Link href="/patient-portal" className="inline-block hover:opacity-95 transition-opacity">
            <InspireZestLogo variant="full" size="lg" priority />
          </Link>
        </div>

        <h1 className="text-3xl font-extrabold text-[#1A1A1A] tracking-tight">
          Create an Account
        </h1>
        <p className="mt-2 text-sm text-[#666666] max-w-xl mx-auto">
          Select your registration path to provision access into the InspireZest Hospital System.
        </p>

        {/* 3 Registration Pathways */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {/* Patient Card */}
          <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-card flex flex-col justify-between hover:border-[#00829B]/50 transition-all hover:shadow-lg group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#E6F3F5] text-[#00829B] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <HeartPulse className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-[#1A1A1A] group-hover:text-[#00829B] transition-colors">
                New Patient
              </h2>
              <p className="mt-2 text-xs text-[#666666] leading-relaxed">
                Register with your health details, emergency contact, and blood group for instant appointment booking.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E5E7EB] space-y-2">
              <Link
                href="/patient-portal/signup"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#00829B] text-white text-xs font-bold hover:bg-[#006C82] transition-colors shadow-sm"
              >
                <span>Register as Patient</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/patient-portal/login"
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-[#666666] hover:text-[#00829B] transition-colors"
              >
                <span>Already registered? Sign In</span>
              </Link>
            </div>
          </div>

          {/* Doctor Card */}
          <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-card flex flex-col justify-between hover:border-[#00829B]/50 transition-all hover:shadow-lg group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#E6F3F5] text-[#00829B] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-[#1A1A1A] group-hover:text-[#00829B] transition-colors">
                Medical Staff
              </h2>
              <p className="mt-2 text-xs text-[#666666] leading-relaxed">
                Enroll as a physician, upload your profile picture to Cloudflare R2, set consultation fees, and link your specialization.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E5E7EB] space-y-2">
              <Link
                href="/doctor-portal/signup"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#00829B] text-white text-xs font-bold hover:bg-[#006C82] transition-colors shadow-sm"
              >
                <span>Register as Doctor</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/doctor-portal/login"
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-[#666666] hover:text-[#00829B] transition-colors"
              >
                <span>Have credentials? Sign In</span>
              </Link>
            </div>
          </div>

          {/* Admin Card */}
          <div className="bg-[#0A1A22] text-white rounded-2xl p-6 border border-white/10 shadow-card flex flex-col justify-between hover:border-[#00829B]/50 transition-all hover:shadow-lg group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#00829B]/20 text-[#00829B] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-white group-hover:text-[#00829B] transition-colors">
                Administration
              </h2>
              <p className="mt-2 text-xs text-white/70 leading-relaxed">
                Register administrative personnel with the hospital security passcode to configure facilities and staff.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
              <Link
                href="/admin-portal/signup"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#00829B] text-white text-xs font-bold hover:bg-[#006C82] transition-colors shadow-sm"
              >
                <span>Register as Admin</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/admin-portal/login"
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white/60 hover:text-[#00829B] transition-colors"
              >
                <span>Have admin login? Sign In</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-10 text-center flex items-center justify-center gap-2 text-xs text-[#666666]">
          <ShieldCheck className="w-4 h-4 text-[#00829B]" />
          <span>Secured with Firebase Firestore & Cloudflare R2 Buckets</span>
        </div>
      </div>
    </div>
  );
}
