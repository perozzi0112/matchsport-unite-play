
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MapPin, Star, Trophy, Edit, Users } from 'lucide-react';

const UserProfile = () => {
  const [user] = useState({
    name: 'Carlos Mendoza',
    email: 'carlos.mendoza@email.com',
    age: 28,
    location: 'Bogotá, Colombia',
    mainSport: 'Fútbol',
    level: 'Intermedio',
    joinDate: '2023-06-15',
    matchesPlayed: 45,
    matchesOrganized: 12,
    rating: 4.7,
    availability: ['Lunes tarde', 'Miércoles noche', 'Sábados'],
    bio: 'Apasionado del fútbol desde pequeño. Me gusta jugar en equipo y conocer gente nueva. Siempre con buena actitud y respeto por el deporte.'
  });

  const recentMatches = [
    {
      id: 1,
      title: 'Fútbol 5 - Cancha Norte',
      date: '2024-01-10',
      role: 'Participante',
      rating: 5
    },
    {
      id: 2,
      title: 'Tenis Singles - Club Deportivo',
      date: '2024-01-08',
      role: 'Organizador',
      rating: 4
    },
    {
      id: 3,
      title: 'Básquet 3x3 - Plaza Central',
      date: '2024-01-05',
      role: 'Participante',
      rating: 5
    }
  ];

  const achievements = [
    { title: 'Primer Partido', description: 'Jugaste tu primer partido en Matchsport', icon: '🎯' },
    { title: 'Organizador', description: 'Organizaste tu primer partido', icon: '📅' },
    { title: 'Jugador Popular', description: '10+ partidos jugados', icon: '⭐' },
    { title: 'Buen Compañero', description: 'Rating promedio de 4.5+', icon: '🤝' }
  ];

  return (
    <div className="p-4 max-w-md mx-auto space-y-6">
      {/* Profile Header */}
      <Card className="animate-fade-in">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face`} />
              <AvatarFallback className="text-2xl font-bold bg-sport-gradient text-white">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          </div>
          
          <CardTitle className="text-2xl text-sport-red">{user.name}</CardTitle>
          <CardDescription className="flex items-center justify-center gap-1">
            <MapPin className="w-4 h-4" />
            {user.location}
          </CardDescription>
          
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-sport-red">{user.matchesPlayed}</div>
              <div className="text-sm text-gray-600">Partidos</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-2xl font-bold text-sport-red">{user.rating}</span>
              </div>
              <div className="text-sm text-gray-600">Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-sport-red">{user.matchesOrganized}</div>
              <div className="text-sm text-gray-600">Organizados</div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Profile Details */}
      <Tabs defaultValue="info" className="animate-fade-in">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="info">Info</TabsTrigger>
          <TabsTrigger value="history">Historial</TabsTrigger>
          <TabsTrigger value="achievements">Logros</TabsTrigger>
        </TabsList>
        
        <TabsContent value="info" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Información Personal</CardTitle>
                <Button variant="ghost" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Edad:</span>
                <span className="font-medium">{user.age} años</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Deporte principal:</span>
                <Badge className="bg-sport-red/10 text-sport-red">{user.mainSport}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Nivel:</span>
                <Badge className="bg-sport-gold/10 text-sport-gold">{user.level}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Miembro desde:</span>
                <span className="font-medium">{new Date(user.joinDate).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Disponibilidad</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {user.availability.map((day, index) => (
                  <Badge key={index} variant="outline" className="border-sport-red text-sport-red">
                    {day}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Sobre mí</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{user.bio}</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Partidos Recientes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentMatches.map((match) => (
                <div key={match.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-sm">{match.title}</div>
                    <div className="text-xs text-gray-600 flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      {new Date(match.date).toLocaleDateString()}
                      <Badge variant="outline" className="text-xs">
                        {match.role}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{match.rating}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Trophy className="w-5 h-5 text-sport-gold" />
                Logros Desbloqueados
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <div className="font-medium">{achievement.title}</div>
                    <div className="text-sm text-gray-600">{achievement.description}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Logout Button */}
      <Card className="animate-fade-in">
        <CardContent className="pt-6">
          <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
            Cerrar Sesión
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
