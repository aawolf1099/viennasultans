import { useState } from 'react';
import { useFirebase } from '@/lib/firebase/useFirebase';

interface Player {
  id: string;
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

interface UpdatePlayerFormProps {
  player: Player;
  onCancel: () => void;
  onUpdate: () => void;
}

export default function UpdatePlayerForm({ player, onCancel, onUpdate }: UpdatePlayerFormProps) {
  const [formData, setFormData] = useState<Player>(player);
  const [loading, setLoading] = useState(false);
  const { updateDocument } = useFirebase();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('stats.')) {
      const statField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        stats: {
          ...prev.stats,
          [statField]: Number(value)
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Create a clean data object without the id field
      const { ...updateData } = formData;
      console.log('Form data before update:', formData);
      console.log('Update data:', updateData);
      console.log('Document ID:', player.id, typeof player.id);
      
      // Ensure stats is properly structured
      const cleanUpdateData = {
        name: updateData.name,
        role: updateData.role,
        battingStyle: updateData.battingStyle,
        bowlingStyle: updateData.bowlingStyle,
        imageUrl: updateData.imageUrl ? updateData.imageUrl : '',
        stats: {
          matches: Number(updateData.stats.matches) || 0,
          runs: Number(updateData.stats.runs) || 0,
          wickets: Number(updateData.stats.wickets) || 0,
          average: Number(updateData.stats.average) || 0,
          economy: Number(updateData.stats.economy) || 0,
          strikeRate: Number(updateData.stats.strikeRate) || 0
        }
      };
      
      console.log('Clean update data:', cleanUpdateData);
      // Ensure document ID is a string
      const docId = String(player.id);
      console.log('Using document ID:', docId, typeof docId);
      await updateDocument('players', docId, cleanUpdateData);
      onUpdate();
    } catch (error) {
      console.error('Error updating player:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr className="bg-gray-50 dark:bg-gray-700/50">
      <td colSpan={9} className="px-6 py-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] dark:bg-gray-800 dark:border-gray-600"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] dark:bg-gray-800 dark:border-gray-600"
                required
              >
                <option value="">Select Role</option>
                <option value="Batsman">Batsman</option>
                <option value="Bowler">Bowler</option>
                <option value="All-rounder">All-rounder</option>
                <option value="Wicket-keeper">Wicket-keeper</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Batting Style</label>
              <select
                name="battingStyle"
                value={formData.battingStyle}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] dark:bg-gray-800 dark:border-gray-600"
                required
              >
                <option value="">Select Style</option>
                <option value="Right-handed">Right-handed</option>
                <option value="Left-handed">Left-handed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bowling Style</label>
              <select
                name="bowlingStyle"
                value={formData.bowlingStyle}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] dark:bg-gray-800 dark:border-gray-600"
                required
              >
                <option value="">Select Style</option>
                <option value="Right-arm fast">Right-arm fast</option>
                <option value="Right-arm medium">Right-arm medium</option>
                <option value="Right-arm off-spin">Right-arm off-spin</option>
                <option value="Right-arm leg-spin">Right-arm leg-spin</option>
                <option value="Left-arm fast">Left-arm fast</option>
                <option value="Left-arm medium">Left-arm medium</option>
                <option value="Left-arm orthodox">Left-arm orthodox</option>
                <option value="Left-arm wrist-spin">Left-arm wrist-spin</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Matches</label>
              <input
                type="number"
                name="stats.matches"
                value={formData.stats.matches}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] dark:bg-gray-800 dark:border-gray-600"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Runs</label>
              <input
                type="number"
                name="stats.runs"
                value={formData.stats.runs}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] dark:bg-gray-800 dark:border-gray-600"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Wickets</label>
              <input
                type="number"
                name="stats.wickets"
                value={formData.stats.wickets}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] dark:bg-gray-800 dark:border-gray-600"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Average</label>
              <input
                type="number"
                name="stats.average"
                value={formData.stats.average}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] dark:bg-gray-800 dark:border-gray-600"
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Economy</label>
              <input
                type="number"
                name="stats.economy"
                value={formData.stats.economy}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] dark:bg-gray-800 dark:border-gray-600"
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Strike Rate</label>
              <input
                type="number"
                name="stats.strikeRate"
                value={formData.stats.strikeRate}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] dark:bg-gray-800 dark:border-gray-600"
                min="0"
                step="0.01"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-4 mt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#DB3986] dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-[#DB3986] border border-transparent rounded-md hover:bg-[#DB3986]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#DB3986] disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Player'}
            </button>
          </div>
        </form>
      </td>
    </tr>
  );
} 