'use client';

import React from 'react';
import { useHospital } from '@/context/HospitalContext';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useHospital();

  if (toasts.length === 0) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-[#22A06B] shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-[#DC5555] shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-[#E9A23B] shrink-0" />,
    info: <Info className="w-5 h-5 text-[#00829B] shrink-0" />,
  };

  const borderStyles = {
    success: 'border-l-4 border-l-[#22A06B]',
    error: 'border-l-4 border-l-[#DC5555]',
    warning: 'border-l-4 border-l-[#E9A23B]',
    info: 'border-l-4 border-l-[#00829B]',
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto bg-white rounded-lg shadow-float border border-[#E5E7EB] p-3.5 flex items-start gap-3 transition-all duration-200 transform translate-y-0 ${borderStyles[toast.type]}`}
        >
          {icons[toast.type]}
          <div className="flex-1 min-w-0">
            {toast.title && (
              <h5 className="text-xs font-bold text-[#1A1A1A] mb-0.5">{toast.title}</h5>
            )}
            <p className="text-xs text-[#666666] leading-snug break-words">{toast.message}</p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-[#666666] hover:text-[#1A1A1A] p-0.5 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

