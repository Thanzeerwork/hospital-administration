'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useHospital } from '@/context/HospitalContext';
import InspireZestLogo from '@/components/common/InspireZestLogo';
import { Button } from '@/components/common/Button';
import { R2ImageUpload } from '@/components/common/R2ImageUpload';
import {
  Stethoscope,
  User,
  Lock,
  Mail,
  Phone,
  Building,
  GraduationCap,
  DollarSign,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export default function DoctorSignupPage() {
  const router = useRouter();
  const { signupDoctor, specializations } = useHospital();

  const [formData, setFormData] = useState({
    name: '',
    specializationId: specializations[0]?.id || 'spec-cardiology',
    experienceYears: '8',
    consultationFee: '150',
    email: '',
    phone: '',
    username: '',
    password: '',
    room: 'Suite 304',
    bio: '',
    profileImage: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.username || !formData.password) {
      setError('Please provide all required physician credentials.');
      return;
    }

    const selectedSpec = specializations.find((s) => s.id === formData.specializationId);
    const specName = selectedSpec ? selectedSpec.name : 'Cardiology';

    setError(null);
    setLoading(true);

    try {
      const res = await signupDoctor({
        name: formData.name,
        specializationId: formData.specializationId,
        specializationName: specName,
        experienceYears: parseInt(formData.experienceYears, 10) || 5,
        consultationFee: parseInt(formData.consultationFee, 10) || 150,
        email: formData.email,
        phone: formData.phone || '+91 9567333266',
        username: formData.username,
        password: formData.password,
        bio: formData.bio || 'Board-certified medical specialist dedicated to patient outcomes and continuous clinical care.',
        room: formData.room,
        profileImage: formData.profileImage,
      });

      if (res.success) {
        router.push('/doctor-portal');
      } else {
        setError(res.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6F6] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        {/* Brand Header */}
        <div className="flex justify-center mb-2">
          <Link href="/doctor-portal" className="inline-block hover:opacity-95 transition-opacity">
            <InspireZestLogo variant="full" size="md" priority />
          </Link>
        </div>

        <h2 className="mt-5 text-center text-2xl font-extrabold text-[#1A1A1A]">
          Register Medical Staff Profile
        </h2>
        <p className="mt-1 text-center text-xs text-[#666666]">
          Enroll into hospital outpatient scheduling, patient records, and the digital consultation network.
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-white py-8 px-6 shadow-card sm:rounded-2xl border border-[#E5E7EB] sm:px-10">
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-[#DC5555]/10 border border-[#DC5555]/20 flex items-start gap-2.5 text-xs text-[#DC5555] font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Cloudflare R2 Photo Upload */}
            <div className="p-4 rounded-xl bg-[#F4F6F6] border border-[#E5E7EB]">
              <R2ImageUpload
                value={formData.profileImage}
                onChange={(url) => setFormData({ ...formData, profileImage: url })}
                folder="physicians"
                label="Doctor Profile Photo (Cloudflare R2)"
                placeholder="Upload high-res portrait (saved to Cloudflare R2 bucket)"
              />
            </div>

            {/* Name & Specialization */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                  Physician Full Name <span className="text-[#DC5555]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#666666]">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Jordan Hayes"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#F4F6F6] border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white text-[#1A1A1A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                  Clinical Specialization <span className="text-[#DC5555]">*</span>
                </label>
                <select
                  value={formData.specializationId}
                  onChange={(e) => setFormData({ ...formData, specializationId: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F4F6F6] border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white text-[#1A1A1A] font-semibold"
                >
                  {specializations.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} Department
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Experience, Fee, Room */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                  Experience (Years)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#666666]">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <input
                    type="number"
                    min={1}
                    max={60}
                    required
                    value={formData.experienceYears}
                    onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                    className="w-full pl-10 pr-3 py-2.5 bg-[#F4F6F6] border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white text-[#1A1A1A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                  Consultation Fee ($)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#666666]">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <input
                    type="number"
                    min={10}
                    max={1000}
                    required
                    value={formData.consultationFee}
                    onChange={(e) => setFormData({ ...formData, consultationFee: e.target.value })}
                    className="w-full pl-10 pr-3 py-2.5 bg-[#F4F6F6] border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white text-[#1A1A1A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                  Clinic Room / Suite
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#666666]">
                    <Building className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.room}
                    onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                    placeholder="Suite 204"
                    className="w-full pl-10 pr-3 py-2.5 bg-[#F4F6F6] border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white text-[#1A1A1A]"
                  />
                </div>
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                  Hospital Staff Email <span className="text-[#DC5555]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#666666]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="dr.hayes@inspirezest.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#F4F6F6] border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white text-[#1A1A1A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                  Direct Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#666666]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 345-6789"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#F4F6F6] border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white text-[#1A1A1A]"
                  />
                </div>
              </div>
            </div>

            {/* Username & Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                  Staff Login Username <span className="text-[#DC5555]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#666666]">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    placeholder="dr.hayes"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#F4F6F6] border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white text-[#1A1A1A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                  Login Password <span className="text-[#DC5555]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#666666]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Min. 6 characters"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#F4F6F6] border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white text-[#1A1A1A]"
                  />
                </div>
              </div>
            </div>

            {/* Biography */}
            <div>
              <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                Clinical Biography & Focus Areas
              </label>
              <textarea
                rows={3}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Describe your medical fellowship, clinical specialty, and patient care philosophy..."
                className="w-full px-3.5 py-2.5 bg-[#F4F6F6] border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white text-[#1A1A1A]"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full justify-center mt-2"
              isLoading={loading}
            >
              Enroll Physician & Enter Doctor Console
            </Button>
          </form>

          {/* Already registered */}
          <div className="mt-6 pt-6 border-t border-[#E5E7EB] text-center">
            <p className="text-xs text-[#666666]">
              Already have medical staff credentials?{' '}
              <Link
                href="/doctor-portal/login"
                className="font-bold text-[#00829B] hover:underline inline-flex items-center gap-1"
              >
                <span>Sign in here</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center flex items-center justify-center gap-2 text-[11px] text-[#666666]">
          <ShieldCheck className="w-4 h-4 text-[#00829B]" />
          <span>Synced directly to Google Firebase Firestore & Cloudflare R2</span>
        </div>
      </div>
    </div>
  );
}

