'use client';

import React, { useState } from 'react';
import { useHospital } from '@/context/HospitalContext';
import { Modal } from '@/components/common/Modal';
import { Button } from '@/components/common/Button';
import {
  Mail,
  KeyRound,
  CheckCircle,
  ArrowLeft,
  RefreshCw,
  HeartPulse,
  User,
  Phone,
  Calendar,
  MapPin,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

interface PatientAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PatientAuthModal: React.FC<PatientAuthModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { sendPatientOtp, verifyPatientOtp, completeNewPatientProfile } = useHospital();
  const [step, setStep] = useState<'email' | 'otp' | 'details'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [activeOtpCode, setActiveOtpCode] = useState('');
  const [sentViaResend, setSentViaResend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);

  // New patient details state
  const [patientDetails, setPatientDetails] = useState({
    name: '',
    phone: '',
    age: '28',
    gender: 'Female' as 'Female' | 'Male' | 'Other',
    bloodGroup: 'O+',
    address: '',
    emergencyContact: '',
  });

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
        setSentViaResend(!!res.sentViaResend);
        if (res.otpCode) {
          setActiveOtpCode(res.otpCode);
        }
        setOtp(['', '', '', '', '', '']); // Never autofill OTP; user enters manually
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
        if (res.isNewPatient) {
          setStep('details');
          setError(null);
        } else {
          onClose();
          setStep('email');
        }
      } else {
        setError(res.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientDetails.name.trim() || !patientDetails.phone.trim()) {
      setError('Please provide your legal name and contact phone number');
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      const res = await completeNewPatientProfile({
        name: patientDetails.name.trim(),
        email: email,
        phone: patientDetails.phone.trim(),
        age: parseInt(patientDetails.age, 10) || 30,
        gender: patientDetails.gender,
        bloodGroup: patientDetails.bloodGroup,
        address: patientDetails.address.trim(),
        emergencyContact: patientDetails.emergencyContact.trim(),
      });
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
          {step === 'details' ? 'Complete Your Patient Details' : 'InspireZest Hospitals'}
        </h3>
        <p className="text-xs text-[#666666] mt-1 mb-6">
          {step === 'email'
            ? 'Sign in or create your patient portal account with secure email OTP'
            : step === 'otp'
            ? `Enter the 6-digit verification code sent to ${email}`
            : `Email verified! Please provide your details to register your patient file.`}
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

            {/* Resend Sandbox Authorized Recipient Helper */}
            <div className="p-2.5 rounded-lg bg-[#E6F3F5] border border-[#00829B]/25 text-left space-y-1">
              <span className="text-[10px] font-bold text-[#00829B] uppercase tracking-wide block">
                Resend Sandbox Recipient:
              </span>
              <button
                type="button"
                onClick={() => setEmail('thanzeerwork@gmail.com')}
                className="text-xs font-semibold text-[#00829B] hover:underline block text-left"
              >
                Use thanzeerwork@gmail.com (Receives Real Emails)
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
        ) : step === 'otp' ? (
          <form onSubmit={handleVerifyOtp} className="w-full space-y-5">
            {sentViaResend ? (
              <div className="p-3 bg-[#E6F3F5] rounded-xl border border-[#00829B]/30 text-xs text-[#00829B] text-left">
                <p className="font-bold flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#22A06B]" />
                  Code sent to {email} via Resend
                </p>
                <p className="text-[11px] mt-1 text-gray-700 leading-relaxed">
                  ✓ Check your <strong>Inbox</strong>, and your <strong>Spam / Junk</strong> folder (from <em>onboarding@resend.dev</em>).
                </p>
              </div>
            ) : (
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 text-left">
                <p className="font-bold text-amber-800">
                  Resend Sandbox Restriction
                </p>
                <p className="text-[11px] mt-1 text-amber-800 leading-relaxed">
                  Resend free testing mode only sends emails to <strong>thanzeerwork@gmail.com</strong>. We've auto-filled your 6-digit code below:
                </p>
              </div>
            )}

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
              <p className="text-[11px] text-gray-500 font-medium text-center mt-2">
                {sentViaResend
                  ? 'Check your email inbox or spam folder for the code'
                  : (activeOtpCode ? `Sandbox test code: ${activeOtpCode}` : 'Enter your 6-digit verification code')}
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
              Verify & Continue
            </Button>
          </form>
        ) : (
          /* Step 3: Fill Details for New Patient */
          <form onSubmit={handleCompleteDetails} className="w-full space-y-3.5 text-left">
            <div>
              <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                Full Legal Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={patientDetails.name}
                  onChange={(e) => setPatientDetails({ ...patientDetails, name: e.target.value })}
                  placeholder="e.g. Thanzeer Mohammed"
                  className="w-full pl-9 pr-3 py-2 text-xs text-gray-900 bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                Contact Phone Number <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  value={patientDetails.phone}
                  onChange={(e) => setPatientDetails({ ...patientDetails, phone: e.target.value })}
                  placeholder="+91 9567333266"
                  className="w-full pl-9 pr-3 py-2 text-xs text-gray-900 bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                  Age <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    min={1}
                    max={120}
                    required
                    value={patientDetails.age}
                    onChange={(e) => setPatientDetails({ ...patientDetails, age: e.target.value })}
                    placeholder="28"
                    className="w-full pl-9 pr-2 py-2 text-xs text-gray-900 bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                  Gender <span className="text-rose-500">*</span>
                </label>
                <select
                  value={patientDetails.gender}
                  onChange={(e) => setPatientDetails({ ...patientDetails, gender: e.target.value as any })}
                  className="w-full px-2 py-2 text-xs text-gray-900 bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white transition-all"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                Blood Group
              </label>
              <select
                value={patientDetails.bloodGroup}
                onChange={(e) => setPatientDetails({ ...patientDetails, bloodGroup: e.target.value })}
                className="w-full px-2 py-2 text-xs text-gray-900 bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white transition-all"
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

            <div>
              <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                City / Address
              </label>
              <div className="relative">
                <MapPin className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={patientDetails.address}
                  onChange={(e) => setPatientDetails({ ...patientDetails, address: e.target.value })}
                  placeholder="e.g. Kollam, Kerala"
                  className="w-full pl-9 pr-3 py-2 text-xs text-gray-900 bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B] focus:bg-white transition-all"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-2"
              isLoading={isLoading}
            >
              Complete Registration & Sign In
            </Button>

            <button
              type="button"
              onClick={() => setStep('email')}
              className="w-full text-center text-xs text-gray-500 hover:text-gray-900 pt-1"
            >
              ← Back to Email
            </button>
          </form>
        )}
      </div>
    </Modal>
  );
};
