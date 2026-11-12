'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useHospital } from '@/context/HospitalContext';
import InspireZestLogo from '@/components/common/InspireZestLogo';
import { Button } from '@/components/common/Button';
import {
  Building2,
  Mail,
  Lock,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const { loginAdmin } = useHospital();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please provide administrative email/username and password');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await loginAdmin(username, password);
      if (res.success) {
        router.push('/admin-portal');
      } else {
        setError(res.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const fillAdmin = () => {
    setUsername('admin@inspirezest.com');
    setPassword('admin123');
    setError(null);
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

        <h2 className="mt-6 text-center text-2xl font-extrabold text-white">
          Hospital Administration Sign In
        </h2>
        <p className="mt-2 text-center text-xs text-white/60">
          Executive operations console for doctor management, patient registries, and clinic governance.
        </p>

        {/* Demo Admin Quick-Fill */}
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={fillAdmin}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-[#00829B] hover:bg-white/15 text-xs font-semibold transition-colors border border-[#00829B]/30"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Use Demo Administrator (admin@inspirezest.com)</span>
          </button>
        </div>
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
            <div>
              <label className="block text-xs font-bold text-white/90 uppercase tracking-wider mb-1.5">
                Administrator Email / Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin@inspirezest.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-black/30 border border-white/15 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00829B] text-white placeholder-white/40"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-white/90 uppercase tracking-wider mb-1.5">
                Executive Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-black/30 border border-white/15 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00829B] text-white placeholder-white/40"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full justify-center mt-2 bg-[#00829B] hover:bg-[#006C82]"
              isLoading={loading}
            >
              Sign In to Command Center
            </Button>
          </form>

          {/* Admin Signup Link */}
          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-xs text-white/60">
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
        </div>

        <div className="mt-6 text-center flex items-center justify-center gap-2 text-[11px] text-white/50">
          <ShieldAlert className="w-4 h-4 text-[#00829B]" />
          <span>Restricted access: Audited under Hospital Administrative Protocol</span>
        </div>
      </div>
    </div>
  );
}

