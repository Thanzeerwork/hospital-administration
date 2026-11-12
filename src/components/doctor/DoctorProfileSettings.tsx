'use client';

import React, { useState } from 'react';
import { useHospital } from '@/context/HospitalContext';
import { Button } from '@/components/common/Button';
import { R2ImageUpload } from '@/components/common/R2ImageUpload';
import { Save, User, Mail, Phone, MapPin, Award, CheckCircle } from 'lucide-react';

export const DoctorProfileSettings: React.FC = () => {
  const { doctorUser, updateDoctorProfile, specializations } = useHospital();

  const [name, setName] = useState(doctorUser?.name || 'Dr. Alexander Wright');
  const [specializationId, setSpecializationId] = useState(
    doctorUser?.specializationId || 'spec-cardiology'
  );
  const [profileImage, setProfileImage] = useState(
    doctorUser?.profileImage ||
      'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80'
  );
  const [email, setEmail] = useState(doctorUser?.email || 'alexander.wright@inspirezest.com');
  const [phone, setPhone] = useState(doctorUser?.phone || '+91 9567333266');
  const [room, setRoom] = useState(doctorUser?.room || 'Cath Lab Wing A, Suite 302');
  const [experienceYears, setExperienceYears] = useState(doctorUser?.experienceYears || 14);
  const [bio, setBio] = useState(
    doctorUser?.bio ||
      'Senior Interventional Cardiologist specializing in coronary interventions, structural heart diseases, and preventive cardiology.'
  );
  const [consultationFee, setConsultationFee] = useState(doctorUser?.consultationFee || 160);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctorUser) return;
    setIsSaving(true);

    const specObj = specializations.find((s) => s.id === specializationId);

    setTimeout(() => {
      updateDoctorProfile(doctorUser.id, {
        name,
        specializationId,
        specializationName: specObj?.name || doctorUser.specializationName,
        profileImage,
        email,
        phone,
        room,
        experienceYears: Number(experienceYears),
        bio,
        consultationFee: Number(consultationFee),
      });
      setIsSaving(false);
    }, 400);
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      {/* Header */}
      <div className="border-b border-[#E5E7EB] pb-4">
        <h1 className="text-2xl font-extrabold text-[#1A1A1A] tracking-tight">
          Doctor Profile Settings
        </h1>
        <p className="text-xs text-[#666666] mt-0.5">
          Update your public medical profile, clinical biography, contact channels, and office location.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Card Preview with Cloudflare R2 Upload */}
        <div className="p-5 rounded-xl border border-[#E5E7EB] bg-white shadow-xs">
          <R2ImageUpload
            value={profileImage}
            onChange={(url) => setProfileImage(url)}
            folder="physicians"
            label="Doctor Profile Photograph"
            placeholder="Upload or replace portrait via Cloudflare R2 bucket"
          />
        </div>

        {/* Core Credentials */}
        <div className="p-5 rounded-xl border border-[#E5E7EB] bg-white shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-[#1A1A1A]">Clinician Identification</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 text-xs text-[#1A1A1A] bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                Clinical Specialization
              </label>
              <select
                value={specializationId}
                onChange={(e) => setSpecializationId(e.target.value)}
                className="w-full p-2.5 text-xs text-[#1A1A1A] font-semibold bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
              >
                {specializations.map((spec) => (
                  <option key={spec.id} value={spec.id}>
                    {spec.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                Years of Experience
              </label>
              <input
                type="number"
                value={experienceYears}
                onChange={(e) => setExperienceYears(Number(e.target.value))}
                className="w-full p-2.5 text-xs text-[#1A1A1A] bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
                min={1}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                Consultation Fee ($ USD)
              </label>
              <input
                type="number"
                value={consultationFee}
                onChange={(e) => setConsultationFee(Number(e.target.value))}
                className="w-full p-2.5 text-xs text-[#1A1A1A] bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
                min={0}
                required
              />
            </div>
          </div>
        </div>

        {/* Contact & Location */}
        <div className="p-5 rounded-xl border border-[#E5E7EB] bg-white shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-[#1A1A1A]">Contact & Department Location</h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 text-xs text-[#1A1A1A] bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2.5 text-xs text-[#1A1A1A] bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">Room / Clinic Suite</label>
              <input
                type="text"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="w-full p-2.5 text-xs text-[#1A1A1A] bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
              Professional Biography
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className="w-full p-3 text-xs text-[#1A1A1A] bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
              required
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            variant="primary"
            size="md"
            icon={<Save className="w-4 h-4" />}
            isLoading={isSaving}
          >
            Save Profile Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

