"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useFirebase } from "@/lib/firebase/useFirebase";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl?: string;
  number: string;
  notes?: string;
  stats: {
    matches: number;
    runs: number;
    wickets: number;
    average: number;
    strikeRate: number;
    economy: number;
    fifties: number;
    hundreds: number;
  };
}

const TeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { getCollection } = useFirebase();

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const playersData = await getCollection("players");
        const mappedPlayers = playersData.map((doc) => ({
          id: doc.id,
          name: doc.name || "",
          role: doc.role || "",
          imageUrl: doc.imageUrl,
          number: doc.number || "",
          notes: doc.notes || "",
          stats: {
            matches: doc.stats?.matches || 0,
            runs: doc.stats?.runs || 0,
            wickets: doc.stats?.wickets || 0,
            average: doc.stats?.average || 0,
            strikeRate: doc.stats?.strikeRate || 0,
            economy: doc.stats?.economy || 0,
            fifties: doc.stats?.fifties || 0,
            hundreds: doc.stats?.hundreds || 0,
          },
        }));

        // Sort players by number
        const sortedPlayers = mappedPlayers.sort(
          (a, b) => Number(a.number) - Number(b.number)
        );
        setTeamMembers(sortedPlayers);
      } catch (error) {
        setError("Failed to fetch players");
        console.error("Error fetching players:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [getCollection]);

  if (loading) {
    return (
      <section className="py-16 px-4 bg-[#020123]">
        <div className="text-center text-[#00BFFF]">
          Loading team members...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-4 bg-[#020123]">
        <div className="text-center text-red-500">{error}</div>
      </section>
    );
  }

  // Duplicate items to create an infinite scroll effect
  const loopMembers = [...teamMembers, ...teamMembers];

  return (
    <section id="team" className="py-16 px-4 bg-[#020123] overflow-hidden">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-[#00BFFF] mb-12">
        Meet Our Team
      </h2>

      {/* Centered container */}
      <div className="relative max-w-7xl mx-auto">
        <div className="overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <motion.div
            className="flex space-x-6 min-w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 40, repeat: Infinity }}
          >
            {loopMembers.map((member, idx) => (
              <div
                key={`team-member-${idx}`}
                className="flex-shrink-0 w-64 bg-[#0D0D2B] border-l-4 border-[#00BFFF] rounded-2xl overflow-hidden shadow-lg"
              >
                <div className="relative h-64">
                  <Image
                    src={member.imageUrl || `/team/${member.number}.jpg`}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 text-left ">
                  <h3 className="text-xl text-white font-semibold mb-1">
                    {member.name}
                    {member.notes && (
                      <span className="text-sm font-normal text-gray-300">
                        {" "}
                        ({member.notes})
                      </span>
                    )}
                  </h3>
                  <p className="text-gray-300 mb-4">{member.role}</p>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                    <p className="text-sm text-gray-400">
                      Matches: {member.stats.matches}
                    </p>
                    <p className="text-sm text-gray-400">
                      Runs: {member.stats.runs}
                    </p>
                    <p className="text-sm text-gray-400">
                      Wickets: {member.stats.wickets}
                    </p>
                    <p className="text-sm text-gray-400">
                      Avg: {member.stats.average.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-400">
                      SR: {member.stats.strikeRate.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-400">
                      50s/100s: {member.stats.fifties}/{member.stats.hundreds}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TeamMembers;
