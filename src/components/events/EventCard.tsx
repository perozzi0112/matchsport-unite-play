
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Clock, Star } from 'lucide-react';
import { CountdownTimer } from './CountdownTimer';
import { EventStatusBadge } from './EventStatusBadge';

interface EventCardProps {
  event: any;
  isCreated?: boolean;
  currentTime: Date;
  onEventClick: (event: any) => void;
}

export const EventCard = ({ event, isCreated = false, currentTime, onEventClick }: EventCardProps) => {
  const getTimeUntilEvent = (date: string, time: string) => {
    const eventDate = new Date(`${date} ${time}`);
    const now = currentTime;
    const diffTime = eventDate.getTime() - now.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (diffTime < 0) return 'Evento finalizado';
    if (diffDays === 0 && diffHours < 2) return `En ${diffHours}h`;
    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Mañana';
    return `En ${diffDays} días`;
  };

  const isFinished = new Date(`${event.date} ${event.time}`).getTime() <= currentTime.getTime();
  const isStartingSoon = new Date(`${event.date} ${event.time}`).getTime() - currentTime.getTime() <= 2 * 60 * 60 * 1000 && !isFinished;
  
  return (
    <Card 
      className={`animate-fade-in cursor-pointer hover:shadow-md transition-shadow ${
        isFinished ? 'opacity-60 bg-gray-50' : ''
      } ${isStartingSoon ? 'ring-2 ring-red-300 shadow-lg' : ''}`}
      onClick={() => onEventClick(event)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className={`text-lg ${isFinished ? 'text-gray-500' : ''}`}>
              {event.title}
            </CardTitle>
            <CardDescription className="mt-1">
              {isCreated ? 'Creado por ti' : `Organizado por ${event.organizer}`}
            </CardDescription>
          </div>
          <div className="flex flex-col gap-2">
            <EventStatusBadge date={event.date} time={event.time} currentTime={currentTime} />
            <Badge variant="outline" className="text-xs">
              {event.level}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <CountdownTimer date={event.date} time={event.time} currentTime={currentTime} />
        
        <div className="text-sm text-gray-600 space-y-1">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{event.date} a las {event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className={`font-medium ${isFinished ? 'text-gray-400' : 'text-sport-red'}`}>
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
          <span className={`font-semibold ${isFinished ? 'text-gray-400' : 'text-sport-red'}`}>
            {event.price}
          </span>
          <div className="flex gap-2">
            {isCreated && !isFinished && (
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
};
