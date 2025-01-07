import { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { LuSearch, LuLoader } from 'react-icons/lu';
import toast from 'react-hot-toast';
import { saveWorkout } from '../lib/workouts';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const WGER_BASE_URL = 'https://wger.de';

export interface ExerciseSuggestion {
  value: string;
  data: {
    id: number;
    base_id: number;
    name: string;
    category: string;
    image: string;
    image_thumbnail: string;
  };
}

export interface ApiResponse {
  suggestions: ExerciseSuggestion[];
}

export default function Workouts() {
  const [searchTerm, setSearchTerm] = useState('');
  const authContext = useAuth();
  const user = authContext ? authContext.user : null;
  const navigate = useNavigate();

  const { data: exercises, isLoading } = useQuery<ApiResponse>(
    ['exercises', searchTerm],
    async () => {
      if (!searchTerm) {
        return { suggestions: [] };
      }

      const response = await axios.get('https://wger.de/api/v2/exercise/search/', {
        params: {
          term: searchTerm,
          language: 2,
        },
      });
      return response.data;
    },
    {
      enabled: Boolean(searchTerm),
      staleTime: 1000 * 60 * 5,
      retry: false,
    }
  );

  const handleSaveWorkout = async (exercise: ExerciseSuggestion['data']) => {
    if (!user) {
      toast.error('Please sign in to save workouts');
      navigate('/auth');
      return;
    }

    try {
      const workout = {
        ...exercise,
        category: { name: exercise.category },
      };
      const { error } = await saveWorkout(workout);
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
            className="w-full px-4 py-2 pl-10 border bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
          {exercises?.suggestions.map((exercise: ExerciseSuggestion) => (
            <div key={exercise.data.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div className="flex flex-1 gap-4">
                  {exercise.data.image && (
                    <img
                      src={`${WGER_BASE_URL}${exercise.data.image}`}
                      alt={exercise.value}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{exercise.value}</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 px-2 py-1 rounded text-sm">
                        {exercise.data.category}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleSaveWorkout(exercise.data)}
                  className="bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-700 dark:hover:bg-indigo-600 w-full md:w-auto"
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