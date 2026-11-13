'use client';

import React, { useState } from 'react';
import { useHospital } from '@/context/HospitalContext';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { Modal } from '@/components/common/Modal';
import { ConfirmationModal } from '@/components/common/ConfirmationModal';
import { Patient } from '@/types';
import {
  Search,
  Users2,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Heart,
  Clock,
  Eye,
  EyeOff,
  FileText,
  Edit,
  Trash2,
  CheckCircle2,
  AlertCircle,
  User,
  ShieldAlert,
  Save,
  X,
  Lock,
  KeyRound,
  Copy,
  Check,
  ShieldCheck,
} from 'lucide-react';

export const AdminPatientManagement: React.FC = () => {
  const { patients, appointments, editPatient, deletePatient, addToast } = useHospital();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  // Password Visibility States (Admin Security Controls)
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});
  const [showAllPasswords, setShowAllPasswords] = useState(false);
  const [copiedPatientId, setCopiedPatientId] = useState<string | null>(null);
  const [showEditPassword, setShowEditPassword] = useState(false);
  const [modalPasswordVisible, setModalPasswordVisible] = useState(false);

  const togglePasswordVisibility = (patId: string) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [patId]: prev[patId] !== undefined ? !prev[patId] : !showAllPasswords,
    }));
  };

  const handleToggleShowAllPasswords = () => {
    const nextState = !showAllPasswords;
    setShowAllPasswords(nextState);
    const updated: Record<string, boolean> = {};
    patients.forEach((pat) => {
      updated[pat.id] = nextState;
    });
    setVisiblePasswords(updated);
  };

  const handleCopyPassword = (patId: string, patientName: string, password?: string) => {
    const pass = password || 'InspireZest@123';
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(pass);
    }
    setCopiedPatientId(patId);
    addToast?.(`Password for ${patientName} copied to clipboard`, 'info', 'Credentials Copied');
    setTimeout(() => {
      setCopiedPatientId(null);
    }, 2000);
  };

  // Edit State
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: 30,
    gender: 'Female' as 'Female' | 'Male' | 'Other',
    bloodGroup: 'O+',
    address: '',
    emergencyContact: '',
    password: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  // Delete State
  const [deletingPatient, setDeletingPatient] = useState<Patient | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Appointments for selected patient
  const patientAppointments = appointments.filter(
    (a) =>
      selectedPatient &&
      (a.patientId === selectedPatient.id ||
        a.patientEmail.toLowerCase() === selectedPatient.email.toLowerCase())
  );

  const handleOpenEdit = (pat: Patient) => {
    setEditingPatient(pat);
    setEditFormData({
      name: pat.name,
      email: pat.email,
      phone: pat.phone,
      age: pat.age,
      gender: pat.gender,
      bloodGroup: pat.bloodGroup,
      address: pat.address,
      emergencyContact: pat.emergencyContact,
      password: pat.password || 'InspireZest@123',
    });
    setShowEditPassword(false);
    setEditError(null);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPatient) return;

    if (!editFormData.name.trim() || !editFormData.email.trim() || !editFormData.phone.trim()) {
      setEditError('Name, email, and contact phone are required fields.');
      return;
    }

    setIsSaving(true);
    setEditError(null);
    try {
      await editPatient(editingPatient.id, {
        name: editFormData.name.trim(),
        email: editFormData.email.trim().toLowerCase(),
        phone: editFormData.phone.trim(),
        age: Number(editFormData.age) || 30,
        gender: editFormData.gender,
        bloodGroup: editFormData.bloodGroup,
        address: editFormData.address.trim(),
        emergencyContact: editFormData.emergencyContact.trim(),
        password: editFormData.password.trim() || 'InspireZest@123',
      });
      setEditingPatient(null);
    } catch {
      setEditError('Failed to save patient modifications.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingPatient) return;
    setIsDeleting(true);
    try {
      await deletePatient(deletingPatient.id);
      setDeletingPatient(null);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="border-b border-[#E5E7EB] pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1A1A1A] tracking-tight flex items-center gap-2">
            <Users2 className="w-6 h-6 text-[#00829B]" />
            <span>Patient Directory & Master Index</span>
          </h1>
          <p className="text-xs text-[#666666] mt-0.5">
            Audit registered patients, update clinical demographics, modify records, and manage hospital enrollment.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-lg bg-white border border-[#E5E7EB] text-xs font-semibold text-[#666666] shadow-xs">
            Total Enrolled: <strong className="text-[#00829B] font-bold">{patients.length} Patients</strong>
          </span>
        </div>
      </div>

      {/* Search Bar & Password Security Controls */}
      <div className="bg-white p-4 rounded-xl border border-[#E5E7EB] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-[#666666] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search patients by name, email, phone, or MRN..."
            className="w-full pl-9 pr-3.5 py-2.5 text-xs text-[#1A1A1A] bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white transition-all"
          />
        </div>
        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleToggleShowAllPasswords}
            icon={showAllPasswords ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            className="text-xs font-semibold whitespace-nowrap border-gray-300 text-gray-700 hover:text-[#00829B] hover:border-[#00829B]"
          >
            <span>{showAllPasswords ? 'Hide All Passwords' : 'View All Passwords'}</span>
          </Button>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-xs text-[#666666] hover:text-[#1A1A1A] flex items-center gap-1 shrink-0"
            >
              <X className="w-3.5 h-3.5" />
              Clear Filter
            </button>
          )}
        </div>
      </div>

      {/* Patient Table */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px] text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F4F6F6] border-b border-[#E5E7EB] text-[#666666] font-bold uppercase tracking-wider text-[11px]">
                <th className="p-3.5">Patient Details</th>
                <th className="p-3.5">Demographics</th>
                <th className="p-3.5">Blood Group</th>
                <th className="p-3.5">Credentials & Password</th>
                <th className="p-3.5">Contact Channels</th>
                <th className="p-3.5">Address / City</th>
                <th className="p-3.5">Enrolled Date</th>
                <th className="p-3.5 text-right">Administrative Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {filteredPatients.length > 0 ? (
                filteredPatients.map((pat) => (
                  <tr key={pat.id} className="hover:bg-[#F4F6F6]/70 transition-colors">
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#00829B]/15 text-[#00829B] flex items-center justify-center font-bold text-xs shrink-0">
                          {pat.name.charAt(0)}
                        </div>
                        <div>
                          <span className="font-bold text-[#1A1A1A] text-sm block">
                            {pat.name}
                          </span>
                          <span className="font-mono text-[10px] text-[#666666] bg-gray-100 px-1.5 py-0.5 rounded">
                            MRN: {pat.id}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5 text-[#1A1A1A] font-medium">
                      {pat.age} yrs • {pat.gender}
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded-full bg-[#DC5555]/10 text-[#DC5555] font-bold text-[11px] border border-[#DC5555]/20">
                        {pat.bloodGroup}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-[11px] font-mono text-gray-700">
                          <span className="text-gray-400 font-sans">user:</span>
                          <span className="font-semibold text-gray-900 truncate max-w-[130px]" title={pat.email}>
                            {pat.email}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] text-gray-400 font-sans">pass:</span>
                          <span
                            className={`font-mono text-xs px-1.5 py-0.5 rounded transition-all select-all ${
                              visiblePasswords[pat.id]
                                ? 'bg-amber-50 text-amber-900 font-bold border border-amber-200'
                                : 'text-gray-400 tracking-wider font-bold'
                            }`}
                          >
                            {visiblePasswords[pat.id] ? (pat.password || 'InspireZest@123') : '••••••••'}
                          </span>
                          <button
                            type="button"
                            onClick={() => togglePasswordVisibility(pat.id)}
                            className="p-1 text-gray-400 hover:text-[#00829B] rounded transition-colors cursor-pointer"
                            title={visiblePasswords[pat.id] ? 'Mask password' : 'View password'}
                          >
                            {visiblePasswords[pat.id] ? (
                              <EyeOff className="w-3.5 h-3.5" />
                            ) : (
                              <Eye className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleCopyPassword(pat.id, pat.name, pat.password)}
                            className="p-1 text-gray-400 hover:text-[#00829B] rounded transition-colors cursor-pointer"
                            title="Copy password to clipboard"
                          >
                            {copiedPatientId === pat.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <div className="text-[#1A1A1A] font-medium">{pat.email}</div>
                      <div className="text-[11px] text-[#666666]">{pat.phone}</div>
                    </td>
                    <td className="p-3.5 text-[#1A1A1A] max-w-[180px] truncate" title={pat.address}>
                      {pat.address || '—'}
                    </td>
                    <td className="p-3.5 text-[#666666] font-mono whitespace-nowrap">
                      {pat.registeredDate}
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          variant="outline"
                          size="sm"
                          icon={<Eye className="w-3.5 h-3.5" />}
                          onClick={() => setSelectedPatient(pat)}
                          title="View clinical history & records"
                        >
                          <span className="hidden xl:inline">History</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-[#00829B] hover:bg-[#00829B]/10 hover:border-[#00829B]/30"
                          icon={<Edit className="w-3.5 h-3.5" />}
                          onClick={() => handleOpenEdit(pat)}
                          title="Modify patient details"
                        >
                          <span>Edit</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-[#DC5555] hover:bg-[#DC5555]/10 hover:border-[#DC5555]/30"
                          icon={<Trash2 className="w-3.5 h-3.5" />}
                          onClick={() => setDeletingPatient(pat)}
                          title="Delete patient from registry"
                        >
                          <span>Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-[#666666]">
                    No patients match your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 1. EDIT / MODIFY PATIENT MODAL */}
      {editingPatient && (
        <Modal
          isOpen={Boolean(editingPatient)}
          onClose={() => setEditingPatient(null)}
          title={`Modify Patient Record: ${editingPatient.name}`}
          subtitle={`Hospital MRN: ${editingPatient.id} • Update clinical identity and contact records.`}
          maxWidth="md"
        >
          <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
            {editError && (
              <div className="p-3 rounded-lg bg-[#DC5555]/10 border border-[#DC5555]/20 text-[#DC5555] font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{editError}</span>
              </div>
            )}

            {/* Legal Name */}
            <div>
              <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                Full Legal Name <span className="text-[#DC5555]">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#666666] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  placeholder="e.g. Eleanor Vance"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs text-[#1A1A1A] bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white transition-all font-medium"
                />
              </div>
            </div>

            {/* Contact Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                  Email Address <span className="text-[#DC5555]">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#666666] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={editFormData.email}
                    onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                    placeholder="patient@example.com"
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs text-[#1A1A1A] bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                  Phone Number <span className="text-[#DC5555]">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#666666] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={editFormData.phone}
                    onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                    placeholder="+91 9567333266"
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs text-[#1A1A1A] bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Age, Gender & Blood Group */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                  Age (Years) <span className="text-[#DC5555]">*</span>
                </label>
                <input
                  type="number"
                  min={1}
                  max={120}
                  required
                  value={editFormData.age}
                  onChange={(e) => setEditFormData({ ...editFormData, age: parseInt(e.target.value, 10) || 1 })}
                  className="w-full px-3 py-2.5 text-xs text-[#1A1A1A] bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                  Gender <span className="text-[#DC5555]">*</span>
                </label>
                <select
                  value={editFormData.gender}
                  onChange={(e) => setEditFormData({ ...editFormData, gender: e.target.value as any })}
                  className="w-full px-3 py-2.5 text-xs text-[#1A1A1A] bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white transition-all"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                  Blood Group
                </label>
                <select
                  value={editFormData.bloodGroup}
                  onChange={(e) => setEditFormData({ ...editFormData, bloodGroup: e.target.value })}
                  className="w-full px-3 py-2.5 text-xs text-[#1A1A1A] bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white transition-all font-semibold text-[#DC5555]"
                >
                  <option value="O+">O Positive (O+)</option>
                  <option value="A+">A Positive (A+)</option>
                  <option value="B+">B Positive (B+)</option>
                  <option value="AB+">AB Positive (AB+)</option>
                  <option value="O-">O Negative (O-)</option>
                  <option value="A-">A Negative (A-)</option>
                  <option value="B-">B Negative (B-)</option>
                  <option value="AB-">AB Negative (AB-)</option>
                  <option value="Unknown">Don't Know</option>
                </select>
              </div>
            </div>

            {/* Residential Address */}
            <div>
              <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                Residential Address / Location
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-[#666666] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={editFormData.address}
                  onChange={(e) => setEditFormData({ ...editFormData, address: e.target.value })}
                  placeholder="e.g. 400 Clinical Parkway, Suite 12, Kollam"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs text-[#1A1A1A] bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Emergency Contact */}
            <div>
              <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                Emergency Contact (Name & Phone)
              </label>
              <div className="relative">
                <ShieldAlert className="w-4 h-4 text-[#DC5555] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={editFormData.emergencyContact}
                  onChange={(e) => setEditFormData({ ...editFormData, emergencyContact: e.target.value })}
                  placeholder="e.g. David Vance (Spouse) - +91 9567333267"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs text-[#1A1A1A] bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white transition-all font-medium"
                />
              </div>
            </div>

            {/* Account Credentials / Password */}
            <div className="pt-2 border-t border-[#E5E7EB]">
              <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#00829B]" />
                  <span>Portal Login Password</span>
                </span>
                <span className="text-[10px] text-gray-500 font-normal">Admin can view or reset password</span>
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-[#666666] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showEditPassword ? 'text' : 'password'}
                  required
                  value={editFormData.password}
                  onChange={(e) => setEditFormData({ ...editFormData, password: e.target.value })}
                  placeholder="Set patient portal password"
                  className="w-full pl-10 pr-10 py-2.5 text-xs text-[#1A1A1A] bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowEditPassword(!showEditPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#00829B] cursor-pointer"
                  title={showEditPassword ? 'Hide password' : 'Show password'}
                >
                  {showEditPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Form Actions */}
            <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setEditingPatient(null)}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                className="bg-[#00829B] hover:bg-[#006C82]"
                icon={<Save className="w-3.5 h-3.5" />}
                isLoading={isSaving}
              >
                Save Patient Modifications
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* 2. DELETE CONFIRMATION MODAL */}
      {deletingPatient && (
        <ConfirmationModal
          isOpen={Boolean(deletingPatient)}
          onClose={() => setDeletingPatient(null)}
          onConfirm={handleConfirmDelete}
          title="Delete Patient Record"
          message={`Are you sure you want to permanently remove "${deletingPatient.name}" (MRN: ${deletingPatient.id}) from the hospital database? This will unlink their patient portal profile and clinical records.`}
          confirmText="Delete Patient"
          cancelText="Keep Patient"
          variant="danger"
          isLoading={isDeleting}
        />
      )}

      {/* 3. PATIENT HISTORY & RECORD MODAL */}
      {selectedPatient && (
        <Modal
          isOpen={Boolean(selectedPatient)}
          onClose={() => setSelectedPatient(null)}
          title={`Patient Record: ${selectedPatient.name}`}
          subtitle={`Hospital Identification Number: ${selectedPatient.id}`}
          maxWidth="lg"
        >
          <div className="space-y-6 text-xs">
            {/* Demographics Card */}
            <div className="p-4 rounded-xl bg-[#F4F6F6] border border-[#E5E7EB] space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#00829B] text-white flex items-center justify-center font-bold text-base shadow-xs">
                    {selectedPatient.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#1A1A1A]">
                      {selectedPatient.name}
                    </h3>
                    <p className="text-xs text-[#666666]">
                      {selectedPatient.age} Years Old • {selectedPatient.gender} • Blood Type: <strong className="text-[#DC5555]">{selectedPatient.bloodGroup}</strong>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-[#00829B] hover:bg-[#00829B]/10 hover:border-[#00829B]/30"
                    icon={<Edit className="w-3.5 h-3.5" />}
                    onClick={() => {
                      const p = selectedPatient;
                      setSelectedPatient(null);
                      handleOpenEdit(p);
                    }}
                  >
                    Modify
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-[#DC5555] hover:bg-[#DC5555]/10 hover:border-[#DC5555]/30"
                    icon={<Trash2 className="w-3.5 h-3.5" />}
                    onClick={() => {
                      const p = selectedPatient;
                      setSelectedPatient(null);
                      setDeletingPatient(p);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[11px] text-[#666666] block">Primary Contact</span>
                  <p className="font-semibold text-[#1A1A1A] mt-0.5">{selectedPatient.email}</p>
                  <p className="text-[11px] text-[#666666]">{selectedPatient.phone}</p>
                </div>
                <div>
                  <span className="text-[11px] text-[#666666] block">Residential Address</span>
                  <p className="font-medium text-[#1A1A1A] mt-0.5">{selectedPatient.address || 'Not specified'}</p>
                </div>
                <div className="sm:col-span-2 pt-2 border-t border-[#E5E7EB]">
                  <span className="text-[11px] text-[#666666] block">Emergency Contact</span>
                  <p className="font-bold text-[#DC5555] mt-0.5">
                    {selectedPatient.emergencyContact || 'None on file'}
                  </p>
                </div>
              </div>
            </div>

            {/* Credentials & Access Security Card */}
            <div className="p-4 rounded-xl bg-white border border-[#E5E7EB] shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#00829B]" />
                  <span className="font-bold text-xs text-[#1A1A1A]">Patient Portal Login Credentials</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Active Access
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[11px] text-[#666666] block">Sign-in Email / Username</span>
                  <p className="font-mono font-semibold text-[#1A1A1A] mt-0.5 select-all">{selectedPatient.email}</p>
                </div>
                <div>
                  <span className="text-[11px] text-[#666666] block">Portal Password</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span
                      className={`font-mono px-2 py-1 rounded text-xs select-all ${
                        modalPasswordVisible
                          ? 'bg-amber-50 text-amber-900 font-bold border border-amber-200'
                          : 'text-gray-500 bg-gray-100 font-bold tracking-wider'
                      }`}
                    >
                      {modalPasswordVisible ? (selectedPatient.password || 'InspireZest@123') : '••••••••••••'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setModalPasswordVisible(!modalPasswordVisible)}
                      className="p-1 text-gray-400 hover:text-[#00829B] rounded transition-colors cursor-pointer"
                      title={modalPasswordVisible ? 'Mask password' : 'View password'}
                    >
                      {modalPasswordVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCopyPassword(selectedPatient.id, selectedPatient.name, selectedPatient.password)}
                      className="p-1 text-gray-400 hover:text-[#00829B] rounded transition-colors cursor-pointer"
                      title="Copy password to clipboard"
                    >
                      {copiedPatientId === selectedPatient.id ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Appointment History */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#666666] mb-3 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#00829B]" />
                <span>Hospital Appointment History ({patientAppointments.length} Recorded)</span>
              </h4>

              {patientAppointments.length > 0 ? (
                <div className="space-y-2.5 max-h-64 overflow-y-auto">
                  {patientAppointments.map((apt) => (
                    <div
                      key={apt.id}
                      className="p-3 bg-white border border-[#E5E7EB] rounded-lg flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#1A1A1A]">{apt.doctorName}</span>
                          <span className="text-[11px] text-[#00829B] font-semibold">
                            ({apt.doctorSpecialization})
                          </span>
                        </div>
                        <div className="text-[11px] text-[#666666] mt-0.5">
                          {apt.date} at {apt.timeSlot} • Ref: {apt.id}
                        </div>
                      </div>
                      <Badge
                        variant={
                          apt.status === 'Confirmed'
                            ? 'confirmed'
                            : apt.status === 'Completed'
                            ? 'completed'
                            : 'cancelled'
                        }
                      >
                        {apt.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[#666666] bg-white p-4 rounded-lg border border-[#E5E7EB] text-center">
                  No appointments logged for this patient yet.
                </p>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedPatient(null)}>
                Close Record
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
