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
  User,
  Phone,
  ShieldCheck,
  AlertCircle,
  Calendar,
  Activity,
  CheckCircle2,
  ArrowRight,
  Eye,
  EyeOff,
  ChevronLeft,
  Sparkles,
  PhoneCall,
  MapPin,
  Droplet,
  Users,
} from 'lucide-react';

export default function PatientSignupPage() {
  const router = useRouter();
  const { signupPatient } = useHospital();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '28',
    gender: 'Female' as 'Female' | 'Male' | 'Other',
    bloodGroup: 'O+',
    address: '',
    emergencyContact: '',
    password: '',
    confirmPassword: '',
    termsAccepted: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setError('Please fill in all required personal identity fields.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!formData.termsAccepted) {
      setError('Please accept the HIPAA privacy statement and patient terms to proceed.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const res = await signupPatient({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        age: parseInt(formData.age, 10) || 30,
        gender: formData.gender,
        bloodGroup: formData.bloodGroup,
        address: formData.address.trim(),
        emergencyContact: formData.emergencyContact.trim(),
        password: formData.password,
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
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A22] via-[#0A1A22]/80 to-[#0A1A22]/45" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1A22]/95 via-[#0A1A22]/65 to-transparent" />
        </div>

        {/* Top Header / Logo */}
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
        <div className="relative z-10 my-auto py-10 max-w-lg">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#00829B]/80 text-[#2FE5A7] text-[11px] font-bold tracking-wider uppercase mb-4 shadow-sm backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5" />
            New Patient Onboarding
          </span>

          <h1 className="text-3xl xl:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Your journey to health <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-[#7EE3D8]">
              starts here.
            </span>
          </h1>

          <p className="mt-4 text-sm text-gray-200/90 leading-relaxed">
            Create your permanent patient profile to unlock instant digital appointment scheduling, verified e-prescriptions, and continuous multidisciplinary care.
          </p>

          {/* Value Highlights */}
          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-xs text-white">
              <div className="w-8 h-8 rounded-lg bg-[#00829B] text-white flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4 text-[#2FE5A7]" />
              </div>
              <div>
                <p className="font-bold">Zero-Wait OPD Check-in</p>
                <p className="text-[11px] text-gray-300">Skip reception paperwork queues on every hospital visit</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-xs text-white">
              <div className="w-8 h-8 rounded-lg bg-[#00829B] text-white flex items-center justify-center shrink-0">
                <Activity className="w-4 h-4 text-[#2FE5A7]" />
              </div>
              <div>
                <p className="font-bold">Lifelong Digital Medical Record</p>
                <p className="text-[11px] text-gray-300">Consultation summaries, pathology, and e-Rx securely synced</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-xs text-white">
              <div className="w-8 h-8 rounded-lg bg-[#00829B] text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-[#2FE5A7]" />
              </div>
              <div>
                <p className="font-bold">HIPAA & NABH Compliant Telemetry</p>
                <p className="text-[11px] text-gray-300">Strict patient confidentiality and encrypted cloud records</p>
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
          <span className="text-[11px] text-gray-400">Trusted Network</span>
        </div>
      </div>

      {/* 2. RIGHT REGISTRATION PANEL */}
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

          <div className="flex items-center gap-1.5 text-xs">
            <span className="hidden sm:inline text-gray-500">Already registered?</span>
            <Link
              href="/patient-portal/login"
              className="font-bold text-[#00829B] hover:underline"
            >
              Sign In →
            </Link>
          </div>
        </div>

        {/* Form Container */}
        <div className="my-auto py-8 max-w-xl w-full mx-auto">
          {/* Header */}
          <div className="mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00829B]/10 text-[#00829B] text-xs font-bold uppercase tracking-wider mb-2">
              <HeartPulse className="w-3.5 h-3.5" />
              Patient Registration
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] tracking-tight">
              Create your hospital health profile
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1.5">
              Please enter your accurate demographic and clinical details for patient charting.
            </p>
          </div>

          {/* Error Notice */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-xs text-rose-700 font-medium animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 1. Identity Block */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-4">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5 text-[#00829B]">
                <User className="w-3.5 h-3.5" />
                1. Personal Identity
              </h3>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Full Legal Patient Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white transition-all text-gray-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="patient@example.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white transition-all text-gray-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Primary Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 9567333266"
                      className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white transition-all text-gray-900"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Clinical Profile Block */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-4">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5 text-[#00829B]">
                <Activity className="w-3.5 h-3.5" />
                2. Clinical & Demographic Essentials
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Age */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Age (Years)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <input
                      type="number"
                      min={1}
                      max={120}
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="w-full pl-10 pr-3 py-2.5 bg-[#F8FAFC] border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white transition-all text-gray-900"
                    />
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Biological Gender
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                    className="w-full px-3 py-2.5 bg-[#F8FAFC] border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white transition-all text-gray-900 cursor-pointer"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other / Non-binary</option>
                  </select>
                </div>

                {/* Blood Group */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
                    <Droplet className="w-3 h-3 text-rose-500" />
                    Blood Group
                  </label>
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#F8FAFC] border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white transition-all text-gray-900 cursor-pointer font-bold"
                  >
                    <option value="O+">O Positive (O+)</option>
                    <option value="O-">O Negative (O-)</option>
                    <option value="A+">A Positive (A+)</option>
                    <option value="A-">A Negative (A-)</option>
                    <option value="B+">B Positive (B+)</option>
                    <option value="B-">B Negative (B-)</option>
                    <option value="AB+">AB Positive (AB+)</option>
                    <option value="AB-">AB Negative (AB-)</option>
                  </select>
                </div>
              </div>

              {/* Address & Emergency Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    City / Residential Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="e.g. Kollam, Kerala"
                      className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white transition-all text-gray-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Emergency Contact (Name & Phone)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Users className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={formData.emergencyContact}
                      onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                      placeholder="e.g. Spouse / Parent (+91...)"
                      className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white transition-all text-gray-900"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Account Security Block */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-4">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5 text-[#00829B]">
                <Lock className="w-3.5 h-3.5" />
                3. Account Security Credentials
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Account Password <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Min 6 characters"
                      className="w-full pl-10 pr-11 py-2.5 bg-[#F8FAFC] border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white transition-all text-gray-900"
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

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Confirm Password <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      placeholder="Re-enter password"
                      className="w-full pl-10 pr-11 py-2.5 bg-[#F8FAFC] border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white transition-all text-gray-900"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-gray-600">
                  <input
                    type="checkbox"
                    checked={formData.termsAccepted}
                    onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                    className="w-4 h-4 mt-0.5 text-[#00829B] border-gray-300 rounded focus:ring-[#00829B]"
                  />
                  <span>
                    I confirm that the medical and demographic information provided is accurate and agree to the{' '}
                    <a href="#" className="text-[#00829B] font-semibold hover:underline">
                      HIPAA Privacy Policy
                    </a>{' '}
                    and hospital patient care protocols.
                  </span>
                </label>
              </div>
            </div>

            {/* Action Button */}
            <Button
              type="submit"
              variant="primary"
              className="w-full justify-center py-3.5 bg-[#00829B] hover:bg-[#006C82] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all"
              isLoading={loading}
            >
              <span>Create Patient Health Profile</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          {/* Bottom Link */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-600">
              Already have an active profile?{' '}
              <Link
                href="/patient-portal/login"
                className="font-bold text-[#00829B] hover:underline"
              >
                Sign in to your patient account
              </Link>
            </p>
          </div>
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
