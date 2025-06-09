
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Trophy } from 'lucide-react';
import { CountdownTimer } from './CountdownTimer';
import { EventStatusBadge } from './EventStatusBadge';

interface EventDetailsProps {
  event: any;
  currentTime: Date;
  onBack: () => void;
}

export const EventDetails = ({ event, currentTime, onBack }: EventDetailsProps) => {
  const getTimeUntilEvent = (date: string, time: string) => {
    const eventDate = new Date(`${date} ${time}`);
    const now = currentTime;
    const diffTime = eventDate.getTime() - now.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffTime < 0) return 'Evento finalizado';
    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Mañana';
    return `En ${diffDays} días`;
  };

  return (
    <div className="space-y-4">
      <Button 
        variant="ghost" 
        onClick={onBack}
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
            <EventStatusBadge date={event.date} time={event.time} currentTime={currentTime} />
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <CountdownTimer date={event.date} time={event.time} currentTime={currentTime} />
          
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
};
