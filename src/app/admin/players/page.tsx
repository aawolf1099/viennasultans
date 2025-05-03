"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFirebase } from "@/lib/firebase/useFirebase";

interface Player {
  id: string;
  name: string;
  role: string;
  battingStyle: string;
  bowlingStyle: string;
  age: number;
  imageUrl?: string;
  stats: {
    matches: number;
    runs: number;
    wickets: number;
    average: number;
    economy: number;
    strikeRate: number;
  };
}

export default function PlayersList() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const { user, getCollection } = useFirebase();

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    const fetchPlayers = async () => {
      try {
        const playersData = await getCollection("players");
        // Sort players by ID
        // const sortedPlayers = (playersData as unknown as Player[]).sort((a, b) => a.id.localeCompare(b.id));
        const sortedPlayers = (playersData as unknown as Player[]).sort(
          (a, b) => Number(a.id) - Number(b.id)
        );
        setPlayers(sortedPlayers);
      } catch (error) {
        setError("Failed to fetch players");
        console.error("Error fetching players:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [user, router, getCollection]);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Player Management
          </h1>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Player Info
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Style
                  </th>
                  <th
                    scope="col"
                    colSpan={3}
                    className="px-6 py-3 text-center text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider bg-blue-50 dark:bg-blue-900/20"
                  >
                    Batting Stats
                  </th>
                  <th
                    scope="col"
                    colSpan={3}
                    className="px-6 py-3 text-center text-xs font-medium text-green-600 dark:text-green-400 uppercase tracking-wider bg-green-50 dark:bg-green-900/20"
                  >
                    Bowling Stats
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Name & Role
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Batting/Bowling
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider bg-blue-50 dark:bg-blue-900/20"
                  >
                    Matches
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider bg-blue-50 dark:bg-blue-900/20"
                  >
                    Runs
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider bg-blue-50 dark:bg-blue-900/20"
                  >
                    Average
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-green-600 dark:text-green-400 uppercase tracking-wider bg-green-50 dark:bg-green-900/20"
                  >
                    Wickets
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-green-600 dark:text-green-400 uppercase tracking-wider bg-green-50 dark:bg-green-900/20"
                  >
                    Economy
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-green-600 dark:text-green-400 uppercase tracking-wider bg-green-50 dark:bg-green-900/20"
                  >
                    Strike Rate
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {players.map((player) => (
                  <tr
                    key={player.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {player.imageUrl && (
                          <img
                            src={player.imageUrl}
                            alt={player.name}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        )}
                        <div>
                          <div
                            onClick={() => console.log('player', player)}
                            className="text-sm font-medium text-gray-900 dark:text-white"
                          >
                            {player.id}. {player.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {player.role}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        <div>{player.battingStyle}</div>
                        <div className="text-gray-500 dark:text-gray-400">
                          {player.bowlingStyle}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap bg-blue-50 dark:bg-blue-900/20">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {player.stats.matches || 0}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap bg-blue-50 dark:bg-blue-900/20">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {player.stats.runs || 0}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap bg-blue-50 dark:bg-blue-900/20">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {player.stats.average || 0}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap bg-green-50 dark:bg-green-900/20">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {player.stats.wickets || 0}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap bg-green-50 dark:bg-green-900/20">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {player.stats.economy || 0}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap bg-green-50 dark:bg-green-900/20">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {player.stats.strikeRate || 0}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() =>
                          router.push(`/admin/players/${player.id}/edit`)
                        }
                        className="text-[#DB3986] hover:text-[#DB3986]/90 mr-4"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
