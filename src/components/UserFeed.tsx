
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, MessageCircle, Share, Bookmark, Play, Grid3X3, Tag, MapPin, Trophy } from 'lucide-react';

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
    <div className="max-w-md mx-auto bg-background min-h-screen">
      {/* Stories Section */}
      <div className="bg-sport-gradient p-4">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {stories.map((story) => (
            <div key={story.id} className="flex flex-col items-center gap-2 min-w-[60px]">
              <div className={`relative ${story.hasNew ? 'ring-2 ring-sport-gold' : story.isOwn ? 'ring-2 ring-white/70' : 'ring-2 ring-white/40'} rounded-full p-1`}>
                <img
                  src={story.avatar}
                  alt={story.user}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {story.isOwn && (
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-sport-gold rounded-full flex items-center justify-center border-2 border-white">
                    <span className="text-sport-red text-xs font-bold">+</span>
                  </div>
                )}
              </div>
              <span className="text-xs text-white text-center font-medium truncate w-full">{story.user}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <Card className="mx-4 -mt-4 relative z-10 shadow-sm">
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <h3 className="text-xl font-bold text-sport-red">{posts.length}</h3>
              <p className="text-muted-foreground text-sm">Publicaciones</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-sport-red">1.2K</h3>
              <p className="text-muted-foreground text-sm">Seguidores</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-sport-red">856</h3>
              <p className="text-muted-foreground text-sm">Siguiendo</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* View Toggle */}
      <div className="p-4">
        <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger 
              value="grid" 
              className="data-[state=active]:bg-sport-red data-[state=active]:text-white"
            >
              <Grid3X3 className="w-4 h-4 mr-2" />
              Grid
            </TabsTrigger>
            <TabsTrigger 
              value="tagged" 
              className="data-[state=active]:bg-sport-red data-[state=active]:text-white"
            >
              <Tag className="w-4 h-4 mr-2" />
              Etiquetado
            </TabsTrigger>
          </TabsList>

          <TabsContent value="grid" className="mt-4">
            {/* Posts Grid */}
            <div className="grid grid-cols-3 gap-1">
              {posts.map((post) => (
                <div key={post.id} className="relative aspect-square group cursor-pointer rounded-md overflow-hidden">
                  <img
                    src={post.media[0]}
                    alt="Post"
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  
                  {/* Video Indicator */}
                  {post.isVideo && (
                    <div className="absolute top-2 right-2">
                      <div className="w-5 h-5 bg-white/90 rounded-full flex items-center justify-center">
                        <Play className="w-3 h-3 text-sport-red fill-sport-red" />
                      </div>
                    </div>
                  )}
                  
                  {/* Multiple Images Indicator */}
                  {post.media.length > 1 && !post.isVideo && (
                    <div className="absolute top-2 right-2">
                      <div className="w-5 h-5 bg-white/90 rounded-full flex items-center justify-center">
                        <span className="text-sport-red text-xs font-bold">{post.media.length}</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-sport-red/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 rounded-md">
                    <div className="flex items-center gap-1 text-white">
                      <Heart className="w-4 h-4 fill-white" />
                      <span className="font-semibold text-sm">{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1 text-white">
                      <MessageCircle className="w-4 h-4 fill-white" />
                      <span className="font-semibold text-sm">{post.comments}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tagged" className="mt-4">
            {/* Tagged Posts */}
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-sport-gradient flex items-center justify-center">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-lg font-bold text-sport-red mb-2">¡Etiquetas Deportivas!</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  Aquí aparecerán las fotos donde te etiqueten en eventos deportivos y competencias.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <Card className="border-sport-red/20">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="w-4 h-4 text-sport-red" />
                        <span className="text-sm text-foreground">Torneo Local</span>
                      </div>
                      <p className="text-xs text-muted-foreground">3 etiquetas</p>
                    </CardContent>
                  </Card>
                  <Card className="border-sport-red/20">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Trophy className="w-4 h-4 text-sport-red" />
                        <span className="text-sm text-foreground">Liga Amateur</span>
                      </div>
                      <p className="text-xs text-muted-foreground">1 etiqueta</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserFeed;
