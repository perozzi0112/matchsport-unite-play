
import { Timer } from 'lucide-react';

interface CountdownTimerProps {
  date: string;
  time: string;
  currentTime: Date;
}

export const CountdownTimer = ({ date, time, currentTime }: CountdownTimerProps) => {
  const getEventStatus = (date: string, time: string) => {
    const eventDate = new Date(`${date} ${time}`);
    const now = currentTime;
    const diffTime = eventDate.getTime() - now.getTime();
    const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));

    if (diffTime < 0) {
      return { status: 'finished', timeLeft: null };
    } else if (diffTime <= 2 * 60 * 60 * 1000) { // Próximos 2 horas
      return { 
        status: 'starting-soon', 
        timeLeft: { hours: diffHours, minutes: diffMinutes } 
      };
    }
    
    return { status: 'upcoming', timeLeft: null };
  };

  const eventStatus = getEventStatus(date, time);
  
  if (eventStatus.status === 'starting-soon' && eventStatus.timeLeft) {
    const { hours, minutes } = eventStatus.timeLeft;
    return (
      <div className="flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded-lg">
        <Timer className="w-4 h-4 text-red-600 animate-pulse" />
        <div className="text-sm">
          <span className="font-semibold text-red-600">
            Inicia en: {hours}h {minutes}m
          </span>
        </div>
      </div>
    );
  }
  
  return null;
};
