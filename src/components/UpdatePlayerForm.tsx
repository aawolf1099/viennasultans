import { useState } from 'react';
import { useFirebase } from '@/lib/firebase/useFirebase';

interface Player {
  id: string;
  number: string;
  name: string;
  role: string;
  battingStyle: string;
  bowlingStyle: string;
  imageUrl?: string;
  stats: {
    // Batting Stats
    matches: number;
    innings: number;
    notOuts: number;
    runs: number;
    highestScore: number;
    average: number;
    ballsFaced: number;
    strikeRate: number;
    hundreds: number;
    fifties: number;
    fours: number;
    sixes: number;
    // Bowling Stats
    wickets: number;
    overs: number;
    runsConceded: number;
    economy: number;
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

  // Calculate batting average
  const calculateAverage = (runs: number, matches: number, notOuts: number) => {
    const outs = matches - notOuts;
    return outs > 0 ? (runs / outs).toFixed(2) : '0.00';
  };

  // Calculate strike rate
  const calculateStrikeRate = (runs: number, ballsFaced: number) => {
    return ballsFaced > 0 ? ((runs / ballsFaced) * 100).toFixed(2) : '0.00';
  };

  // Calculate economy rate
  const calculateEconomy = (runsConceded: number, overs: number) => {
    return overs > 0 ? (runsConceded / overs).toFixed(2) : '0.00';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let newFormData = { ...formData };

    if (name.startsWith('stats.')) {
      const statField = name.split('.')[1];
      newFormData = {
        ...newFormData,
        stats: {
          ...newFormData.stats,
          [statField]: Number(value) || 0
        }
      };

      // Recalculate average and strike rate when relevant fields change
      if (['runs', 'matches', 'notOuts'].includes(statField)) {
        newFormData.stats.average = Number(calculateAverage(
          newFormData.stats.runs,
          newFormData.stats.matches,
          newFormData.stats.notOuts
        ));
      }

      if (['runs', 'ballsFaced'].includes(statField)) {
        newFormData.stats.strikeRate = Number(calculateStrikeRate(
          newFormData.stats.runs,
          newFormData.stats.ballsFaced
        ));
      }

      // Recalculate economy rate when relevant fields change
      if (['runsConceded', 'overs'].includes(statField)) {
        newFormData.stats.economy = Number(calculateEconomy(
          newFormData.stats.runsConceded,
          newFormData.stats.overs
        ));
      }
    } else {
      newFormData = {
        ...newFormData,
        [name]: value
      };
    }

    setFormData(newFormData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { ...updateData } = formData;
   
      
      // Ensure stats is properly structured with calculated values
      const cleanUpdateData = {
        name: updateData.name,
        number: updateData.number,
        role: updateData.role,
        battingStyle: updateData.battingStyle,
        bowlingStyle: updateData.bowlingStyle,
        imageUrl: updateData.imageUrl ? updateData.imageUrl : '',
        stats: {
          // Batting Stats
          matches: Number(updateData.stats.matches) || 0,
          innings: Number(updateData.stats.innings) || 0,
          notOuts: Number(updateData.stats.notOuts) || 0,
          runs: Number(updateData.stats.runs) || 0,
          highestScore: Number(updateData.stats.highestScore) || 0,
          average: Number(updateData.stats.average) || 0,
          ballsFaced: Number(updateData.stats.ballsFaced) || 0,
          strikeRate: Number(updateData.stats.strikeRate) || 0,
          hundreds: Number(updateData.stats.hundreds) || 0,
          fifties: Number(updateData.stats.fifties) || 0,
          fours: Number(updateData.stats.fours) || 0,
          sixes: Number(updateData.stats.sixes) || 0,
          // Bowling Stats
          wickets: Number(updateData.stats.wickets) || 0,
          overs: Number(updateData.stats.overs) || 0,
          runsConceded: Number(updateData.stats.runsConceded) || 0,
          economy: Number(updateData.stats.economy) || 0
        }
      };
      
      console.log('Clean update data:', cleanUpdateData);
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
        <form onSubmit={handleSubmit} className="space-y-4 pb-20">
          {/* Basic Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] dark:bg-gray-800 dark:border-gray-600 px-4 py-2.5"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] dark:bg-gray-800 dark:border-gray-600 px-4 py-2.5"
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] dark:bg-gray-800 dark:border-gray-600 px-4 py-2.5"
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] dark:bg-gray-800 dark:border-gray-600 px-4 py-2.5"
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
          </div>

          {/* Batting Stats Section */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">Batting Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Matches</label>
                <input
                  type="number"
                  name="stats.matches"
                  value={formData.stats.matches}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] dark:bg-gray-800 dark:border-gray-600 px-4 py-2.5"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Innings</label>
                <input
                  type="number"
                  name="stats.innings"
                  value={formData.stats.innings}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] dark:bg-gray-800 dark:border-gray-600 px-4 py-2.5"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Not Outs</label>
                <input
                  type="number"
                  name="stats.notOuts"
                  value={formData.stats.notOuts}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] dark:bg-gray-800 dark:border-gray-600 px-4 py-2.5"
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] dark:bg-gray-800 dark:border-gray-600 px-4 py-2.5"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Highest Score</label>
                <input
                  type="number"
                  name="stats.highestScore"
                  value={formData.stats.highestScore}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] dark:bg-gray-800 dark:border-gray-600 px-4 py-2.5"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Average</label>
                <input
                  type="number"
                  name="stats.average"
                  value={formData.stats.average}
                  readOnly
                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm dark:bg-gray-700 dark:border-gray-600 px-4 py-2.5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Balls Faced</label>
                <input
                  type="number"
                  name="stats.ballsFaced"
                  value={formData.stats.ballsFaced}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] dark:bg-gray-800 dark:border-gray-600 px-4 py-2.5"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Strike Rate</label>
                <input
                  type="number"
                  name="stats.strikeRate"
                  value={formData.stats.strikeRate}
                  readOnly
                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm dark:bg-gray-700 dark:border-gray-600 px-4 py-2.5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Hundreds</label>
                <input
                  type="number"
                  name="stats.hundreds"
                  value={formData.stats.hundreds}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] dark:bg-gray-800 dark:border-gray-600 px-4 py-2.5"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Fifties</label>
                <input
                  type="number"
                  name="stats.fifties"
                  value={formData.stats.fifties}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] dark:bg-gray-800 dark:border-gray-600 px-4 py-2.5"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Fours</label>
                <input
                  type="number"
                  name="stats.fours"
                  value={formData.stats.fours}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] dark:bg-gray-800 dark:border-gray-600 px-4 py-2.5"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Sixes</label>
                <input
                  type="number"
                  name="stats.sixes"
                  value={formData.stats.sixes}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] dark:bg-gray-800 dark:border-gray-600 px-4 py-2.5"
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Bowling Stats Section */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">Bowling Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Wickets</label>
                <input
                  type="number"
                  name="stats.wickets"
                  value={formData.stats.wickets}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] dark:bg-gray-800 dark:border-gray-600 px-4 py-2.5"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Overs</label>
                <input
                  type="number"
                  name="stats.overs"
                  value={formData.stats.overs}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] dark:bg-gray-800 dark:border-gray-600 px-4 py-2.5"
                  min="0"
                  step="0.1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Runs Conceded</label>
                <input
                  type="number"
                  name="stats.runsConceded"
                  value={formData.stats.runsConceded}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] dark:bg-gray-800 dark:border-gray-600 px-4 py-2.5"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Economy</label>
                <input
                  type="number"
                  name="stats.economy"
                  value={formData.stats.economy}
                  readOnly
                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm dark:bg-gray-700 dark:border-gray-600 px-4 py-2.5"
                />
              </div>
            </div>
          </div>

          {/* Fixed position buttons */}
          <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 shadow-lg z-10">
            <div className="max-w-[95%] mx-auto flex justify-end space-x-4">
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
          </div>
        </form>
      </td>
    </tr>
  );
} 