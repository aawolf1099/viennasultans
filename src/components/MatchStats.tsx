'use client';

import { motion } from 'framer-motion';

interface Match {
  id: number;
  date: string;
  opponent: string;
  result: string;
  score: string;
  venue: string;
}

const recentMatches: Match[] = [
  {
    id: 1,
    date: '2024-04-15',
    opponent: 'Vienna Eagles',
    result: 'Won',
    score: '245/6 - 210/8',
    venue: 'Vienna Cricket Ground',
  },
  {
    id: 2,
    date: '2024-04-08',
    opponent: 'Graz Lions',
    result: 'Lost',
    score: '180/9 - 185/5',
    venue: 'Graz Cricket Ground',
  },
  {
    id: 3,
    date: '2024-04-01',
    opponent: 'Salzburg Tigers',
    result: 'Won',
    score: '220/4 - 215/7',
    venue: 'Vienna Cricket Ground',
  },
];

const MatchStats = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          Match Statistics
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Matches Table */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <h3 className="text-xl font-bold mb-6">Recent Matches</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Opponent</th>
                    <th className="text-left py-3 px-4">Result</th>
                    <th className="text-left py-3 px-4">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {recentMatches.map((match) => (
                    <motion.tr
                      key={match.id}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      viewport={{ once: true }}
                      className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="py-3 px-4">{match.date}</td>
                      <td className="py-3 px-4">{match.opponent}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-sm ${
                            match.result === 'Won'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          }`}
                        >
                          {match.result}
                        </span>
                      </td>
                      <td className="py-3 px-4">{match.score}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Team Statistics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <h3 className="text-xl font-bold mb-6">Team Performance</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 dark:text-gray-300">Win Rate</span>
                  <span className="font-bold">65%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '65%' }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="bg-green-600 h-2.5 rounded-full"
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 dark:text-gray-300">Average Score</span>
                  <span className="font-bold">215</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '72%' }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="bg-blue-600 h-2.5 rounded-full"
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 dark:text-gray-300">Wickets Taken</span>
                  <span className="font-bold">85</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '85%' }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="bg-purple-600 h-2.5 rounded-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MatchStats; 