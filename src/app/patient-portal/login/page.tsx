'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useHospital } from '@/context/HospitalContext';
import InspireZestLogo from '@/components/common/InspireZestLogo';
import { Button } from '@/components/common/Button';
import {
  HeartPulse,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  RotateCw,
  Sparkles,
} from 'lucide-react';

export default function PatientLoginPage() {
  const router = useRouter();
  const {
    isPatientAuthenticated,
    sendPatientOtp,
    verifyPatientOtp,
    loginPatientWithPassword,
    patientOtpPendingEmail,
  } = useHospital();

  const [authMethod, setAuthMethod] = useState<'otp' | 'password'>('otp');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await sendPatientOtp(email);
      if (res.success) {
        setOtpSent(true);
        if (res.otpCode) setOtp(res.otpCode);
      } else {
        setError(res.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length < 6) {
      setError('Please enter the 6-digit verification code');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await verifyPatientOtp(otp);
      if (res.success) {
        router.push('/patient-portal');
      } else {
        setError(res.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide email and password');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await loginPatientWithPassword(email, password);
      if (res.success) {
        router.push('/patient-portal');
      } else {
        setError(res.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const fillDemoPatient = () => {
    setEmail('eleanor.vance@example.com');
    setPassword('patient123');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#F4F6F6] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Brand Header */}
        <div className="flex justify-center mb-2">
          <Link href="/patient-portal" className="inline-block hover:opacity-95 transition-opacity">
            <InspireZestLogo variant="full" size="md" priority />
          </Link>
        </div>

        <h2 className="mt-6 text-center text-2xl font-extrabold text-[#1A1A1A]">
          Sign in to your patient account
        </h2>
        <p className="mt-2 text-center text-xs text-[#666666]">
          Manage appointments, view official e-prescriptions, and access your hospital medical records.
        </p>

        {/* Demo Account Quick-Fill Pill */}
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={fillDemoPatient}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E6F3F5] text-[#00829B] hover:bg-[#CDECEF] text-xs font-semibold transition-colors border border-[#00829B]/20"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Use Demo Patient (Eleanor Vance)</span>
          </button>
        </div>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-card sm:rounded-2xl border border-[#E5E7EB] sm:px-10">
          {/* Auth Method Switcher */}
          <div className="flex rounded-xl bg-[#F4F6F6] p-1 border border-[#E5E7EB] mb-6">
            <button
              type="button"
              onClick={() => {
                setAuthMethod('otp');
                setError(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                authMethod === 'otp'
                  ? 'bg-white text-[#00829B] shadow-sm'
                  : 'text-[#666666] hover:text-[#1A1A1A]'
              }`}
            >
              Email OTP Code
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMethod('password');
                setError(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                authMethod === 'password'
                  ? 'bg-white text-[#00829B] shadow-sm'
                  : 'text-[#666666] hover:text-[#1A1A1A]'
              }`}
            >
              Email & Password
            </button>
          </div>

          {error && (
            <div className="mb-5 p-3 rounded-xl bg-[#DC5555]/10 border border-[#DC5555]/20 flex items-start gap-2.5 text-xs text-[#DC5555] font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {authMethod === 'otp' ? (
            !otpSent ? (
              /* Step 1: Send OTP */
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#666666]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="patient@example.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-[#F4F6F6] border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white transition-all text-[#1A1A1A]"
                    />
                  </div>
                  <p className="mt-1.5 text-[11px] text-[#666666]">
                    We will send a 6-digit secure login code to your registered email.
                  </p>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full justify-center"
                  isLoading={loading}
                >
                  Send Verification Code
                </Button>
              </form>
            ) : (
              /* Step 2: Verify OTP */
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="p-3 bg-[#E6F3F5] rounded-xl border border-[#00829B]/20 text-xs text-[#00829B]">
                  <p className="font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    OTP sent to {email || patientOtpPendingEmail}
                  </p>
                  <p className="text-[11px] mt-0.5 text-[#00829B]/80">
                    For demonstration, your 6-digit code is <strong className="font-mono">492815</strong>
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                    Six-Digit Verification Code
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#666666]">
                      <KeyRound className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="492815"
                      className="w-full pl-10 pr-4 py-3 bg-[#F4F6F6] border border-[#E5E7EB] rounded-xl text-lg font-mono tracking-widest text-center font-bold focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white transition-all text-[#1A1A1A]"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={() => setOtpSent(false)}
                    className="text-[#666666] hover:text-[#1A1A1A]"
                  >
                    Change Email
                  </button>
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="text-[#00829B] font-semibold hover:underline flex items-center gap-1"
                  >
                    <RotateCw className="w-3 h-3" />
                    Resend Code
                  </button>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full justify-center"
                  isLoading={loading}
                >
                  Verify Code & Enter Portal
                </Button>
              </form>
            )
          ) : (
            /* Email & Password Login */
            <form onSubmit={handlePasswordLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#666666]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="patient@example.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#F4F6F6] border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white transition-all text-[#1A1A1A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#666666]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#F4F6F6] border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white transition-all text-[#1A1A1A]"
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full justify-center"
                isLoading={loading}
              >
                Sign In with Password
              </Button>
            </form>
          )}

          {/* Registration Navigation */}
          <div className="mt-6 pt-6 border-t border-[#E5E7EB] text-center">
            <p className="text-xs text-[#666666]">
              New to InspireZest Hospital System?{' '}
              <Link
                href="/patient-portal/signup"
                className="font-bold text-[#00829B] hover:underline inline-flex items-center gap-1"
              >
                <span>Create a patient account</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </p>
          </div>
        </div>

        {/* HIPAA & Security Footer */}
        <div className="mt-6 text-center flex items-center justify-center gap-2 text-[11px] text-[#666666]">
          <ShieldCheck className="w-4 h-4 text-[#00829B]" />
          <span>256-Bit Encrypted Healthcare Portal • HIPAA Compliant</span>
        </div>
      </div>
    </div>
  );
}

