'use client';

import React, { useState, useEffect } from 'react';
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
  ShieldAlert,
  Sparkles,
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  ChevronLeft,
  PhoneCall,
  Activity,
  CheckCircle2,
  Server,
  Layers,
  KeyRound,
  FileCheck2,
  Stethoscope,
  HeartPulse,
} from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const { loginAdmin, isAdminAuthenticated, adminUser } = useHospital();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fillAnimation, setFillAnimation] = useState(false);

  // If already authenticated, allow instant navigation
  const handleProceedToPortal = () => {
    router.push('/admin-portal');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError('Please provide administrative username/email and password.');
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
    setFillAnimation(true);
    setTimeout(() => setFillAnimation(false), 1200);
  };

  return (
    <div className="min-h-screen bg-[#061118] text-white flex flex-col font-sans selection:bg-[#00829B] selection:text-white">
      {/* Top Header Navigation */}
      <header className="border-b border-white/10 bg-[#061118]/80 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/patient-portal"
            className="inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-[#00829B]" />
            <span className="hidden sm:inline">Return to Hospital Gateway</span>
            <span className="sm:hidden">Gateway</span>
          </Link>
          <span className="text-white/20 hidden sm:inline">|</span>
          <Link
            href="/login"
            className="text-xs text-white/60 hover:text-[#2FE5A7] transition-colors hidden sm:inline"
          >
            All Access Portals
          </Link>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80">
            <span className="w-2 h-2 rounded-full bg-[#2FE5A7] animate-pulse" />
            <span className="font-mono text-[11px]">Command Node • v2.6 Online</span>
          </div>
          <div className="flex items-center gap-1.5 text-white/80">
            <PhoneCall className="w-3.5 h-3.5 text-[#00829B]" />
            <span className="font-semibold text-white">Emergency 24x7: +91 9567333266</span>
          </div>
        </div>
      </header>

      {/* Main Split Grid */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-61px)]">
        {/* Left Column: Visual Command Showcase */}
        <div className="hidden lg:flex lg:col-span-6 xl:col-span-7 relative flex-col justify-between p-10 xl:p-14 overflow-hidden bg-gradient-to-br from-[#061118] via-[#0A1A22] to-[#040D13]">
          {/* Background Dusk Image with high-end dual overlays */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-700 opacity-30 mix-blend-luminosity scale-105"
            style={{
              backgroundImage: `url('https://pub-f6697a3e2acd4048a86b5ed54d969979.r2.dev/uploads/1794544119196-InspireZest_Hospital_at_Dusk.png')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#061118] via-[#061118]/80 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#00829B]/20 via-transparent to-transparent" />

          {/* Top Brand & Badge */}
          <div className="relative z-10">
            <Link href="/" className="inline-block hover:opacity-95 transition-opacity">
              <InspireZestLogo variant="full" size="lg" onDark={true} priority />
            </Link>

            <div className="mt-8 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-[#2FE5A7]" />
              <span className="text-xs font-bold tracking-wider uppercase text-white/90">
                Hospital Command Suite & Administration
              </span>
            </div>

            <h1 className="mt-6 text-3xl xl:text-4xl font-extrabold text-white leading-tight tracking-tight">
              Centralized Clinical, Staff & <br className="hidden xl:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2FE5A7] via-[#00829B] to-cyan-300">
                Operational Governance
              </span>
            </h1>

            <p className="mt-3 text-sm text-white/70 max-w-xl leading-relaxed">
              Provisioned interface for clinical department directors, hospital administrators, and medical registrars to supervise patient admissions, physician schedules, and real-time operations.
            </p>
          </div>

          {/* Middle: Feature Highlights 2x2 Grid */}
          <div className="relative z-10 grid grid-cols-2 gap-4 my-8">
            <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-sm hover:border-[#00829B]/50 transition-all">
              <div className="w-9 h-9 rounded-lg bg-[#00829B]/20 border border-[#00829B]/40 flex items-center justify-center text-[#2FE5A7] mb-3">
                <Stethoscope className="w-5 h-5" />
              </div>
              <h2 className="text-sm font-bold text-white">Physician Roster & CRUD</h2>
              <p className="text-xs text-white/60 mt-1 leading-normal">
                Enrol doctors, configure consult fees, OPD duty slots, and department affiliations.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-sm hover:border-[#00829B]/50 transition-all">
              <div className="w-9 h-9 rounded-lg bg-[#2FE5A7]/20 border border-[#2FE5A7]/40 flex items-center justify-center text-[#2FE5A7] mb-3">
                <HeartPulse className="w-5 h-5" />
              </div>
              <h2 className="text-sm font-bold text-white">Patient Master Index (PMI)</h2>
              <p className="text-xs text-white/60 mt-1 leading-normal">
                Audit appointment registers, medical history, and verified digital e-prescriptions.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-sm hover:border-[#00829B]/50 transition-all">
              <div className="w-9 h-9 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 mb-3">
                <Layers className="w-5 h-5" />
              </div>
              <h2 className="text-sm font-bold text-white">Cloudflare R2 Media Hub</h2>
              <p className="text-xs text-white/60 mt-1 leading-normal">
                Live broadcast hero videos, desktop & mobile banners directly to patient gateways.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-sm hover:border-[#00829B]/50 transition-all">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 mb-3">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h2 className="text-sm font-bold text-white">Clinical Audit & Compliance</h2>
              <p className="text-xs text-white/60 mt-1 leading-normal">
                NABH Level-3 accreditation benchmarks, HIPAA data standards, and tamper-evident logs.
              </p>
            </div>
          </div>

          {/* Bottom Security Notice */}
          <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#2FE5A7]" />
              <span>Restricted access: Audited under Hospital Administrative Protocol 2026.</span>
            </div>
            <span className="font-mono text-[11px] text-white/40">TLS 1.3 • AES-256</span>
          </div>
        </div>

        {/* Right Column: Interactive Login Form */}
        <div className="col-span-12 lg:col-span-6 xl:col-span-5 flex flex-col justify-center px-6 sm:px-10 lg:px-12 py-10 bg-[#0B1E28] border-l border-white/10 relative">
          <div className="w-full max-w-md mx-auto space-y-6">
            {/* Mobile Header Logo */}
            <div className="lg:hidden flex items-center justify-between mb-4 pb-4 border-b border-white/10">
              <InspireZestLogo variant="full" size="md" onDark={true} priority />
              <div className="px-2.5 py-1 rounded-full bg-white/10 text-[#2FE5A7] text-[10px] font-bold uppercase tracking-wider">
                Admin Zone
              </div>
            </div>

            {/* Form Title & Subtitle */}
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#00829B] to-[#2FE5A7] p-0.5 shadow-lg shadow-[#00829B]/20 mb-4 inline-block">
                <div className="w-full h-full bg-[#0B1E28] rounded-[14px] flex items-center justify-center text-[#2FE5A7]">
                  <Building2 className="w-6 h-6" />
                </div>
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                Hospital Administration Sign In
              </h2>
              <p className="text-xs sm:text-sm text-white/60 mt-1.5 leading-relaxed">
                Enter your administrative credentials to initialize your clinical management session.
              </p>
            </div>

            {/* If Already Logged In Banner */}
            {isAdminAuthenticated && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2FE5A7] shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-bold text-white">Active Session Detected</p>
                    <p className="text-white/70 mt-0.5">
                      You are signed in as <strong className="text-[#2FE5A7]">{adminUser?.name || 'Administrator'}</strong>.
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <Button
                        type="button"
                        size="sm"
                        variant="primary"
                        onClick={handleProceedToPortal}
                        className="bg-[#00829B] hover:bg-[#006C82] text-xs py-1.5"
                      >
                        Enter Command Center
                        <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Demo Administrator Fast-Fill Banner */}
            <div className={`p-3.5 rounded-xl bg-gradient-to-r from-white/[0.06] to-white/[0.02] border border-white/10 transition-all ${
              fillAnimation ? 'ring-2 ring-[#2FE5A7] bg-white/15' : ''
            }`}>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#2FE5A7]" />
                  <span className="text-xs font-bold text-white">Demo Credentials:</span>
                </div>
                <button
                  type="button"
                  onClick={fillAdmin}
                  className="px-2.5 py-1 rounded-lg bg-[#00829B]/30 hover:bg-[#00829B]/50 text-[#2FE5A7] text-[11px] font-bold transition-all border border-[#00829B]/50 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Click to Auto-fill
                </button>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] font-mono text-white/70 bg-black/30 p-2 rounded-lg border border-white/5">
                <div>
                  <span className="text-white/40 block text-[9px] uppercase font-sans font-semibold">User:</span>
                  <span className="text-[#2FE5A7] truncate block">admin@inspirezest.com</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[9px] uppercase font-sans font-semibold">Pass:</span>
                  <span className="text-white truncate block">admin123</span>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3.5 rounded-xl bg-[#DC5555]/15 border border-[#DC5555]/30 flex items-start gap-2.5 text-xs text-[#FFA4A4] font-medium animate-fadeIn">
                <AlertCircle className="w-4 h-4 text-[#DC5555] shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-bold text-[#FFA4A4]">Authentication Error</p>
                  <p className="mt-0.5 text-white/80">{error}</p>
                </div>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-white/90 uppercase tracking-wider mb-1.5">
                  Administrative Email or Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="admin@inspirezest.com"
                    autoComplete="username"
                    className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/15 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:border-[#00829B] transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-white/90 uppercase tracking-wider">
                    Executive Master Password
                  </label>
                  <span className="text-[10px] text-white/40">Default: admin123</span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="••••••••••••"
                    autoComplete="current-password"
                    className="w-full pl-10 pr-11 py-2.5 bg-black/40 border border-white/15 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:border-[#00829B] transition-all font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-white/40 hover:text-white transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Workstation Checkbox */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-white/70 hover:text-white">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded bg-black/40 border-white/20 text-[#00829B] focus:ring-0 focus:ring-offset-0 cursor-pointer"
                  />
                  <span>Keep workstation session authorized</span>
                </label>

                <Link
                  href="/admin-portal/signup"
                  className="text-xs text-[#2FE5A7] hover:underline font-semibold"
                >
                  Forgot Master Key?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                className="w-full justify-center py-3 bg-[#00829B] hover:bg-[#006C82] text-white font-bold rounded-xl shadow-lg shadow-[#00829B]/25 transition-all text-sm gap-2"
                isLoading={loading}
              >
                <span>Sign In to Admin Command Center</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>

            {/* Register Administrator Link */}
            <div className="pt-5 border-t border-white/10 text-center space-y-3">
              <p className="text-xs text-white/60">
                Need to initialize a verified administrative profile?{' '}
                <Link
                  href="/admin-portal/signup"
                  className="font-bold text-[#2FE5A7] hover:underline inline-flex items-center gap-1"
                >
                  <span>Register administrator</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </p>

              {/* Portal Switcher Buttons */}
              <div className="pt-2 flex items-center justify-center gap-2 text-xs">
                <span className="text-white/40">Switch role:</span>
                <Link
                  href="/patient-portal/login"
                  className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 transition-colors"
                >
                  Patient Login
                </Link>
                <Link
                  href="/doctor-portal/login"
                  className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 transition-colors"
                >
                  Doctor Login
                </Link>
              </div>
            </div>

            {/* Bottom Security Seals */}
            <div className="pt-4 flex items-center justify-center gap-4 text-[11px] text-white/40 border-t border-white/5">
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2FE5A7]" />
                <span>Audited Access</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Server className="w-3.5 h-3.5 text-[#00829B]" />
                <span>Cloudflare R2 Synced</span>
              </div>
              <span>•</span>
              <span>HIPAA Compliant</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
