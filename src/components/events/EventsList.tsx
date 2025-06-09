
import { AlertCircle, Clock, Calendar, Trophy, Star } from 'lucide-react';
import { EventCard } from './EventCard';

interface EventsListProps {
  events: any[];
  isCreated?: boolean;
  currentTime: Date;
  onEventClick: (event: any) => void;
}

export const EventsList = ({ events, isCreated = false, currentTime, onEventClick }: EventsListProps) => {
  const separateEventsByStatus = (events: any[]) => {
    const upcoming = events.filter(event => {
      const eventDate = new Date(`${event.date} ${event.time}`);
      return eventDate.getTime() > currentTime.getTime();
    });
    
    const finished = events.filter(event => {
      const eventDate = new Date(`${event.date} ${event.time}`);
      return eventDate.getTime() <= currentTime.getTime();
    });

    const sortEventsByDate = (events: any[]) => {
      return events.sort((a, b) => {
        const dateA = new Date(`${a.date} ${a.time}`);
        const dateB = new Date(`${b.date} ${b.time}`);
        return dateA.getTime() - dateB.getTime();
      });
    };

    return { upcoming: sortEventsByDate(upcoming), finished: sortEventsByDate(finished) };
  };

  const { upcoming, finished } = separateEventsByStatus(events);

  if (events.length === 0) {
    return (
      <div className="text-center py-8">
        {isCreated ? (
          <>
            <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No has creado ningún evento aún</p>
            <p className="text-sm text-gray-400 mt-1">
              Crea tu primer partido y organiza un evento
            </p>
          </>
        ) : (
          <>
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No te has registrado en ningún evento aún</p>
            <p className="text-sm text-gray-400 mt-1">
              Explora los partidos disponibles para unirte
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {upcoming.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-green-600 mb-4">
            {isCreated ? (
              <Star className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            <span>
              {isCreated ? 'Eventos próximos' : 'Próximos eventos'} ({upcoming.length})
            </span>
          </div>
          {upcoming.map((event) => (
            <EventCard 
              key={event.id} 
              event={event} 
              isCreated={isCreated}
              currentTime={currentTime}
              onEventClick={onEventClick}
            />
          ))}
        </div>
      )}
      
      {finished.length > 0 && (
        <div className="space-y-4 mt-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            {isCreated ? (
              <Trophy className="w-4 h-4" />
            ) : (
              <Clock className="w-4 h-4" />
            )}
            <span>Eventos finalizados ({finished.length})</span>
          </div>
          {finished.map((event) => (
            <EventCard 
              key={event.id} 
              event={event} 
              isCreated={isCreated}
              currentTime={currentTime}
              onEventClick={onEventClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};
