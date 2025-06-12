
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, MessageCircle, Share, MoreHorizontal, Plus, Calendar, MapPin, Users, Clock } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const SocialFeed = () => {
  const [selectedSport, setSelectedSport] = useState('all');
  
  const [posts] = useState([
    {
      id: 1,
      user: {
        name: 'Carlos Mendoza',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        sport: 'Fútbol'
      },
      content: '¡Increíble partido de hoy! 3-2 en tiempo extra 🔥⚽',
      media: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'
        },
        {
          type: 'image', 
          url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=400&fit=crop'
        }
      ],
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
      media: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400&h=400&fit=crop'
        }
      ],
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
      media: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=400&fit=crop'
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=400&fit=crop'
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'
        }
      ],
      likes: 31,
      comments: 12,
      time: '6h',
      liked: false
    }
  ]);

  const [upcomingMatches] = useState([
    {
      id: 1,
      title: 'Fútbol 5 - Cancha Norte',
      sport: 'Fútbol',
      date: '15 Ene',
      time: '19:00',
      location: 'Cancha Norte',
      participants: 8,
      maxParticipants: 10,
      price: '$15.000',
      timeUntil: 'En 2h'
    },
    {
      id: 2,
      title: 'Tenis Singles',
      sport: 'Tenis',
      date: '16 Ene',
      time: '17:30',
      location: 'Club Deportivo',
      participants: 1,
      maxParticipants: 2,
      price: '$8.000',
      timeUntil: 'Mañana'
    },
    {
      id: 3,
      title: 'Básquet 3x3',
      sport: 'Básquet',
      date: '17 Ene',
      time: '20:00',
      location: 'Plaza Central',
      participants: 4,
      maxParticipants: 6,
      price: 'Gratis',
      timeUntil: 'En 2 días'
    },
    {
      id: 4,
      title: 'Voleibol Playa',
      sport: 'Voleibol',
      date: '18 Ene',
      time: '16:00',
      location: 'Costa Sur',
      participants: 6,
      maxParticipants: 8,
      price: '$5.000',
      timeUntil: 'En 3 días'
    }
  ]);

  const filteredMatches = upcomingMatches.filter(match => 
    selectedSport === 'all' || match.sport === selectedSport
  );

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
        {posts.slice(0, 2).map((post) => (
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

              {/* Post Media Carousel */}
              {post.media && post.media.length > 0 && (
                <div className="w-full">
                  {post.media.length === 1 ? (
                    <img 
                      src={post.media[0].url} 
                      alt="Post content"
                      className="w-full h-64 object-cover"
                    />
                  ) : (
                    <Carousel className="w-full">
                      <CarouselContent>
                        {post.media.map((item, index) => (
                          <CarouselItem key={index}>
                            <img 
                              src={item.url} 
                              alt={`Post content ${index + 1}`}
                              className="w-full h-64 object-cover"
                            />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      {post.media.length > 1 && (
                        <>
                          <CarouselPrevious className="left-2" />
                          <CarouselNext className="right-2" />
                        </>
                      )}
                    </Carousel>
                  )}
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

        {/* Upcoming Matches Section */}
        <div className="my-6">
          <Card className="animate-fade-in bg-gradient-to-r from-sport-red to-sport-gold text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg">Próximos Partidos</h3>
                  <p className="text-sm opacity-90">¡No te los pierdas!</p>
                </div>
                <Calendar className="w-8 h-8 opacity-80" />
              </div>
              
              <div className="mb-4">
                <Select value={selectedSport} onValueChange={setSelectedSport}>
                  <SelectTrigger className="bg-white/20 border-white/30 text-white">
                    <SelectValue placeholder="Filtrar por deporte" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los deportes</SelectItem>
                    <SelectItem value="Fútbol">Fútbol</SelectItem>
                    <SelectItem value="Tenis">Tenis</SelectItem>
                    <SelectItem value="Básquet">Básquet</SelectItem>
                    <SelectItem value="Voleibol">Voleibol</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                {filteredMatches.slice(0, 3).map((match) => (
                  <div key={match.id} className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-sm">{match.title}</h4>
                      <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                        {match.timeUntil}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs opacity-90">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{match.date} - {match.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{match.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{match.participants}/{match.maxParticipants}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-semibold text-sm">{match.price}</span>
                      <Button size="sm" variant="secondary" className="text-xs px-3 py-1 h-6">
                        Ver más
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Remaining Posts */}
        {posts.slice(2).map((post) => (
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

              {/* Post Media Carousel */}
              {post.media && post.media.length > 0 && (
                <div className="w-full">
                  {post.media.length === 1 ? (
                    <img 
                      src={post.media[0].url} 
                      alt="Post content"
                      className="w-full h-64 object-cover"
                    />
                  ) : (
                    <Carousel className="w-full">
                      <CarouselContent>
                        {post.media.map((item, index) => (
                          <CarouselItem key={index}>
                            <img 
                              src={item.url} 
                              alt={`Post content ${index + 1}`}
                              className="w-full h-64 object-cover"
                            />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      {post.media.length > 1 && (
                        <>
                          <CarouselPrevious className="left-2" />
                          <CarouselNext className="right-2" />
                        </>
                      )}
                    </Carousel>
                  )}
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
