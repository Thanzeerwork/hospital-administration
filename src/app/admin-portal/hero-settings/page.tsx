'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useHospital } from '@/context/HospitalContext';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import {
  Image as ImageIcon,
  Video,
  Upload,
  Check,
  RefreshCw,
  ExternalLink,
  Sparkles,
  Play,
  Film,
  Sliders,
  ShieldCheck,
  Eye,
} from 'lucide-react';
import { Button } from '@/components/common/Button';

export default function AdminHeroSettingsPage() {
  const { heroConfig, updateHeroConfig, resetHeroConfig, addToast } = useHospital();

  const [mediaType, setMediaType] = useState<'image' | 'video'>(heroConfig?.mediaType || 'image');
  const [imageUrl, setImageUrl] = useState(heroConfig?.imageUrl || '');
  const [videoUrl, setVideoUrl] = useState(heroConfig?.videoUrl || '');
  const [mobileImageUrl, setMobileImageUrl] = useState(heroConfig?.mobileImageUrl || '');
  const [headline, setHeadline] = useState(heroConfig?.headline || 'World-Class Healthcare, Tailored for You');
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Curated Preset Options
  const imagePresets = [
    {
      name: 'InspireZest Hospital Campus at Dusk (Published)',
      url: 'https://pub-f6697a3e2acd4048a86b5ed54d969979.r2.dev/uploads/1794544119196-InspireZest_Hospital_at_Dusk.png',
      thumb: 'https://pub-f6697a3e2acd4048a86b5ed54d969979.r2.dev/uploads/1794544119196-InspireZest_Hospital_at_Dusk.png',
    },
    {
      name: 'Sunset Hospital Campus (Meditrina Style)',
      url: 'https://cdn.sanity.io/images/0xgev689/production/6aaacb898a16542f6906ef4a221bb9e480d147c0-1481x861.png?w=1920&q=72&fit=max&auto=format',
      thumb: 'https://cdn.sanity.io/images/0xgev689/production/6aaacb898a16542f6906ef4a221bb9e480d147c0-1481x861.png?w=300&q=60&fit=max&auto=format',
    },
    {
      name: 'Modern Multispeciality Medical Center',
      url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1920&q=80',
      thumb: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=300&q=60',
    },
    {
      name: 'Advanced Biplane Surgical Cathlab',
      url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1920&q=80',
      thumb: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=300&q=60',
    },
  ];

  const videoPresets = [
    {
      name: 'Advanced Laboratory & Clinical Research',
      url: 'https://assets.mixkit.co/videos/preview/mixkit-medical-laboratory-research-39824-large.mp4',
      poster: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
    },
    {
      name: 'Attentive Hospital Corridor & Clinicians',
      url: 'https://assets.mixkit.co/videos/preview/mixkit-hospital-corridor-with-doctors-and-patients-41315-large.mp4',
      poster: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
    },
    {
      name: 'High-Precision Surgical Theater Operations',
      url: 'https://assets.mixkit.co/videos/preview/mixkit-surgical-team-performing-an-operation-in-an-operating-room-41313-large.mp4',
      poster: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: 'image' | 'video' | 'mobile-image') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', target === 'video' ? 'videos' : 'banners');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        if (target === 'video') {
          setVideoUrl(data.url);
          setMediaType('video');
        } else if (target === 'mobile-image') {
          setMobileImageUrl(data.url);
        } else {
          setImageUrl(data.url);
          setMediaType('image');
          // If mobile image had legacy placeholder or was unset, clear it so desktop image auto-applies to mobile
          if (!mobileImageUrl || mobileImageUrl.includes('sanity.io')) {
            setMobileImageUrl('');
          }
        }
        addToast(
          `Uploaded ${file.name} to Cloudflare R2 storage!`,
          'success',
          'Asset Uploaded'
        );
      } else {
        addToast(data.message || 'Upload failed', 'error');
      }
    } catch (err: any) {
      addToast(err.message || 'Network error during upload', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateHeroConfig({
        mediaType,
        imageUrl: imageUrl.trim(),
        videoUrl: videoUrl.trim(),
        mobileImageUrl: mobileImageUrl.trim(),
        headline: headline.trim(),
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    if (confirm('Restore the patient portal hero background to the default InspireZest campus photo?')) {
      await resetHeroConfig();
      setMediaType('image');
      setImageUrl('https://pub-f6697a3e2acd4048a86b5ed54d969979.r2.dev/uploads/1794544119196-InspireZest_Hospital_at_Dusk.png');
      setMobileImageUrl('');
      setVideoUrl('https://assets.mixkit.co/videos/preview/mixkit-medical-laboratory-research-39824-large.mp4');
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#F8FAFC]">
      <AdminSidebar />

      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sticky top-0 z-20">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#00829B]/10 text-[#00829B]">
                <Film className="w-5 h-5" />
              </span>
              <h1 className="text-xl font-bold text-gray-900">
                Hero Background & Video Management
              </h1>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Configure what patients see first: high-resolution background image or cinematic autoplay video.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/patient-portal"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Eye className="w-4 h-4 text-[#00829B]" />
              <span>Preview Live Portal</span>
              <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
            </Link>

            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="text-xs text-gray-600 hover:text-gray-900 border-gray-300"
            >
              <RefreshCw className="w-3.5 h-3.5 mr-1" />
              Reset Default
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={handleSave}
              disabled={isSaving}
              className="bg-[#00829B] hover:bg-[#006A7E] text-white text-xs font-semibold"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Check className="w-3.5 h-3.5 mr-1.5" />
                  Publish to Portal
                </>
              )}
            </Button>
          </div>
        </header>

        <div className="p-6 max-w-6xl mx-auto w-full space-y-6">
          {/* Live Preview Card */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="text-sm font-bold text-gray-900">Live Interactive Preview</h3>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 uppercase">
                  {mediaType === 'video' ? 'Cinematic Video Active' : 'Static Image Active'}
                </span>
              </div>
              <span className="text-xs text-gray-400">Updates live as you edit</span>
            </div>

            <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden bg-[#0A1A22] border border-gray-900 shadow-inner">
              {/* Media layer */}
              {mediaType === 'video' && videoUrl ? (
                <video
                  key={videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={imageUrl || undefined}
                  className="w-full h-full object-cover object-center"
                >
                  <source src={videoUrl} type="video/mp4" />
                  <source src={videoUrl} type="video/webm" />
                </video>
              ) : (
                <img
                  src={imageUrl || 'https://cdn.sanity.io/images/0xgev689/production/6aaacb898a16542f6906ef4a221bb9e480d147c0-1481x861.png?w=1920&q=72&fit=max&auto=format'}
                  alt="Preview"
                  className="w-full h-full object-cover object-center"
                />
              )}

              {/* Exact gradient overlay matching live site */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

              {/* Live Text Overlay */}
              <div className="absolute bottom-6 left-6 right-6 text-white max-w-xl pointer-events-none">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#00829B]/90 text-[10px] font-bold tracking-wider uppercase mb-2">
                  <Sparkles className="w-3 h-3 text-[#2FE5A7]" />
                  NABH & NABL ACCREDITED TERTIARY CARE
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white line-clamp-2">
                  {headline || 'World-Class Healthcare, Tailored for You'}
                </h2>
                <p className="text-xs text-gray-300 mt-1 line-clamp-1">
                  Multi-super speciality hospital network delivering clinical excellence across India.
                </p>
              </div>
            </div>
          </div>

          {/* Mode Selector */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Image Mode Card */}
            <div
              onClick={() => setMediaType('image')}
              className={`p-5 rounded-2xl cursor-pointer transition-all border-2 ${
                mediaType === 'image'
                  ? 'border-[#00829B] bg-[#00829B]/5 shadow-sm ring-1 ring-[#00829B]'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl ${mediaType === 'image' ? 'bg-[#00829B] text-white' : 'bg-gray-100 text-gray-600'}`}>
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-900">High-Resolution Image</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Display a photography banner with fast CDN delivery.</p>
                  </div>
                </div>
                {mediaType === 'image' && (
                  <span className="w-5 h-5 rounded-full bg-[#00829B] text-white flex items-center justify-center text-xs">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
            </div>

            {/* Video Mode Card */}
            <div
              onClick={() => setMediaType('video')}
              className={`p-5 rounded-2xl cursor-pointer transition-all border-2 ${
                mediaType === 'video'
                  ? 'border-[#00829B] bg-[#00829B]/5 shadow-sm ring-1 ring-[#00829B]'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl ${mediaType === 'video' ? 'bg-[#00829B] text-white' : 'bg-gray-100 text-gray-600'}`}>
                    <Video className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-900">Cinematic Background Video</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Autoplay smooth looping background video (muted & mobile-optimized).</p>
                  </div>
                </div>
                {mediaType === 'video' && (
                  <span className="w-5 h-5 rounded-full bg-[#00829B] text-white flex items-center justify-center text-xs">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Configuration Inputs */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-6">
            {mediaType === 'video' ? (
              /* Video Settings */
              <div className="space-y-5">
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-1 flex items-center gap-2">
                    <Video className="w-4 h-4 text-[#00829B]" />
                    Cinematic Video Configuration
                  </h3>
                  <p className="text-xs text-gray-500">
                    Upload an MP4 or WebM video file directly to Cloudflare R2, or paste a video URL.
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-gray-700">Video Source URL (.mp4 / .webm)</label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      placeholder="https://.../video.mp4"
                      className="flex-1 px-3.5 py-2.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B] font-mono"
                    />
                    <label className="relative inline-flex items-center justify-center px-4 py-2.5 bg-gray-900 hover:bg-black text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors shrink-0">
                      <Upload className="w-3.5 h-3.5 mr-1.5" />
                      <span>{isUploading ? 'Uploading...' : 'Upload Video to R2'}</span>
                      <input
                        type="file"
                        accept="video/mp4,video/webm,video/ogg"
                        onChange={(e) => handleFileUpload(e, 'video')}
                        disabled={isUploading}
                        className="sr-only"
                      />
                    </label>
                  </div>
                </div>

                {/* Video Presets */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">Curated Hospital Video Presets</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {videoPresets.map((vp, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          setVideoUrl(vp.url);
                          setImageUrl(vp.poster);
                        }}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                          videoUrl === vp.url
                            ? 'border-[#00829B] bg-[#00829B]/5 ring-1 ring-[#00829B]'
                            : 'border-gray-200 hover:border-gray-300 bg-gray-50/50'
                        }`}
                      >
                        <div className="relative h-20 rounded-lg overflow-hidden mb-2 bg-gray-900">
                          <img src={vp.poster} alt={vp.name} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <span className="w-7 h-7 rounded-full bg-white/90 text-[#00829B] flex items-center justify-center shadow-md">
                              <Play className="w-3.5 h-3.5 ml-0.5 fill-current" />
                            </span>
                          </div>
                        </div>
                        <p className="text-xs font-semibold text-gray-800 line-clamp-1">{vp.name}</p>
                        <span className="text-[10px] text-[#00829B] font-medium">Click to select preset</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Poster image fallback */}
                <div className="pt-3 border-t border-gray-100">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Video Poster / Fallback Image URL
                  </label>
                  <p className="text-[11px] text-gray-400 mb-2">
                    Shown while video is loading and used for low-bandwidth mobile devices.
                  </p>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://.../poster.jpg"
                    className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
                  />
                </div>
              </div>
            ) : (
              /* Image Settings */
              <div className="space-y-5">
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-1 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-[#00829B]" />
                    Hero Background Image Configuration
                  </h3>
                  <p className="text-xs text-gray-500">
                    Upload a high-resolution hospital photo to Cloudflare R2 object storage, or select from presets.
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-gray-700">Image Source URL (Desktop)</label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://.../hospital-banner.jpg"
                      className="flex-1 px-3.5 py-2.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B] font-mono"
                    />
                    <label className="relative inline-flex items-center justify-center px-4 py-2.5 bg-[#00829B] hover:bg-[#006A7E] text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors shrink-0">
                      <Upload className="w-3.5 h-3.5 mr-1.5" />
                      <span>{isUploading ? 'Uploading...' : 'Upload Image to R2'}</span>
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={(e) => handleFileUpload(e, 'image')}
                        disabled={isUploading}
                        className="sr-only"
                      />
                    </label>
                  </div>
                </div>

                {/* Image Presets */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">Hospital Campus Presets</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {imagePresets.map((ip, idx) => (
                      <div
                        key={idx}
                        onClick={() => setImageUrl(ip.url)}
                        className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                          imageUrl === ip.url
                            ? 'border-[#00829B] bg-[#00829B]/5 ring-1 ring-[#00829B]'
                            : 'border-gray-200 hover:border-gray-300 bg-gray-50/50'
                        }`}
                      >
                        <div className="h-20 rounded-lg overflow-hidden mb-2 bg-gray-200">
                          <img src={ip.thumb} alt={ip.name} className="w-full h-full object-cover" />
                        </div>
                        <p className="text-[11px] font-semibold text-gray-800 line-clamp-1">{ip.name}</p>
                        <span className="text-[10px] text-[#00829B]">Select</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Optional Mobile Image */}
                <div className="pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-gray-700">
                      Optional Dedicated Mobile Banner (Portrait)
                    </label>
                    {mobileImageUrl && (
                      <button
                        type="button"
                        onClick={() => setMobileImageUrl('')}
                        className="text-[11px] text-[#00829B] hover:underline font-medium"
                      >
                        Clear (Use Desktop Image Everywhere)
                      </button>
                    )}
                  </div>
                  <p className="text-[11px] text-gray-400 mb-2">
                    Leave blank to automatically use your high-resolution desktop image on smartphones and tablets.
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={mobileImageUrl}
                      onChange={(e) => setMobileImageUrl(e.target.value)}
                      placeholder="Leave blank to use desktop image, or paste mobile image URL..."
                      className="flex-1 px-3.5 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B] font-mono"
                    />
                    <label className="relative inline-flex items-center justify-center px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg cursor-pointer transition-colors shrink-0 border border-gray-300">
                      <Upload className="w-3.5 h-3.5 mr-1" />
                      <span>{isUploading ? 'Uploading...' : 'Upload Mobile'}</span>
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={(e) => handleFileUpload(e, 'mobile-image')}
                        disabled={isUploading}
                        className="sr-only"
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Headline Customization */}
            <div className="pt-4 border-t border-gray-100">
              <label className="block text-xs font-semibold text-gray-700 mb-1">Hero Main Heading (Animated with React Bits BlurText)</label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="World-Class Healthcare, Tailored for You"
                className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
              />
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-gray-500">
              Changes sync instantly to Firebase Firestore and are stored in Cloudflare R2 object storage.
            </span>
            <Button
              variant="primary"
              size="md"
              onClick={handleSave}
              disabled={isSaving}
              className="bg-[#00829B] hover:bg-[#006A7E] text-white font-bold px-6 shadow-sm"
            >
              {isSaving ? 'Publishing Changes...' : 'Save & Publish to Live Portal'}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

