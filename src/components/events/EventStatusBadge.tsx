
import { Badge } from '@/components/ui/badge';

interface EventStatusBadgeProps {
  date: string;
  time: string;
  currentTime: Date;
}

export const EventStatusBadge = ({ date, time, currentTime }: EventStatusBadgeProps) => {
  const getEventStatus = (date: string, time: string) => {
    const eventDate = new Date(`${date} ${time}`);
    const now = currentTime;
    const diffTime = eventDate.getTime() - now.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffTime < 0) {
      return { status: 'finished', label: 'Finalizado', variant: 'secondary' as const };
    } else if (diffTime <= 2 * 60 * 60 * 1000) { // Próximos 2 horas
      return { 
        status: 'starting-soon', 
        label: 'Iniciando pronto', 
        variant: 'destructive' as const
      };
    } else if (diffDays === 0) {
      return { status: 'today', label: 'Hoy', variant: 'default' as const };
    } else if (diffDays === 1) {
      return { status: 'tomorrow', label: 'Mañana', variant: 'outline' as const };
    } else if (diffDays <= 7) {
      return { status: 'this-week', label: 'Esta semana', variant: 'outline' as const };
    } else {
      return { status: 'upcoming', label: 'Próximo', variant: 'outline' as const };
    }
  };

  const eventStatus = getEventStatus(date, time);
  return <Badge variant={eventStatus.variant}>{eventStatus.label}</Badge>;
};
