
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageCircle, Share, MoreHorizontal, Play } from 'lucide-react';
import CreatePost from './CreatePost';

const SocialFeed = () => {
  const [showCreatePost, setShowCreatePost] = useState(false);

  const posts = [
    {
      id: 1,
      user: {
        name: 'Carlos Mendoza',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        sport: 'Fútbol'
      },
      content: {
        text: '¡Increíble partido de hoy! Gran nivel de todos los participantes 🔥⚽',
        media: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=400&fit=crop'
        }
      },
      stats: {
        likes: 24,
        comments: 5,
        shares: 2
      },
      timestamp: '2 horas',
      liked: false
    },
    {
      id: 2,
      user: {
        name: 'Ana López',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
        sport: 'Tenis'
      },
      content: {
        text: 'Entrenando mi revés. ¿Algún consejo? 🎾',
        media: {
          type: 'video',
          url: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400&h=400&fit=crop',
          duration: '0:15'
        }
      },
      stats: {
        likes: 18,
        comments: 8,
        shares: 1
      },
      timestamp: '5 horas',
      liked: true
    },
    {
      id: 3,
      user: {
        name: 'Miguel Rodríguez',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        sport: 'Básquet'
      },
      content: {
        text: 'Nueva cancha en el centro. ¡Perfecta para 3x3! 🏀',
        media: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=400&fit=crop'
        }
      },
      stats: {
        likes: 31,
        comments: 12,
        shares: 4
      },
      timestamp: '1 día',
      liked: false
    }
  ];

  const [postsData, setPostsData] = useState(posts);

  const handleLike = (postId: number) => {
    setPostsData(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            liked: !post.liked,
            stats: { 
              ...post.stats, 
              likes: post.liked ? post.stats.likes - 1 : post.stats.likes + 1 
            }
          }
        : post
    ));
  };

  if (showCreatePost) {
    return <CreatePost onBack={() => setShowCreatePost(false)} />;
  }

  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      {/* Create Post Button */}
      <Button
        onClick={() => setShowCreatePost(true)}
        className="w-full bg-sport-gold hover:bg-sport-gold/90 text-sport-red font-semibold"
      >
        ¿Qué está pasando en tu deporte?
      </Button>

      {/* Posts */}
      <div className="space-y-4">
        {postsData.map((post) => (
          <Card key={post.id} className="animate-fade-in">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={post.user.avatar} />
                    <AvatarFallback className="bg-sport-gradient text-white">
                      {post.user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-sm">{post.user.name}</div>
                    <div className="text-xs text-gray-500">{post.user.sport} • {post.timestamp}</div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <p className="text-sm">{post.content.text}</p>
              
              {/* Media */}
              <div className="relative rounded-lg overflow-hidden">
                <img 
                  src={post.content.media.url} 
                  alt="Post content"
                  className="w-full h-64 object-cover"
                />
                {post.content.media.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/50 rounded-full p-3">
                      <Play className="w-6 h-6 text-white fill-current" />
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {post.content.media.duration}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-1 ${post.liked ? 'text-red-500' : ''}`}
                  >
                    <Heart className={`w-5 h-5 ${post.liked ? 'fill-current' : ''}`} />
                    <span className="text-sm">{post.stats.likes}</span>
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm">{post.stats.comments}</span>
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <Share className="w-5 h-5" />
                    <span className="text-sm">{post.stats.shares}</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SocialFeed;
