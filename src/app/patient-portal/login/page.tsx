'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useHospital } from '@/context/HospitalContext';
import InspireZestLogo from '@/components/common/InspireZestLogo';
import {
  HeartPulse,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  PhoneCall,
  Sparkles,
  Award,
  KeyRound,
  RotateCw,
  User,
  Phone,
  Calendar,
  MapPin,
  X,
  Clock,
  Check,
} from 'lucide-react';

export default function PatientLoginPage() {
  const router = useRouter();
  const {
    isPatientAuthenticated,
    loginPatientWithPassword,
    sendPatientOtp,
    verifyPatientOtp,
    resetPatientPassword,
    completeNewPatientProfile,
  } = useHospital();

  // Mode: 'password' (default) | 'otp'
  const [authMode, setAuthMode] = useState<'password' | 'otp'>('password');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // OTP state
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [activeOtpCode, setActiveOtpCode] = useState('');
  const [sentViaResend, setSentViaResend] = useState(false);

  // Password reset modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  // Loading & Error State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // New Patient Profile Completion State
  const [isNewPatientStep, setIsNewPatientStep] = useState(false);
  const [newPatientEmail, setNewPatientEmail] = useState('');
  const [newPatientPassword, setNewPatientPassword] = useState('');
  const [newPatientData, setNewPatientData] = useState({
    name: '',
    phone: '',
    age: '28',
    gender: 'Female' as 'Female' | 'Male' | 'Other',
    bloodGroup: 'O+',
    address: '',
    emergencyContact: '',
  });

  // Handle Email & Password Login
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please provide your registered email address and password.');
      return;
    }
    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      const res = await loginPatientWithPassword(email, password);
      if (res.success) {
        if (res.isNewPatient) {
          setIsNewPatientStep(true);
          setNewPatientEmail(email);
          setNewPatientPassword(password);
          setError(null);
        } else {
          router.push('/patient-portal');
        }
      } else {
        setError(res.message);
      }
    } catch (err: any) {
      setError(err?.message || 'Login failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP send
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await sendPatientOtp(email);
      if (res.success) {
        setOtpSent(true);
        setSentViaResend(!!res.sentViaResend);
        if (res.otpCode) setActiveOtpCode(res.otpCode);
        setSuccessMsg(res.message);
      } else {
        setError(res.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP verify
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim() || otp.trim().length < 6) {
      setError('Please enter the 6-digit verification code.');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await verifyPatientOtp(otp.trim());
      if (res.success) {
        if (res.isNewPatient) {
          setIsNewPatientStep(true);
          setNewPatientEmail(res.email || email);
          setError(null);
        } else {
          router.push('/patient-portal');
        }
      } else {
        setError(res.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle Forgot Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail.trim() || !resetEmail.includes('@')) {
      setError('Please enter a valid email for password reset.');
      return;
    }
    setResetLoading(true);
    try {
      const res = await resetPatientPassword(resetEmail);
      if (res.success) {
        setResetSent(true);
      } else {
        setError(res.message);
      }
    } finally {
      setResetLoading(false);
    }
  };

  // Handle New Patient Profile Completion
  const handleCompleteNewPatient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatientData.name.trim() || !newPatientData.phone.trim()) {
      setError('Please provide your full legal name and contact phone number.');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await completeNewPatientProfile({
        name: newPatientData.name.trim(),
        email: newPatientEmail || email,
        phone: newPatientData.phone.trim(),
        age: parseInt(newPatientData.age, 10) || 30,
        gender: newPatientData.gender,
        bloodGroup: newPatientData.bloodGroup,
        address: newPatientData.address.trim(),
        emergencyContact: newPatientData.emergencyContact.trim(),
        password: newPatientPassword || password,
      });
      if (res.success) {
        router.push('/patient-portal');
      } else {
        setError(res.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0A1A22] font-sans flex flex-col justify-between selection:bg-[#00829B]/20">
      {/* 1. Header (Meditrina Styling with Official Logo & Quick Contacts) */}
      <header className="border-b border-[#EAEAEA] bg-white sticky top-0 z-30 shadow-xs">
        <div className="mx-auto w-full max-w-[90rem] 2xl:max-w-[110rem] px-4 sm:px-8 lg:px-10 py-3.5 flex items-center justify-between">
          <Link
            href="/patient-portal"
            className="inline-flex items-center hover:opacity-95 transition-opacity"
          >
            <InspireZestLogo
              variant="full"
              size="lg"
              priority
              className="h-auto w-[165px] sm:w-[195px] xl:w-[230px] block"
            />
          </Link>

          <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm">
            <a
              href="tel:9567333266"
              className="hidden sm:inline-flex items-center gap-2 font-medium text-[#0A1A22] hover:text-[#00829B] transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-[#00829B]" />
              <span>Emergency 24x7: <strong className="text-[#0A1A22]">+91 9567333266</strong></span>
            </a>

            <Link
              href="/patient-portal"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 text-xs font-semibold text-[#0A1A22] hover:border-[#00829B] hover:text-[#00829B] transition-colors bg-white shadow-2xs"
            >
              <span>Back to Home</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Main Container (Two-Column Google Stitch Split Layout) */}
      <main className="flex-1 mx-auto w-full max-w-[90rem] 2xl:max-w-[110rem] px-4 sm:px-8 lg:px-10 py-8 lg:py-12 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: High-Fidelity Authentication Form (7 Cols) */}
          <div className="lg:col-span-7 max-w-2xl mx-auto w-full">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-[#00829B]/10 shadow-xl shadow-[#0A1A22]/5 relative overflow-hidden">
              
              {/* Decorative Subtle Accent Ribbon */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#00829B] via-[#0E88AA] to-[#22A06B]" />

              {/* Step A: New Patient Profile Onboarding */}
              {isNewPatientStep ? (
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F7F9] text-[#00829B] text-xs font-bold tracking-wide uppercase mb-3 border border-[#D0F0F5]">
                    <Sparkles className="w-3.5 h-3.5" />
                    New Patient Registration
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A1A22] tracking-tight">
                    Complete Your Patient Profile
                  </h1>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    Please provide your clinical demographics to create your digital health record for <strong className="text-[#00829B]">{newPatientEmail}</strong>.
                  </p>

                  {error && (
                    <div className="mt-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                      <span>{error}</span>
                    </div>
                  )}

                  <form onSubmit={handleCompleteNewPatient} className="mt-6 space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Full Legal Name *</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          required
                          value={newPatientData.name}
                          onChange={(e) => setNewPatientData({ ...newPatientData, name: e.target.value })}
                          placeholder="e.g. Ananya Sharma"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#0E88AA] focus:ring-3 focus:ring-[#0E88AA]/15 outline-hidden text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Contact Phone Number *</label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                          <input
                            type="tel"
                            required
                            value={newPatientData.phone}
                            onChange={(e) => setNewPatientData({ ...newPatientData, phone: e.target.value })}
                            placeholder="+91 9876543210"
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#0E88AA] focus:ring-3 focus:ring-[#0E88AA]/15 outline-hidden text-sm"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">Age *</label>
                          <input
                            type="number"
                            required
                            min="1"
                            max="120"
                            value={newPatientData.age}
                            onChange={(e) => setNewPatientData({ ...newPatientData, age: e.target.value })}
                            className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:border-[#0E88AA] focus:ring-3 focus:ring-[#0E88AA]/15 outline-hidden text-sm text-center"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">Gender *</label>
                          <select
                            value={newPatientData.gender}
                            onChange={(e) => setNewPatientData({ ...newPatientData, gender: e.target.value as any })}
                            className="w-full px-2 py-2.5 rounded-xl border border-gray-300 focus:border-[#0E88AA] focus:ring-3 focus:ring-[#0E88AA]/15 outline-hidden text-sm bg-white"
                          >
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Blood Group *</label>
                        <select
                          value={newPatientData.bloodGroup}
                          onChange={(e) => setNewPatientData({ ...newPatientData, bloodGroup: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:border-[#0E88AA] focus:ring-3 focus:ring-[#0E88AA]/15 outline-hidden text-sm bg-white"
                        >
                          {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((bg) => (
                            <option key={bg} value={bg}>{bg}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Emergency Contact Person & Phone</label>
                        <input
                          type="text"
                          value={newPatientData.emergencyContact}
                          onChange={(e) => setNewPatientData({ ...newPatientData, emergencyContact: e.target.value })}
                          placeholder="e.g. Spouse (+91 9876543211)"
                          className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:border-[#0E88AA] focus:ring-3 focus:ring-[#0E88AA]/15 outline-hidden text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Residential Address</label>
                      <input
                        type="text"
                        value={newPatientData.address}
                        onChange={(e) => setNewPatientData({ ...newPatientData, address: e.target.value })}
                        placeholder="House / Street, City, State"
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:border-[#0E88AA] focus:ring-3 focus:ring-[#0E88AA]/15 outline-hidden text-sm"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#00829B] hover:bg-[#006C82] text-white font-bold text-sm tracking-wide shadow-md hover:shadow-cyan-900/30 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <RotateCw className="w-4 h-4 animate-spin" />
                          <span>Finalizing Registration...</span>
                        </>
                      ) : (
                        <>
                          <span>Complete Registration & Access Portal</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              ) : (
                /* Step B: Standard Sign In */
                <div>
                  {/* Status Pill */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F7F9] text-[#00829B] text-xs font-bold tracking-wide uppercase border border-[#D0F0F5]">
                      <span className="w-2 h-2 rounded-full bg-[#00829B] animate-pulse" />
                      <span>Secure Patient Access</span>
                    </div>

                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      Firebase Auth Enabled
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A1A22] tracking-tight">
                    Sign In to Patient Portal
                  </h1>
                  <p className="mt-1.5 text-sm text-gray-600 leading-relaxed">
                    Access your medical records, book clinical appointments, and manage prescriptions.
                  </p>

                  {/* Mode Switcher Tabs */}
                  <div className="mt-5 p-1 bg-[#F4F6F6] rounded-xl flex items-center text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('password');
                        setError(null);
                      }}
                      className={`flex-1 py-2 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${
                        authMode === 'password'
                          ? 'bg-white text-[#00829B] shadow-xs'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Email & Password</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('otp');
                        setError(null);
                      }}
                      className={`flex-1 py-2 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${
                        authMode === 'otp'
                          ? 'bg-white text-[#00829B] shadow-xs'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <KeyRound className="w-3.5 h-3.5" />
                      <span>Email OTP Code</span>
                    </button>
                  </div>

                  {/* Error / Success Notifications */}
                  {error && (
                    <div className="mt-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                      <span>{error}</span>
                    </div>
                  )}

                  {successMsg && (
                    <div className="mt-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                      <span>{successMsg}</span>
                    </div>
                  )}

                  {/* FORM 1: EMAIL & PASSWORD (PRIMARY) */}
                  {authMode === 'password' ? (
                    <form onSubmit={handlePasswordLogin} className="mt-6 space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                          <input
                            type="email"
                            required
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="patient@inspirezest.com"
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-[#0E88AA] focus:ring-3 focus:ring-[#0E88AA]/15 outline-hidden text-sm bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-xs font-bold text-gray-700">
                            Password
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              setResetEmail(email);
                              setShowForgotModal(true);
                              setError(null);
                            }}
                            className="text-xs font-semibold text-[#00829B] hover:text-[#006C82] transition-colors cursor-pointer"
                          >
                            Forgot Password?
                          </button>
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            required
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••••••"
                            className="w-full pl-10 pr-11 py-3 rounded-xl border border-gray-300 focus:border-[#0E88AA] focus:ring-3 focus:ring-[#0E88AA]/15 outline-hidden text-sm bg-white"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-600 select-none">
                          <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="rounded border-gray-300 text-[#00829B] focus:ring-[#00829B]"
                          />
                          <span>Remember my credentials</span>
                        </label>

                        {/* Quick Demo Fill button */}
                        <button
                          type="button"
                          onClick={() => {
                            setEmail('patient@inspirezest.com');
                            setPassword('patient123');
                          }}
                          className="text-[11px] font-semibold text-[#0E88AA] hover:underline"
                        >
                          Auto-fill Demo Patient
                        </button>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#00829B] hover:bg-[#006C82] text-white font-bold text-sm tracking-wide shadow-md hover:shadow-cyan-900/30 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50"
                      >
                        {loading ? (
                          <>
                            <RotateCw className="w-4 h-4 animate-spin" />
                            <span>Authenticating Patient...</span>
                          </>
                        ) : (
                          <>
                            <span>Sign In to Patient Portal</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>
                  ) : (
                    /* FORM 2: EMAIL OTP */
                    <div className="mt-6">
                      {!otpSent ? (
                        <form onSubmit={handleSendOtp} className="space-y-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1.5">
                              Email Address for One-Time Password
                            </label>
                            <div className="relative">
                              <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                              <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="patient@inspirezest.com"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-[#0E88AA] focus:ring-3 focus:ring-[#0E88AA]/15 outline-hidden text-sm bg-white"
                              />
                            </div>
                          </div>

                          <button
                            type="submit"
                            disabled={loading}
                            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#00829B] hover:bg-[#006C82] text-white font-bold text-sm tracking-wide shadow-md hover:shadow-cyan-900/30 transition-all cursor-pointer disabled:opacity-50"
                          >
                            {loading ? <RotateCw className="w-4 h-4 animate-spin" /> : <KeyRound className="w-4 h-4" />}
                            <span>Send Verification Code</span>
                          </button>
                        </form>
                      ) : (
                        <form onSubmit={handleVerifyOtp} className="space-y-4">
                          <div className="p-3 bg-[#E6F7F9] rounded-xl text-xs text-[#00829B] flex items-center justify-between">
                            <span>Code sent to <strong>{email}</strong></span>
                            <button
                              type="button"
                              onClick={() => setOtpSent(false)}
                              className="font-bold underline cursor-pointer"
                            >
                              Change
                            </button>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1.5">
                              Enter 6-Digit Verification Code
                            </label>
                            <input
                              type="text"
                              required
                              maxLength={6}
                              value={otp}
                              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                              placeholder="e.g. 492815"
                              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#0E88AA] focus:ring-3 focus:ring-[#0E88AA]/15 outline-hidden text-lg tracking-[0.3em] font-mono text-center font-bold bg-white"
                            />
                          </div>

                          <button
                            type="submit"
                            disabled={loading}
                            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#00829B] hover:bg-[#006C82] text-white font-bold text-sm tracking-wide shadow-md hover:shadow-cyan-900/30 transition-all cursor-pointer disabled:opacity-50"
                          >
                            {loading ? <RotateCw className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                            <span>Verify & Sign In</span>
                          </button>
                        </form>
                      )}
                    </div>
                  )}

                  {/* PROMINENT LINK TO SEPARATE SIGN UP PAGE */}
                  <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                    <span className="text-gray-600">Don&apos;t have an InspireZest patient account?</span>
                    <Link
                      href="/patient-portal/signup"
                      className="inline-flex items-center gap-1.5 font-bold text-[#00829B] hover:text-[#0E88AA] px-4 py-2 rounded-full bg-[#E6F7F9] hover:bg-[#D0F0F5] transition-all border border-[#D0F0F5]"
                    >
                      <span>Create an Account</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  {/* Accreditations & Hospital Badges */}
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2.5 text-center">
                      Institutional Clinical Compliance & Trust
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span>NABH Accredited</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-amber-500" />
                        <span>JCI Gold Seal</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-[#00829B]" />
                        <span>HIPAA Compliant</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Right Column: Inspiring Healthcare Side Panel (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Editorial Hero Visual Card */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200 aspect-[4/3] group">
              <img
                src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80"
                alt="Compassionate doctor consulting patient at InspireZest Hospital"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A22]/90 via-[#0A1A22]/40 to-transparent" />
              
              {/* Floating Satisfaction Badge */}
              <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#0A1A22] text-xs font-bold shadow-lg flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>99.4% Patient Satisfaction</span>
              </div>

              {/* Text Overlay at Bottom */}
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <h3 className="text-lg font-bold">Compassionate Clinical Excellence</h3>
                <p className="mt-1 text-xs text-white/80 line-clamp-2">
                  Partnering with world-renowned specialists to deliver ethical, patient-first outpatient and inpatient care.
                </p>
              </div>
            </div>

            {/* Feature Perks Box */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-3.5 text-xs text-gray-700">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#E6F7F9] text-[#00829B] flex items-center justify-center shrink-0 mt-0.5">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-gray-900 block font-semibold">24x7 Doctor Appointments</strong>
                  <span className="text-gray-500">Real-time scheduling with attending specialists and top clinicians.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#E6F7F9] text-[#00829B] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-gray-900 block font-semibold">Verified Digital Prescriptions</strong>
                  <span className="text-gray-500">Access tamper-evident clinical prescriptions and diagnostic summaries.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#E6F7F9] text-[#00829B] flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-gray-900 block font-semibold">Real-Time OPD Telemetry</strong>
                  <span className="text-gray-500">Live consultation queue status and doctor room discovery.</span>
                </div>
              </div>
            </div>

            {/* 24x7 Emergency Contact Helpline */}
            <div className="rounded-2xl p-5 bg-gradient-to-r from-[#00829B] to-[#0E88AA] text-white shadow-lg flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-white/80">Immediate Medical Care</p>
                <h4 className="text-base font-extrabold mt-0.5">24x7 Emergency Helpline</h4>
                <p className="text-xs text-white/90 font-mono font-bold mt-1">+91 9567333266</p>
              </div>
              <a
                href="tel:9567333266"
                className="px-4 py-2 rounded-full bg-white text-[#00829B] font-bold text-xs hover:bg-white/90 transition-all shadow-sm"
              >
                Call Now
              </a>
            </div>

          </div>

        </div>
      </main>

      {/* 3. Password Reset Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-gray-200 relative animate-in fade-in zoom-in-95">
            <button
              type="button"
              onClick={() => {
                setShowForgotModal(false);
                setResetSent(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-10 h-10 rounded-xl bg-[#E6F7F9] text-[#00829B] flex items-center justify-center mb-3">
              <KeyRound className="w-5 h-5" />
            </div>

            <h3 className="text-lg font-bold text-[#0A1A22]">Reset Your Patient Password</h3>
            <p className="mt-1 text-xs text-gray-600">
              Enter your registered email address and we will send you a secure password reset link via Firebase Authentication.
            </p>

            {resetSent ? (
              <div className="mt-5 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
                <div className="flex items-center gap-2 font-bold mb-1 text-emerald-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Reset Link Dispatched</span>
                </div>
                <p>
                  Please check your inbox at <strong>{resetEmail}</strong> and follow the link to establish a new password.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotModal(false);
                    setResetSent(false);
                  }}
                  className="mt-4 w-full py-2.5 rounded-xl bg-[#00829B] text-white font-bold text-xs hover:bg-[#006C82] transition-colors"
                >
                  Return to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleResetPassword} className="mt-4 space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="patient@inspirezest.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#0E88AA] focus:ring-3 focus:ring-[#0E88AA]/15 outline-hidden text-sm"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="flex-1 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-semibold text-xs hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={resetLoading}
                    className="flex-1 py-2.5 rounded-xl bg-[#00829B] text-white font-bold text-xs hover:bg-[#006C82] transition-colors disabled:opacity-50"
                  >
                    {resetLoading ? 'Sending...' : 'Send Reset Link'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 4. Footer */}
      <footer className="border-t border-[#EAEAEA] bg-white py-4 text-center text-xs text-gray-500">
        <p>© 2026 InspireZest Hospital. All Rights Reserved. HIPAA & NABH Accredited Healthcare System.</p>
      </footer>
    </div>
  );
}
