import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Sport {
  id: string;
  name: string;
  description: string | null;
  icon_url: string | null;
  created_at: string;
}

export interface UserSport {
  id: string;
  user_id: string;
  sport_id: string;
  skill_level: string;
  created_at: string;
  sports: Sport;
}

export const useSports = () => {
  const [sports, setSports] = useState<Sport[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSports = async () => {
    try {
      const { data, error } = await supabase
        .from('sports')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching sports:', error);
      } else {
        setSports(data || []);
      }
    } catch (error) {
      console.error('Error fetching sports:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSports();
  }, []);

  return {
    sports,
    loading,
    refetch: fetchSports
  };
};

export const useUserSports = (userId?: string) => {
  const [userSports, setUserSports] = useState<UserSport[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUserSports = async () => {
    if (!userId) {
      setUserSports([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_sports')
        .select(`
          *,
          sports (*)
        `)
        .eq('user_id', userId);

      if (error) {
        console.error('Error fetching user sports:', error);
      } else {
        setUserSports(data || []);
      }
    } catch (error) {
      console.error('Error fetching user sports:', error);
    } finally {
      setLoading(false);
    }
  };

  const addUserSport = async (sportId: string, skillLevel: string) => {
    if (!userId) return { error: 'No user ID' };

    try {
      const { data, error } = await supabase
        .from('user_sports')
        .insert([{
          user_id: userId,
          sport_id: sportId,
          skill_level: skillLevel
        }])
        .select(`
          *,
          sports (*)
        `)
        .single();

      if (error) {
        return { error };
      }

      setUserSports(prev => [...prev, data]);
      return { data };
    } catch (error) {
      return { error };
    }
  };

  const removeUserSport = async (userSportId: string) => {
    try {
      const { error } = await supabase
        .from('user_sports')
        .delete()
        .eq('id', userSportId);

      if (error) {
        return { error };
      }

      setUserSports(prev => prev.filter(sport => sport.id !== userSportId));
      return { success: true };
    } catch (error) {
      return { error };
    }
  };

  useEffect(() => {
    fetchUserSports();
  }, [userId]);

  return {
    userSports,
    loading,
    addUserSport,
    removeUserSport,
    refetch: fetchUserSports
  };
};