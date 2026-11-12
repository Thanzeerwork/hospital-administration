'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useHospital } from '@/context/HospitalContext';
import { Doctor, HospitalBlog } from '@/types';
import BlurText from '@/components/common/BlurText';
import {
  MotionReveal,
  StaggerContainer,
  StaggerItem,
  ParagonArrowButton,
} from '@/components/common/MotionReveal';
import {
  Search,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  Heart,
  Clock,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Baby,
  HeartPulse,
  Activity,
  Eye,
  Award,
  PhoneCall,
  MapPin,
  CheckCircle2,
  CalendarCheck,
  FileText,
  AlertCircle,
  Building2,
  Star,
  Users,
  Bed,
  Check,
  Phone,
  ArrowUpRight,
  MessageCircle,
  Play,
  Share2,
} from 'lucide-react';

interface PatientHomeProps {
  onSelectCategory: (categoryName: string) => void;
  onNavigateDoctors: () => void;
  onNavigateAppointments: () => void;
  onBookAppointment: (doctor?: Doctor) => void;
  onViewDoctorProfile: (doctor: Doctor) => void;
}

export const PatientHome: React.FC<PatientHomeProps> = ({
  onSelectCategory,
  onNavigateDoctors,
  onNavigateAppointments,
  onBookAppointment,
  onViewDoctorProfile,
}) => {
  const { specializations, doctors, appointments, blogs, patientUser, isPatientAuthenticated, heroConfig } =
    useHospital();

  // Search Bar State
  const [searchLocation, setSearchLocation] = useState('Kollam');
  const [searchQuery, setSearchQuery] = useState('');

  // Built for People Carousel State (Meditrina Exact Slider)
  const [currentSlide, setCurrentSlide] = useState(0);

  // Insights & Updates Tab
  const [insightsTab, setInsightsTab] = useState<'news' | 'blogs'>('news');

  // Selected Health Package Modal State
  const [selectedPackage, setSelectedPackage] = useState<any | null>(null);

  // Blog Article Reader & All Updates Modals
  const [selectedBlog, setSelectedBlog] = useState<HospitalBlog | null>(null);
  const [showAllBlogsModal, setShowAllBlogsModal] = useState(false);
  const [showAllSpecialities, setShowAllSpecialities] = useState(false);

  // Built for People Slides Data (Exact Meditrina Content & Assets)
  const builtForPeopleSlides = [
    {
      id: 0,
      title: 'Advanced Medical Technology',
      description:
        'Equipped with modern infrastructure and cutting-edge technology to ensure accurate diagnosis and high-quality treatment.',
      image: 'https://www.meditrinahospitals.com/images/home/big-banner.webp',
      alt: 'Advanced medical technology at InspireZest Hospitals',
    },
    {
      id: 1,
      title: 'Accessible & Trusted Healthcare',
      description:
        'Delivering reliable, ethical, and affordable healthcare without compromising on clinical standards.',
      image: 'https://www.meditrinahospitals.com/images/home/big-banner/accessible-trusted.webp',
      alt: 'InspireZest Hospitals building exterior',
    },
    {
      id: 2,
      title: 'Patient-First Care',
      description:
        'Personalized treatment focused on comfort, dignity, trust, delivering lasting wellbeing through compassionate individualized care.',
      image: 'https://www.meditrinahospitals.com/images/home/big-banner/patient-first.webp',
      alt: 'Patient-first compassionate care',
    },
    {
      id: 3,
      title: 'Expert Specialists',
      description:
        'Experienced specialists collaborating to deliver comprehensive multidisciplinary medical care with precision, compassion and excellence.',
      image: 'https://www.meditrinahospitals.com/images/home/big-banner/expert-specialists.webp',
      alt: 'Expert clinical specialists',
    },
    {
      id: 4,
      title: '24/7 Emergency Care',
      description:
        'Providing round-the-clock emergency care with rapid response when every second matters most for everyone.',
      image: 'https://www.meditrinahospitals.com/images/home/big-banner/emergency-care.webp',
      alt: '24/7 emergency care',
    },
  ];

  // 22 Meditrina Specialities List
  const allSpecialities = [
    'Anaesthesiology & Critical Care',
    'Cardiology',
    'Cardiothoracic Vascular Surgery',
    'Clinical Pathology',
    'Dentistry',
    'Dermatology',
    'ENT',
    'Gastroenterology',
    'General Medicine',
    'General Surgery',
    'Infertility and Reproductive Medicine',
    'Nephrology',
    'Neurology',
    'Neurosurgery',
    'Obstetrics & Gynaecology',
    'Orthopaedics',
    'Paediatrics & Neonatology',
    'Psychiatry',
    'Pulmonology',
    'Radiology',
    'Surgical Gastroenterology',
    'Urology',
  ];

  // Filtered doctors for home directory
  const displayDoctors = doctors.slice(0, 4);

  // Testimonials Data
  const testimonials = [
    {
      id: 1,
      quote:
        'All the way from Dubai to InspireZest Hospital, trust brought our family to Kollam — and care made all the difference. Under the expert guidance of Dr. N Prathap Kumar, every step of our heart treatment was handled with deep compassion and clinical excellence.',
      name: 'Family of Thomas Matthew',
      location: 'Dubai, UAE',
      tag: 'Cardiac Surgery Recovery',
      rating: 5,
    },
    {
      id: 2,
      quote:
        'When my father suffered acute chest pain at midnight, InspireZest’s emergency cardiac team performed emergency primary angioplasty in under 40 minutes. Their prompt response and world-class cathlab facility saved his life.',
      name: 'Radhika K.',
      location: 'Kollam, Kerala',
      tag: 'Emergency Cathlab Care',
      rating: 5,
    },
    {
      id: 3,
      quote:
        'We were extremely anxious when our premature newborn required neonatal intensive care. The level of warmth, precision, and state-of-the-art NICU incubators at InspireZest gave us our bundle of joy safe and healthy.',
      name: 'Anand & Meera Nair',
      location: 'Trivandrum, Kerala',
      tag: 'Neonatal ICU Excellence',
      rating: 5,
    },
  ];

  // News & Articles
  const newsItems = [
    {
      id: 1,
      date: '29 • September • 2026',
      title: 'A Heart-Shaped Record, A Moment to Remember',
      desc: 'Dr. N. Prathap Kumar, Chairman and Chief Interventional Cardiologist of InspireZest Group of Hospitals, recognized for completing 16,000+ complex coronary angioplasties with unprecedented clinical success.',
      category: 'Milestone',
    },
    {
      id: 2,
      date: '14 • August • 2026',
      title: 'Launch of Advanced Biplane Neuro & Cardiac Cathlab',
      desc: 'InspireZest Hospital strengthens emergency intervention capabilities with the inauguration of South Kerala’s most advanced high-definition digital cathlab unit.',
      category: 'Technology',
    },
    {
      id: 3,
      date: '02 • July • 2026',
      title: 'Free Community Health & Preventive Cardiac Screening Camp',
      desc: 'Over 1,200 citizens benefited from complimentary ECG, lipid profile tests, and specialist consultations across Kollam and neighbouring districts.',
      category: 'Community',
    },
  ];

  const blogItems = [
    {
      id: 1,
      date: '18 • October • 2026',
      title: 'Your Liver Speaks Before Symptoms Do: Early Fatty Liver Screening',
      desc: 'Understand the silent progression of Non-Alcoholic Fatty Liver Disease (NAFLD) and simple lifestyle interventions that can restore optimal liver function.',
      category: 'Health Guide',
    },
    {
      id: 2,
      date: '05 • October • 2026',
      title: 'Managing Joint Health & Mobility After 45: A Specialist’s Perspective',
      desc: 'Senior orthopaedic surgeons share proven exercises, ergonomic tips, and when minimally invasive joint preservation therapies should be considered.',
      category: 'Orthopaedics',
    },
    {
      id: 3,
      date: '22 • September • 2026',
      title: 'Childhood Immunity & Essential Vaccinations: What Every Parent Must Know',
      desc: 'A comprehensive timeline guide from InspireZest’s pediatric department on seasonal viral protection and developmental milestones.',
      category: 'Child Care',
    },
  ];

  // Health Packages
  const healthPackages = [
    {
      id: 'pkg-1',
      title: 'Comprehensive Master Health Checkup',
      tag: 'Most Popular',
      price: '₹2,499',
      features: [
        'Complete Hemogram & Blood Sugar Profile',
        'Lipid Profile & Liver Function Tests (LFT)',
        'Kidney Function Tests (KFT) & Urine Routine',
        'Digital Chest X-Ray & 12-Lead ECG',
        'Senior Physician & Dietician Consultation',
      ],
      idealFor: 'Annual preventative health checkup for adults aged 25–55',
    },
    {
      id: 'pkg-2',
      title: 'Advanced Cardiac Wellness Package',
      tag: 'Cardiac Focus',
      price: '₹4,999',
      features: [
        'All Master Health Checkup Investigations',
        'Color Doppler Echocardiography (Echo)',
        'Treadmill Stress Test (TMT / Stress ECG)',
        'Cardiac Risk Biomarkers (Hs-CRP, Homocysteine)',
        'Senior Cardiologist Clinical Evaluation',
      ],
      idealFor: 'Individuals with sedentary lifestyle, hypertension, or family cardiac history',
    },
    {
      id: 'pkg-3',
      title: 'Women’s Comprehensive Health Screening',
      tag: 'Women’s Health',
      price: '₹3,499',
      features: [
        'Complete Blood Count, Thyroid Profile (TSH/T3/T4)',
        'Pap Smear Screening & Pelvic Ultrasound',
        'Bone Mineral Density (BMD) & Vitamin D3',
        'Bilateral Breast Ultrasound / Screening Mammography',
        'Senior Consultant Gynaecologist Consultation',
      ],
      idealFor: 'Women aged 25+ prioritizing reproductive & hormonal wellness',
    },
    {
      id: 'pkg-4',
      title: 'Senior Citizen Comprehensive Wellness',
      tag: 'Geriatric Care',
      price: '₹3,999',
      features: [
        'Comprehensive Diabetic & Cardiac Metabolic Panel',
        'Kidney & Liver Function Profiles with Electrolytes',
        'Serum PSA (for men) / Pelvic Scan (for women)',
        'Ophthalmology & Audiometry Screening',
        'Geriatric Specialist & Orthopaedic Review',
      ],
      idealFor: 'Seniors aged 60+ seeking complete preventive health assurance',
    },
  ];

  // Quick Search Submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Find matching specialization
      const match = specializations.find(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          searchQuery.toLowerCase().includes(s.name.toLowerCase())
      );
      if (match) {
        onSelectCategory(match.name);
      } else {
        onNavigateDoctors();
      }
    } else {
      onNavigateDoctors();
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] font-sans antialiased">
      {/* 1. HERO SECTION (Exact Clone of Meditrina Hospitals Live) */}
      <section className="home-hero relative min-h-[100svh] overflow-hidden bg-[#0A1A22] text-white">
        {/* Background Media (Image or Video managed by Admin) */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden" aria-hidden="true">
          {heroConfig?.mediaType === 'video' && heroConfig?.videoUrl ? (
            <video
              key={heroConfig.videoUrl}
              autoPlay
              loop
              muted
              playsInline
              poster={heroConfig.imageUrl || undefined}
              className="w-full h-full object-cover object-center"
            >
              <source src={heroConfig.videoUrl} type="video/mp4" />
              <source src={heroConfig.videoUrl} type="video/webm" />
              <img
                src={heroConfig.imageUrl || 'https://cdn.sanity.io/images/0xgev689/production/6aaacb898a16542f6906ef4a221bb9e480d147c0-1481x861.png?w=1920&q=72&fit=max&auto=format'}
                alt="Hospital Hero Media"
                className="w-full h-full object-cover object-center"
              />
            </video>
          ) : (
            <picture className="block w-full h-full">
              {heroConfig?.mobileImageUrl && (
                <source
                  media="(max-width: 768px)"
                  srcSet={heroConfig.mobileImageUrl}
                />
              )}
              <img
                src={heroConfig?.imageUrl || 'https://cdn.sanity.io/images/0xgev689/production/6aaacb898a16542f6906ef4a221bb9e480d147c0-1481x861.png?w=1920&q=72&fit=max&auto=format'}
                alt="InspireZest Hospital home banner"
                className="w-full h-full object-cover object-center"
              />
            </picture>
          )}
        </div>

        {/* Exact Meditrina Gradient Overlays */}
        <div
          className="absolute inset-0 z-[1] bg-gradient-to-r from-black/55 via-black/20 to-transparent"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 z-[1] bg-gradient-to-t from-black/40 via-transparent to-black/15"
          aria-hidden="true"
        />

        {/* Content Aligned at Bottom-Left */}
        <div className="mx-auto w-full max-w-[90rem] 2xl:max-w-[110rem] px-4 sm:px-8 lg:px-10 2xl:px-15 3xl:max-w-[120rem] 3xl:px-20 relative z-10 flex min-h-[100svh] items-end pb-16 sm:pb-24 lg:pb-28">
          <div className="max-w-[820px]">
            {/* Meditrina Exact H1 Heading with React Bits BlurText Animation */}
            <BlurText
              key={heroConfig?.headline || 'headline-default'}
              text={heroConfig?.headline || "World-Class Healthcare, Tailored for You"}
              effect="blur"
              animateBy="words"
              direction="top"
              staggerFrom="start"
              trigger="view"
              delay={140}
              stepDuration={0.35}
              blur={10}
              distance={40}
              as="h1"
              className="mb-4 max-w-[660px] text-4xl sm:text-5xl md:text-[54px] leading-[1.12] font-bold text-white tracking-tight"
            />

            {/* Subtitle with Smooth Motion Reveal */}
            <MotionReveal direction="up" delay={0.2} duration={0.8} distance={30}>
              <p className="mb-8 sm:mb-10 max-w-[500px] text-lg sm:text-xl leading-relaxed text-white font-normal">
                Experience world-class healthcare tailored to your unique needs, guided by globally
                renowned specialists.
              </p>
            </MotionReveal>

            {/* Action Buttons with Interactive Hover & Spring Feedback */}
            <MotionReveal direction="up" delay={0.35} duration={0.8} distance={30}>
              <div className="flex flex-wrap items-center gap-6 sm:gap-8">
                <button
                  type="button"
                  onClick={() => onBookAppointment()}
                  className="group inline-flex items-center gap-3 rounded-full border border-[#0E88AA] bg-[#0E88AA] hover:border-[#0B6F8E] hover:bg-[#0B6F8E] hover:scale-105 active:scale-95 text-white px-7 py-3 text-base font-semibold shadow-md hover:shadow-cyan-950/40 transition-all duration-300 cursor-pointer"
                >
                  <span>Book an Appointment</span>
                  <span className="relative inline-flex h-4 w-4 shrink-0 overflow-hidden" aria-hidden="true">
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12.175 9H0V7H12.175L6.575 1.4L8 0L16 8L8 16L6.575 14.6L12.175 9Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                </button>

                <a
                  href="#specialities"
                  className="group inline-flex items-center gap-3 text-base font-medium text-white hover:text-[#7EE3D8] transition-all cursor-pointer"
                >
                  <span>View Specialities</span>
                  <span className="w-8 h-8 rounded-full bg-white/95 group-hover:bg-[#0E88AA] group-hover:scale-110 group-hover:text-white flex items-center justify-center text-[#1A1A1A] transition-all duration-300 shadow-sm">
                    <ChevronRight className="w-4 h-4 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </a>
              </div>
            </MotionReveal>

            {/* Authenticated Patient Quick Status */}
            {isPatientAuthenticated && patientUser && (
              <MotionReveal direction="up" delay={0.5} duration={0.6}>
                <div className="mt-8 inline-flex items-center gap-3 px-3.5 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/15 text-xs text-white">
                  <CheckCircle2 className="w-4 h-4 text-[#22A06B]" />
                  <span>
                    Signed in as <strong>{patientUser.name}</strong> •{' '}
                    <button
                      onClick={onNavigateAppointments}
                      className="underline text-[#7EE3D8] hover:text-white"
                    >
                      View your appointments
                    </button>
                  </span>
                </div>
              </MotionReveal>
            )}
          </div>
        </div>
      </section>

      {/* 2. QUICK SEARCH BAR (Directional Left/Right Reveal) */}
      <section className="bg-white border-b border-[#CDCACA]/50 py-8 lg:py-10 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <MotionReveal direction="left" duration={0.7}>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] tracking-tight">
                  World-Class Doctors, Close to Home
                </h2>
                <p className="text-sm text-[#666666] mt-1">
                  Find trusted consultants and book appointments across 6 hospital branches
                </p>
              </div>
            </MotionReveal>

            {/* Quick Search Form */}
            <MotionReveal direction="right" duration={0.7} className="max-w-2xl w-full">
              <form
                onSubmit={handleSearch}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-[#F4F6F6] p-2 rounded-2xl border border-[#E0E5E3] w-full shadow-xs hover:border-[#00829B]/30 transition-all duration-300"
              >
                {/* Location Select */}
                <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-gray-200 text-sm font-semibold text-[#1A1A1A] shrink-0">
                  <MapPin className="w-4 h-4 text-[#00829B]" />
                  <select
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="bg-transparent border-none outline-none cursor-pointer pr-1"
                  >
                    <option value="Kollam">Kollam</option>
                    <option value="Trivandrum">Trivandrum</option>
                    <option value="Palakkad">Palakkad</option>
                    <option value="Panchkula">Panchkula</option>
                    <option value="Ambala">Ambala</option>
                    <option value="Maldives">Maldives</option>
                  </select>
                </div>

                {/* Input */}
                <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-gray-200 focus-within:border-[#00829B] transition-colors">
                  <Search className="w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search doctor name or speciality (e.g. Cardiology)..."
                    className="w-full text-sm outline-none text-[#1A1A1A] placeholder-gray-400 bg-transparent"
                  />
                </div>

                {/* Search Button */}
                <button
                  type="submit"
                  className="group px-6 py-2.5 rounded-xl bg-[#00829B] hover:bg-[#006C82] hover:scale-105 active:scale-95 text-white font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shrink-0 shadow-sm"
                >
                  <span>Search</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </MotionReveal>
          </div>
        </div>
      </section>

      {/* 3. WHAT'S NEW SECTION (Staggered Card Lift & Zoom Effects) */}
      <section id="updates" className="py-16 sm:py-20 lg:py-24 bg-[#FAFBFA] border-b border-[#EAEAEA] scroll-mt-20 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 lg:mb-12 gap-4">
            <MotionReveal direction="left">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#00829B] mb-2">
                  <span>Updates & Breakthroughs</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight">
                  What&apos;s New
                </h2>
              </div>
            </MotionReveal>

            <MotionReveal direction="right">
              <button
                onClick={() => setShowAllBlogsModal(true)}
                className="group inline-flex items-center gap-2 text-sm font-semibold text-[#00829B] hover:text-[#006C82] cursor-pointer"
              >
                <span>View All Updates ({blogs.length})</span>
                <span className="w-7 h-7 rounded-full border border-[#00829B]/30 group-hover:border-[#00829B] group-hover:bg-[#00829B] group-hover:text-white flex items-center justify-center transition-all duration-300">
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </button>
            </MotionReveal>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.12}>
            {blogs.slice(0, 3).map((blog) => (
              <StaggerItem key={blog.id} direction="up" distance={40}>
                <div className="bg-white rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-xs hover:shadow-2xl hover:-translate-y-2 hover:border-[#00829B]/40 transition-all duration-400 flex flex-col group h-full">
                  <div className="relative aspect-[524/280] w-full overflow-hidden bg-gray-100">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    />
                    <span
                      className="absolute top-3 left-3 text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm"
                      style={{ backgroundColor: blog.tagColor || '#00829B' }}
                    >
                      {blog.category}
                    </span>
                  </div>
                  <div className="p-6 flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-[#888888] mb-2">
                        <span>{blog.date}</span>
                        <span>{blog.readTime || '4 min read'}</span>
                      </div>
                      <h3
                        onClick={() => setSelectedBlog(blog)}
                        className="text-lg font-bold text-[#1A1A1A] leading-snug group-hover:text-[#00829B] transition-colors mb-2.5 cursor-pointer"
                      >
                        {blog.title}
                      </h3>
                      <p className="text-sm text-[#666666] leading-relaxed mb-6 line-clamp-3">
                        {blog.excerpt}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedBlog(blog)}
                      className="group/btn inline-flex items-center gap-2 text-sm font-semibold text-[#00829B] hover:text-[#006C82] cursor-pointer"
                    >
                      <span>View in Detail</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                    </button>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 4. ADVANCED SPECIALITIES (Exact Meditrina Layout & Styling) */}
      <section id="specialities" className="py-16 sm:py-20 lg:py-28 bg-white overflow-hidden scroll-mt-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left Column: Heading, Subtitle & Action Buttons */}
            <div className="lg:col-span-5 flex flex-col justify-start">
              <MotionReveal direction="left" duration={0.8}>
                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1A1A1A] tracking-tight leading-[1.18]">
                  Advanced Specialities.
                  <br />
                  Exceptional Outcomes.
                </h2>
                <p className="text-sm sm:text-base text-[#4A4A4A] mt-5 sm:mt-6 max-w-[440px] leading-relaxed">
                  World-class care across all specialities, powered by expert doctors and advanced technology.
                </p>

                <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-5 sm:gap-6">
                  {/* Book an Appointment Button */}
                  <button
                    type="button"
                    onClick={() => onBookAppointment()}
                    className="group inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 rounded-full bg-[#00829B] hover:bg-[#006C82] text-white text-sm font-semibold transition-all duration-300 shadow-sm cursor-pointer hover:shadow-cyan-900/20 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Book an Appointment</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>

                  {/* Find a Doctor Button */}
                  <button
                    type="button"
                    onClick={onNavigateDoctors}
                    className="group inline-flex items-center gap-2.5 text-sm font-semibold text-[#1A1A1A] hover:text-[#00829B] transition-colors cursor-pointer"
                  >
                    <span>Find a Doctor</span>
                    <div className="w-6 h-6 rounded-full bg-[#00829B] group-hover:bg-[#006C82] text-white flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
                      <ChevronRight className="w-3.5 h-3.5 ml-0.5 group-hover:translate-x-0.5 transition-transform duration-300" />
                    </div>
                  </button>
                </div>
              </MotionReveal>
            </div>

            {/* Right Column: 2-Column Minimalist List with Divider Lines */}
            <div className="lg:col-span-7 flex flex-col">
              <MotionReveal direction="right" duration={0.8} delay={0.15}>
                {(() => {
                  const visibleSpecialities = showAllSpecialities
                    ? allSpecialities
                    : allSpecialities.slice(0, 10);

                  const half = Math.ceil(visibleSpecialities.length / 2);
                  const col1 = visibleSpecialities.slice(0, half);
                  const col2 = visibleSpecialities.slice(half);

                  return (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-14">
                        {/* Sub-column 1 */}
                        <div className="flex flex-col">
                          {col1.map((spec) => (
                            <button
                              key={spec}
                              type="button"
                              onClick={() => onSelectCategory(spec)}
                              className="group w-full py-3.5 sm:py-4 border-b border-[#E5E7EB] flex items-center justify-between text-left transition-colors cursor-pointer"
                            >
                              <span className="text-sm sm:text-[15px] font-normal text-[#1A1A1A] group-hover:text-[#00829B] transition-colors pr-3">
                                {spec}
                              </span>
                              <ArrowRight className="w-4 h-4 text-[#1A1A1A] group-hover:text-[#00829B] group-hover:translate-x-1 transition-all duration-200 shrink-0" />
                            </button>
                          ))}
                        </div>

                        {/* Sub-column 2 */}
                        <div className="flex flex-col">
                          {col2.map((spec) => (
                            <button
                              key={spec}
                              type="button"
                              onClick={() => onSelectCategory(spec)}
                              className="group w-full py-3.5 sm:py-4 border-b border-[#E5E7EB] flex items-center justify-between text-left transition-colors cursor-pointer"
                            >
                              <span className="text-sm sm:text-[15px] font-normal text-[#1A1A1A] group-hover:text-[#00829B] transition-colors pr-3">
                                {spec}
                              </span>
                              <ArrowRight className="w-4 h-4 text-[#1A1A1A] group-hover:text-[#00829B] group-hover:translate-x-1 transition-all duration-200 shrink-0" />
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* View Specialities Button */}
                      <div className="mt-8 pt-2">
                        <button
                          type="button"
                          onClick={() => setShowAllSpecialities(!showAllSpecialities)}
                          className="group inline-flex items-center gap-2.5 text-sm font-semibold text-[#1A1A1A] hover:text-[#00829B] transition-colors cursor-pointer"
                        >
                          <span>{showAllSpecialities ? 'View Less' : 'View Specialities'}</span>
                          <div className="w-6 h-6 rounded-full bg-[#00829B] group-hover:bg-[#006C82] text-white flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
                            <ChevronRight
                              className={`w-3.5 h-3.5 ml-0.5 transition-transform duration-300 ${
                                showAllSpecialities ? '-rotate-90' : 'group-hover:translate-x-0.5'
                              }`}
                            />
                          </div>
                        </button>
                      </div>
                    </>
                  );
                })()}
              </MotionReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 5. COMPREHENSIVE CARE & HEALTH PACKAGES (Staggered Reveal & Deep Lift) */}
      <section id="packages" className="py-16 sm:py-20 lg:py-24 bg-[#FAFBFA] border-t border-b border-[#EAEAEA] scroll-mt-20 overflow-hidden">
        <div id="facilities" className="scroll-mt-24" />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <MotionReveal direction="left" duration={0.8}>
            <div className="max-w-xl mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#00829B] block mb-2">
                Integrated Facilities & Packages
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight">
                Comprehensive Care, Thoughtfully Delivered
              </h2>
              <p className="text-sm sm:text-base text-[#666666] mt-3">
                A complete range of healthcare services designed to support you at every stage—from
                early diagnosis to full recovery.
              </p>
            </div>
          </MotionReveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.08}>
            {/* Card 1: International Patients */}
            <StaggerItem direction="up" distance={35}>
              <div className="group relative rounded-2xl overflow-hidden aspect-[384/491] shadow-xs hover:shadow-2xl hover:-translate-y-2.5 transition-all duration-400 cursor-pointer h-full">
                <img
                  src="https://www.meditrinahospitals.com/images/home/card-1.webp"
                  alt="International Patients"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                <div className="absolute right-0 bottom-0 left-0 p-5 sm:p-6 text-white flex flex-col justify-end">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#7EE3D8] mb-1">
                    Global Healthcare
                  </span>
                  <h4 className="text-xl font-bold text-white mb-2 leading-snug">
                    International Patients
                  </h4>
                  <p className="text-xs text-white/80 line-clamp-2 mb-4">
                    Dedicated support for international patients, from travel logistics to treatment
                    and language interpreters.
                  </p>
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-white group-hover:text-[#7EE3D8] transition-colors">
                    <span>Plan Your Visit</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </StaggerItem>

            {/* Card 2: Health Checkup Packages */}
            <StaggerItem direction="up" distance={35}>
              <div
                onClick={() => setSelectedPackage(healthPackages[0])}
                className="group relative rounded-2xl overflow-hidden aspect-[384/491] shadow-xs hover:shadow-2xl hover:-translate-y-2.5 transition-all duration-400 cursor-pointer h-full"
              >
                <img
                  src="https://www.meditrinahospitals.com/images/home/card-2.webp"
                  alt="Health Checkup Packages"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                <div className="absolute right-0 bottom-0 left-0 p-5 sm:p-6 text-white flex flex-col justify-end">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#7EE3D8] mb-1">
                    Preventive Care
                  </span>
                  <h4 className="text-xl font-bold text-white mb-2 leading-snug">
                    Health Checkup Packages
                  </h4>
                  <p className="text-xs text-white/80 line-clamp-2 mb-4">
                    Comprehensive health screening packages tailored for individuals and families to
                    detect early risks.
                  </p>
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-white group-hover:text-[#7EE3D8] transition-colors">
                    <span>Explore Packages</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </StaggerItem>

            {/* Card 3: Cathlab */}
            <StaggerItem direction="up" distance={35}>
              <div
                onClick={() => onSelectCategory('Cardiology')}
                className="group relative rounded-2xl overflow-hidden aspect-[384/491] shadow-xs hover:shadow-2xl hover:-translate-y-2.5 transition-all duration-400 cursor-pointer h-full"
              >
                <img
                  src="https://www.meditrinahospitals.com/images/home/card-3.webp"
                  alt="Cathlab"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                <div className="absolute right-0 bottom-0 left-0 p-5 sm:p-6 text-white flex flex-col justify-end">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#7EE3D8] mb-1">
                    24/7 Cardiac Emergency
                  </span>
                  <h4 className="text-xl font-bold text-white mb-2 leading-snug">Cathlab</h4>
                  <p className="text-xs text-white/80 line-clamp-2 mb-4">
                    State-of-the-art biplane digital catheterization lab for precision cardiac and
                    neuro vascular procedures.
                  </p>
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-white group-hover:text-[#7EE3D8] transition-colors">
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </StaggerItem>

            {/* Card 4: Physiotherapy */}
            <StaggerItem direction="up" distance={35}>
              <div
                onClick={() => onSelectCategory('Orthopaedics')}
                className="group relative rounded-2xl overflow-hidden aspect-[384/491] shadow-xs hover:shadow-2xl hover:-translate-y-2.5 transition-all duration-400 cursor-pointer h-full"
              >
                <img
                  src="https://www.meditrinahospitals.com/images/home/card-4.webp"
                  alt="Physiotherapy"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                <div className="absolute right-0 bottom-0 left-0 p-5 sm:p-6 text-white flex flex-col justify-end">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#7EE3D8] mb-1">
                    Rehabilitation
                  </span>
                  <h4 className="text-xl font-bold text-white mb-2 leading-snug">Physiotherapy</h4>
                  <p className="text-xs text-white/80 line-clamp-2 mb-4">
                    Specialized rehabilitation to regain mobility, reduce joint pain, and accelerate
                    post-surgical recovery.
                  </p>
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-white group-hover:text-[#7EE3D8] transition-colors">
                    <span>Book a Session</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>

          {/* Dedicated Health Packages Grid */}
          <div className="mt-16 pt-12 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <MotionReveal direction="left">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#00829B] block mb-1">
                    Preventive Screening
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                    Popular Health Checkup Packages
                  </h3>
                  <p className="text-xs sm:text-sm text-[#666666] mt-1">
                    Tailored preventative diagnostics and clinical evaluations designed for every life stage.
                  </p>
                </div>
              </MotionReveal>
            </div>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.08}>
              {healthPackages.map((pkg) => (
                <StaggerItem key={pkg.id} direction="up" distance={30}>
                  <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-xs hover:shadow-xl hover:-translate-y-2 hover:border-[#00829B]/40 transition-all duration-300 flex flex-col justify-between h-full group">
                    <div>
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#00829B] bg-[#E6F3F5] px-2.5 py-0.5 rounded-full mb-3 group-hover:bg-[#00829B] group-hover:text-white transition-colors duration-300">
                        {pkg.tag}
                      </span>
                      <h4 className="text-base font-bold text-[#1A1A1A] mb-2 leading-snug group-hover:text-[#00829B] transition-colors">
                        {pkg.title}
                      </h4>
                      <p className="text-2xl font-black text-[#00829B] mb-4">
                        {pkg.price}
                      </p>
                      <ul className="space-y-2 mb-6">
                        {pkg.features.slice(0, 3).map((f: string, i: number) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-[#555555]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#22A06B] shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-2 pt-2 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={() => setSelectedPackage(pkg)}
                        className="w-full py-2 px-3 rounded-lg bg-[#00829B] hover:bg-[#006C82] text-white text-xs font-bold transition-colors cursor-pointer text-center"
                      >
                        View Package Details
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedPackage(pkg);
                          onBookAppointment();
                        }}
                        className="w-full py-2 px-3 rounded-lg border border-gray-200 hover:border-[#00829B] text-gray-700 hover:text-[#00829B] text-xs font-semibold transition-colors cursor-pointer text-center"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* 6. BUILT FOR PEOPLE. PROVEN BY OUTCOMES (Exact Meditrina Full-Bleed Slider) */}
      <section id="about" className="relative overflow-hidden text-white scroll-mt-20">
        {/* Slides Carousel Wrapper */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{
              transform: `translate3d(-${currentSlide * 100}%, 0px, 0px)`,
            }}
          >
            {builtForPeopleSlides.map((slide) => (
              <div key={slide.id} className="relative min-w-0 shrink-0 grow-0 basis-full">
                <div className="relative min-h-[520px] sm:min-h-[580px] md:min-h-[620px] lg:min-h-[660px] xl:min-h-[700px] w-full">
                  {/* Background Image */}
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className="absolute inset-0 h-full w-full object-cover object-center"
                  />

                  {/* Exact Meditrina Gradient Overlays */}
                  <div
                    className="absolute inset-0 bg-[linear-gradient(90deg,_#000_-13%,_rgba(0,0,0,0)_122.55%)]"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25"
                    aria-hidden="true"
                  />

                  {/* Content Container Aligned Exactly with Meditrina Layout */}
                  <div className="mx-auto w-full max-w-[90rem] 2xl:max-w-[110rem] px-4 sm:px-8 lg:px-10 2xl:px-15 3xl:max-w-[120rem] 3xl:px-20 relative z-10 flex min-h-[inherit] flex-col justify-center py-8 pb-24 sm:py-10 sm:pb-28 md:py-12 md:pb-28 lg:py-16 lg:pb-32">
                    <div className="min-w-0 max-w-[640px] 3xl:max-w-[720px] mt-0 md:mt-10">
                      <h2 className="mb-4 text-[1.75rem] leading-[1.15] font-medium text-white sm:mb-5 sm:text-3xl md:mb-6 md:text-[2.25rem] lg:text-[40px]">
                        Built for people.
                        <br />
                        Proven by outcomes.
                      </h2>
                      <p className="mb-5 max-w-[520px] text-[15px] leading-relaxed font-medium text-white sm:mb-8 sm:text-base md:mb-10 md:text-[17px] lg:mb-12 lg:text-lg">
                        Every decision we make is grounded in clinical excellence, patient dignity, and
                        a relentless drive to improve outcomes.
                      </p>

                      {/* Thin white divider line */}
                      <div
                        className="mb-5 max-w-[490px] border-t border-white/35 sm:mb-8 md:mb-10 lg:mb-12"
                        aria-hidden="true"
                      />

                      {/* Slide Sub-heading */}
                      <h3 className="mb-2 text-base font-semibold text-white sm:mb-3 sm:text-xl md:text-[1.35rem] lg:text-[26px]">
                        {slide.title}
                      </h3>

                      {/* Slide Description */}
                      <p className="mb-6 max-w-[410px] text-[15px] leading-relaxed font-medium text-white/95 sm:mb-8 sm:text-base md:mb-10 md:text-[17px] lg:mb-12">
                        {slide.description}
                      </p>

                      {/* Action Button: Book an Appointment */}
                      <button
                        type="button"
                        onClick={() => onBookAppointment()}
                        className="group inline-flex items-center gap-3 rounded-full border border-white text-white hover:border-white hover:bg-white hover:text-black px-7 py-3 text-sm sm:text-base font-medium transition-all duration-300 ease-out cursor-pointer shadow-md"
                      >
                        <span>Book an Appointment</span>
                        <span className="relative inline-flex h-4 w-4 shrink-0 overflow-hidden" aria-hidden="true">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="group-hover:translate-x-1 transition-transform duration-300"
                          >
                            <path
                              d="M12.175 9H0V7H12.175L6.575 1.4L8 0L16 8L8 16L6.575 14.6L12.175 9Z"
                              fill="currentColor"
                            />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom-right Slider Controls */}
        <div className="mx-auto w-full max-w-[90rem] 2xl:max-w-[110rem] px-4 sm:px-8 lg:px-10 2xl:px-15 3xl:max-w-[120rem] 3xl:px-20 pointer-events-none absolute inset-x-0 bottom-0 z-10 pb-6 sm:pb-8 md:pb-10 lg:pb-12 xl:pb-14">
          <div className="pointer-events-auto ml-auto flex w-fit items-center gap-2.5 sm:gap-3">
            {/* Previous Slide Button */}
            <button
              type="button"
              disabled={currentSlide === 0}
              onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
              aria-label="Previous slide"
              className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 ${
                currentSlide === 0
                  ? 'cursor-not-allowed border-white/25 bg-white/10 text-white/40'
                  : 'cursor-pointer border-white/80 bg-white text-zinc-700 hover:bg-white/90 hover:scale-105 active:scale-95 shadow-md'
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10 3L5 8L10 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Next Slide Button */}
            <button
              type="button"
              disabled={currentSlide === builtForPeopleSlides.length - 1}
              onClick={() =>
                setCurrentSlide((prev) => Math.min(builtForPeopleSlides.length - 1, prev + 1))
              }
              aria-label="Next slide"
              className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 ${
                currentSlide === builtForPeopleSlides.length - 1
                  ? 'cursor-not-allowed border-white/25 bg-white/10 text-white/40'
                  : 'cursor-pointer border-white/80 bg-white text-zinc-700 hover:bg-white/90 hover:scale-105 active:scale-95 shadow-md'
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6 3L11 8L6 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* 7. DOCTORS DIRECTORY (The Care You Need From Doctors You Trust) */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#FAFBFA] border-t border-b border-[#EAEAEA]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
            <MotionReveal direction="left">
              <span className="text-xs font-bold uppercase tracking-widest text-[#00829B] block mb-2">
                Medical Leadership
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight">
                The Care You Need From Doctors You Trust
              </h2>
              <p className="text-sm sm:text-base text-[#666666] mt-2 max-w-2xl">
                Our world-class doctors bring decades of clinical expertise, empathy, and advanced
                research to every patient consultation.
              </p>
            </MotionReveal>

            <MotionReveal direction="right" delay={0.15}>
              <ParagonArrowButton
                onClick={onNavigateDoctors}
                variant="outline"
                className="self-start lg:self-auto"
              >
                View All Doctors ({doctors.length})
              </ParagonArrowButton>
            </MotionReveal>
          </div>

          {/* Doctor Cards Grid */}
          {(() => {
            const prathapDoctor: Doctor = doctors.find(
              (d) => d.id === 'doc-prathap' || d.name.toLowerCase().includes('prathap')
            ) || {
              id: 'doc-prathap',
              name: 'Dr. N Prathap Kumar',
              specializationId: 'spec-cardiology',
              specializationName: 'Cardiology',
              experienceYears: 28,
              rating: 4.99,
              reviewCount: 342,
              profileImage: 'https://cdn.sanity.io/images/0xgev689/production/e017037b0f40177ba8e4bb822c603fc11ca6d340-492x536.png',
              bio: 'Chairman & Chief Interventional Cardiologist of InspireZest Group of Hospitals. Pioneer with over 28 years of clinical leadership and 16,000+ complex coronary angioplasties performed with exceptional clinical outcomes.',
              email: 'prathap.kumar@inspirezest.com',
              phone: '+91 9567333266',
              room: 'Chairman Suite, Executive Wing 501',
              username: 'dr.prathap',
              password: 'password123',
              availableDates: ['2026-11-13', '2026-11-14', '2026-11-16', '2026-11-17', '2026-11-20'],
              timeSlots: ['09:00 AM', '10:30 AM', '11:45 AM', '02:00 PM', '03:30 PM'],
              consultationFee: 200,
            };

            const otherDoctors = doctors.filter(
              (d) => d.id !== 'doc-prathap' && !d.name.toLowerCase().includes('prathap')
            );

            return (
              <StaggerContainer
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                staggerDelay={0.1}
              >
                {/* Dr. N Prathap Kumar (Chairman & Chief Interventional Cardiologist) */}
                <StaggerItem direction="up">
                  <div className="h-full bg-white rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-sm hover:shadow-2xl hover:border-[#00829B]/40 hover:-translate-y-2 transition-all duration-500 ease-out flex flex-col group">
                    <div className="relative aspect-[492/520] bg-gradient-to-t from-gray-200 to-gray-100 overflow-hidden">
                      <img
                        src={prathapDoctor.profileImage}
                        alt={prathapDoctor.name}
                        className="w-full h-full object-cover object-top group-hover:scale-108 transition-transform duration-700 ease-out"
                      />
                      <span className="absolute top-3 left-3 bg-[#00829B] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        Chairman & Chief Cardiologist
                      </span>
                    </div>
                    <div className="p-5 flex flex-1 flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-[#1A1A1A] group-hover:text-[#00829B] transition-colors duration-300">
                          {prathapDoctor.name}
                        </h3>
                        <p className="text-xs font-semibold text-[#00829B] mt-0.5">
                          Interventional Cardiology
                        </p>
                        <p className="text-xs text-[#666666] mt-1.5">
                          MBBS, MD, DM (Cardiology), FCSI, FESC • 28+ Years Exp
                        </p>
                      </div>
                      <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-2">
                        <button
                          onClick={() => onBookAppointment(prathapDoctor)}
                          className="flex-1 py-2 px-3 rounded-lg bg-[#00829B] hover:bg-[#006C82] hover:scale-[1.02] active:scale-[0.98] text-white font-semibold text-xs text-center transition-all duration-200 cursor-pointer shadow-sm"
                        >
                          Book Appointment
                        </button>
                        <button
                          onClick={() => onViewDoctorProfile(prathapDoctor)}
                          className="py-2 px-3 rounded-lg border border-gray-200 hover:border-[#00829B] hover:text-[#00829B] text-xs font-semibold text-gray-700 transition-colors duration-200 cursor-pointer"
                        >
                          Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </StaggerItem>

                {/* Other System Doctors */}
                {otherDoctors.slice(0, 3).map((doc) => (
                  <StaggerItem key={doc.id} direction="up">
                    <div className="h-full bg-white rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-sm hover:shadow-2xl hover:border-[#00829B]/40 hover:-translate-y-2 transition-all duration-500 ease-out flex flex-col group">
                      <div className="relative aspect-[492/520] bg-gradient-to-t from-gray-200 to-gray-100 overflow-hidden">
                        <img
                          src={doc.profileImage}
                          alt={doc.name}
                          className="w-full h-full object-cover object-top group-hover:scale-108 transition-transform duration-700 ease-out"
                        />
                        <span className="absolute top-3 left-3 bg-[#00829B] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                          {doc.specializationName}
                        </span>
                      </div>
                      <div className="p-5 flex flex-1 flex-col justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-[#1A1A1A] group-hover:text-[#00829B] transition-colors duration-300">
                            {doc.name}
                          </h3>
                          <p className="text-xs font-semibold text-[#00829B] mt-0.5">
                            {doc.specializationName}
                          </p>
                          <p className="text-xs text-[#666666] mt-1.5 line-clamp-2">
                            {doc.experienceYears} Years Experience • Senior Consultant
                          </p>
                        </div>
                        <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-2">
                          <button
                            onClick={() => onBookAppointment(doc)}
                            className="flex-1 py-2 px-3 rounded-lg bg-[#00829B] hover:bg-[#006C82] hover:scale-[1.02] active:scale-[0.98] text-white font-semibold text-xs text-center transition-all duration-200 cursor-pointer shadow-sm"
                          >
                            Book Appointment
                          </button>
                          <button
                            onClick={() => onViewDoctorProfile(doc)}
                            className="py-2 px-3 rounded-lg border border-gray-200 hover:border-[#00829B] hover:text-[#00829B] text-xs font-semibold text-gray-700 transition-colors duration-200 cursor-pointer"
                          >
                            Profile
                          </button>
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            );
          })()}
        </div>
      </section>

      {/* 8. PATIENT TESTIMONIALS */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <MotionReveal direction="left" className="max-w-2xl mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00829B] block mb-2">
              Stories of Healing
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight">
              Patient Testimonials
            </h2>
            <p className="text-sm sm:text-base text-[#666666] mt-2">
              Real recovery stories from patients, newest first.
            </p>
          </MotionReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.12}>
            {testimonials.map((t) => (
              <StaggerItem key={t.id} direction="up">
                <div className="h-full p-8 rounded-2xl bg-[#F4F6F6] border border-[#E5E7EB] flex flex-col justify-between hover:border-[#00829B]/40 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 ease-out group">
                  <div>
                    <div className="flex items-center gap-1 text-[#E9A23B] mb-4">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current group-hover:scale-110 transition-transform duration-300" />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold text-[#00829B] uppercase tracking-wider block mb-2">
                      {t.tag}
                    </span>
                    <p className="text-sm sm:text-base text-[#333333] leading-relaxed italic mb-6">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>
                  <div className="pt-4 border-t border-gray-200/70">
                    <p className="text-sm font-bold text-[#1A1A1A]">{t.name}</p>
                    <p className="text-xs text-[#777777]">{t.location}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 9. INSIGHTS & UPDATES (News & Blogs Tabs) */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#FAFBFA] border-t border-b border-[#EAEAEA]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-6">
            <MotionReveal direction="left">
              <span className="text-xs font-bold uppercase tracking-widest text-[#00829B] block mb-2">
                Knowledge & Events
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight">
                Insights & Updates
              </h2>
              <p className="text-sm text-[#666666] mt-2">
                Stay informed with the latest medical insights, hospital updates, and expert
                perspectives from InspireZest.
              </p>
            </MotionReveal>

            {/* Toggle Tabs */}
            <MotionReveal direction="right" delay={0.15}>
              <div className="flex items-center gap-2 bg-[#EAEAEA] p-1 rounded-xl self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setInsightsTab('news')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    insightsTab === 'news'
                      ? 'bg-white text-[#00829B] shadow-xs'
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  News & Events
                </button>
                <button
                  type="button"
                  onClick={() => setInsightsTab('blogs')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    insightsTab === 'blogs'
                      ? 'bg-white text-[#00829B] shadow-xs'
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  Blogs & Articles
                </button>
              </div>
            </MotionReveal>
          </div>

          <StaggerContainer
            key={insightsTab}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            staggerDelay={0.1}
          >
            {(insightsTab === 'news' ? newsItems : blogItems).map((item) => (
              <StaggerItem key={item.id} direction="up">
                <div className="h-full bg-white p-7 rounded-2xl border border-[#E5E7EB] shadow-sm hover:shadow-xl hover:border-[#00829B]/40 hover:-translate-y-2 transition-all duration-500 ease-out flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#888888] mb-3">
                      <span className="font-semibold text-[#00829B]">{item.category}</span>
                      <span>{item.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#1A1A1A] leading-snug mb-3 group-hover:text-[#00829B] transition-colors duration-300 cursor-pointer">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#666666] leading-relaxed mb-6">{item.desc}</p>
                  </div>
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#00829B] group-hover:text-[#006C82] cursor-pointer">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 10. MEDITRINA TEAL MILESTONE BANNER (Exact Meditrina CSS & Sanity doctor asset) */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#0B7BA8] via-[#1A9A8F] to-[#3AB878] text-white">
        {/* Wavy Background Overlay */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 aspect-[1809/275] w-full bg-[url('https://www.meditrinahospitals.com/images/home/about-lines.webp')] bg-[length:100%_auto] bg-bottom bg-no-repeat"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 pt-14 sm:pt-20 lg:pt-28 pb-0">
          <div className="grid grid-cols-1 lg:grid-cols-[438px_minmax(0,1fr)] lg:items-end gap-10 lg:gap-x-16">
            {/* Meditrina Doctor Cutout */}
            <MotionReveal direction="left" duration={0.9} distance={60} className="relative order-2 lg:order-1 mx-auto lg:mx-0 w-full max-w-[340px] sm:max-w-[400px] lg:w-[438px] lg:max-w-none shrink-0">
              <img
                src="https://www.meditrinahospitals.com/images/home/about-doctor.webp"
                alt="Meditrina doctor"
                className="block h-auto w-full drop-shadow-2xl hover:scale-102 transition-transform duration-700 ease-out"
              />
            </MotionReveal>

            {/* Content & Stats */}
            <MotionReveal direction="right" duration={0.9} distance={60} className="order-1 lg:order-2 flex flex-col pb-8 sm:pb-12 lg:pb-24">
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-snug sm:leading-snug max-w-[774px]">
                &ldquo;Our goal at InspireZest is simple — to bring world-class, specialized
                healthcare closer to people. With expert teams, advanced technology, and a commitment
                to ethical care, we continue to deliver trusted outcomes every day.&rdquo;
              </p>

              <div className="mt-8 lg:mt-12">
                <button
                  type="button"
                  onClick={() => onBookAppointment()}
                  className="group inline-flex items-center gap-3 text-sm sm:text-base font-semibold text-white bg-white/20 hover:bg-white/30 hover:scale-105 active:scale-95 backdrop-blur-md px-6 py-3 rounded-full transition-all duration-300 cursor-pointer shadow-lg"
                >
                  <span>Learn More About Us</span>
                  <div className="w-6 h-6 rounded-full bg-white text-[#0B7BA8] flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              </div>

              {/* Milestones Row (600+ Beds, 98% Success Rate, 25+ Years) */}
              <StaggerContainer className="mt-12 lg:mt-16 pt-8 border-t border-white/20 grid grid-cols-3 gap-6 sm:gap-12" staggerDelay={0.15}>
                <StaggerItem direction="up" className="flex flex-col group">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight group-hover:scale-105 transition-transform origin-left">
                    600+
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-white/80 mt-1">
                    Hospital Beds
                  </span>
                </StaggerItem>

                <StaggerItem direction="up" className="flex flex-col border-l border-white/20 pl-6 sm:pl-12 group">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight group-hover:scale-105 transition-transform origin-left">
                    98%
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-white/80 mt-1">
                    Success Rate
                  </span>
                </StaggerItem>

                <StaggerItem direction="up" className="flex flex-col border-l border-white/20 pl-6 sm:pl-12 group">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight group-hover:scale-105 transition-transform origin-left">
                    25+
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-white/80 mt-1">
                    Years of Experience
                  </span>
                </StaggerItem>
              </StaggerContainer>
            </MotionReveal>
          </div>
        </div>
      </section>

      {/* 11. EXPANDING CARE ACROSS INDIA */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <MotionReveal direction="left" className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#00829B] block mb-2">
                Hospital Network
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight">
                Expanding Care Across India
              </h2>
              <p className="text-sm text-[#666666] mt-2">
                Experience InspireZest&apos;s standard of care at our premier locations across India and
                Male.
              </p>
            </div>
          </MotionReveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
            {/* Kollam */}
            <StaggerItem direction="up">
              <div className="h-full p-6 rounded-2xl border border-[#E5E7EB] bg-[#FAFAF9] hover:border-[#00829B] hover:shadow-xl hover:-translate-y-2 transition-all duration-500 ease-out flex flex-col justify-between group">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#00829B] bg-[#E6F3F5] px-2 py-0.5 rounded">
                    Corporate Center
                  </span>
                  <h3 className="text-lg font-bold text-[#1A1A1A] mt-3 group-hover:text-[#00829B] transition-colors">
                    InspireZest Hospital, Kollam
                  </h3>
                  <p className="text-xs text-[#666666] mt-2 flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#00829B] shrink-0 mt-0.5" />
                    <span>2nd Floor, S N Junction, Velayudha Mansion, Junction, Karbala, Kollam</span>
                  </p>
                  <p className="text-xs font-semibold text-[#1A1A1A] mt-2">
                    +91 9567333266
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => onBookAppointment()}
                    className="text-xs font-semibold text-[#00829B] hover:text-[#006C82] flex items-center gap-1.5 cursor-pointer group-hover:gap-2.5 transition-all"
                  >
                    <span>Book at Kollam</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </StaggerItem>

            {/* Trivandrum */}
            <StaggerItem direction="up">
              <div className="h-full p-6 rounded-2xl border border-[#E5E7EB] bg-[#FAFAF9] hover:border-[#22A06B] hover:shadow-xl hover:-translate-y-2 transition-all duration-500 ease-out flex flex-col justify-between group">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#22A06B] bg-[#E6F7EF] px-2 py-0.5 rounded">
                    Super Specialty
                  </span>
                  <h3 className="text-lg font-bold text-[#1A1A1A] mt-3 group-hover:text-[#22A06B] transition-colors">
                    InspireZest Hospital, Trivandrum
                  </h3>
                  <p className="text-xs text-[#666666] mt-2 flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#22A06B] shrink-0 mt-0.5" />
                    <span>Plamoodu, Pattom P O, Thiruvananthapuram - 695004</span>
                  </p>
                  <p className="text-xs font-semibold text-[#1A1A1A] mt-2">+91 9567333266</p>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => onBookAppointment()}
                    className="text-xs font-semibold text-[#00829B] hover:text-[#006C82] flex items-center gap-1.5 cursor-pointer group-hover:gap-2.5 transition-all"
                  >
                    <span>Book at Trivandrum</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </StaggerItem>

            {/* Palakkad */}
            <StaggerItem direction="up">
              <div className="h-full p-6 rounded-2xl border border-[#E5E7EB] bg-[#FAFAF9] hover:border-[#E9A23B] hover:shadow-xl hover:-translate-y-2 transition-all duration-500 ease-out flex flex-col justify-between group">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#E9A23B] bg-[#FEF6E8] px-2 py-0.5 rounded">
                    Cardiac & Trauma
                  </span>
                  <h3 className="text-lg font-bold text-[#1A1A1A] mt-3 group-hover:text-[#E9A23B] transition-colors">
                    InspireZest Hospital, Palakkad
                  </h3>
                  <p className="text-xs text-[#666666] mt-2 flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#E9A23B] shrink-0 mt-0.5" />
                    <span>Near Stadium Stand, Palakkad, Kerala - 678001</span>
                  </p>
                  <p className="text-xs font-semibold text-[#1A1A1A] mt-2">+91 9567333266</p>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => onBookAppointment()}
                    className="text-xs font-semibold text-[#00829B] hover:text-[#006C82] flex items-center gap-1.5 cursor-pointer group-hover:gap-2.5 transition-all"
                  >
                    <span>Book at Palakkad</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </StaggerItem>

            {/* Maldives */}
            <StaggerItem direction="up">
              <div className="h-full p-6 rounded-2xl border border-[#E5E7EB] bg-[#FAFAF9] hover:border-[#00829B] hover:shadow-xl hover:-translate-y-2 transition-all duration-500 ease-out flex flex-col justify-between group">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#00829B] bg-[#E6F3F5] px-2 py-0.5 rounded">
                    International Center
                  </span>
                  <h3 className="text-lg font-bold text-[#1A1A1A] mt-3 group-hover:text-[#00829B] transition-colors">
                    IGMH InspireZest, Maldives
                  </h3>
                  <p className="text-xs text-[#666666] mt-2 flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#00829B] shrink-0 mt-0.5" />
                    <span>Kanbaa Aisaa Rani Higun, Malé, Maldives</span>
                  </p>
                  <p className="text-xs font-semibold text-[#1A1A1A] mt-2">+960 333 5335</p>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => onBookAppointment()}
                    className="text-xs font-semibold text-[#00829B] hover:text-[#006C82] flex items-center gap-1.5 cursor-pointer group-hover:gap-2.5 transition-all"
                  >
                    <span>International Inquiries</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* 12. HEALTH CHECKUP MODAL (When clicking any package) */}
      {selectedPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-gray-200 animate-scale-up">
            <button
              onClick={() => setSelectedPackage(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors cursor-pointer"
            >
              ✕
            </button>

            <span className="text-[11px] font-bold uppercase tracking-wider text-[#00829B] bg-[#E6F3F5] px-3 py-1 rounded-full">
              {selectedPackage.tag}
            </span>

            <h3 className="text-2xl font-bold text-[#1A1A1A] mt-3 mb-1">
              {selectedPackage.title}
            </h3>
            <p className="text-2xl font-black text-[#00829B] mb-4">{selectedPackage.price}</p>
            <p className="text-xs text-[#666666] mb-6">{selectedPackage.idealFor}</p>

            <div className="space-y-2.5 mb-8">
              <p className="text-xs font-bold uppercase tracking-wider text-[#4A4A4A]">
                Included Tests & Consultations:
              </p>
              {selectedPackage.features.map((f: string, i: number) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-[#333333]">
                  <CheckCircle2 className="w-4 h-4 text-[#22A06B] shrink-0 mt-0.5" />
                  <span>{f}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setSelectedPackage(null);
                  onBookAppointment();
                }}
                className="flex-1 py-3 px-6 rounded-full bg-[#00829B] hover:bg-[#006C82] text-white font-semibold text-sm transition-colors text-center cursor-pointer"
              >
                Book Package Online
              </button>
              <button
                onClick={() => setSelectedPackage(null)}
                className="py-3 px-6 rounded-full border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Blog Detail Reader Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative border border-gray-200 animate-scale-up max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedBlog(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors cursor-pointer z-10"
            >
              ✕
            </button>

            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-6 bg-gray-100">
              <img
                src={selectedBlog.image}
                alt={selectedBlog.title}
                className="w-full h-full object-cover"
              />
              <span
                className="absolute top-3 left-3 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider"
                style={{ backgroundColor: selectedBlog.tagColor || '#00829B' }}
              >
                {selectedBlog.category}
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs text-[#666666] mb-3">
              <span>{selectedBlog.date}</span>
              <span>•</span>
              <span>{selectedBlog.author}</span>
              <span>•</span>
              <span className="font-semibold text-[#00829B]">{selectedBlog.readTime || '4 min read'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-4 leading-snug">
              {selectedBlog.title}
            </h2>

            <div className="p-4 bg-[#F4F6F6] rounded-xl border border-gray-200 text-xs sm:text-sm text-[#00829B] font-semibold mb-6">
              {selectedBlog.excerpt}
            </div>

            <div className="text-gray-700 leading-relaxed space-y-4 mb-8">
              <p className="text-sm sm:text-base text-[#333333] leading-relaxed">
                {selectedBlog.content}
              </p>
              <p className="text-xs text-[#666666] leading-relaxed pt-3 border-t border-gray-100">
                Published by InspireZest Hospital Clinical Editorial Board • Kollam, Kerala. For clinical appointments and consultations with specialists in {selectedBlog.category}, please reach our outpatient reception at +91 9567333266.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={() => {
                  setSelectedBlog(null);
                  onSelectCategory(selectedBlog.category);
                }}
                className="flex-1 py-3 px-6 rounded-full bg-[#00829B] hover:bg-[#006C82] text-white font-semibold text-sm transition-colors text-center cursor-pointer"
              >
                Consult {selectedBlog.category} Specialists
              </button>
              <button
                onClick={() => setSelectedBlog(null)}
                className="py-3 px-6 rounded-full border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* All Updates & Breakthroughs Modal */}
      {showAllBlogsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl relative border border-gray-200 animate-scale-up max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowAllBlogsModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors cursor-pointer z-10"
            >
              ✕
            </button>

            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-[#00829B] block mb-1">
                Hospital Archive
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                All Updates & Clinical Breakthroughs
              </h2>
              <p className="text-xs sm:text-sm text-[#666666] mt-1">
                Explore the complete collection of medical discoveries, healthy living advice, and clinical news from InspireZest Hospital.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogs.map((b) => (
                <div
                  key={b.id}
                  onClick={() => {
                    setShowAllBlogsModal(false);
                    setSelectedBlog(b);
                  }}
                  className="bg-[#FAFBFA] rounded-2xl overflow-hidden border border-[#E5E7EB] hover:border-[#00829B]/40 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
                    <img
                      src={b.image}
                      alt={b.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span
                      className="absolute top-3 left-3 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider"
                      style={{ backgroundColor: b.tagColor || '#00829B' }}
                    >
                      {b.category}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-[#888888] mb-1.5">
                        <span>{b.date}</span>
                        <span>{b.readTime || '4 min'}</span>
                      </div>
                      <h4 className="text-base font-bold text-[#1A1A1A] group-hover:text-[#00829B] transition-colors mb-2 leading-snug">
                        {b.title}
                      </h4>
                      <p className="text-xs text-[#666666] line-clamp-2 leading-relaxed">
                        {b.excerpt}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-200 flex items-center justify-between text-xs font-semibold text-[#00829B]">
                      <span>Read Full Story</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t border-gray-100 text-center">
              <button
                onClick={() => setShowAllBlogsModal(false)}
                className="py-2.5 px-6 rounded-full border border-gray-200 text-gray-700 text-xs font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Close Archive
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 13. FLOATING CIRCULAR PHONE & WHATSAPP BUTTONS (Exact InspireZest Style) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
        {/* Teal Call Button */}
        <a
          href="tel:+919567333266"
          className="w-12 h-12 rounded-full bg-[#0E88AA] hover:bg-[#0B6F8E] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-all cursor-pointer"
          title="Emergency 24x7: +91 9567333266"
        >
          <Phone className="w-5 h-5 fill-current" />
        </a>

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/919567333266"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-all cursor-pointer"
          title="Chat on WhatsApp"
        >
          <MessageCircle className="w-6 h-6 fill-current" />
        </a>
      </div>
    </div>
  );
};
