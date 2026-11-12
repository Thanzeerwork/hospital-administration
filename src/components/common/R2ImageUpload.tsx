'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, CheckCircle2, AlertCircle, Loader2, Image as ImageIcon, X } from 'lucide-react';

interface R2ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
  className?: string;
  placeholder?: string;
}

export const R2ImageUpload: React.FC<R2ImageUploadProps> = ({
  value,
  onChange,
  folder = 'physicians',
  label = 'Upload Profile Photograph',
  className = '',
  placeholder = 'Select JPG, PNG or WebP image (max 5MB)',
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size exceeds 5MB limit');
      return;
    }

    setIsUploading(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to upload image to Cloudflare R2');
      }

      onChange(data.url);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      console.error('R2 Upload error:', err);
      setError(err.message || 'Image upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleClear = () => {
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">
          {label}
        </label>
        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#00829B] bg-[#E6F3F5] px-2 py-0.5 rounded-full">
          Cloudflare R2 Storage
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* Preview Avatar */}
        <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#F4F6F6] border-2 border-dashed border-[#E5E7EB] flex items-center justify-center shrink-0 group">
          {value ? (
            <>
              <img
                src={value}
                alt="Uploaded preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={handleClear}
                className="absolute top-1 right-1 p-1 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors"
                title="Remove image"
              >
                <X className="w-3 h-3" />
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-[#666666]">
              <ImageIcon className="w-6 h-6 stroke-1 mb-0.5" />
              <span className="text-[9px] uppercase font-bold">No Image</span>
            </div>
          )}
        </div>

        {/* Upload Controls */}
        <div className="flex-1 min-w-0">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/webp"
            onChange={handleFileChange}
            className="hidden"
            id={`r2-upload-input-${folder}`}
          />
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-[#E5E7EB] text-xs font-bold text-[#1A1A1A] hover:bg-[#F4F6F6] hover:border-[#00829B]/40 transition-colors disabled:opacity-50"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#00829B]" />
                  <span>Uploading to R2...</span>
                </>
              ) : (
                <>
                  <UploadCloud className="w-3.5 h-3.5 text-[#00829B]" />
                  <span>{value ? 'Replace Image' : 'Choose File'}</span>
                </>
              )}
            </button>

            {value && (
              <span className="text-[11px] text-[#666666] truncate max-w-[200px]" title={value}>
                {value.split('/').pop()}
              </span>
            )}
          </div>

          <p className="text-[11px] text-[#666666] mt-1.5">{placeholder}</p>

          {error && (
            <p className="text-xs text-[#DC5555] flex items-center gap-1 mt-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{error}</span>
            </p>
          )}

          {success && (
            <p className="text-xs text-[#22A06B] flex items-center gap-1 mt-1 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Stored in Cloudflare R2 bucket!</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

