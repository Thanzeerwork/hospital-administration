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
} from 'lucide-react';

export default function UnifiedLoginPage() {
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
          Select Your Healthcare Portal to Sign In
        </h1>
        <p className="mt-2 text-sm text-[#666666] max-w-xl mx-auto">
          Choose the appropriate portal based on your healthcare role.
        </p>

        {/* 3 Portal Cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {/* Patient Card */}
          <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-card flex flex-col justify-between hover:border-[#00829B]/50 transition-all hover:shadow-lg group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#E6F3F5] text-[#00829B] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <HeartPulse className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-[#1A1A1A] group-hover:text-[#00829B] transition-colors">
                Patient Health Portal
              </h2>
              <p className="mt-2 text-xs text-[#666666] leading-relaxed">
                Book physician consultations, access verified digital e-prescriptions, and view your diagnostic history.
              </p>
              <div className="mt-4 space-y-1.5 text-xs text-[#1A1A1A]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#22A06B]" />
                  <span>Email OTP or Password Login</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#22A06B]" />
                  <span>Instant appointment scheduling</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E5E7EB] space-y-2">
              <Link
                href="/patient-portal/login"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#00829B] text-white text-xs font-bold hover:bg-[#006C82] transition-colors shadow-sm"
              >
                <span>Patient Sign In</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/patient-portal/signup"
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-[#666666] hover:text-[#00829B] transition-colors"
              >
                <span>New patient? Sign Up</span>
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
                Doctor & Practitioner
              </h2>
              <p className="mt-2 text-xs text-[#666666] leading-relaxed">
                Manage appointment queues, set monthly clinic availability schedules, and issue multi-medication e-Rx prescriptions.
              </p>
              <div className="mt-4 space-y-1.5 text-xs text-[#1A1A1A]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#22A06B]" />
                  <span>Interactive availability calendar</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#22A06B]" />
                  <span>Direct e-Prescription entry</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E5E7EB] space-y-2">
              <Link
                href="/doctor-portal/login"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#00829B] text-white text-xs font-bold hover:bg-[#006C82] transition-colors shadow-sm"
              >
                <span>Doctor Sign In</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/doctor-portal/signup"
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-[#666666] hover:text-[#00829B] transition-colors"
              >
                <span>Join Medical Staff? Sign Up</span>
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
                Hospital Administration
              </h2>
              <p className="mt-2 text-xs text-white/70 leading-relaxed">
                Hospital Command Suite for Doctor CRUD, Patient audits, Specialization CMS, and filtered master appointments.
              </p>
              <div className="mt-4 space-y-1.5 text-xs text-white/90">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#22A06B]" />
                  <span>Hospital-wide KPI telemetry</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#22A06B]" />
                  <span>Multi-Filter Master Roster</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
              <Link
                href="/admin-portal/login"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#00829B] text-white text-xs font-bold hover:bg-[#006C82] transition-colors shadow-sm"
              >
                <span>Admin Sign In</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/admin-portal/signup"
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white/60 hover:text-[#00829B] transition-colors"
              >
                <span>Admin Setup? Sign Up</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-10 text-center flex items-center justify-center gap-2 text-xs text-[#666666]">
          <ShieldCheck className="w-4 h-4 text-[#00829B]" />
          <span>Google Firebase Firestore & Cloudflare R2 Cloud Integration Active</span>
        </div>
      </div>
    </div>
  );
}
