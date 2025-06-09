
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EventDetails } from './events/EventDetails';
import { EventsList } from './events/EventsList';

const MyEvents = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Actualizar el tiempo cada minuto para el conteo regresivo
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Actualizar cada minuto

    return () => clearInterval(interval);
  }, []);

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

  if (selectedEvent) {
    return (
      <div className="p-4 max-w-md mx-auto">
        <EventDetails 
          event={selectedEvent} 
          currentTime={currentTime}
          onBack={() => setSelectedEvent(null)}
        />
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
          <EventsList 
            events={registeredEvents}
            isCreated={false}
            currentTime={currentTime}
            onEventClick={setSelectedEvent}
          />
        </TabsContent>
        
        <TabsContent value="created" className="space-y-4 mt-4">
          <EventsList 
            events={createdEvents}
            isCreated={true}
            currentTime={currentTime}
            onEventClick={setSelectedEvent}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyEvents;
