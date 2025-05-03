'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFirebase } from '@/lib/firebase/useFirebase';

interface Player {
  id: string;  // This will be the Firestore document ID
  name: string;
  role: string;
  battingStyle: string;
  bowlingStyle: string;
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

export default function EditPlayer({ params }: { params: { id: string } }) {
  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const { user, getDocument, updateDocument } = useFirebase();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    const fetchPlayer = async () => {
      try {
        const playerData = await getDocument('players', params.id);
        if (playerData) {
          // Add the document ID to the player data
          setPlayer({ 
            id: params.id,
            name: playerData.data.name,
            role: playerData.data.role,
            battingStyle: playerData.data.battingStyle,
            bowlingStyle: playerData.data.bowlingStyle,
            imageUrl: playerData.data.imageUrl,
            stats: playerData.data.stats
          } as Player);
        } else {
          setError('Player not found');
        }
      } catch (error) {
        setError('Failed to fetch player');
        console.error('Error fetching player:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayer();
  }, [user, router, getDocument, params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!player) return;

    setSaving(true);
    setError('');

    try {
      // Use the document ID for updating
      await updateDocument('players', params.id, {
        name: player.name,
        role: player.role,
        battingStyle: player.battingStyle,
        bowlingStyle: player.bowlingStyle,
        imageUrl: player.imageUrl,
        stats: player.stats
      });
      router.push('/admin/players');
    } catch (error) {
      setError('Failed to update player');
      console.error('Error updating player:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!player) return;

    const { name, value } = e.target;
    if (name.startsWith('stats.')) {
      const statName = name.split('.')[1];
      setPlayer({
        ...player,
        stats: {
          ...player.stats,
          [statName]: Number(value)
        }
      });
    } else {
      setPlayer({
        ...player,
        [name]: value
      });
    }
  };

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

  if (!player) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">Player not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Edit Player
          </h1>
          <button
            onClick={() => router.push('/admin/players')}
            className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#DB3986]"
          >
            Back to Players
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={player.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Role
              </label>
              <select
                name="role"
                id="role"
                value={player.role}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              >
                <option value="Batsman">Batsman</option>
                <option value="Bowler">Bowler</option>
                <option value="All-rounder">All-rounder</option>
                <option value="Wicket-keeper">Wicket-keeper</option>
              </select>
            </div>

            <div>
              <label htmlFor="battingStyle" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Batting Style
              </label>
              <select
                name="battingStyle"
                id="battingStyle"
                value={player.battingStyle}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              >
                <option value="Right-handed">Right-handed</option>
                <option value="Left-handed">Left-handed</option>
              </select>
            </div>

            <div>
              <label htmlFor="bowlingStyle" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Bowling Style
              </label>
              <select
                name="bowlingStyle"
                id="bowlingStyle"
                value={player.bowlingStyle}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              >
                <option value="Right-arm fast">Right-arm fast</option>
                <option value="Right-arm medium">Right-arm medium</option>
                <option value="Right-arm off break">Right-arm off break</option>
                <option value="Left-arm orthodox">Left-arm orthodox</option>
                <option value="Left-arm fast">Left-arm fast</option>
                <option value="N/A">N/A</option>
              </select>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Batting Statistics</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div>
                <label htmlFor="stats.matches" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Matches
                </label>
                <input
                  type="number"
                  name="stats.matches"
                  id="stats.matches"
                  value={player.stats.matches}
                  onChange={handleChange}
                  min="0"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label htmlFor="stats.runs" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Runs
                </label>
                <input
                  type="number"
                  name="stats.runs"
                  id="stats.runs"
                  value={player.stats.runs}
                  onChange={handleChange}
                  min="0"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label htmlFor="stats.average" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Average
                </label>
                <input
                  type="number"
                  name="stats.average"
                  id="stats.average"
                  value={player.stats.average}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Bowling Statistics</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div>
                <label htmlFor="stats.wickets" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Wickets
                </label>
                <input
                  type="number"
                  name="stats.wickets"
                  id="stats.wickets"
                  value={player.stats.wickets}
                  onChange={handleChange}
                  min="0"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label htmlFor="stats.economy" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Economy
                </label>
                <input
                  type="number"
                  name="stats.economy"
                  id="stats.economy"
                  value={player.stats.economy}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label htmlFor="stats.strikeRate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Strike Rate
                </label>
                <input
                  type="number"
                  name="stats.strikeRate"
                  id="stats.strikeRate"
                  value={player.stats.strikeRate}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={() => router.push('/admin/players')}
              className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#DB3986]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 text-sm text-white bg-[#DB3986] rounded-md hover:bg-[#DB3986]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#DB3986] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 