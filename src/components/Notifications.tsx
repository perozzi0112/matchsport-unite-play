
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, User, Calendar, Heart, MessageCircle } from 'lucide-react';

interface NotificationsProps {
  onBack: () => void;
}

const Notifications = ({ onBack }: NotificationsProps) => {
  const [notifications] = useState([
    {
      id: 1,
      type: 'match',
      title: 'Nuevo partido de fútbol',
      message: 'Carlos creó un partido cerca de ti',
      time: '2h',
      read: false,
      icon: Calendar
    },
    {
      id: 2,
      type: 'like',
      title: 'Le gustó tu publicación',
      message: 'A María le gustó tu foto del partido',
      time: '4h',
      read: false,
      icon: Heart
    },
    {
      id: 3,
      type: 'comment',
      title: 'Nuevo comentario',
      message: 'Juan comentó en tu publicación',
      time: '6h',
      read: true,
      icon: MessageCircle
    },
    {
      id: 4,
      type: 'follow',
      title: 'Nuevo seguidor',
      message: 'Ana comenzó a seguirte',
      time: '1d',
      read: true,
      icon: User
    }
  ]);

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBack}
          className="p-2"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold text-sport-red">Notificaciones</h1>
      </div>

      <div className="space-y-3">
        {notifications.map((notification) => {
          const IconComponent = notification.icon;
          return (
            <Card 
              key={notification.id} 
              className={`cursor-pointer transition-colors ${
                !notification.read ? 'bg-sport-gold/10 border-sport-gold/30' : ''
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-full ${
                    notification.type === 'match' ? 'bg-sport-red/10' :
                    notification.type === 'like' ? 'bg-red-100' :
                    notification.type === 'comment' ? 'bg-blue-100' :
                    'bg-green-100'
                  }`}>
                    <IconComponent className={`w-4 h-4 ${
                      notification.type === 'match' ? 'text-sport-red' :
                      notification.type === 'like' ? 'text-red-500' :
                      notification.type === 'comment' ? 'text-blue-500' :
                      'text-green-500'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{notification.title}</h3>
                    <p className="text-gray-600 text-sm">{notification.message}</p>
                    <span className="text-gray-400 text-xs">{notification.time}</span>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-sport-red rounded-full"></div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Notifications;
