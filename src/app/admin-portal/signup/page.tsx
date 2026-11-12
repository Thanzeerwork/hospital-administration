'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useHospital } from '@/context/HospitalContext';
import InspireZestLogo from '@/components/common/InspireZestLogo';
import { Button } from '@/components/common/Button';
import {
  Building2,
  User,
  Mail,
  Lock,
  KeyRound,
  ShieldAlert,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  Briefcase,
} from 'lucide-react';

export default function AdminSignupPage() {
  const router = useRouter();
  const { signupAdmin } = useHospital();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Operations Director',
    passcode: 'APEX-ADMIN-2026',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all administrator credentials.');
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

    setError(null);
    setLoading(true);

    try {
      const res = await signupAdmin({
        name: formData.name,
        email: formData.email,
        role: formData.role,
        password: formData.password,
        passcode: formData.passcode,
      });

      if (res.success) {
        router.push('/admin-portal');
      } else {
        setError(res.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1A22] flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Brand Header */}
        <div className="flex justify-center mb-4">
          <Link href="/admin-portal" className="inline-block hover:opacity-95 transition-opacity">
            <InspireZestLogo variant="full" size="lg" onDark={true} priority />
          </Link>
        </div>

        <h2 className="mt-5 text-center text-2xl font-extrabold text-white">
          Register Hospital Executive Account
        </h2>
        <p className="mt-1 text-center text-xs text-white/60">
          Provision credentialed access to executive KPIs, doctor administration, and system governance.
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#10242E] py-8 px-6 shadow-2xl sm:rounded-2xl border border-white/10 sm:px-10">
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-[#DC5555]/20 border border-[#DC5555]/40 flex items-start gap-2.5 text-xs text-[#DC5555] font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-white/90 uppercase tracking-wider mb-1.5">
                Executive Full Name <span className="text-[#DC5555]">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Dr. Rebecca Vance"
                  className="w-full pl-10 pr-4 py-2.5 bg-black/30 border border-white/15 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00829B] text-white placeholder-white/40"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold text-white/90 uppercase tracking-wider mb-1.5">
                Official Hospital Email <span className="text-[#DC5555]">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="r.vance@inspirezest.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-black/30 border border-white/15 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00829B] text-white placeholder-white/40"
                />
              </div>
            </div>

            {/* Administrative Role */}
            <div>
              <label className="block text-xs font-bold text-white/90 uppercase tracking-wider mb-1.5">
                Administrative Role
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                  <Briefcase className="w-4 h-4" />
                </div>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-black/30 border border-white/15 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00829B] text-white"
                >
                  <option value="Operations Director" className="bg-[#10242E]">Operations Director</option>
                  <option value="Chief Medical Administrator" className="bg-[#10242E]">Chief Medical Administrator</option>
                  <option value="Clinical Governance Lead" className="bg-[#10242E]">Clinical Governance Lead</option>
                  <option value="Health IT Systems Director" className="bg-[#10242E]">Health IT Systems Director</option>
                </select>
              </div>
            </div>

            {/* Master Security Passcode */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-white/90 uppercase tracking-wider">
                  Master Security Passcode <span className="text-[#DC5555]">*</span>
                </label>
                <span className="text-[10px] text-[#00829B] font-mono font-semibold">
                  Key: APEX-ADMIN-2026
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={formData.passcode}
                  onChange={(e) => setFormData({ ...formData, passcode: e.target.value })}
                  placeholder="APEX-ADMIN-2026"
                  className="w-full pl-10 pr-4 py-2.5 bg-black/30 border border-white/15 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#00829B] text-white placeholder-white/40"
                />
              </div>
            </div>

            {/* Password & Confirm */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-white/90 uppercase tracking-wider mb-1.5">
                  Password <span className="text-[#DC5555]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Min. 6 chars"
                    className="w-full pl-10 pr-4 py-2.5 bg-black/30 border border-white/15 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00829B] text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-white/90 uppercase tracking-wider mb-1.5">
                  Confirm Password <span className="text-[#DC5555]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="Repeat"
                    className="w-full pl-10 pr-4 py-2.5 bg-black/30 border border-white/15 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00829B] text-white"
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full justify-center mt-2 bg-[#00829B] hover:bg-[#006C82]"
              isLoading={loading}
            >
              Authorize & Enter Command Center
            </Button>
          </form>

          {/* Already have admin account */}
          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-xs text-white/60">
              Already have an administrator account?{' '}
              <Link
                href="/admin-portal/login"
                className="font-bold text-[#00829B] hover:underline inline-flex items-center gap-1"
              >
                <span>Sign in here</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center flex items-center justify-center gap-2 text-[11px] text-white/50">
          <ShieldCheck className="w-4 h-4 text-[#00829B]" />
          <span>Provisioning authenticated by Firebase Firestore Audit Log</span>
        </div>
      </div>
    </div>
  );
}

