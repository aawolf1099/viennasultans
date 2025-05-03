"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  stats: { matches: number; runs: number; wickets: number };
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
    image: "/images/asad.jpg",
    stats: { matches: 45, runs: 1800, wickets: 80 },
  },
  {
    id: 5,
    name: "Abdul Moid",
    role: "All Rounder",
    image: "/images/moid.jpg",
    stats: { matches: 43, runs: 1400, wickets: 90 },
  },
  {
    id: 6,
    name: "Zubair Khan",
    role: "Wicket Keeper Batsman",
    image: "/images/zubi.jpg",
    stats: { matches: 32, runs: 1000, wickets: 0 },
  },
  {
    id: 7,
    name: "Ghulam Muhammad",
    role: "Right Hand Batsman",
    image: "/images/gm.jpg",
    stats: { matches: 32, runs: 1000, wickets: 0 },
  },
  {
    id: 8,
    name: "Samandar Khan",
    role: "Right Arm Fast Bowler",
    image: "/images/samandar.jpg",
    stats: { matches: 32, runs: 1000, wickets: 0 },
  },
  {
    id: 9,
    name: "Adal Bakhteyar",
    role: "Right Arm Fast Bowler",
    image: "/images/adal.jpg",
    stats: { matches: 32, runs: 1000, wickets: 0 },
  },
  {
    id: 10,
    name: "Farasat Ali",
    role: "Right Hand Batsman",
    image: "/images/farasat.jpg",
    stats: { matches: 32, runs: 1000, wickets: 0 },
  },
];

const TeamMembers = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [visibleCount, setVisibleCount] = useState(5);

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

  // Duplicate items to create an infinite scroll effect
  const loopMembers = [...teamMembers, ...teamMembers];

  return (
    <section className="py-16 px-4 bg-[#020123] overflow-hidden">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-[#00BFFF] mb-12">
        Meet Our Team
      </h2>

      {/* Centered container */}
      <div className="relative max-w-7xl mx-auto overflow-hidden">
        <motion.div
          className="flex space-x-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
        >
          {loopMembers.map((member, idx) => (
            <div
              key={`team-member-${idx}`}
              className="flex-shrink-0 w-64 bg-[#0D0D2B] border-l-4 border-[#00BFFF] rounded-2xl overflow-hidden shadow-lg"
            >
              <div className="relative h-64">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl text-white font-semibold mb-1">
                  {member.name}
                </h3>
                <p className="text-gray-300 mb-4">{member.role}</p>
                <div className="space-y-1">
                  <p className="text-sm text-gray-400">
                    Matches: {member.stats.matches}
                  </p>
                  <p className="text-sm text-gray-400">
                    Runs: {member.stats.runs}
                  </p>
                  <p className="text-sm text-gray-400">
                    Wickets: {member.stats.wickets}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TeamMembers;
