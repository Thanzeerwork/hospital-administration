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
  User,
  Phone,
  ShieldCheck,
  AlertCircle,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  PhoneCall,
  MapPin,
  RotateCw,
  Award,
  Check,
  Clock,
  FileText,
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
      setError('Passwords do not match. Please verify your passwords.');
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
    } catch (err: any) {
      setError(err?.message || 'Registration failed. Please try again.');
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

      {/* 2. Main Registration Section (Two-Column Google Stitch Split Layout) */}
      <main className="flex-1 mx-auto w-full max-w-[90rem] 2xl:max-w-[110rem] px-4 sm:px-8 lg:px-10 py-8 lg:py-12 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Sign Up Form (7 Cols) */}
          <div className="lg:col-span-7 max-w-2xl mx-auto w-full">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-[#00829B]/10 shadow-xl shadow-[#0A1A22]/5 relative overflow-hidden">
              
              {/* Decorative Subtle Accent Ribbon */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#00829B] via-[#0E88AA] to-[#22A06B]" />

              {/* Status Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F7F9] text-[#00829B] text-xs font-bold tracking-wide uppercase border border-[#D0F0F5]">
                  <span className="w-2 h-2 rounded-full bg-[#00829B] animate-pulse" />
                  <span>New Patient Enrollment</span>
                </div>

                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Firebase Cloud Protected
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A1A22] tracking-tight">
                Create Your Patient Account
              </h1>
              <p className="mt-1.5 text-sm text-gray-600 leading-relaxed">
                Register with your email and password to access digital appointments, clinical records, and prescription history.
              </p>

              {error && (
                <div className="mt-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                
                {/* 1. Full Legal Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Full Legal Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ananya Sharma"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#0E88AA] focus:ring-3 focus:ring-[#0E88AA]/15 outline-hidden text-sm bg-white"
                    />
                  </div>
                </div>

                {/* 2. Email & Phone Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        required
                        autoComplete="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ananya@example.com"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#0E88AA] focus:ring-3 focus:ring-[#0E88AA]/15 outline-hidden text-sm bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Contact Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 9876543210"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#0E88AA] focus:ring-3 focus:ring-[#0E88AA]/15 outline-hidden text-sm bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Password & Confirm Password Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Password (min 6 characters) *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        autoComplete="new-password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="••••••••••••"
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-300 focus:border-[#0E88AA] focus:ring-3 focus:ring-[#0E88AA]/15 outline-hidden text-sm bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-700 cursor-pointer"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        autoComplete="new-password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        placeholder="••••••••••••"
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-300 focus:border-[#0E88AA] focus:ring-3 focus:ring-[#0E88AA]/15 outline-hidden text-sm bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-700 cursor-pointer"
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* 4. Age, Gender, Blood Group */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Age *</label>
                    <input
                      type="number"
                      required
                      min="1"
                      max="120"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:border-[#0E88AA] focus:ring-3 focus:ring-[#0E88AA]/15 outline-hidden text-sm text-center bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Gender *</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:border-[#0E88AA] focus:ring-3 focus:ring-[#0E88AA]/15 outline-hidden text-sm bg-white"
                    >
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Blood Group *</label>
                    <select
                      value={formData.bloodGroup}
                      onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:border-[#0E88AA] focus:ring-3 focus:ring-[#0E88AA]/15 outline-hidden text-sm bg-white"
                    >
                      {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((bg) => (
                        <option key={bg} value={bg}>{bg}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 5. Address & Emergency Contact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Residential Address</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="e.g. Karbala, Kollam, Kerala"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#0E88AA] focus:ring-3 focus:ring-[#0E88AA]/15 outline-hidden text-sm bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Emergency Contact & Relation</label>
                    <input
                      type="text"
                      value={formData.emergencyContact}
                      onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                      placeholder="e.g. Ramesh (Spouse) +91 9876543211"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#0E88AA] focus:ring-3 focus:ring-[#0E88AA]/15 outline-hidden text-sm bg-white"
                    />
                  </div>
                </div>

                {/* 6. Terms Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer text-xs text-gray-600 select-none">
                    <input
                      type="checkbox"
                      checked={formData.termsAccepted}
                      onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                      className="rounded border-gray-300 text-[#00829B] focus:ring-[#00829B] mt-0.5"
                    />
                    <span>
                      I agree to the <strong className="text-gray-900">Hospital Patient Terms</strong> and consent to electronic medical record management in compliance with HIPAA & NABH health data privacy standards.
                    </span>
                  </label>
                </div>

                {/* 7. Submit CTA Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-3 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#00829B] hover:bg-[#006C82] text-white font-bold text-sm tracking-wide shadow-md hover:shadow-cyan-900/30 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <RotateCw className="w-4 h-4 animate-spin" />
                      <span>Creating Account with Firebase Auth...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Patient Account</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* PROMINENT LINK TO SIGN IN PAGE */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <span className="text-gray-600">Already registered with InspireZest?</span>
                <Link
                  href="/patient-portal/login"
                  className="inline-flex items-center gap-1.5 font-bold text-[#00829B] hover:text-[#0E88AA] px-4 py-2 rounded-full bg-[#E6F7F9] hover:bg-[#D0F0F5] transition-all border border-[#D0F0F5]"
                >
                  <span>Sign In Here</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Accreditations */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>NABH Verified</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span>JCI Gold Standard</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00829B]" />
                    <span>256-Bit SSL Encrypted</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: InspireZest Patient Benefits (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Visual Header Card */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200 aspect-[4/3] group">
              <img
                src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80"
                alt="Modern state of the art medical center entrance and patient lobby"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A22]/90 via-[#0A1A22]/40 to-transparent" />
              
              <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#0A1A22] text-xs font-bold shadow-lg flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#00829B]" />
                <span>Premier Care Network</span>
              </div>

              <div className="absolute bottom-5 left-5 right-5 text-white">
                <h3 className="text-lg font-bold">Your Health, Seamlessly Managed</h3>
                <p className="mt-1 text-xs text-white/80 line-clamp-2">
                  Gain instant digital access to top-ranking clinicians, verified lab diagnostics, and specialized outpatient care.
                </p>
              </div>
            </div>

            {/* Benefits Box */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4 text-xs text-gray-700">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#E6F7F9] text-[#00829B] flex items-center justify-center shrink-0 mt-0.5">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-gray-900 block font-semibold">Priority Outpatient Scheduling</strong>
                  <span className="text-gray-500">Pick preferred appointment dates with top specialists without queuing.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#E6F7F9] text-[#00829B] flex items-center justify-center shrink-0 mt-0.5">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-gray-900 block font-semibold">Digital Health Records</strong>
                  <span className="text-gray-500">Encrypted cloud vault storing all doctor notes and e-prescriptions.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#E6F7F9] text-[#00829B] flex items-center justify-center shrink-0 mt-0.5">
                  <HeartPulse className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-gray-900 block font-semibold">Integrated Family Profiles</strong>
                  <span className="text-gray-500">Manage health schedules and prescription histories for children and elders.</span>
                </div>
              </div>
            </div>

            {/* 24x7 Emergency Contact Helpline */}
            <div className="rounded-2xl p-5 bg-gradient-to-r from-[#00829B] to-[#0E88AA] text-white shadow-lg flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-white/80">Hospital Contact Center</p>
                <h4 className="text-base font-extrabold mt-0.5">24x7 Medical Helpline</h4>
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

      {/* 3. Footer */}
      <footer className="border-t border-[#EAEAEA] bg-white py-4 text-center text-xs text-gray-500">
        <p>© 2026 InspireZest Hospital. All Rights Reserved. HIPAA & NABH Accredited Healthcare System.</p>
      </footer>
    </div>
  );
}
