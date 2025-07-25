import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Post {
  id: string;
  user_id: string;
  content: string;
  media_url: string | null;
  media_type: string | null;
  location: string | null;
  latitude: number | null;
  longitude: number | null;
  likes_count: number;
  comments_count: number;
  created_at: string;
  updated_at: string;
  profiles: {
    display_name: string | null;
    avatar_url: string | null;
  } | null;
  user_liked?: boolean;
}

export const usePosts = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles!posts_user_id_fkey (display_name, avatar_url)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        // Check if user has liked each post
        if (user && data) {
          const postsWithLikes = await Promise.all(
            data.map(async (post) => {
              const { data: likeData } = await supabase
                .from('post_likes')
                .select('id')
                .eq('post_id', post.id)
                .eq('user_id', user.id)
                .single();
              
              return {
                ...post,
                user_liked: !!likeData
              };
            })
          );
          setPosts(postsWithLikes as any);
        } else {
          setPosts((data as any) || []);
        }
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (postData: any) => {
    if (!user) return { error: 'No user' };

    try {
      const { data, error } = await supabase
        .from('posts')
        .insert([{
          ...postData,
          user_id: user.id
        }])
        .select(`
          *,
          profiles!posts_user_id_fkey (display_name, avatar_url)
        `)
        .single();

      if (error) {
        return { error };
      }

      setPosts(prev => [{ ...data, user_liked: false } as any, ...prev]);
      return { data };
    } catch (error) {
      return { error };
    }
  };

  const toggleLike = async (postId: string) => {
    if (!user) return { error: 'No user' };

    try {
      const post = posts.find(p => p.id === postId);
      if (!post) return { error: 'Post not found' };

      if (post.user_liked) {
        // Unlike
        const { error } = await supabase
          .from('post_likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', user.id);

        if (error) return { error };

        setPosts(prev => prev.map(p => 
          p.id === postId 
            ? { ...p, user_liked: false, likes_count: p.likes_count - 1 }
            : p
        ));
      } else {
        // Like
        const { error } = await supabase
          .from('post_likes')
          .insert([{
            post_id: postId,
            user_id: user.id
          }]);

        if (error) return { error };

        setPosts(prev => prev.map(p => 
          p.id === postId 
            ? { ...p, user_liked: true, likes_count: p.likes_count + 1 }
            : p
        ));
      }

      return { success: true };
    } catch (error) {
      return { error };
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [user]);

  return {
    posts,
    loading,
    createPost,
    toggleLike,
    refetch: fetchPosts
  };
};