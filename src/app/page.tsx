'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ClubOwners from '@/components/ClubOwners';
import TeamMembers from '@/components/TeamMembers';
import UpcomingMatches from '@/components/UpcomingMatches';
import ImageGallery from '@/components/ImageGallery';
import AboutUs from '@/components/AboutUs';
import Footer from '@/components/Footer';
// import FirebaseTest from '@/components/FirebaseTest';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      {/* <div className="container mx-auto px-4 py-8">
        <FirebaseTest />
      </div> */}
      <ClubOwners />
      <TeamMembers />
      <UpcomingMatches />
      <ImageGallery />
      <AboutUs />
      <Footer />
    </main>
  );
}
