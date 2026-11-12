'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useHospital } from '@/context/HospitalContext';
import { Button } from '@/components/common/Button';
import { Stethoscope, Lock, User, AlertCircle, KeyRound, ArrowRight } from 'lucide-react';

export const DoctorAuth: React.FC = () => {
  const { loginDoctor } = useHospital();
  const [username, setUsername] = useState('dr.wright');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const res = await loginDoctor(username, password);
      if (!res.success) {
        setError(res.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-float border border-[#E5E7EB] p-8">
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-xl bg-[#00829B] text-white flex items-center justify-center mx-auto mb-3 shadow-sm">
            <Stethoscope className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#1A1A1A] tracking-tight">
            Doctor Portal Login
          </h2>
          <p className="text-xs text-[#666666] mt-1">
            Official hospital clinician authentication portal. Credentials are assigned by administration.
          </p>
        </div>

        {error && (
          <div className="p-3 mb-4 rounded-lg bg-[#DC5555]/10 border border-[#DC5555]/20 text-xs font-semibold text-[#DC5555] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
              Doctor Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#666666] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. dr.wright"
                className="w-full pl-10 pr-3.5 py-2.5 text-xs text-[#1A1A1A] bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#666666] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 text-xs text-[#1A1A1A] bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white transition-all"
                required
              />
            </div>
          </div>

          {/* Quick Demo Helper */}
          <div className="p-3 rounded-lg bg-[#E6F3F5] border border-[#00829B]/20 text-xs">
            <span className="font-bold text-[#00829B] uppercase tracking-wider block mb-1 text-[10px]">
              Assigned Clinician Credentials:
            </span>
            <div className="flex items-center justify-between font-mono text-[11px] text-[#1A1A1A]">
              <span>User: <strong>dr.wright</strong></span>
              <span>Pass: <strong>password123</strong></span>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full mt-2"
            isLoading={isLoading}
          >
            Access Doctor Dashboard
          </Button>

          <div className="pt-4 border-t border-[#E5E7EB] text-center">
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
        </form>
      </div>
    </div>
  );
};

