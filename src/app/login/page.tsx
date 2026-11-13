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

export default function UnifiedLoginPage() {
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
          InspireZest Healthcare Network
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Select Your Healthcare Portal to Sign In
        </h1>
        <p className="mt-3 text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
          Access your personalized healthcare management workstation based on your operational clinical role.
        </p>

        {/* 3 Portal Cards */}
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
                Patient Health Portal
              </h2>
              <p className="mt-2 text-xs text-gray-500 leading-relaxed">
                Book physician consultations, access verified digital e-prescriptions, and view your diagnostic history.
              </p>
              <div className="mt-4 space-y-2 text-xs text-gray-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Instant Email OTP / Password Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Real-time Doctor Appointment Calendar</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-gray-100 space-y-2">
              <Link
                href="/patient-portal/login"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#00829B] text-white text-xs font-bold hover:bg-[#006C82] shadow-sm hover:shadow-md transition-all"
              >
                <span>Patient Sign In</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/patient-portal/signup"
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-gray-500 hover:text-[#00829B] transition-colors"
              >
                <span>New patient? Register here</span>
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
                Doctor & Practitioner
              </h2>
              <p className="mt-2 text-xs text-gray-500 leading-relaxed">
                Manage appointment queues, set monthly clinic availability schedules, and issue multi-medication e-Rx prescriptions.
              </p>
              <div className="mt-4 space-y-2 text-xs text-gray-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Interactive OPD availability grid</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Digital e-Prescription authoring</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-gray-100 space-y-2">
              <Link
                href="/doctor-portal/login"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#00829B] text-white text-xs font-bold hover:bg-[#006C82] shadow-sm hover:shadow-md transition-all"
              >
                <span>Doctor Sign In</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/doctor-portal/signup"
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-gray-500 hover:text-[#00829B] transition-colors"
              >
                <span>Medical staff registration</span>
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
                Hospital Administration
              </h2>
              <p className="mt-2 text-xs text-white/70 leading-relaxed">
                Hospital Command Suite for Doctor CRUD, Patient audits, Specialization CMS, and filtered master appointments.
              </p>
              <div className="mt-4 space-y-2 text-xs text-white/90">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2FE5A7] shrink-0" />
                  <span>Hospital-wide KPI telemetry</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2FE5A7] shrink-0" />
                  <span>Hero media & Cloudflare R2 control</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-white/10 space-y-2">
              <Link
                href="/admin-portal/login"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#00829B] text-white text-xs font-bold hover:bg-[#006C82] shadow-sm hover:shadow-md transition-all"
              >
                <span>Admin Sign In</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/admin-portal/signup"
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white/60 hover:text-[#2FE5A7] transition-colors"
              >
                <span>Admin onboarding portal</span>
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
