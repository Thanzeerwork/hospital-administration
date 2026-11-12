'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useHospital } from '@/context/HospitalContext';
import InspireZestLogo from '@/components/common/InspireZestLogo';
import { Button } from '@/components/common/Button';
import {
  Stethoscope,
  User,
  Lock,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  AlertCircle,
  Activity,
} from 'lucide-react';

export default function DoctorLoginPage() {
  const router = useRouter();
  const { loginDoctor, doctors } = useHospital();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please provide physician username and password');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await loginDoctor(username, password);
      if (res.success) {
        router.push('/doctor-portal');
      } else {
        setError(res.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const fillDoctor = (uname: string) => {
    setUsername(uname);
    setPassword('password123');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#F4F6F6] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Brand Header */}
        <div className="flex justify-center mb-2">
          <Link href="/doctor-portal" className="inline-block hover:opacity-95 transition-opacity">
            <InspireZestLogo variant="full" size="md" priority />
          </Link>
        </div>

        <h2 className="mt-6 text-center text-2xl font-extrabold text-[#1A1A1A]">
          Medical Staff Sign In
        </h2>
        <p className="mt-2 text-center text-xs text-[#666666]">
          Access your appointment queue, outpatient availability calendar, and electronic prescriptions.
        </p>

        {/* Demo Doctor Quick-Fill Badges */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => fillDoctor('dr.wright')}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6F3F5] text-[#00829B] hover:bg-[#CDECEF] text-xs font-semibold transition-colors border border-[#00829B]/20"
          >
            <Sparkles className="w-3 h-3" />
            <span>Dr. Wright (Cardiology)</span>
          </button>
          <button
            type="button"
            onClick={() => fillDoctor('dr.chen')}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6F3F5] text-[#00829B] hover:bg-[#CDECEF] text-xs font-semibold transition-colors border border-[#00829B]/20"
          >
            <Sparkles className="w-3 h-3" />
            <span>Dr. Chen (Pediatrics)</span>
          </button>
        </div>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-card sm:rounded-2xl border border-[#E5E7EB] sm:px-10">
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-[#DC5555]/10 border border-[#DC5555]/20 flex items-start gap-2.5 text-xs text-[#DC5555] font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                Staff Username or ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#666666]">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. dr.wright"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F4F6F6] border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white text-[#1A1A1A]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                Clinical Password
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
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F4F6F6] border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white text-[#1A1A1A]"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full justify-center mt-2"
              isLoading={loading}
            >
              Sign In to Doctor Console
            </Button>
          </form>

          {/* Doctor Onboarding Sign Up link */}
          <div className="mt-6 pt-6 border-t border-[#E5E7EB] text-center">
            <p className="text-xs text-[#666666]">
              New physician joining hospital staff?{' '}
              <Link
                href="/doctor-portal/signup"
                className="font-bold text-[#00829B] hover:underline inline-flex items-center gap-1"
              >
                <span>Register doctor profile</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center flex items-center justify-center gap-2 text-[11px] text-[#666666]">
          <Activity className="w-4 h-4 text-[#00829B]" />
          <span>Restricted to verified medical staff & attending physicians</span>
        </div>
      </div>
    </div>
  );
}

