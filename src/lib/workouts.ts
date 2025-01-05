import { supabase } from "./supabase";

interface Workout {
  name?: string;
  description?: string;
  category?: { name: string };
  muscles?: { name: string }[];
}

export async function saveWorkout(workout: Workout) {
  try {
    const { data, error } = await supabase.from("saved_workouts").insert([
      {
        name: workout.name || "Untitled Workout", // Provide default name if not present
        description: workout.description,
        category: workout.category?.name,
        muscles: workout.muscles?.map((m) => m.name).join(", "),
        user_id: (await supabase.auth.getUser()).data.user?.id,
      },
    ]);

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function getSavedWorkouts() {
  try {
    const { data, error } = await supabase
      .from("saved_workouts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function deleteSavedWorkout(id: string) {
  try {
    const { error } = await supabase
      .from("saved_workouts")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    return { error };
  }
}
