'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFirebase } from '@/lib/firebase/useFirebase';

interface Player {
  id: string;
  name: string;
  role: string;
  battingStyle: string;
  bowlingStyle: string;
  age: number;
  imageUrl?: string;
}

export default function PlayerForm({ params }: { params: { action: string } }) {
  const [player, setPlayer] = useState<Partial<Player>>({
    name: '',
    role: '',
    battingStyle: '',
    bowlingStyle: '',
    age: 0,
    imageUrl: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { user, getDocument, addDocument, updateDocument } = useFirebase();
  const isEdit = params.action !== 'new';

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (isEdit) {
      const fetchPlayer = async () => {
        try {
          const playerData = await getDocument('players', params.action);
          if (playerData) {
            setPlayer(playerData as unknown as Player);
          }
        } catch (error) {
          setError('Failed to fetch player data');
          console.error('Error fetching player:', error);
        }
      };
      fetchPlayer();
    }
  }, [user, router, getDocument, isEdit, params.action]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isEdit) {
        await updateDocument('players', params.action, player);
      } else {
        await addDocument('players', player);
      }
      router.push('/admin');
    } catch (error) {
      setError('Failed to save player');
      console.error('Error saving player:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          {isEdit ? 'Edit Player' : 'Add New Player'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={player.name}
              onChange={(e) => setPlayer({ ...player, name: e.target.value })}
              required
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] dark:bg-gray-800 dark:text-white sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Role
            </label>
            <input
              type="text"
              id="role"
              value={player.role}
              onChange={(e) => setPlayer({ ...player, role: e.target.value })}
              required
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] dark:bg-gray-800 dark:text-white sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="battingStyle" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Batting Style
            </label>
            <input
              type="text"
              id="battingStyle"
              value={player.battingStyle}
              onChange={(e) => setPlayer({ ...player, battingStyle: e.target.value })}
              required
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] dark:bg-gray-800 dark:text-white sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="bowlingStyle" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Bowling Style
            </label>
            <input
              type="text"
              id="bowlingStyle"
              value={player.bowlingStyle}
              onChange={(e) => setPlayer({ ...player, bowlingStyle: e.target.value })}
              required
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] dark:bg-gray-800 dark:text-white sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Age
            </label>
            <input
              type="number"
              id="age"
              value={player.age}
              onChange={(e) => setPlayer({ ...player, age: parseInt(e.target.value) })}
              required
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] dark:bg-gray-800 dark:text-white sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Image URL
            </label>
            <input
              type="url"
              id="imageUrl"
              value={player.imageUrl}
              onChange={(e) => setPlayer({ ...player, imageUrl: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] dark:bg-gray-800 dark:text-white sm:text-sm"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push('/admin')}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#DB3986]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-[#DB3986] rounded-md hover:bg-[#DB3986]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#DB3986] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : isEdit ? 'Update Player' : 'Add Player'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 