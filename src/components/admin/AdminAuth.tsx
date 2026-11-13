'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useHospital } from '@/context/HospitalContext';
import { Button } from '@/components/common/Button';
import InspireZestLogo from '@/components/common/InspireZestLogo';
import {
  ShieldCheck,
  Lock,
  Mail,
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  Building2,
  ExternalLink,
} from 'lucide-react';

export const AdminAuth: React.FC = () => {
  const { loginAdmin } = useHospital();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError('Please provide administrative username/email and password.');
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      const res = await loginAdmin(username, password);
      if (!res.success) {
        setError(res.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fillAdmin = () => {
    setUsername('admin@inspirezest.com');
    setPassword('admin123');
    setError(null);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-[#061118] text-white">
      <div className="w-full max-w-md bg-[#0B1E28] rounded-2xl shadow-2xl border border-white/10 p-7 sm:p-9 relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00829B] via-[#2FE5A7] to-[#00829B]" />

        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <InspireZestLogo variant="full" size="md" onDark={true} priority />
          </div>

          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-[#2FE5A7] flex items-center justify-center mx-auto mb-3 shadow-inner">
            <Building2 className="w-6 h-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Hospital Admin Portal
          </h2>
          <p className="text-xs text-white/60 mt-1 leading-relaxed">
            Executive administration & governance console for InspireZest Hospital Management System.
          </p>
        </div>

        {/* Quick Demo Helper Button */}
        <div className="mb-5 flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs">
          <div className="flex items-center gap-1.5 text-white/80">
            <Sparkles className="w-3.5 h-3.5 text-[#2FE5A7]" />
            <span className="font-semibold text-[11px]">Demo: admin@inspirezest.com</span>
          </div>
          <button
            type="button"
            onClick={fillAdmin}
            className="px-2 py-1 rounded bg-[#00829B]/30 hover:bg-[#00829B]/50 text-[#2FE5A7] text-[10px] font-bold border border-[#00829B]/40 transition-colors"
          >
            Auto-fill
          </button>
        </div>

        {error && (
          <div className="p-3 mb-5 rounded-xl bg-[#DC5555]/15 border border-[#DC5555]/30 text-xs font-semibold text-[#FFA4A4] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-[#DC5555]" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-white/90 uppercase tracking-wider mb-1.5">
              Administrator Email or Username
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="admin@inspirezest.com"
                className="w-full pl-10 pr-3.5 py-2.5 text-xs text-white bg-black/40 border border-white/15 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:border-[#00829B] transition-all placeholder-white/30"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-white/90 uppercase tracking-wider">
                Password
              </label>
              <span className="text-[10px] text-white/40 font-mono">admin123</span>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-10 py-2.5 text-xs text-white bg-black/40 border border-white/15 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:border-[#00829B] transition-all placeholder-white/30 font-mono"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full mt-2 justify-center py-2.5 bg-[#00829B] hover:bg-[#006C82] text-white font-bold rounded-xl shadow-lg shadow-[#00829B]/20 text-xs"
            isLoading={isLoading}
          >
            Authenticate Administrator
          </Button>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
            <Link
              href="/admin-portal/signup"
              className="text-[#2FE5A7] hover:underline font-semibold inline-flex items-center gap-1"
            >
              <span>Register new admin</span>
              <ArrowRight className="w-3 h-3" />
            </Link>

            <Link
              href="/admin-portal/login"
              className="text-white/60 hover:text-white inline-flex items-center gap-1"
            >
              <span>Full screen login</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
