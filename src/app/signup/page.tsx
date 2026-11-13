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
  PhoneCall,
  Sparkles,
} from 'lucide-react';

export default function UnifiedSignupPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Top Bar */}
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between pb-6 border-b border-gray-200">
        <Link href="/patient-portal" className="inline-block transition-transform hover:scale-[1.02]">
          <InspireZestLogo variant="full" size="md" priority />
        </Link>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <PhoneCall className="w-3.5 h-3.5 text-[#00829B]" />
          <span>Emergency 24x7: <strong className="text-gray-900">+91 9567333266</strong></span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto w-full text-center my-auto py-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00829B]/10 text-[#00829B] text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          InspireZest Onboarding Directory
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Create an Account
        </h1>
        <p className="mt-3 text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
          Select your registration pathway to provision verified credentials across our multispeciality hospital network.
        </p>

        {/* 3 Registration Pathways */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {/* Patient Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-200 shadow-sm hover:shadow-xl hover:border-[#00829B]/50 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#00829B]/10 text-[#00829B] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#00829B] group-hover:text-white transition-all shadow-xs">
                  <HeartPulse className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px] uppercase tracking-wider border border-emerald-200">
                  Patients
                </span>
              </div>
              <h2 className="text-lg font-bold text-gray-900 group-hover:text-[#00829B] transition-colors">
                New Patient
              </h2>
              <p className="mt-2 text-xs text-gray-500 leading-relaxed">
                Register with your health details, emergency contact, and blood group for instant appointment booking.
              </p>
              <div className="mt-4 space-y-2 text-xs text-gray-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Instant OPD booking & e-Prescriptions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Permanent digital patient record</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-gray-100 space-y-2">
              <Link
                href="/patient-portal/signup"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#00829B] text-white text-xs font-bold hover:bg-[#006C82] shadow-sm hover:shadow-md transition-all"
              >
                <span>Register as Patient</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/patient-portal/login"
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-gray-500 hover:text-[#00829B] transition-colors"
              >
                <span>Already registered? Sign In</span>
              </Link>
            </div>
          </div>

          {/* Doctor Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-200 shadow-sm hover:shadow-xl hover:border-[#00829B]/50 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#00829B]/10 text-[#00829B] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#00829B] group-hover:text-white transition-all shadow-xs">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-800 font-bold text-[10px] uppercase tracking-wider border border-cyan-200">
                  Clinicians
                </span>
              </div>
              <h2 className="text-lg font-bold text-gray-900 group-hover:text-[#00829B] transition-colors">
                Medical Staff
              </h2>
              <p className="mt-2 text-xs text-gray-500 leading-relaxed">
                Enroll as a physician, upload your profile picture to Cloudflare R2, set consultation fees, and link your specialization.
              </p>
              <div className="mt-4 space-y-2 text-xs text-gray-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Clinical roster & consultation fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Doctor profile & department pairing</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-gray-100 space-y-2">
              <Link
                href="/doctor-portal/signup"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#00829B] text-white text-xs font-bold hover:bg-[#006C82] shadow-sm hover:shadow-md transition-all"
              >
                <span>Register as Doctor</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/doctor-portal/login"
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-gray-500 hover:text-[#00829B] transition-colors"
              >
                <span>Have credentials? Sign In</span>
              </Link>
            </div>
          </div>

          {/* Admin Card */}
          <div className="bg-[#0A1A22] text-white rounded-2xl p-6 sm:p-7 border border-white/10 shadow-sm hover:shadow-xl hover:border-[#00829B]/50 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 text-[#2FE5A7] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#00829B] group-hover:text-white transition-all shadow-xs">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white font-bold text-[10px] uppercase tracking-wider border border-white/15">
                  Governance
                </span>
              </div>
              <h2 className="text-lg font-bold text-white group-hover:text-[#2FE5A7] transition-colors">
                Administration
              </h2>
              <p className="mt-2 text-xs text-white/70 leading-relaxed">
                Register administrative personnel with the hospital security passcode to configure facilities and staff.
              </p>
              <div className="mt-4 space-y-2 text-xs text-white/90">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2FE5A7] shrink-0" />
                  <span>Hospital infrastructure controls</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2FE5A7] shrink-0" />
                  <span>Security passcode verified</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-white/10 space-y-2">
              <Link
                href="/admin-portal/signup"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#00829B] text-white text-xs font-bold hover:bg-[#006C82] shadow-sm hover:shadow-md transition-all"
              >
                <span>Register as Admin</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/admin-portal/login"
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white/60 hover:text-[#2FE5A7] transition-colors"
              >
                <span>Have admin login? Sign In</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer info */}
      <div className="max-w-6xl mx-auto w-full pt-6 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#00829B]" />
          <span>NABH & NABL Accredited Healthcare Network • HIPAA Compliant TLS Telemetry</span>
        </div>
        <span>© {new Date().getFullYear()} InspireZest Multispeciality Healthcare</span>
      </div>
    </div>
  );
}
