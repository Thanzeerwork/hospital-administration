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
  Eye,
  EyeOff,
  ChevronLeft,
  Building2,
  PhoneCall,
  Activity,
  Check,
  User,
  Phone,
  Calendar,
  MapPin,
  ShieldAlert,
} from 'lucide-react';

export default function PatientLoginPage() {
  const router = useRouter();
  const {
    isPatientAuthenticated,
    sendPatientOtp,
    verifyPatientOtp,
    loginPatientWithPassword,
    completeNewPatientProfile,
    patientOtpPendingEmail,
  } = useHospital();

  const [authMethod, setAuthMethod] = useState<'otp' | 'password'>('otp');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [sentViaResend, setSentViaResend] = useState(false);
  const [activeOtpCode, setActiveOtpCode] = useState('');
  const [resendWarning, setResendWarning] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    password: '',
  });

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
        setSentViaResend(!!res.sentViaResend);
        setResendWarning(res.resendWarning || null);
        if (res.otpCode) {
          setActiveOtpCode(res.otpCode);
        }
        setOtp(''); // Never autofill OTP; user enters manually
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
    } finally {
      setLoading(false);
    }
  };

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
        password: newPatientPassword || newPatientData.password,
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

  const fillDemoPatient = () => {
    setEmail('eleanor.vance@example.com');
    setPassword('patient123');
    setError(null);
  };

  const fillResendTestUser = () => {
    setEmail('thanzeerwork@gmail.com');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col lg:grid lg:grid-cols-12 overflow-x-hidden font-sans">
      {/* 1. LEFT SHOWCASE PANEL (Desktop & Tablet) */}
      <div className="relative hidden lg:flex lg:col-span-5 xl:col-span-5 bg-[#0A1A22] text-white flex-col justify-between p-10 xl:p-14 overflow-hidden">
        {/* Background Campus Photo */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://pub-f6697a3e2acd4048a86b5ed54d969979.r2.dev/uploads/1794544119196-InspireZest_Hospital_at_Dusk.png"
            alt="InspireZest Hospital Campus"
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
          />
          {/* Gradients matching live Meditrina style */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A22] via-[#0A1A22]/75 to-[#0A1A22]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1A22]/90 via-[#0A1A22]/60 to-transparent" />
        </div>

        {/* Top Header / Logo on Dark */}
        <div className="relative z-10 flex items-center justify-between">
          <Link href="/patient-portal" className="inline-block transition-transform hover:scale-[1.02]">
            <InspireZestLogo variant="full" size="lg" onDark priority />
          </Link>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-semibold text-white/90">
            <span className="w-2 h-2 rounded-full bg-[#2FE5A7] animate-pulse" />
            NABH Accredited
          </span>
        </div>

        {/* Center Clinical Message */}
        <div className="relative z-10 my-auto py-12 max-w-lg">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#00829B]/80 text-[#2FE5A7] text-[11px] font-bold tracking-wider uppercase mb-4 shadow-sm backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5" />
            Patient Clinical Portal
          </span>

          <h1 className="text-3xl xl:text-4xl font-extrabold text-white tracking-tight leading-tight">
            World-class care, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-[#7EE3D8]">
              tailored for you.
            </span>
          </h1>

          <p className="mt-4 text-sm text-gray-200/90 leading-relaxed">
            Sign in to securely access your certified digital e-prescriptions, track laboratory diagnostics, and book consultations across our 6 super-speciality hospital campuses.
          </p>

          {/* Value Highlights */}
          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-xs text-white">
              <div className="w-8 h-8 rounded-lg bg-[#00829B] text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-[#2FE5A7]" />
              </div>
              <div>
                <p className="font-bold">256-Bit HIPAA Compliant</p>
                <p className="text-[11px] text-gray-300">Bank-grade encryption for all medical telemetry & records</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-xs text-white">
              <div className="w-8 h-8 rounded-lg bg-[#00829B] text-white flex items-center justify-center shrink-0">
                <Activity className="w-4 h-4 text-[#2FE5A7]" />
              </div>
              <div>
                <p className="font-bold">Instant Doctor Availability</p>
                <p className="text-[11px] text-gray-300">Direct booking with senior consultants & surgical specialists</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trust Footer */}
        <div className="relative z-10 pt-6 border-t border-white/15 flex items-center justify-between text-xs text-gray-300">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-[#2FE5A7]" />
            <span>Emergency 24x7: <strong className="text-white">+91 9567333266</strong></span>
          </div>
          <span className="text-[11px] text-gray-400">Trusted by 250,000+ Patients</span>
        </div>
      </div>

      {/* 2. RIGHT AUTHENTICATION PANEL */}
      <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-16 min-h-screen">
        {/* Top Navigation */}
        <div className="flex items-center justify-between pb-6 border-b border-gray-100">
          <Link
            href="/patient-portal"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-[#00829B] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Return to Hospital Home</span>
            <span className="sm:hidden">Home</span>
          </Link>

          {/* Mobile Logo Fallback */}
          <div className="lg:hidden flex items-center justify-center">
            <Link href="/patient-portal">
              <InspireZestLogo variant="full" size="sm" />
            </Link>
          </div>

          <Link
            href="/patient-portal/signup"
            className="text-xs font-bold text-[#00829B] hover:underline"
          >
            <span className="hidden sm:inline">Create Account →</span>
            <span className="sm:hidden">Sign Up →</span>
          </Link>
        </div>

        {/* Form Container */}
        <div className="my-auto py-8 max-w-md w-full mx-auto">
          {isNewPatientStep ? (
            <div>
              {/* Header */}
              <div className="mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold uppercase tracking-wider mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Email Verified • Registration
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] tracking-tight">
                  Complete Your Patient Details
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1.5">
                  Welcome to InspireZest! Your email <strong className="text-gray-800">{newPatientEmail || email}</strong> has been verified. Please provide your clinical profile details to register your digital patient file.
                </p>
              </div>

              {error && (
                <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-xs text-rose-700 font-medium animate-in fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleCompleteNewPatient} className="space-y-4">
                {/* Full Legal Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">
                    Full Legal Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      value={newPatientData.name}
                      onChange={(e) => setNewPatientData({ ...newPatientData, name: e.target.value })}
                      placeholder="e.g. Thanzeer Mohammed"
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00829B] text-gray-900"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">
                    Contact Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      required
                      value={newPatientData.phone}
                      onChange={(e) => setNewPatientData({ ...newPatientData, phone: e.target.value })}
                      placeholder="+91 9567333266"
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00829B] text-gray-900"
                    />
                  </div>
                </div>

                {/* Age & Gender */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">
                      Age <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <input
                        type="number"
                        min={1}
                        max={120}
                        required
                        value={newPatientData.age}
                        onChange={(e) => setNewPatientData({ ...newPatientData, age: e.target.value })}
                        placeholder="28"
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00829B] text-gray-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">
                      Gender <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={newPatientData.gender}
                      onChange={(e) => setNewPatientData({ ...newPatientData, gender: e.target.value as any })}
                      className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00829B] text-gray-900"
                    >
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Blood Group */}
                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">
                    Blood Group
                  </label>
                  <select
                    value={newPatientData.bloodGroup}
                    onChange={(e) => setNewPatientData({ ...newPatientData, bloodGroup: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00829B] text-gray-900"
                  >
                    <option value="O+">O Positive (O+)</option>
                    <option value="A+">A Positive (A+)</option>
                    <option value="B+">B Positive (B+)</option>
                    <option value="AB+">AB Positive (AB+)</option>
                    <option value="O-">O Negative (O-)</option>
                    <option value="A-">A Negative (A-)</option>
                    <option value="B-">B Negative (B-)</option>
                    <option value="AB-">AB Negative (AB-)</option>
                    <option value="Unknown">Don't Know / Unknown</option>
                  </select>
                </div>

                {/* Residential Address */}
                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">
                    Residential Address / City
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={newPatientData.address}
                      onChange={(e) => setNewPatientData({ ...newPatientData, address: e.target.value })}
                      placeholder="e.g. S N Junction, Karbala, Kollam"
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00829B] text-gray-900"
                    />
                  </div>
                </div>

                {/* Emergency Contact */}
                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">
                    Emergency Contact (Name & Phone)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <ShieldAlert className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={newPatientData.emergencyContact}
                      onChange={(e) => setNewPatientData({ ...newPatientData, emergencyContact: e.target.value })}
                      placeholder="e.g. Spouse / Parent - +91 9876543210"
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00829B] text-gray-900"
                    />
                  </div>
                </div>

                {/* Set Password (Optional) */}
                {!newPatientPassword && (
                  <div>
                    <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">
                      Create Master Password (Optional)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={newPatientData.password}
                        onChange={(e) => setNewPatientData({ ...newPatientData, password: e.target.value })}
                        placeholder="Create a password for instant sign in"
                        className="w-full pl-10 pr-11 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00829B] text-gray-900"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full justify-center py-3 bg-[#00829B] hover:bg-[#006C82] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all mt-4"
                  isLoading={loading}
                >
                  <span>Complete Profile & Enter Patient Portal</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsNewPatientStep(false);
                      setOtpSent(false);
                      setOtp('');
                    }}
                    className="text-xs text-gray-500 hover:text-gray-900 font-semibold"
                  >
                    ← Cancel / Back to Sign In
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div>
              {/* Header */}
              <div className="mb-8">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00829B]/10 text-[#00829B] text-xs font-bold uppercase tracking-wider mb-2">
                  <HeartPulse className="w-3.5 h-3.5" />
                  Patient Sign In
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] tracking-tight">
                  Access your medical profile
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1.5">
                  Enter your registered email for passwordless OTP verification or sign in with password.
                </p>
              </div>

          {/* Quick Sandbox / Demo Switcher Buttons */}
          <div className="mb-6 p-3 rounded-xl bg-[#E6F3F5] border border-[#00829B]/20 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-semibold text-[#00829B] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Quick Fill:
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={fillResendTestUser}
                className="px-2.5 py-1 rounded-lg bg-white text-[#00829B] font-bold text-[11px] shadow-xs hover:bg-[#00829B] hover:text-white transition-colors border border-[#00829B]/25"
                title="Uses your authorized Resend email to receive live email"
              >
                thanzeerwork@gmail.com
              </button>
              <button
                type="button"
                onClick={fillDemoPatient}
                className="px-2.5 py-1 rounded-lg bg-white text-gray-700 font-semibold text-[11px] shadow-xs hover:bg-gray-100 transition-colors border border-gray-200"
              >
                Eleanor Vance
              </button>
            </div>
          </div>

          {/* Auth Method Switcher (Segmented Control) */}
          <div className="flex rounded-xl bg-gray-100 p-1.5 border border-gray-200 mb-6 shadow-inner">
            <button
              type="button"
              onClick={() => {
                setAuthMethod('otp');
                setError(null);
              }}
              className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
                authMethod === 'otp'
                  ? 'bg-white text-[#00829B] shadow-sm ring-1 ring-black/5'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Instant OTP Code</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMethod('password');
                setError(null);
              }}
              className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
                authMethod === 'password'
                  ? 'bg-white text-[#00829B] shadow-sm ring-1 ring-black/5'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Email & Password</span>
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-xs text-rose-700 font-medium animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {/* AUTH FORMS */}
          {authMethod === 'otp' ? (
            !otpSent ? (
              /* Step 1: Send OTP */
              <form onSubmit={handleSendOtp} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
                    Registered Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. thanzeerwork@gmail.com"
                      className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:border-transparent transition-all shadow-xs text-gray-900"
                    />
                  </div>
                  <p className="mt-2 text-[11px] text-gray-500">
                    We will send a secure 6-digit one-time passcode to this address.
                  </p>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full justify-center py-3 bg-[#00829B] hover:bg-[#006C82] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all"
                  isLoading={loading}
                >
                  <span>Send Verification Code</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </form>
            ) : (
              /* Step 2: Verify OTP (NO AUTOFILL; USER TYPES CODE MANUALLY) */
              <form onSubmit={handleVerifyOtp} className="space-y-5">
                {sentViaResend ? (
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 shadow-xs">
                    <p className="font-bold flex items-center gap-2 text-emerald-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      Verification Code Dispatched via Resend
                    </p>
                    <p className="text-[11px] mt-1.5 text-emerald-700 leading-relaxed">
                      Sent to <strong>{email || patientOtpPendingEmail}</strong>. If you do not see it in your primary inbox, please check your <strong>Spam / Junk</strong> folder or <strong>Promotions</strong> tab!
                    </p>
                  </div>
                ) : (
                  <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 shadow-xs">
                    <p className="font-bold flex items-center gap-2 text-amber-800">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                      Resend Sandbox Restriction Active
                    </p>
                    <p className="text-[11px] mt-1 text-amber-800 leading-relaxed">
                      Resend free mode only delivers emails to <strong>thanzeerwork@gmail.com</strong>. Since you used another address, your code is provided below for testing:
                    </p>
                    <div className="mt-2.5 inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-amber-300 font-mono font-bold text-sm text-[#00829B] shadow-xs">
                      Code: {activeOtpCode || '492815'}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
                    Enter Six-Digit Verification Code
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <KeyRound className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      autoFocus
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      placeholder="• • • • • •"
                      className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-xl font-mono tracking-[0.4em] text-center font-extrabold focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:border-transparent transition-all shadow-xs text-gray-900"
                    />
                  </div>
                  <p className="mt-2 text-[11px] text-gray-500 text-center">
                    Type or paste the 6 digits you received.
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setOtpSent(false);
                      setOtp('');
                    }}
                    className="text-gray-500 hover:text-gray-900 font-medium"
                  >
                    ← Change Email
                  </button>
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="text-[#00829B] font-bold hover:underline flex items-center gap-1.5"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    Resend Code
                  </button>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full justify-center py-3 bg-[#00829B] hover:bg-[#006C82] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all"
                  isLoading={loading}
                >
                  Verify & Access Portal
                </Button>
              </form>
            )
          ) : (
            /* Password Login */
            <form onSubmit={handlePasswordLogin} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="patient@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:border-transparent transition-all shadow-xs text-gray-900"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider">
                    Password
                  </label>
                  <a href="#" className="text-xs font-medium text-[#00829B] hover:underline">
                    Forgot password?
                  </a>
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
                    placeholder="••••••••"
                    className="w-full pl-10 pr-11 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:border-transparent transition-all shadow-xs text-gray-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 text-[#00829B] border-gray-300 rounded focus:ring-[#00829B]"
                  />
                  <span className="text-gray-600">Remember this workstation</span>
                </label>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full justify-center py-3 bg-[#00829B] hover:bg-[#006C82] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all"
                isLoading={loading}
              >
                Sign In with Password
              </Button>
            </form>
          )}

              {/* Bottom Switcher */}
              <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                <p className="text-xs text-gray-600">
                  New patient at InspireZest Hospitals?{' '}
                  <Link
                    href="/patient-portal/signup"
                    className="font-bold text-[#00829B] hover:underline"
                  >
                    Register your health profile
                  </Link>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Security / Compliance Badges */}
        <div className="pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-[11px] text-gray-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00829B]" />
            <span>256-Bit Encrypted Healthcare Portal • HIPAA Compliant</span>
          </div>
          <span>© {new Date().getFullYear()} InspireZest Multispeciality Healthcare</span>
        </div>
      </div>
    </div>
  );
}
