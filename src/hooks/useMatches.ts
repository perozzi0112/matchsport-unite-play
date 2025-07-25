import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Match {
  id: string;
  title: string;
  description: string | null;
  sport_id: string;
  creator_id: string;
  location: string;
  latitude: number | null;
  longitude: number | null;
  date_time: string;
  max_participants: number;
  current_participants: number;
  price: number;
  status: string;
  skill_level: string;
  venue_photos: string[] | null;
  created_at: string;
  updated_at: string;
  sports: {
    id: string;
    name: string;
    description: string | null;
  } | null;
  profiles: {
    display_name: string | null;
    avatar_url: string | null;
  } | null;
}

export const useMatches = () => {
  const { user } = useAuth();
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMatches = async () => {
    try {
      const { data, error } = await supabase
        .from('matches')
        .select(`
          *,
          sports (id, name, description),
          profiles!matches_creator_id_fkey (display_name, avatar_url)
        `)
        .eq('status', 'open')
        .order('date_time')
        .gte('date_time', new Date().toISOString());

      if (error) {
        console.error('Error fetching matches:', error);
      } else {
        setMatches((data as any) || []);
      }
    } catch (error) {
      console.error('Error fetching matches:', error);
    } finally {
      setLoading(false);
    }
  };

  const createMatch = async (matchData: any) => {
    if (!user) return { error: 'No user' };

    try {
      const { data, error } = await supabase
        .from('matches')
        .insert([{
          ...matchData,
          creator_id: user.id
        }])
        .select(`
          *,
          sports (id, name, description),
          profiles!matches_creator_id_fkey (display_name, avatar_url)
        `)
        .single();

      if (error) {
        return { error };
      }

      setMatches(prev => [data as any, ...prev]);
      return { data };
    } catch (error) {
      return { error };
    }
  };

  const joinMatch = async (matchId: string) => {
    if (!user) return { error: 'No user' };

    try {
      const { data, error } = await supabase
        .from('match_participants')
        .insert([{
          match_id: matchId,
          user_id: user.id,
          status: 'accepted'
        }]);

      if (error) {
        return { error };
      }

      // Refresh matches to get updated participant count
      fetchMatches();
      return { data };
    } catch (error) {
      return { error };
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  return {
    matches,
    loading,
    createMatch,
    joinMatch,
    refetch: fetchMatches
  };
};