
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Users, Calendar, MapPin } from 'lucide-react';

const MatchesList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  // Mock data para los partidos
  const matches = [
    {
      id: 1,
      title: 'Fútbol 5 - Cancha Norte',
      sport: 'Fútbol',
      level: 'Intermedio',
      date: '2024-01-15',
      time: '19:00',
      location: 'Cancha Norte, Centro',
      participants: 8,
      maxParticipants: 10,
      price: '$15.000',
      organizer: 'Carlos M.',
      description: 'Partido amistoso de fútbol 5. Buen nivel, ambiente deportivo.'
    },
    {
      id: 2,
      title: 'Tenis Singles - Club Deportivo',
      sport: 'Tenis',
      level: 'Principiante',
      date: '2024-01-16',
      time: '17:30',
      location: 'Club Deportivo, Zona Norte',
      participants: 1,
      maxParticipants: 2,
      price: '$8.000',
      organizer: 'Ana L.',
      description: 'Busco compañero/a de tenis nivel principiante para práctica.'
    },
    {
      id: 3,
      title: 'Básquet 3x3 - Plaza Central',
      sport: 'Básquet',
      level: 'Avanzado',
      date: '2024-01-17',
      time: '20:00',
      location: 'Plaza Central, Downtown',
      participants: 4,
      maxParticipants: 6,
      price: 'Gratis',
      organizer: 'Miguel R.',
      description: 'Básquet 3x3 en cancha al aire libre. Solo jugadores experimentados.'
    },
    {
      id: 4,
      title: 'Voleibol Playa - Costa Sur',
      sport: 'Voleibol',
      level: 'Intermedio',
      date: '2024-01-18',
      time: '16:00',
      location: 'Playa Costa Sur',
      participants: 6,
      maxParticipants: 8,
      price: '$5.000',
      organizer: 'Laura P.',
      description: 'Voleibol en la playa, ambiente relajado y divertido.'
    }
  ];

  const filteredMatches = matches.filter(match => {
    const matchesSearch = match.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          match.sport.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSport = selectedSport === 'all' || match.sport === selectedSport;
    const matchesLevel = selectedLevel === 'all' || match.level === selectedLevel;
    
    return matchesSearch && matchesSport && matchesLevel;
  });

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
    <div className="p-4 max-w-md mx-auto space-y-4">
      {/* Search and Filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar partidos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={selectedSport} onValueChange={setSelectedSport}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Deporte" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los deportes</SelectItem>
              <SelectItem value="Fútbol">Fútbol</SelectItem>
              <SelectItem value="Tenis">Tenis</SelectItem>
              <SelectItem value="Básquet">Básquet</SelectItem>
              <SelectItem value="Voleibol">Voleibol</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Nivel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los niveles</SelectItem>
              <SelectItem value="Principiante">Principiante</SelectItem>
              <SelectItem value="Intermedio">Intermedio</SelectItem>
              <SelectItem value="Avanzado">Avanzado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Matches List */}
      <div className="space-y-4">
        {filteredMatches.map((match) => (
          <Card key={match.id} className="animate-fade-in">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{match.title}</CardTitle>
                  <CardDescription className="mt-1">
                    Organizado por {match.organizer}
                  </CardDescription>
                </div>
                <Badge className={getLevelColor(match.level)}>
                  {match.level}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="text-sm text-gray-600 space-y-1">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{match.date} a las {match.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{match.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{match.participants}/{match.maxParticipants} participantes</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-700">{match.description}</p>
              
              <div className="flex items-center justify-between pt-2">
                <span className="font-semibold text-sport-red">{match.price}</span>
                <Button 
                  size="sm" 
                  className="bg-sport-gold hover:bg-sport-gold/90 text-sport-red"
                  disabled={match.participants >= match.maxParticipants}
                >
                  {match.participants >= match.maxParticipants ? 'Completo' : 'Unirme'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMatches.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No se encontraron partidos que coincidan con tu búsqueda</p>
        </div>
      )}
    </div>
  );
};

export default MatchesList;
