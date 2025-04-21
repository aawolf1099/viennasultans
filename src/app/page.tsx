'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TeamMembers from '@/components/TeamMembers';
import ClubOwners from '@/components/ClubOwners';
import UpcomingMatches from '@/components/UpcomingMatches';
import AboutUs from '@/components/AboutUs';
import ImageGallery from '@/components/ImageGallery';
import Hero from '@/components/Hero';

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#020123]">
      <Navbar />
      <Hero />
      <ClubOwners />
      <TeamMembers />
      <UpcomingMatches />
      <ImageGallery />
      <AboutUs />
      <Footer />
    </main>
  );
}
