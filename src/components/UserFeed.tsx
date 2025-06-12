
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, MessageCircle, Share, Bookmark, Play, Grid3X3, Tag, MapPin, Trophy } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const UserFeed = () => {
  const [activeView, setActiveView] = useState('grid');
  
  const [posts] = useState([
    {
      id: 1,
      type: 'image',
      media: [
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop',
        'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=300&h=300&fit=crop',
        'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=300&h=300&fit=crop'
      ],
      likes: 156,
      comments: 23,
      isVideo: false,
      tags: ['#futbol', '#gol', '#equipo'],
      location: 'Estadio Central'
    },
    {
      id: 2,
      type: 'video',
      media: ['https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=300&h=300&fit=crop'],
      likes: 89,
      comments: 12,
      isVideo: true,
      tags: ['#tenis', '#ace', '#training'],
      location: 'Club Deportivo'
    },
    {
      id: 3,
      type: 'image',
      media: ['https://images.unsplash.com/photo-1546519638-68e109498ffc?w=300&h=300&fit=crop'],
      likes: 234,
      comments: 45,
      isVideo: false,
      tags: ['#basquet', '#dunk', '#victoria'],
      location: 'Cancha Norte'
    },
    {
      id: 4,
      type: 'image',
      media: [
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop',
        'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=300&h=300&fit=crop'
      ],
      likes: 78,
      comments: 8,
      isVideo: false,
      tags: ['#futbol', '#teamwork'],
      location: 'Plaza Deportiva'
    },
    {
      id: 5,
      type: 'video',
      media: ['https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=300&h=300&fit=crop'],
      likes: 345,
      comments: 67,
      isVideo: true,
      tags: ['#tenis', '#match', '#winner'],
      location: 'Centro Tenis'
    },
    {
      id: 6,
      type: 'image',
      media: ['https://images.unsplash.com/photo-1546519638-68e109498ffc?w=300&h=300&fit=crop'],
      likes: 123,
      comments: 19,
      isVideo: false,
      tags: ['#basquet', '#3pointer'],
      location: 'Gimnasio Municipal'
    }
  ]);

  const [stories] = useState([
    {
      id: 1,
      user: 'Mi Historia',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
      isOwn: true,
      hasNew: false
    },
    {
      id: 2,
      user: 'Carlos M.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
      isOwn: false,
      hasNew: true
    },
    {
      id: 3,
      user: 'María G.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b002?w=80&h=80&fit=crop&crop=face',
      isOwn: false,
      hasNew: true
    },
    {
      id: 4,
      user: 'Ana S.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
      isOwn: false,
      hasNew: false
    }
  ]);

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Stories Section */}
      <div className="bg-gradient-to-r from-sport-red via-sport-gold to-sport-red p-4">
        <div className="flex gap-4 overflow-x-auto pb-2">
          {stories.map((story) => (
            <div key={story.id} className="flex flex-col items-center gap-2 min-w-[70px]">
              <div className={`relative ${story.hasNew ? 'ring-4 ring-sport-gold' : story.isOwn ? 'ring-2 ring-white/50' : 'ring-2 ring-gray-600'} rounded-full p-1`}>
                <img
                  src={story.avatar}
                  alt={story.user}
                  className="w-14 h-14 rounded-full object-cover"
                />
                {story.isOwn && (
                  <div className="absolute bottom-0 right-0 w-5 h-5 bg-sport-gold rounded-full flex items-center justify-center">
                    <span className="text-sport-red text-xs font-bold">+</span>
                  </div>
                )}
              </div>
              <span className="text-xs text-white/90 text-center">{story.user}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-b from-gray-900 to-black p-6">
        <div className="grid grid-cols-3 gap-6 text-center">
          <div>
            <h3 className="text-2xl font-bold text-sport-gold">{posts.length}</h3>
            <p className="text-gray-400 text-sm">Publicaciones</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-sport-gold">1.2K</h3>
            <p className="text-gray-400 text-sm">Seguidores</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-sport-gold">856</h3>
            <p className="text-gray-400 text-sm">Siguiendo</p>
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-900 border-b border-gray-800">
          <TabsTrigger value="grid" className="data-[state=active]:bg-sport-red">
            <Grid3X3 className="w-4 h-4 mr-2" />
            Grid
          </TabsTrigger>
          <TabsTrigger value="tagged" className="data-[state=active]:bg-sport-red">
            <Tag className="w-4 h-4 mr-2" />
            Etiquetado
          </TabsTrigger>
        </TabsList>

        <TabsContent value="grid" className="mt-0">
          {/* Posts Grid */}
          <div className="grid grid-cols-3 gap-1 p-1">
            {posts.map((post) => (
              <div key={post.id} className="relative aspect-square group cursor-pointer">
                <img
                  src={post.media[0]}
                  alt="Post"
                  className="w-full h-full object-cover"
                />
                
                {/* Video Indicator */}
                {post.isVideo && (
                  <div className="absolute top-2 right-2">
                    <Play className="w-4 h-4 text-white fill-white" />
                  </div>
                )}
                
                {/* Multiple Images Indicator */}
                {post.media.length > 1 && !post.isVideo && (
                  <div className="absolute top-2 right-2">
                    <div className="w-4 h-4 bg-white/20 rounded backdrop-blur-sm flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{post.media.length}</span>
                    </div>
                  </div>
                )}
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <div className="flex items-center gap-1 text-white">
                    <Heart className="w-5 h-5 fill-white" />
                    <span className="font-semibold">{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1 text-white">
                    <MessageCircle className="w-5 h-5 fill-white" />
                    <span className="font-semibold">{post.comments}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tagged" className="mt-0">
          {/* Tagged Posts */}
          <div className="p-6 text-center">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-sport-red to-sport-gold flex items-center justify-center">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-xl font-bold text-sport-gold mb-2">¡Etiquetas Deportivas!</h3>
            <p className="text-gray-400 mb-6">
              Aquí aparecerán las fotos donde te etiqueten en eventos deportivos y competencias.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-sport-gold" />
                    <span className="text-sm text-gray-300">Torneo Local</span>
                  </div>
                  <p className="text-xs text-gray-500">3 etiquetas</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="w-4 h-4 text-sport-gold" />
                    <span className="text-sm text-gray-300">Liga Amateur</span>
                  </div>
                  <p className="text-xs text-gray-500">1 etiqueta</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserFeed;
