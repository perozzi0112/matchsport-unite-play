
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MapPin, Users, Clock, Trophy, Star, AlertCircle } from 'lucide-react';

const MyEvents = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Mock data para eventos registrados y creados
  const registeredEvents = [
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
      description: 'Partido amistoso de fútbol 5. Buen nivel, ambiente deportivo.',
      status: 'upcoming',
      registeredAt: '2024-01-10'
    },
    {
      id: 2,
      title: 'Tenis Singles - Club Deportivo',
      sport: 'Tenis',
      level: 'Principiante',
      date: '2024-01-20',
      time: '17:30',
      location: 'Club Deportivo, Zona Norte',
      participants: 2,
      maxParticipants: 2,
      price: '$8.000',
      organizer: 'Ana L.',
      description: 'Busco compañero/a de tenis nivel principiante para práctica.',
      status: 'upcoming',
      registeredAt: '2024-01-12'
    }
  ];

  const createdEvents = [
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
      organizer: 'Tú',
      description: 'Básquet 3x3 en cancha al aire libre. Solo jugadores experimentados.',
      status: 'upcoming',
      createdAt: '2024-01-08'
    },
    {
      id: 4,
      title: 'Voleibol Playa - Costa Sur',
      sport: 'Voleibol',
      level: 'Intermedio',
      date: '2024-01-22',
      time: '16:00',
      location: 'Playa Costa Sur',
      participants: 6,
      maxParticipants: 8,
      price: '$5.000',
      organizer: 'Tú',
      description: 'Voleibol en la playa, ambiente relajado y divertido.',
      status: 'upcoming',
      createdAt: '2024-01-05'
    }
  ];

  const getStatusBadge = (status: string, date: string) => {
    const eventDate = new Date(date);
    const today = new Date();
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return <Badge variant="secondary">Finalizado</Badge>;
    } else if (diffDays === 0) {
      return <Badge className="bg-orange-500">Hoy</Badge>;
    } else if (diffDays === 1) {
      return <Badge className="bg-yellow-500">Mañana</Badge>;
    } else if (diffDays <= 7) {
      return <Badge className="bg-green-500">Esta semana</Badge>;
    } else {
      return <Badge variant="outline">Próximo</Badge>;
    }
  };

  const getTimeUntilEvent = (date: string, time: string) => {
    const eventDate = new Date(`${date} ${time}`);
    const now = new Date();
    const diffTime = eventDate.getTime() - now.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (diffTime < 0) return 'Evento finalizado';
    if (diffDays === 0 && diffHours < 2) return `En ${diffHours}h`;
    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Mañana';
    return `En ${diffDays} días`;
  };

  const sortEventsByDate = (events: any[]) => {
    return events.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateA.getTime() - dateB.getTime();
    });
  };

  const EventCard = ({ event, isCreated = false }: { event: any, isCreated?: boolean }) => (
    <Card 
      className="animate-fade-in cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => setSelectedEvent(event)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{event.title}</CardTitle>
            <CardDescription className="mt-1">
              {isCreated ? 'Creado por ti' : `Organizado por ${event.organizer}`}
            </CardDescription>
          </div>
          <div className="flex flex-col gap-2">
            {getStatusBadge(event.status, event.date)}
            <Badge variant="outline" className="text-xs">
              {event.level}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="text-sm text-gray-600 space-y-1">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{event.date} a las {event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="font-medium text-sport-red">
              {getTimeUntilEvent(event.date, event.time)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>{event.participants}/{event.maxParticipants} participantes</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <span className="font-semibold text-sport-red">{event.price}</span>
          <div className="flex gap-2">
            {isCreated && (
              <Button variant="outline" size="sm">
                Gestionar
              </Button>
            )}
            <Button size="sm" className="bg-sport-gold hover:bg-sport-gold/90 text-sport-red">
              Ver detalles
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const EventDetails = ({ event }: { event: any }) => (
    <div className="space-y-4">
      <Button 
        variant="ghost" 
        onClick={() => setSelectedEvent(null)}
        className="mb-4"
      >
        ← Volver a mis eventos
      </Button>
      
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl">{event.title}</CardTitle>
              <CardDescription className="mt-1">
                Organizado por {event.organizer}
              </CardDescription>
            </div>
            {getStatusBadge(event.status, event.date)}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-sport-red" />
              <div>
                <p className="font-medium">{event.date} a las {event.time}</p>
                <p className="text-sm text-gray-500">
                  {getTimeUntilEvent(event.date, event.time)}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-sport-red" />
              <div>
                <p className="font-medium">{event.location}</p>
                <Button variant="link" className="p-0 h-auto text-sm">
                  Ver en Google Maps
                </Button>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-sport-red" />
              <div>
                <p className="font-medium">
                  {event.participants}/{event.maxParticipants} participantes
                </p>
                <p className="text-sm text-gray-500">
                  {event.maxParticipants - event.participants} cupos disponibles
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Trophy className="w-5 h-5 text-sport-red" />
              <div>
                <p className="font-medium">Nivel: {event.level}</p>
                <p className="text-sm text-gray-500">Deporte: {event.sport}</p>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <h4 className="font-medium mb-2">Descripción</h4>
            <p className="text-sm text-gray-600">{event.description}</p>
          </div>
          
          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Precio</p>
                <p className="text-lg font-bold text-sport-red">{event.price}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  Compartir
                </Button>
                <Button className="bg-sport-red hover:bg-sport-red/90">
                  Contactar organizador
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  if (selectedEvent) {
    return (
      <div className="p-4 max-w-md mx-auto">
        <EventDetails event={selectedEvent} />
      </div>
    );
  }

  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-sport-gradient mb-2">Mis Eventos</h2>
        <p className="text-gray-600 text-sm">
          Gestiona todos tus partidos y eventos deportivos
        </p>
      </div>

      <Tabs defaultValue="registered" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="registered">Registrado ({registeredEvents.length})</TabsTrigger>
          <TabsTrigger value="created">Creados ({createdEvents.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="registered" className="space-y-4 mt-4">
          {registeredEvents.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <AlertCircle className="w-4 h-4" />
                <span>Próximos eventos ordenados por fecha</span>
              </div>
              {sortEventsByDate(registeredEvents).map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No te has registrado en ningún evento aún</p>
              <p className="text-sm text-gray-400 mt-1">
                Explora los partidos disponibles para unirte
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="created" className="space-y-4 mt-4">
          {createdEvents.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <Star className="w-4 h-4" />
                <span>Eventos que has organizado</span>
              </div>
              {sortEventsByDate(createdEvents).map((event) => (
                <EventCard key={event.id} event={event} isCreated={true} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No has creado ningún evento aún</p>
              <p className="text-sm text-gray-400 mt-1">
                Crea tu primer partido y organiza un evento
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyEvents;
