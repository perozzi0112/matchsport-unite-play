
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MapPin, Star, Trophy, Edit, Users, Target, Timer, Award } from 'lucide-react';

const UserProfile = () => {
  const [user] = useState({
    name: 'Carlos Mendoza',
    email: 'carlos.mendoza@email.com',
    age: 28,
    location: 'Bogotá, Colombia',
    joinDate: '2023-06-15',
    bio: 'Apasionado del deporte desde pequeño. Me gusta competir y conocer gente nueva. Siempre con buena actitud y respeto por el deporte.'
  });

  const sportsProfiles = [
    {
      sport: 'Fútbol',
      level: 'Intermedio',
      rating: 4.7,
      stats: {
        matchesPlayed: 45,
        wins: 28,
        goals: 23,
        assists: 15,
        hoursPlayed: 90
      },
      achievements: ['Goleador del mes', 'Mejor compañero'],
      position: 'Mediocampista'
    },
    {
      sport: 'Tenis',
      level: 'Principiante',
      rating: 3.8,
      stats: {
        matchesPlayed: 12,
        wins: 5,
        aces: 18,
        winners: 45,
        hoursPlayed: 24
      },
      achievements: ['Primera victoria'],
      position: 'Singles'
    },
    {
      sport: 'Básquet',
      level: 'Intermedio',
      rating: 4.2,
      stats: {
        matchesPlayed: 18,
        wins: 11,
        points: 156,
        rebounds: 34,
        hoursPlayed: 36
      },
      achievements: ['MVP del partido'],
      position: 'Escolta'
    }
  ];

  const [selectedSport, setSelectedSport] = useState('Fútbol');
  const currentProfile = sportsProfiles.find(p => p.sport === selectedSport) || sportsProfiles[0];

  const recentMatches = [
    {
      id: 1,
      title: 'Fútbol 5 - Cancha Norte',
      date: '2024-01-10',
      sport: 'Fútbol',
      role: 'Participante',
      rating: 5,
      result: 'Victoria 3-2'
    },
    {
      id: 2,
      title: 'Tenis Singles - Club Deportivo',
      date: '2024-01-08',
      sport: 'Tenis',
      role: 'Organizador',
      rating: 4,
      result: 'Derrota 6-4, 6-2'
    },
    {
      id: 3,
      title: 'Básquet 3x3 - Plaza Central',
      date: '2024-01-05',
      sport: 'Básquet',
      role: 'Participante',
      rating: 5,
      result: 'Victoria 21-18'
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Principiante':
        return 'bg-green-100 text-green-800';
      case 'Intermedio':
        return 'bg-yellow-100 text-yellow-800';
      case 'Avanzado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
        </CardHeader>
      </Card>

      {/* Sports Profiles */}
      <Tabs defaultValue="profiles" className="animate-fade-in">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profiles">Deportes</TabsTrigger>
          <TabsTrigger value="history">Historial</TabsTrigger>
          <TabsTrigger value="info">Info</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profiles" className="space-y-4">
          {/* Sport Selector */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {sportsProfiles.map((profile) => (
              <Button
                key={profile.sport}
                variant={selectedSport === profile.sport ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSport(profile.sport)}
                className={selectedSport === profile.sport ? "bg-sport-red hover:bg-sport-red/90" : ""}
              >
                {profile.sport}
              </Button>
            ))}
          </div>

          {/* Current Sport Profile */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg text-sport-red">{currentProfile.sport}</CardTitle>
                  <CardDescription>{currentProfile.position}</CardDescription>
                </div>
                <div className="text-right">
                  <Badge className={getLevelColor(currentProfile.level)}>
                    {currentProfile.level}
                  </Badge>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-bold">{currentProfile.rating}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Statistics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-sport-red">{currentProfile.stats.matchesPlayed}</div>
                  <div className="text-sm text-gray-600">Partidos</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-sport-red">{currentProfile.stats.wins}</div>
                  <div className="text-sm text-gray-600">Victorias</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-sport-red">{currentProfile.stats.hoursPlayed}</div>
                  <div className="text-sm text-gray-600">Horas jugadas</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-sport-red">
                    {Math.round((currentProfile.stats.wins / currentProfile.stats.matchesPlayed) * 100)}%
                  </div>
                  <div className="text-sm text-gray-600">Win Rate</div>
                </div>
              </div>

              {/* Sport-specific stats */}
              <div className="space-y-2">
                <h4 className="font-semibold text-sport-red">Estadísticas específicas</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {currentProfile.sport === 'Fútbol' && (
                    <>
                      <div className="flex justify-between">
                        <span>Goles:</span>
                        <span className="font-medium">{currentProfile.stats.goals}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Asistencias:</span>
                        <span className="font-medium">{currentProfile.stats.assists}</span>
                      </div>
                    </>
                  )}
                  {currentProfile.sport === 'Tenis' && (
                    <>
                      <div className="flex justify-between">
                        <span>Aces:</span>
                        <span className="font-medium">{currentProfile.stats.aces}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Winners:</span>
                        <span className="font-medium">{currentProfile.stats.winners}</span>
                      </div>
                    </>
                  )}
                  {currentProfile.sport === 'Básquet' && (
                    <>
                      <div className="flex justify-between">
                        <span>Puntos:</span>
                        <span className="font-medium">{currentProfile.stats.points}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rebotes:</span>
                        <span className="font-medium">{currentProfile.stats.rebounds}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Achievements */}
              <div className="space-y-2">
                <h4 className="font-semibold text-sport-red">Logros en {currentProfile.sport}</h4>
                <div className="flex flex-wrap gap-1">
                  {currentProfile.achievements.map((achievement, index) => (
                    <Badge key={index} variant="outline" className="text-xs border-sport-gold text-sport-gold">
                      <Award className="w-3 h-3 mr-1" />
                      {achievement}
                    </Badge>
                  ))}
                </div>
              </div>
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
                        {match.sport}
                      </Badge>
                    </div>
                    <div className="text-xs text-sport-red font-medium">{match.result}</div>
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
                <span className="text-gray-600">Miembro desde:</span>
                <span className="font-medium">{new Date(user.joinDate).toLocaleDateString()}</span>
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
