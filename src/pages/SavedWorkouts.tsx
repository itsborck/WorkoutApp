import { useQuery } from 'react-query';
import { LuLoader, LuTrash2 } from 'react-icons/lu';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';

export default function SavedWorkouts() {
  const { data: savedWorkouts, isLoading, refetch } = useQuery('savedWorkouts', async () => {
    const { data, error } = await supabase
      .from('saved_workouts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  });

  const deleteWorkout = async (id: string | number) => {
    try {
      const { error } = await supabase
        .from('saved_workouts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Workout deleted successfully!');
      refetch();
    } catch (error) {
      console.error('Error deleting workout:', error);
      toast.error('Failed to delete workout');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <LuLoader className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">Saved Workouts</h1>
      {savedWorkouts?.length === 0 ? (
        <p className="text-center text-gray-600">No saved workouts yet.</p>
      ) : (
        <div className="grid gap-6">
          {savedWorkouts?.map((workout) => (
            <div key={workout.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{workout.name}</h3>
                  <p className="text-gray-600 mb-4">{workout.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-sm">
                      {workout.category}
                    </span>
                    {workout.muscles && (
                      <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-sm">
                        {workout.muscles}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => deleteWorkout(workout.id)}
                  className="text-red-600 hover:text-red-800 p-2"
                >
                  <LuTrash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}