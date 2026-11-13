'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useHospital } from '@/context/HospitalContext';
import InspireZestLogo from '@/components/common/InspireZestLogo';
import {
  Stethoscope,
  Lock,
  User,
  AlertCircle,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  Sparkles,
  Award,
  Calendar,
  FileText,
  Clock,
  KeyRound,
  RotateCw,
  X,
  Building2,
  Activity,
  HeartPulse,
} from 'lucide-react';

export default function DoctorLoginPage() {
  const router = useRouter();
  const { loginDoctor, doctors } = useHospital();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForgotModal, setShowForgotModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Please provide your assigned physician username or email, and clinical password.');
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const res = await loginDoctor(username.trim(), password.trim());
      if (res.success) {
        router.push('/doctor-portal');
      } else {
        setError(res.message);
      }
    } catch (err: any) {
      setError(err?.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = (docUser: string, docPass: string = 'password123') => {
    setUsername(docUser);
    setPassword(docPass);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col justify-between selection:bg-[#00829B] selection:text-white">
      {/* 1. Header Toolbar */}
      <header className="w-full bg-white border-b border-[#E5E7EB] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <Link href="/doctor-portal" className="flex items-center gap-2 group">
            <InspireZestLogo variant="full" size="md" />
          </Link>

          <div className="flex items-center gap-3 sm:gap-6">
            <div className="hidden sm:flex items-center gap-2 text-xs text-[#666666]">
              <PhoneCall className="w-3.5 h-3.5 text-[#00829B]" />
              <span>
                Physician Helpdesk: <strong className="text-[#1A1A1A] font-semibold">+91 9567333266</strong> (Ext. 402)
              </span>
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-gray-300 text-xs font-semibold text-[#1A1A1A] hover:border-[#00829B] hover:text-[#00829B] transition-colors"
            >
              <span>Hospital Home</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Main Content Split Grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Doctor Login Card (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-[0_4px_30px_rgba(0,0,0,0.04)] border border-[#E5E7EB] relative overflow-hidden">
              {/* Subtle brand top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#00829B] via-[#0E88AA] to-[#22A06B]" />

              {/* Title & Pill Badge */}
              <div className="mb-6">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-[#E6F7F9] text-[#00829B] border border-[#D0F0F5]">
                    <span className="w-2 h-2 rounded-full bg-[#00829B] animate-pulse" />
                    Doctor OPD & Clinical Portal
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Authorized Clinicians Only
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A1A22] tracking-tight">
                  Medical Staff Sign In
                </h1>
                <p className="text-xs sm:text-sm text-[#666666] mt-1.5 leading-relaxed">
                  Access your appointment queue, outpatient availability schedule, patient electronic health records, and digital prescriptions.
                </p>
              </div>

              {/* Error Alert */}
              {error && (
                <div className="mb-6 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2.5 animate-in fade-in duration-200">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                  <span className="font-medium leading-relaxed">{error}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Username Input */}
                <div>
                  <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                    Physician Username or Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Stethoscope className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="e.g. dr.wright or alexander.wright@inspirezest.com"
                      className="w-full pl-10 pr-4 py-3 bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white text-[#1A1A1A] transition-all font-medium placeholder:text-gray-400"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-[#1A1A1A]">
                      Clinical Password <span className="text-red-500">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(true)}
                      className="text-xs font-semibold text-[#00829B] hover:underline cursor-pointer"
                    >
                      Forgot Credentials?
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-10 py-3 bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white text-[#1A1A1A] transition-all font-mono placeholder:text-gray-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-[#00829B] cursor-pointer"
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Quick Demo Bar */}
                <div className="flex items-center justify-between pt-1 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer select-none text-gray-600">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-[#00829B] rounded border-gray-300 focus:ring-[#00829B] accent-[#00829B]"
                    />
                    <span>Remember clinical workstation</span>
                  </label>
                </div>

                {/* Quick Auto-Fill Demo Badges */}
                <div className="pt-2 pb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
                    Quick Clinical Sign-In (Demo Attending Physicians):
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleQuickFill('dr.wright')}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                        username === 'dr.wright'
                          ? 'bg-[#00829B] text-white border-[#00829B] shadow-xs'
                          : 'bg-[#F4F6F6] text-gray-700 border-gray-200 hover:border-[#00829B] hover:text-[#00829B]'
                      }`}
                    >
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>Dr. Wright (Cardiology)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleQuickFill('dr.bennett')}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                        username === 'dr.bennett'
                          ? 'bg-[#00829B] text-white border-[#00829B] shadow-xs'
                          : 'bg-[#F4F6F6] text-gray-700 border-gray-200 hover:border-[#00829B] hover:text-[#00829B]'
                      }`}
                    >
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>Dr. Bennett (Pediatrics)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleQuickFill('dr.vance')}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                        username === 'dr.vance'
                          ? 'bg-[#00829B] text-white border-[#00829B] shadow-xs'
                          : 'bg-[#F4F6F6] text-gray-700 border-gray-200 hover:border-[#00829B] hover:text-[#00829B]'
                      }`}
                    >
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>Dr. Vance (Ophthalmology)</span>
                    </button>
                  </div>
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 py-3.5 px-6 rounded-2xl bg-[#00829B] hover:bg-[#006C82] text-white font-bold text-sm tracking-wide shadow-[0_4px_14px_rgba(0,130,155,0.35)] hover:shadow-[0_6px_20px_rgba(0,130,155,0.45)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <RotateCw className="w-4 h-4 animate-spin" />
                      <span>Authenticating Medical Credentials...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In to Doctor Console</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Institutional Provisioning Policy Notice (Replacing Doctor Registration) */}
              <div className="mt-6 pt-5 border-t border-[#E5E7EB]">
                <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#00829B]/10 text-[#00829B] flex items-center justify-center shrink-0 mt-0.5">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 text-xs text-gray-600 leading-relaxed">
                    <p className="font-bold text-gray-900 mb-0.5">
                      Institutional Clinical Account Notice
                    </p>
                    <p>
                      Doctor accounts and hospital clinical privileges are exclusively provisioned and managed by the <strong>Hospital Administration</strong>. Self-registration is strictly disabled for regulatory compliance. New physicians should contact the Medical Director Office for credential setup.
                    </p>
                  </div>
                </div>
              </div>

              {/* Compliance Badges */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-center gap-4 sm:gap-6 text-[10px] sm:text-xs text-gray-500 flex-wrap">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00829B]" />
                  <span>NABH Accredited</span>
                </span>
                <span className="flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  <span>JCI Gold Standard</span>
                </span>
                <span className="flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>256-Bit SSL Encrypted</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Hospital Showcase (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Visual Editorial Image Card */}
            <div className="relative rounded-3xl overflow-hidden shadow-card border border-gray-100 group">
              <img
                src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80"
                alt="InspireZest Hospital Surgical & Outpatient Wing"
                className="w-full h-64 sm:h-72 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A22]/90 via-[#0A1A22]/40 to-transparent" />

              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/95 text-[#00829B] backdrop-blur-md shadow-xs">
                  <HeartPulse className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                  <span>InspireZest Clinical Wing</span>
                </span>
              </div>

              <div className="absolute bottom-5 left-5 right-5 text-white">
                <h3 className="text-lg sm:text-xl font-bold tracking-tight">
                  High-Precision Clinical Workflow
                </h3>
                <p className="text-xs text-white/80 mt-1 leading-relaxed">
                  Streamlined patient consultation records, digital prescriptions, and live OPD availability management.
                </p>
              </div>
            </div>

            {/* Feature Value Props */}
            <div className="bg-white rounded-3xl p-6 border border-[#E5E7EB] shadow-xs space-y-4 text-xs text-[#666666]">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#E6F7F9] text-[#00829B] flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1A1A1A] text-sm">Real-Time OPD Roster</h4>
                  <p className="mt-0.5 leading-relaxed">
                    Instant view of assigned consultations, patient check-in statuses, and walk-in telemetry.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-gray-100">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1A1A1A] text-sm">Tamper-Evident e-Prescriptions</h4>
                  <p className="mt-0.5 leading-relaxed">
                    Author multi-row medical prescriptions with dosage, frequency, and instructions archived to EHR.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-gray-100">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1A1A1A] text-sm">Active Schedule & Slots</h4>
                  <p className="mt-0.5 leading-relaxed">
                    Customize your daily consultation schedule and leave dates with immediate patient booking updates.
                  </p>
                </div>
              </div>
            </div>

            {/* Directorate Contact Support Card */}
            <div className="bg-gradient-to-r from-[#00829B] to-[#0E88AA] text-white p-5 rounded-3xl shadow-sm flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-white/70 block">
                  Physician Support Office
                </span>
                <span className="text-base sm:text-lg font-extrabold tracking-tight block mt-0.5">
                  Medical Administration Wing
                </span>
                <span className="text-xs text-white/90 font-mono mt-1 block">
                  Room 101 • Ext. 402 • +91 9567333266
                </span>
              </div>
              <a
                href="tel:+919567333266"
                className="px-4 py-2 rounded-xl bg-white text-[#00829B] font-bold text-xs hover:bg-white/90 transition-all shrink-0 shadow-xs"
              >
                Call Office
              </a>
            </div>
          </div>

        </div>
      </main>

      {/* 3. Footer */}
      <footer className="w-full bg-white border-t border-[#E5E7EB] py-4 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4">
          © {new Date().getFullYear()} InspireZest Hospital Management System. All Rights Reserved. HIPAA & NABH Accredited Healthcare System.
        </div>
      </footer>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 relative">
            <button
              onClick={() => setShowForgotModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#00829B]/10 text-[#00829B] flex items-center justify-center">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">Physician Password Recovery</h3>
                <p className="text-xs text-gray-500">Hospital Staff Credential Governance</p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-gray-600 leading-relaxed mb-6">
              <p>
                In compliance with clinical data protection guidelines, physician credentials are institutional assets.
              </p>
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
                <p className="font-bold mb-1">How to obtain or reset your password:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Contact the <strong>Hospital Administration Directorate</strong> at Extension <strong>402</strong>.</li>
                  <li>Email <strong>admin@inspirezest.com</strong> from your verified hospital staff email.</li>
                  <li>Administrators can also view or update your password directly from the <strong>Admin Doctor Management</strong> panel.</li>
                </ul>
              </div>
              <p className="text-gray-500 font-mono text-[11px]">
                Default demo attending physician password is <strong>password123</strong>.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setShowForgotModal(false)}
                className="w-full py-2.5 px-4 rounded-xl bg-[#00829B] text-white font-bold text-xs hover:bg-[#006C82] transition-colors"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
