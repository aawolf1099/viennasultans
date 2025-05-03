"use client";

import { motion } from "framer-motion";

interface Match {
  id: number;
  date: string;
  time: string;
  venue: string;
  opponent: string;
  type: string;
  result?: string;
}

const matches: Match[] = [
  // Recent Matches
  { id: 1, date: "2025-04-20", time: "10:00", venue: "Vienna Cricket Ground", opponent: "Velden Cricket Club", type: "Summer Series Match", result: "won by 3 wickets" },
  { id: 2, date: "2025-04-22", time: "14:30", venue: "Velden Cricket Ground", opponent: "Salzburg Strikers", type: "Summer Series Match", result: "draw" },
  { id: 3, date: "2025-04-24", time: "12:00", venue: "Innsbruck Oval", opponent: "Innsbruck Invincibles", type: "Summer Series Match", result: "won by 20 runs" },
  // Upcoming Matches
  { id: 4, date: "2025-05-10", time: "10:00", venue: "Velden Cricket Ground", opponent: "Velden Cricket Club", type: "Summer Series Match" },
  { id: 5, date: "2025-05-12", time: "15:30", venue: "Vienna Cricket Ground", opponent: "Salzburg Strikers", type: "League Match" },
  { id: 6, date: "2025-05-18", time: "13:00", venue: "Innsbruck Oval", opponent: "Innsbruck Invincibles", type: "Friendly" },
];

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const Matches = () => (
  <section id="matches" className="py-16 bg-[#020123] overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-[#00BFFF]">Matches</h2>
        <p className="mt-2 text-gray-300 max-w-lg mx-auto">
          Past results and upcoming fixtures all in one place.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {matches
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .map((match) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-[#0D0D2B] border-l-4 border-[#00BFFF] rounded-2xl shadow-lg p-6 text-white"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#00BFFF]/20 rounded-full flex items-center justify-center text-[#00BFFF] font-bold mr-4">
                    VS
                  </div>
                  <span className="text-xl font-semibold">{match.opponent}</span>
                </div>
                {match.result ? (
                  <span className="text-sm text-[#DB3986] font-semibold uppercase">Result</span>
                ) : (
                  <span className="text-sm text-[#009cd4] font-semibold uppercase">Upcoming</span>
                )}
              </div>

              <div className="space-y-1 text-gray-300 mb-2">
                <p>
                  <span className="font-semibold text-[#00BFFF]">Date:</span> {formatDate(match.date)}
                </p>
                <p>
                  <span className="font-semibold text-[#00BFFF]">Time:</span> {match.time}
                </p>
                <p>
                  <span className="font-semibold text-[#00BFFF]">Venue:</span> {match.venue}
                </p>
                <p>
                  <span className="font-semibold text-[#00BFFF]">Type:</span> {match.type}
                </p>
              </div>

              {match.result && (
                <p className="mt-2 text-[#DB3986] font-semibold">Result: {match.result}</p>
              )}
            </motion.div>
          ))}
      </div>
    </div>
  </section>
);

export default Matches;
