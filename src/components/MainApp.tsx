
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Home, Calendar, Users, User, Camera } from 'lucide-react';
import MatchesList from './MatchesList';
import CreateMatch from './CreateMatch';
import UserProfile from './UserProfile';
import SocialFeed from './SocialFeed';

const MainApp = () => {
  const [activeTab, setActiveTab] = useState('matches');

  const renderContent = () => {
    switch (activeTab) {
      case 'matches':
        return <MatchesList />;
      case 'create':
        return <CreateMatch onBack={() => setActiveTab('matches')} />;
      case 'feed':
        return <SocialFeed />;
      case 'profile':
        return <UserProfile />;
      default:
        return <MatchesList />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-sport-gradient">
            Matchsport
          </h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab('profile')}
            className="rounded-full"
          >
            <User className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="pb-20">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex items-center justify-around max-w-md mx-auto py-2">
          <Button
            variant={activeTab === 'matches' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('matches')}
            className={`flex flex-col items-center gap-1 ${
              activeTab === 'matches' ? 'bg-sport-red hover:bg-sport-red/90' : ''
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs">Partidos</span>
          </Button>
          
          <Button
            variant={activeTab === 'feed' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('feed')}
            className={`flex flex-col items-center gap-1 ${
              activeTab === 'feed' ? 'bg-sport-red hover:bg-sport-red/90' : ''
            }`}
          >
            <Camera className="w-5 h-5" />
            <span className="text-xs">Feed</span>
          </Button>
          
          <Button
            variant={activeTab === 'create' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('create')}
            className={`flex flex-col items-center gap-1 ${
              activeTab === 'create' ? 'bg-sport-gold hover:bg-sport-gold/90 text-sport-red' : ''
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span className="text-xs">Crear</span>
          </Button>
          
          <Button
            variant={activeTab === 'profile' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 ${
              activeTab === 'profile' ? 'bg-sport-red hover:bg-sport-red/90' : ''
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="text-xs">Perfil</span>
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default MainApp;
