'use client';

import React, { useState } from 'react';
import { useHospital } from '@/context/HospitalContext';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { Modal } from '@/components/common/Modal';
import { ConfirmationModal } from '@/components/common/ConfirmationModal';
import { R2ImageUpload } from '@/components/common/R2ImageUpload';
import { Doctor } from '@/types';
import {
  UserPlus,
  Search,
  Filter,
  Edit,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Lock,
  User,
  Star,
  Eye,
  EyeOff,
  Copy,
  Check,
  KeyRound,
} from 'lucide-react';

export const AdminDoctorManagement: React.FC = () => {
  const { doctors, specializations, addDoctor, editDoctor, deleteDoctor, addToast } = useHospital();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('All');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [deletingDoctorId, setDeletingDoctorId] = useState<string | null>(null);

  // Password Visibility States (Admin Security Controls)
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});
  const [showAllPasswords, setShowAllPasswords] = useState(false);
  const [copiedDoctorId, setCopiedDoctorId] = useState<string | null>(null);
  const [showAddPassword, setShowAddPassword] = useState(false);
  const [showEditPassword, setShowEditPassword] = useState(false);

  const togglePasswordVisibility = (docId: string) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [docId]: prev[docId] !== undefined ? !prev[docId] : !showAllPasswords,
    }));
  };

  const handleToggleShowAllPasswords = () => {
    const nextState = !showAllPasswords;
    setShowAllPasswords(nextState);
    const updated: Record<string, boolean> = {};
    doctors.forEach((doc) => {
      updated[doc.id] = nextState;
    });
    setVisiblePasswords(updated);
  };

  const handleCopyPassword = (docId: string, doctorName: string, password?: string) => {
    const pass = password || 'password123';
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(pass);
    }
    setCopiedDoctorId(docId);
    if (addToast) {
      addToast(`Password for ${doctorName} copied to clipboard`, 'info', 'Password Copied');
    }
    setTimeout(() => setCopiedDoctorId(null), 2000);
  };

  // Form State
  const initialFormState = {
    name: '',
    specializationId: specializations[0]?.id || 'spec-cardiology',
    profileImage:
      'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    username: '',
    password: 'password123',
    email: '',
    phone: '',
    room: 'Suite 101',
    experienceYears: 10,
    consultationFee: 150,
    bio: 'Dedicated medical practitioner with extensive clinical experience and board certification.',
  };

  const [formData, setFormData] = useState(initialFormState);

  // Filtered doctors
  const filteredDoctors = doctors.filter((doc) => {
    const matchesSpec =
      selectedSpecialization === 'All' || doc.specializationName === selectedSpecialization;
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSpec && matchesSearch;
  });

  const handleOpenAdd = () => {
    setFormData(initialFormState);
    setShowAddPassword(false);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (doc: Doctor) => {
    setEditingDoctor(doc);
    setShowEditPassword(false);
    setFormData({
      name: doc.name,
      specializationId: doc.specializationId,
      profileImage: doc.profileImage,
      username: doc.username,
      password: doc.password || 'password123',
      email: doc.email,
      phone: doc.phone,
      room: doc.room,
      experienceYears: doc.experienceYears,
      consultationFee: doc.consultationFee,
      bio: doc.bio,
    });
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const spec = specializations.find((s) => s.id === formData.specializationId);

    addDoctor({
      name: formData.name,
      specializationId: formData.specializationId,
      specializationName: spec?.name || 'General Medicine',
      profileImage: formData.profileImage,
      username: formData.username || formData.name.toLowerCase().replace(/[^a-z0-9]/g, '.'),
      password: formData.password,
      email: formData.email,
      phone: formData.phone,
      room: formData.room,
      experienceYears: Number(formData.experienceYears),
      consultationFee: Number(formData.consultationFee),
      bio: formData.bio,
      availableDates: [
        new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
        new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0],
        new Date(Date.now() + 86400000 * 6).toISOString().split('T')[0],
      ],
      timeSlots: ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'],
    });

    setIsAddModalOpen(false);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDoctor) return;

    const spec = specializations.find((s) => s.id === formData.specializationId);

    editDoctor(editingDoctor.id, {
      name: formData.name,
      specializationId: formData.specializationId,
      specializationName: spec?.name || editingDoctor.specializationName,
      profileImage: formData.profileImage,
      username: formData.username,
      password: formData.password,
      email: formData.email,
      phone: formData.phone,
      room: formData.room,
      experienceYears: Number(formData.experienceYears),
      consultationFee: Number(formData.consultationFee),
      bio: formData.bio,
    });

    setEditingDoctor(null);
  };

  const handleConfirmDelete = () => {
    if (deletingDoctorId) {
      deleteDoctor(deletingDoctorId);
      setDeletingDoctorId(null);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1A1A1A] tracking-tight">
            Doctor Management Module
          </h1>
          <p className="text-xs text-[#666666] mt-0.5">
            Administer hospital attending physicians, credentials, departments, and clinical fees.
          </p>
        </div>

        <Button
          variant="primary"
          icon={<UserPlus className="w-4 h-4" />}
          onClick={handleOpenAdd}
        >
          Add New Doctor
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl border border-[#E5E7EB] shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#666666] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search doctors by name, username, or email..."
            className="w-full pl-9 pr-3.5 py-2 text-xs text-[#1A1A1A] bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white"
          />
        </div>

        {/* Specialization Filter & Password Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            icon={showAllPasswords ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            onClick={handleToggleShowAllPasswords}
            className="text-xs"
          >
            {showAllPasswords ? 'Mask All Passwords' : 'View All Passwords'}
          </Button>

          <span className="text-xs font-bold text-[#666666] shrink-0 ml-1">Specialization:</span>
          <select
            value={selectedSpecialization}
            onChange={(e) => setSelectedSpecialization(e.target.value)}
            className="text-xs p-2 bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg text-[#1A1A1A] font-semibold focus:outline-none focus:ring-2 focus:ring-[#00829B]"
          >
            <option value="All">All Specializations</option>
            {specializations.map((spec) => (
              <option key={spec.id} value={spec.name}>
                {spec.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Professional Doctors Table */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F4F6F6] border-b border-[#E5E7EB] text-[#666666] font-bold uppercase tracking-wider text-[11px]">
                <th className="p-3.5">Doctor Information</th>
                <th className="p-3.5">Specialization</th>
                <th className="p-3.5">Credentials</th>
                <th className="p-3.5">Contact Details</th>
                <th className="p-3.5">Experience & Fee</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doc) => (
                  <tr key={doc.id} className="hover:bg-[#F4F6F6]/80 transition-colors">
                    {/* Doctor Info */}
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={doc.profileImage}
                          alt={doc.name}
                          className="w-11 h-11 rounded-lg object-cover border border-[#E5E7EB] shrink-0"
                        />
                        <div className="min-w-0">
                          <span className="font-bold text-[#1A1A1A] block text-sm truncate">
                            {doc.name}
                          </span>
                          <span className="text-[11px] text-[#666666] block truncate">
                            {doc.room}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Specialization */}
                    <td className="p-3.5">
                      <Badge variant="teal">{doc.specializationName}</Badge>
                    </td>

                    {/* Credentials */}
                    <td className="p-3.5">
                      <div className="font-mono text-xs text-[#1A1A1A] flex items-center gap-1.5">
                        <span className="text-[#666666]">user:</span>
                        <strong className="text-[#1A1A1A]">{doc.username}</strong>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-[11px] text-[#666666] font-mono">pass:</span>
                        {visiblePasswords[doc.id] ? (
                          <span className="font-mono text-xs font-bold text-[#00829B] bg-[#E6F3F5] px-2 py-0.5 rounded border border-[#00829B]/20 select-all">
                            {doc.password || 'password123'}
                          </span>
                        ) : (
                          <span className="text-[11px] text-[#666666] font-mono tracking-widest bg-gray-100 px-1.5 py-0.5 rounded">
                            ••••••••
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility(doc.id)}
                          className="p-1 text-[#666666] hover:text-[#00829B] hover:bg-[#F4F6F6] rounded transition-colors"
                          title={visiblePasswords[doc.id] ? 'Hide doctor password' : 'View doctor password'}
                        >
                          {visiblePasswords[doc.id] ? (
                            <EyeOff className="w-3.5 h-3.5" />
                          ) : (
                            <Eye className="w-3.5 h-3.5" />
                          )}
                        </button>
                        {visiblePasswords[doc.id] && (
                          <button
                            type="button"
                            onClick={() => handleCopyPassword(doc.id, doc.name, doc.password)}
                            className="p-1 text-[#666666] hover:text-[#00829B] hover:bg-[#F4F6F6] rounded transition-colors"
                            title="Copy password to clipboard"
                          >
                            {copiedDoctorId === doc.id ? (
                              <Check className="w-3.5 h-3.5 text-[#22A06B]" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        )}
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="p-3.5">
                      <div className="text-[#1A1A1A] font-medium">{doc.email}</div>
                      <div className="text-[11px] text-[#666666]">{doc.phone}</div>
                    </td>

                    {/* Experience & Fee */}
                    <td className="p-3.5">
                      <div className="font-semibold text-[#1A1A1A]">
                        {doc.experienceYears} Years
                      </div>
                      <div className="text-[11px] text-[#00829B] font-bold">
                        ${doc.consultationFee} / consult
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="p-3.5 text-right space-x-1">
                      <button
                        onClick={() => handleOpenEdit(doc)}
                        className="p-1.5 text-[#00829B] hover:bg-[#00829B]/10 rounded-md transition-colors"
                        title="Edit Doctor"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeletingDoctorId(doc.id)}
                        className="p-1.5 text-[#DC5555] hover:bg-[#DC5555]/10 rounded-md transition-colors"
                        title="Delete Doctor"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-[#666666]">
                    No doctors match the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Doctor Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Hospital Doctor"
        subtitle="Enroll an attending physician into the hospital management roster."
        maxWidth="lg"
      >
        <form onSubmit={handleSaveAdd} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-[#1A1A1A] mb-1">Doctor Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Dr. Jennifer Lawrence"
                className="w-full p-2.5 bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-[#1A1A1A] mb-1">Specialization</label>
              <select
                value={formData.specializationId}
                onChange={(e) =>
                  setFormData({ ...formData, specializationId: e.target.value })
                }
                className="w-full p-2.5 bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B] font-semibold"
              >
                {specializations.map((spec) => (
                  <option key={spec.id} value={spec.id}>
                    {spec.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-[#1A1A1A] mb-1">Username (for portal login)</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="e.g. dr.lawrence"
                className="w-full p-2.5 bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-[#1A1A1A] mb-1">Assigned Password</label>
              <div className="relative">
                <input
                  type={showAddPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Password for doctor portal"
                  className="w-full p-2.5 pr-10 bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowAddPassword(!showAddPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#666666] hover:text-[#1A1A1A]"
                  title={showAddPassword ? 'Hide password' : 'View password'}
                >
                  {showAddPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-[#1A1A1A] mb-1">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="doctor@inspirezest.com"
                className="w-full p-2.5 bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-[#1A1A1A] mb-1">Phone Number</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 000-1122"
                className="w-full p-2.5 bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-[#1A1A1A] mb-1">Room / Suite</label>
              <input
                type="text"
                value={formData.room}
                onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                className="w-full p-2.5 bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
                required
              />
            </div>
          </div>

          <div>
            <R2ImageUpload
              value={formData.profileImage}
              onChange={(url) => setFormData({ ...formData, profileImage: url })}
              folder="physicians"
              label="Doctor Profile Photograph"
              placeholder="Upload or replace physician portrait via Cloudflare R2"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-[#1A1A1A] mb-1">Years of Experience</label>
              <input
                type="number"
                value={formData.experienceYears}
                onChange={(e) =>
                  setFormData({ ...formData, experienceYears: Number(e.target.value) })
                }
                className="w-full p-2.5 bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
                min={1}
                required
              />
            </div>
            <div>
              <label className="block font-bold text-[#1A1A1A] mb-1">Consultation Fee ($)</label>
              <input
                type="number"
                value={formData.consultationFee}
                onChange={(e) =>
                  setFormData({ ...formData, consultationFee: Number(e.target.value) })
                }
                className="w-full p-2.5 bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
                min={0}
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#1A1A1A] mb-1">Biography</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={3}
              className="w-full p-2.5 bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
              required
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button variant="outline" type="button" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Enroll Doctor
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Doctor Modal */}
      {editingDoctor && (
        <Modal
          isOpen={Boolean(editingDoctor)}
          onClose={() => setEditingDoctor(null)}
          title={editingDoctor.name.startsWith('Dr.') ? `Edit ${editingDoctor.name}` : `Edit Dr. ${editingDoctor.name}`}
          subtitle="Modify doctor details, credentials, or contact info."
          maxWidth="lg"
        >
          <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#1A1A1A] mb-1">Doctor Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
                  required
                />
              </div>
              <div>
                <label className="block font-bold text-[#1A1A1A] mb-1">Specialization</label>
                <select
                  value={formData.specializationId}
                  onChange={(e) =>
                    setFormData({ ...formData, specializationId: e.target.value })
                  }
                  className="w-full p-2.5 bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B] font-semibold"
                >
                  {specializations.map((spec) => (
                    <option key={spec.id} value={spec.id}>
                      {spec.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#1A1A1A] mb-1">Username</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full p-2.5 bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
                  required
                />
              </div>
              <div>
                <label className="block font-bold text-[#1A1A1A] mb-1">Current / Reset Password</label>
                <div className="relative">
                  <input
                    type={showEditPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full p-2.5 pr-10 bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowEditPassword(!showEditPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#666666] hover:text-[#1A1A1A]"
                    title={showEditPassword ? 'Hide password' : 'View password'}
                  >
                    {showEditPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-bold text-[#1A1A1A] mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2.5 bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
                  required
                />
              </div>
              <div>
                <label className="block font-bold text-[#1A1A1A] mb-1">Phone</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-2.5 bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
                  required
                />
              </div>
              <div>
                <label className="block font-bold text-[#1A1A1A] mb-1">Room / Suite</label>
                <input
                  type="text"
                  value={formData.room}
                  onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                  className="w-full p-2.5 bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
                  required
                />
              </div>
            </div>

            <div>
              <R2ImageUpload
                value={formData.profileImage}
                onChange={(url) => setFormData({ ...formData, profileImage: url })}
                folder="physicians"
                label="Doctor Profile Photograph"
                placeholder="Upload or replace physician portrait via Cloudflare R2"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#1A1A1A] mb-1">Years of Experience</label>
                <input
                  type="number"
                  value={formData.experienceYears}
                  onChange={(e) =>
                    setFormData({ ...formData, experienceYears: Number(e.target.value) })
                  }
                  className="w-full p-2.5 bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
                  required
                />
              </div>
              <div>
                <label className="block font-bold text-[#1A1A1A] mb-1">Consultation Fee ($)</label>
                <input
                  type="number"
                  value={formData.consultationFee}
                  onChange={(e) =>
                    setFormData({ ...formData, consultationFee: Number(e.target.value) })
                  }
                  className="w-full p-2.5 bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#1A1A1A] mb-1">Biography</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={3}
                className="w-full p-2.5 bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
                required
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button variant="outline" type="button" onClick={() => setEditingDoctor(null)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Update Doctor
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Confirmation Modal for Delete */}
      <ConfirmationModal
        isOpen={Boolean(deletingDoctorId)}
        onClose={() => setDeletingDoctorId(null)}
        onConfirm={handleConfirmDelete}
        title="Remove Doctor from Hospital?"
        message="Are you sure you want to delete this physician? This will permanently remove their credentials and active booking slots from the patient directory."
        confirmText="Yes, Delete Doctor"
        variant="danger"
      />
    </div>
  );
};

