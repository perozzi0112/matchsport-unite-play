import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, MessageCircle, Share, MoreHorizontal, Plus } from 'lucide-react';

const SocialFeed = () => {
  const [posts] = useState([
    {
      id: 1,
      user: {
        name: 'Carlos Mendoza',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        sport: 'Fútbol'
      },
      content: '¡Increíble partido de hoy! 3-2 en tiempo extra 🔥⚽',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
      likes: 24,
      comments: 8,
      time: '2h',
      liked: false
    },
    {
      id: 2,
      user: {
        name: 'María González',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b002?w=100&h=100&fit=crop&crop=face',
        sport: 'Tenis'
      },
      content: 'Entrenando para el torneo del próximo mes 💪🎾',
      image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400&h=400&fit=crop',
      likes: 18,
      comments: 5,
      time: '4h',
      liked: true
    },
    {
      id: 3,
      user: {
        name: 'Ana Silva',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        sport: 'Básquet'
      },
      content: 'Nueva cancha descubierta en el centro. ¡Perfecta para jugar!',
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=400&fit=crop',
      likes: 31,
      comments: 12,
      time: '6h',
      liked: false
    }
  ]);

  return (
    <div className="p-4 max-w-md mx-auto">
      {/* Create Post Button */}
      <div className="mb-6">
        <Button
          className="w-full bg-sport-gold hover:bg-sport-gold/90 text-sport-red flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Crear publicación
        </Button>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="animate-fade-in">
            <CardContent className="p-0">
              {/* Post Header */}
              <div className="flex items-center justify-between p-4 pb-3">
                <div className="flex items-center gap-3">
                  <img 
                    src={post.user.avatar} 
                    alt={post.user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-sm">{post.user.name}</h3>
                    <p className="text-gray-500 text-xs">{post.user.sport} • {post.time}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="p-1">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>

              {/* Post Content */}
              <div className="px-4 pb-3">
                <p className="text-sm">{post.content}</p>
              </div>

              {/* Post Image */}
              {post.image && (
                <div className="w-full">
                  <img 
                    src={post.image} 
                    alt="Post content"
                    className="w-full h-64 object-cover"
                  />
                </div>
              )}

              {/* Post Actions */}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`flex items-center gap-1 p-1 ${
                      post.liked ? 'text-red-500' : 'text-gray-600'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${post.liked ? 'fill-current' : ''}`} />
                    <span className="text-xs">{post.likes}</span>
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="flex items-center gap-1 p-1 text-gray-600">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-xs">{post.comments}</span>
                  </Button>
                </div>
                
                <Button variant="ghost" size="sm" className="p-1 text-gray-600">
                  <Share className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SocialFeed;
