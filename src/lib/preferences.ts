import { supabase } from './supabase';

export type UserPreferences = {
  dark_mode: boolean;
};

export async function getUserPreferences(): Promise<UserPreferences> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error('No user found');

  let { data, error } = await supabase
    .from('user_preferences')
    .select('dark_mode')
    .eq('user_id', user.id)
    .single();

  // If no preferences exist, create default preferences
  if (error?.code === 'PGRST116') {
    const defaultPreferences = { dark_mode: false, user_id: user.id };
    const { error: insertError } = await supabase
      .from('user_preferences')
      .insert([defaultPreferences]);

    if (insertError) throw insertError;

    return defaultPreferences;
  }

  if (error) throw error;
  if (!data) throw new Error('Failed to fetch user preferences');
  return data as UserPreferences;
}

export async function updateUserPreferences(preferences: Partial<UserPreferences>) {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error('No user found');

  const { error } = await supabase
    .from('user_preferences')
    .upsert({
      user_id: user.id,
      ...preferences
    });

  if (error) throw error;
}