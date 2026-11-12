'use client';

import React, { useState } from 'react';
import { useHospital } from '@/context/HospitalContext';
import { Modal } from '@/components/common/Modal';
import { Button } from '@/components/common/Button';
import { Mail, KeyRound, CheckCircle, ArrowLeft, RefreshCw, HeartPulse } from 'lucide-react';

interface PatientAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PatientAuthModal: React.FC<PatientAuthModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { sendPatientOtp, verifyPatientOtp } = useHospital();
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['4', '9', '2', '8', '1', '5']); // prefilled test OTP for rapid testing!
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address');
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      const res = await sendPatientOtp(email);
      if (res.success) {
        if (res.otpCode) {
          setOtp(res.otpCode.split(''));
        }
        setStep('otp');
        setResendCooldown(30);
      } else {
        setError(res.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const digits = value.replace(/\D/g, '').slice(0, 6).split('');
      const newOtp = [...otp];
      digits.forEach((d, i) => {
        newOtp[i] = d;
      });
      setOtp(newOtp);
      return;
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otp.join('');
    if (fullOtp.length !== 6) {
      setError('Please enter the full 6-digit OTP code');
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      const res = await verifyPatientOtp(fullOtp);
      if (res.success) {
        onClose();
        setStep('email');
      } else {
        setError(res.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="sm">
      <div className="flex flex-col items-center text-center">
        {/* Hospital Branding */}
        <div className="w-12 h-12 rounded-xl bg-[#00829B] flex items-center justify-center text-white mb-3 shadow-sm">
          <HeartPulse className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-extrabold text-[#1A1A1A] tracking-tight">
          InspireZest Hospitals
        </h3>
        <p className="text-xs text-[#666666] mt-1 mb-6">
          {step === 'email'
            ? 'Sign in or create your patient portal account with secure email OTP'
            : `Enter the 6-digit verification code sent to ${email}`}
        </p>

        {error && (
          <div className="w-full p-2.5 mb-4 text-xs font-medium text-[#DC5555] bg-[#DC5555]/10 border border-[#DC5555]/20 rounded-lg text-left">
            {error}
          </div>
        )}

        {step === 'email' ? (
          <form onSubmit={handleSendOtp} className="w-full space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                Patient Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#666666] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. eleanor.vance@example.com"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs text-[#1A1A1A] bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white transition-all"
                  required
                />
              </div>
              <p className="text-[11px] text-[#666666] mt-1.5">
                We will email you a 6-digit one-time passcode for passwordless authentication.
              </p>
            </div>

            {/* Quick Demo Autofill */}
            <div className="p-2.5 rounded-lg bg-[#E6F3F5] border border-[#00829B]/25 text-left">
              <span className="text-[10px] font-bold text-[#00829B] uppercase tracking-wide block mb-1">
                Quick Test Autofill:
              </span>
              <button
                type="button"
                onClick={() => setEmail('eleanor.vance@example.com')}
                className="text-xs font-semibold text-[#00829B] hover:underline"
              >
                Use Eleanor Vance (eleanor.vance@example.com)
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              isLoading={isLoading}
            >
              Send OTP Code
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="w-full space-y-5">
            <div>
              <label className="block text-xs font-bold text-[#1A1A1A] mb-2.5 text-center">
                6-Digit Verification Code
              </label>
              <div className="flex items-center justify-center gap-2">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-input-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    className="w-10 h-12 text-center text-lg font-bold font-mono text-[#00829B] bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white transition-all shadow-xs"
                  />
                ))}
              </div>
              <p className="text-[11px] text-[#22A06B] font-medium text-center mt-2">
                ✓ Test OTP prefilled: 492815
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-[#666666] pt-1">
              <button
                type="button"
                onClick={() => setStep('email')}
                className="flex items-center gap-1 hover:text-[#1A1A1A]"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Change Email
              </button>
              <button
                type="button"
                onClick={() => sendPatientOtp(email)}
                className="text-[#00829B] font-semibold hover:underline flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                Resend OTP
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              isLoading={isLoading}
            >
              Verify & Enter Portal
            </Button>
          </form>
        )}
      </div>
    </Modal>
  );
};

