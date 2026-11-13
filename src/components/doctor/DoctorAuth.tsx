'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useHospital } from '@/context/HospitalContext';
import { Button } from '@/components/common/Button';
import {
  Stethoscope,
  Lock,
  User,
  AlertCircle,
  Eye,
  EyeOff,
  Building2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const DoctorAuth: React.FC = () => {
  const { loginDoctor } = useHospital();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Please enter your physician username or email, and clinical password.');
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      const res = await loginDoctor(username.trim(), password.trim());
      if (!res.success) {
        setError(res.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickFill = (docUser: string, docPass: string = 'password123') => {
    setUsername(docUser);
    setPassword(docPass);
    setError(null);
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-[#E5E7EB] p-8 sm:p-10 relative overflow-hidden">
        {/* Brand accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#00829B] via-[#0E88AA] to-[#22A06B]" />

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#00829B] to-[#0E88AA] text-white flex items-center justify-center mx-auto mb-4 shadow-[0_6px_20px_rgba(0,130,155,0.25)]">
            <Stethoscope className="w-8 h-8" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-[#E6F7F9] text-[#00829B] border border-[#D0F0F5] mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Authorized Medical Staff Only</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A1A22] tracking-tight">
            Doctor Portal Access
          </h2>
          <p className="text-xs sm:text-sm text-[#666666] mt-1.5 max-w-sm mx-auto leading-relaxed">
            Sign in with your hospital credentials to manage consultations, schedule OPD slots, and issue digital prescriptions.
          </p>
        </div>

        {error && (
          <div className="p-3.5 mb-5 rounded-2xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700 flex items-center gap-2.5 animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
              Doctor Username or Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. dr.wright"
                className="w-full pl-10 pr-3.5 py-3 text-xs sm:text-sm text-[#1A1A1A] bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white transition-all font-medium placeholder:text-gray-400"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
              Clinical Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-10 py-3 text-xs sm:text-sm text-[#1A1A1A] bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white transition-all font-mono placeholder:text-gray-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-[#00829B] cursor-pointer"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Quick Demo Physician Selector */}
          <div className="pt-2 pb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
              Quick Select Demo Attending Physician:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill('dr.wright')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                  username === 'dr.wright'
                    ? 'bg-[#00829B] text-white border-[#00829B]'
                    : 'bg-[#F4F6F6] text-gray-700 border-gray-200 hover:border-[#00829B] hover:text-[#00829B]'
                }`}
              >
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Dr. Wright (Cardiology)</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('dr.bennett')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                  username === 'dr.bennett'
                    ? 'bg-[#00829B] text-white border-[#00829B]'
                    : 'bg-[#F4F6F6] text-gray-700 border-gray-200 hover:border-[#00829B] hover:text-[#00829B]'
                }`}
              >
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Dr. Bennett (Pediatrics)</span>
              </button>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full mt-2 py-3.5 text-sm font-bold shadow-[0_4px_14px_rgba(0,130,155,0.35)]"
            isLoading={isLoading}
          >
            Access Doctor Console &rarr;
          </Button>

          {/* Institutional Clinical Account Notice (strictly no self-registration) */}
          <div className="pt-5 border-t border-[#E5E7EB]">
            <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-[#00829B]/10 text-[#00829B] flex items-center justify-center shrink-0 mt-0.5">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="min-w-0 text-xs text-gray-600 leading-relaxed">
                <p className="font-bold text-gray-900 mb-0.5">
                  Institutional Account Notice
                </p>
                <p>
                  Doctor accounts are provisioned exclusively by the <strong>Hospital Administration</strong>. Self-registration is strictly disabled. For credentials or account recovery, contact the Medical Superintendent Office (Ext. 402).
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

