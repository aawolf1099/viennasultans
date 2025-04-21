"use client";

import { motion } from "framer-motion";

interface Match {
  id: number;
  date: string;
  time: string;
  venue: string;
  opponent: string;
  type: string;
}

const upcomingMatches: Match[] = [
  {
    id: 1,
    date: "2025-04-26",
    time: "10:00",
    venue: "Velden Cricket Ground",
    opponent: "Velden Cricket Club",
    type: "Summer Series Match",
  },
  {
    id: 2,
    date: "2025-04-27",
    time: "10:00",
    venue: "Velden Cricket Ground",
    opponent: "Velden Cricket Club",
    type: "Summer Series Match",
  },
  {
    id: 3,
    date: "2024-04-29",
    time: "15:30",
    venue: "Vienna Cricket Ground",
    opponent: "Salzburg Strikers",
    type: "League Match",
  },
  {
    id: 4,
    date: "2024-05-06",
    time: "13:00",
    venue: "Innsbruck Oval",
    opponent: "Innsbruck Invincibles",
    type: "Friendly",
  },
];

const UpcomingMatches = () => {
  return (
    <section id="matches" className="py-20 bg-[#020123] dark:bg-[#020123]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-left text-[#009cd4] mb-8">
            Upcoming Matches
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {upcomingMatches.map((match) => (
              <motion.div
                key={match.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-[#020123]/80 rounded-lg shadow-lg p-6 border border-[#DB3986]/20 dark:border-[#009cd4]/20"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-[#DB3986] rounded-full flex items-center justify-center mr-4">
                      <span className="text-xs text-white">VS</span>
                    </div>
                    <span className="text-lg font-semibold text-[#DB3986] dark:text-white">
                      {match.opponent}
                    </span>
                  </div>
                  <span className="text-[#020123] dark:text-[#009cd4]">
                    {match.type}
                  </span>
                </div>
                <div className="text-[#020123] dark:text-gray-400">
                  <p>
                    Date:{" "}
                    {
                      new Date(match.date)
                        .toISOString() // "2025-04-21T14:30:00.000Z"
                        .split("T")[0] // "2025-04-21"
                    }
                  </p>
                  <p>Time: {match.time}</p>
                  <p>Venue: {match.venue}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UpcomingMatches;
