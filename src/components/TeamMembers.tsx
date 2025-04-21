"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  stats: {
    matches: number;
    runs: number;
    wickets: number;
  };
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Micheal Subhan",
    role: "Captain",
    image: "/images/mas.jpg",
    stats: { matches: 45, runs: 1200, wickets: 15 },
  },
  {
    id: 2,
    name: "Tauqir Asif",
    role: "Vice Captain",
    image: "/images/tk.jpg",
    stats: { matches: 38, runs: 950, wickets: 25 },
  },
  {
    id: 3,
    name: "Hammad Rana",
    role: "Left Arm Off Break",
    image: "/images/hammad.jpg",
    stats: { matches: 42, runs: 500, wickets: 105 },
  },
  {
    id: 4,
    name: "Asad Ullah",
    role: "All Rounder",
    image: "/images/asad.jpeg",
    stats: { matches: 45, runs: 1800, wickets: 80 },
  },
  {
    id: 5,
    name: "Abdul Moid",
    role: "All Rounder",
    image: "/images/moid.jpeg",
    stats: { matches: 43, runs: 1400, wickets: 90 },
  },
  {
    id: 6,
    name: "Zubair Khan",
    role: "Wicket Keeper Batsman",
    image: "/images/zubi.jpg",
    stats: { matches: 32, runs: 1000, wickets: 0 },
  },
];

const TeamMembers = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const [direction, setDirection] = useState(0);
  const [visibleCount, setVisibleCount] = useState(5);

  // Responsive visibleCount
  useEffect(() => {
    const updateCount = () => {
      const w = window.innerWidth;
      if (w < 640) setVisibleCount(1);
      else if (w < 1024) setVisibleCount(3);
      else setVisibleCount(5);
    };
    updateCount();
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + teamMembers.length) % teamMembers.length
    );
  };

  // Auto-slide
  useEffect(() => {
    if (!autoSlide) return;
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [currentIndex, autoSlide]);

  const visibleMembers = Array.from({ length: visibleCount }).map(
    (_, i) => teamMembers[(currentIndex + i) % teamMembers.length]
  );

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: "0%", opacity: 1 },
    exit: (dir: number) => ({ x: dir < 0 ? "100%" : "-100%", opacity: 0 }),
  };

  return (
    <section className="py-16 px-4 bg-[#020123]">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-center text-[#009cd4] mb-12"
      >
        Meet Our Team
      </motion.h2>

      <div className="relative max-w-7xl mx-auto overflow-visible">
        {/* Desktop Arrows: hidden on mobile */}
        <button
          onClick={prevSlide}
          className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full p-3 rounded-full bg-[#DB3986]/20 hover:bg-[#DB3986]/40 transition-colors z-20"
          onMouseEnter={() => setAutoSlide(false)}
          onMouseLeave={() => setAutoSlide(true)}
        >
          <ChevronLeftIcon className="w-6 h-6 text-[#DB3986]" />
        </button>

        <button
          onClick={nextSlide}
          className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-full p-3 rounded-full bg-[#DB3986]/20 hover:bg-[#DB3986]/40 transition-colors z-20"
          onMouseEnter={() => setAutoSlide(false)}
          onMouseLeave={() => setAutoSlide(true)}
        >
          <ChevronRightIcon className="w-6 h-6 text-[#DB3986]" />
        </button>

        {/* Slider Window */}
        <div className="overflow-hidden h-[500px]">
          <div className="relative w-full h-full">
            <AnimatePresence initial={false} custom={direction}>
              {visibleMembers.map((member, idx) => (
                <motion.div
                  key={member.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 200, damping: 25 },
                    opacity: { duration: 0.5 },
                  }}
                  className="absolute top-0"
                  style={{
                    left: `${(idx * 100) / visibleCount}%`,
                    width: `${100 / visibleCount}%`,
                    transform: `scale(${
                      idx === Math.floor(visibleCount / 2) ? 1 : 0.8
                    })`,
                    opacity: idx === Math.floor(visibleCount / 2) ? 1 : 0.6,
                  }}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow mx-2">
                    <div className="relative h-64">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6 bg-[#DB3986]">
                      <h3 className="text-xl text-white font-bold mb-2">{member.name}</h3>
                      <p className="text-white mb-4">
                        {member.role}
                      </p>
                      <div className="space-y-2">
                        <p className="text-sm text-white dark:text-gray-300">
                          Matches: {member.stats.matches}
                        </p>
                        <p className="text-sm text-white dark:text-gray-300">
                          Runs: {member.stats.runs}
                        </p>
                        <p className="text-sm text-white dark:text-gray-300">
                          Wickets: {member.stats.wickets}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Arrows: only on mobile */}
        <div className="mt-4 flex justify-center space-x-4 sm:hidden">
          <button
            onClick={prevSlide}
            className="p-3 rounded-full bg-[#DB3986]/20 hover:bg-[#DB3986]/40 transition-colors"
            onMouseEnter={() => setAutoSlide(false)}
            onMouseLeave={() => setAutoSlide(true)}
          >
            <ChevronLeftIcon className="w-6 h-6 text-[#DB3986]" />
          </button>
          <button
            onClick={nextSlide}
            className="p-3 rounded-full bg-[#DB3986]/20 hover:bg-[#DB3986]/40 transition-colors"
            onMouseEnter={() => setAutoSlide(false)}
            onMouseLeave={() => setAutoSlide(true)}
          >
            <ChevronRightIcon className="w-6 h-6 text-[#DB3986]" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TeamMembers;
