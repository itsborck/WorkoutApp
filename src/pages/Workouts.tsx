import { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { LuSearch, LuLoader } from 'react-icons/lu';
import toast from 'react-hot-toast';
import { saveWorkout } from '../lib/workouts';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Workouts() {
  const [searchTerm, setSearchTerm] = useState('');
  const authContext = useAuth();
  const user = authContext ? authContext.user : null;
  const navigate = useNavigate();

  const { data: exercises, isLoading } = useQuery(
    ['exercises', searchTerm],
    async () => {
      const response = await axios.get('https://wger.de/api/v2/exercisebaseinfo/', {
        params: {
          language: 2,
          limit: 20,
          ...(searchTerm && { name: searchTerm }),
        },
      });
      return response.data.results;
    }
  );

  const handleSaveWorkout = async (exercise: any) => {
    if (!user) {
      toast.error('Please sign in to save workouts');
      navigate('/auth');
      return;
    }

    try {
      const { error } = await saveWorkout(exercise);
      if (error) throw error;
      toast.success('Workout saved successfully!');
    } catch (error) {
      console.error('Error saving workout:', error);
      toast.error('Failed to save workout');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search exercises..."
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <LuSearch className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center">
          <LuLoader className="h-8 w-8 animate-spin text-indigo-600" />
        </div>
      ) : (
        <div className="grid gap-6">
          {exercises?.map((exercise: { id: number; name: string; description: string; muscles: { id: number; name: string; }[]; }) => (
            <div key={exercise.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{exercise.name}</h3>
                  <p className="text-gray-600 mb-4">{exercise.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {exercise.muscles.map((muscle) => (
                      <span
                        key={muscle.id}
                        className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-sm"
                      >
                        {muscle.name}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => handleSaveWorkout(exercise)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 w-full md:w-auto"
                >
                  Save
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}