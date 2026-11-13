import type { Metadata } from 'next';
import './globals.css';
import { HospitalProvider } from '@/context/HospitalContext';
import { ToastContainer } from '@/components/common/Toast';

export const metadata: Metadata = {
  title: 'InspireZest Hospitals — Modern Healthcare System',
  description:
    'InspireZest Hospitals provides world-class healthcare, specialist consultations, and complete hospital administration.',
  icons: {
    icon: '/images/inspirezest-icon.png',
    apple: '/images/inspirezest-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className="min-h-screen bg-[#F4F6F6] text-[#1A1A1A] flex flex-col antialiased overflow-x-hidden">
        <HospitalProvider>
          <main className="flex-1 flex flex-col overflow-x-hidden">{children}</main>
          <ToastContainer />
        </HospitalProvider>
      </body>
    </html>
  );
}

