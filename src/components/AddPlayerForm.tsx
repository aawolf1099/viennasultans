"use client";

import { useState } from "react";
import { useFirebase } from "@/lib/firebase/useFirebase";

interface PlayerFormData {
  name: string;
  role: string;
  number: string;
  battingStyle: string;
  bowlingStyle: string;
  imageUrl?: string;
  stats: {
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
    wickets: number;
    overs: number;
    runsConceded: number;
    economy: number;
  };
}

interface AddPlayerFormProps {
  onAdd: () => void;
}

const AddPlayerForm = ({ }: AddPlayerFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addDocument } = useFirebase();
  const [formData, setFormData] = useState<PlayerFormData>({
    name: "",
    role: "",
    number: "",
    battingStyle: "",
    bowlingStyle: "",
    stats: {
      matches: 0,
      innings: 0,
      notOuts: 0,
      runs: 0,
      highestScore: 0,
      average: 0,
      ballsFaced: 0,
      strikeRate: 0,
      hundreds: 0,
      fifties: 0,
      fours: 0,
      sixes: 0,
      wickets: 0,
      overs: 0,
      runsConceded: 0,
      economy: 0,
    },
  });

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    let newFormData = { ...formData };

    if (name.startsWith("stats.")) {
      const statField = name.split(".")[1];
      newFormData = {
        ...newFormData,
        stats: {
          ...newFormData.stats,
          [statField]: Number(value) || 0,
        },
      };

      // Recalculate average and strike rate when relevant fields change
      if (["runs", "matches", "notOuts"].includes(statField)) {
        newFormData.stats.average = Number(
          calculateAverage(
            newFormData.stats.runs,
            newFormData.stats.matches,
            newFormData.stats.notOuts
          )
        );
      }

      if (["runs", "ballsFaced"].includes(statField)) {
        newFormData.stats.strikeRate = Number(
          calculateStrikeRate(newFormData.stats.runs, newFormData.stats.ballsFaced)
        );
      }

      // Recalculate economy rate when relevant fields change
      if (["runsConceded", "overs"].includes(statField)) {
        newFormData.stats.economy = Number(
          calculateEconomy(newFormData.stats.runsConceded, newFormData.stats.overs)
        );
      }
    } else {
      newFormData = {
        ...newFormData,
        [name]: value,
      };
    }

    setFormData(newFormData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const cleanFormData = {
        name: formData.name,
        number: formData.number,
        role: formData.role,
        battingStyle: formData.battingStyle,
        bowlingStyle: formData.bowlingStyle,
        stats: {
          matches: Number(formData.stats.matches) || 0,
          innings: Number(formData.stats.innings) || 0,
          notOuts: Number(formData.stats.notOuts) || 0,
          runs: Number(formData.stats.runs) || 0,
          highestScore: Number(formData.stats.highestScore) || 0,
          average: Number(formData.stats.average) || 0,
          ballsFaced: Number(formData.stats.ballsFaced) || 0,
          strikeRate: Number(formData.stats.strikeRate) || 0,
          hundreds: Number(formData.stats.hundreds) || 0,
          fifties: Number(formData.stats.fifties) || 0,
          fours: Number(formData.stats.fours) || 0,
          sixes: Number(formData.stats.sixes) || 0,
          wickets: Number(formData.stats.wickets) || 0,
          overs: Number(formData.stats.overs) || 0,
          runsConceded: Number(formData.stats.runsConceded) || 0,
          economy: Number(formData.stats.economy) || 0,
        },
      };

      await addDocument("players", cleanFormData);
      setIsOpen(false);
      setFormData({
        name: "",
        role: "",
        number: "",
        battingStyle: "",
        bowlingStyle: "",
        stats: {
          matches: 0,
          innings: 0,
          notOuts: 0,
          runs: 0,
          highestScore: 0,
          average: 0,
          ballsFaced: 0,
          strikeRate: 0,
          hundreds: 0,
          fifties: 0,
          fours: 0,
          sixes: 0,
          wickets: 0,
          overs: 0,
          runsConceded: 0,
          economy: 0,
        },
      });
      window.location.reload();
    } catch (error) {
      console.error("Error adding player:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {!isOpen ? (
      <button
      onClick={() => setIsOpen(true)}
      className="bg-[#00BFFF] text-white text-sm sm:text-base px-3 sm:px-6 py-1.5 sm:py-3 rounded-full shadow-lg hover:bg-[#0099CC] transition-colors whitespace-nowrap w-fit"
    >
      Add Player
    </button>
      ) : (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-[#0D0D2B] p-4 sm:p-6 rounded-lg shadow-xl w-full max-w-[800px] max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl text-white font-semibold">Add New Player</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Basic Info Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-300">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-600 bg-[#020123] text-white shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] px-4 py-2.5"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Number</label>
                  <input
                    type="number"
                    name="number"
                    value={formData.number}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-600 bg-[#020123] text-white shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] px-4 py-2.5"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-600 bg-[#020123] text-white shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] px-4 py-2.5"
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
                  <label className="block text-sm font-medium text-gray-300">Batting Style</label>
                  <select
                    name="battingStyle"
                    value={formData.battingStyle}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-600 bg-[#020123] text-white shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] px-4 py-2.5"
                    required
                  >
                    <option value="">Select Style</option>
                    <option value="Right-handed">Right-handed</option>
                    <option value="Left-handed">Left-handed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Bowling Style</label>
                  <select
                    name="bowlingStyle"
                    value={formData.bowlingStyle}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-600 bg-[#020123] text-white shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] px-4 py-2.5"
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
                <h3 className="text-lg font-medium text-white mb-4 pb-2 border-b border-gray-700">
                  Batting Statistics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300">Matches</label>
                    <input
                      type="number"
                      name="stats.matches"
                      value={formData.stats.matches}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-600 bg-[#020123] text-white shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] px-4 py-2.5"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">Innings</label>
                    <input
                      type="number"
                      name="stats.innings"
                      value={formData.stats.innings}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-600 bg-[#020123] text-white shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] px-4 py-2.5"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">Not Outs</label>
                    <input
                      type="number"
                      name="stats.notOuts"
                      value={formData.stats.notOuts}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-600 bg-[#020123] text-white shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] px-4 py-2.5"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">Runs</label>
                    <input
                      type="number"
                      name="stats.runs"
                      value={formData.stats.runs}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-600 bg-[#020123] text-white shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] px-4 py-2.5"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">Highest Score</label>
                    <input
                      type="number"
                      name="stats.highestScore"
                      value={formData.stats.highestScore}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-600 bg-[#020123] text-white shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] px-4 py-2.5"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">Balls Faced</label>
                    <input
                      type="number"
                      name="stats.ballsFaced"
                      value={formData.stats.ballsFaced}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-600 bg-[#020123] text-white shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] px-4 py-2.5"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">Average</label>
                    <input
                      type="number"
                      name="stats.average"
                      value={formData.stats.average}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-600 bg-[#020123] text-white shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] px-4 py-2.5"
                      min="0"
                      step="0.01"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">Strike Rate</label>
                    <input
                      type="number"
                      name="stats.strikeRate"
                      value={formData.stats.strikeRate}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-600 bg-[#020123] text-white shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] px-4 py-2.5"
                      min="0"
                      step="0.01"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">100s</label>
                    <input
                      type="number"
                      name="stats.hundreds"
                      value={formData.stats.hundreds}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-600 bg-[#020123] text-white shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] px-4 py-2.5"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">50s</label>
                    <input
                      type="number"
                      name="stats.fifties"
                      value={formData.stats.fifties}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-600 bg-[#020123] text-white shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] px-4 py-2.5"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">4s</label>
                    <input
                      type="number"
                      name="stats.fours"
                      value={formData.stats.fours}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-600 bg-[#020123] text-white shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] px-4 py-2.5"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">6s</label>
                    <input
                      type="number"
                      name="stats.sixes"
                      value={formData.stats.sixes}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-600 bg-[#020123] text-white shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] px-4 py-2.5"
                      min="0"
                    />
                  </div>
                </div>
              </div>

              {/* Bowling Stats Section */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-white mb-4 pb-2 border-b border-gray-700">
                  Bowling Statistics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300">Wickets</label>
                    <input
                      type="number"
                      name="stats.wickets"
                      value={formData.stats.wickets}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-600 bg-[#020123] text-white shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] px-4 py-2.5"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">Overs</label>
                    <input
                      type="number"
                      name="stats.overs"
                      value={formData.stats.overs}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-600 bg-[#020123] text-white shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] px-4 py-2.5"
                      min="0"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">Runs Conceded</label>
                    <input
                      type="number"
                      name="stats.runsConceded"
                      value={formData.stats.runsConceded}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-600 bg-[#020123] text-white shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] px-4 py-2.5"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">Economy</label>
                    <input
                      type="number"
                      name="stats.economy"
                      value={formData.stats.economy}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-600 bg-[#020123] text-white shadow-sm focus:border-[#DB3986] focus:ring-[#DB3986] px-4 py-2.5"
                      min="0"
                      step="0.01"
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#00BFFF] text-white py-2 rounded hover:bg-[#0099CC] transition-colors disabled:opacity-50"
              >
                {loading ? "Adding..." : "Add Player"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPlayerForm; 