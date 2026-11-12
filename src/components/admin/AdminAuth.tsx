'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useHospital } from '@/context/HospitalContext';
import { Button } from '@/components/common/Button';
import { ShieldCheck, Lock, Mail, AlertCircle, ArrowRight } from 'lucide-react';

export const AdminAuth: React.FC = () => {
  const { loginAdmin } = useHospital();
  const [username, setUsername] = useState('admin@inspirezest.com');
  const [password, setPassword] = useState('admin123');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-float border border-[#E5E7EB] p-8">
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-xl bg-[#1A1A1A] text-white flex items-center justify-center mx-auto mb-3 shadow-sm">
            <ShieldCheck className="w-7 h-7 text-[#00829B]" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#1A1A1A] tracking-tight">
            Hospital Admin Portal
          </h2>
          <p className="text-xs text-[#666666] mt-1">
            Executive administration & governance console for InspireZest Hospital Management System.
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
              Username or Administrative Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#666666] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin@inspirezest.com"
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
          <div className="p-3 rounded-lg bg-[#F4F6F6] border border-[#E5E7EB] text-xs">
            <span className="font-bold text-[#1A1A1A] uppercase tracking-wider block mb-1 text-[10px]">
              Admin Credentials:
            </span>
            <div className="flex items-center justify-between font-mono text-[11px] text-[#666666]">
              <span>Email: <strong>admin@inspirezest.com</strong></span>
              <span>Pass: <strong>admin123</strong></span>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full mt-2"
            isLoading={isLoading}
          >
            Authenticate Administrator
          </Button>

          <div className="pt-4 border-t border-[#E5E7EB] text-center">
            <p className="text-xs text-[#666666]">
              Need to initialize an administrator account?{' '}
              <Link
                href="/admin-portal/signup"
                className="font-bold text-[#00829B] hover:underline inline-flex items-center gap-1"
              >
                <span>Register administrator</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

