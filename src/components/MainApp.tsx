
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Home, Calendar, Users, User, Camera, Bell, Search as SearchIcon, CalendarCheck } from 'lucide-react';
import MatchesList from './MatchesList';
import CreateMatch from './CreateMatch';
import UserProfile from './UserProfile';
import SocialFeed from './SocialFeed';
import CreatePost from './CreatePost';
import Notifications from './Notifications';
import Search from './Search';
import MyEvents from './MyEvents';

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
      case 'create-post':
        return <CreatePost onBack={() => setActiveTab('feed')} />;
      case 'profile':
        return <UserProfile />;
      case 'notifications':
        return <Notifications onBack={() => setActiveTab('matches')} />;
      case 'search':
        return <Search onBack={() => setActiveTab('matches')} />;
      case 'my-events':
        return <MyEvents />;
      default:
        return <MatchesList />;
    }
  };

  const showBottomNav = !['create', 'create-post', 'notifications', 'search'].includes(activeTab);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-sport-gradient">
            Matchsport
          </h1>
          <div className="flex items-center gap-2">
            {/* Search Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab('search')}
              className="rounded-full p-2"
            >
              <SearchIcon className="w-5 h-5" />
            </Button>
            
            {/* Notifications Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab('notifications')}
              className="rounded-full p-2 relative"
            >
              <Bell className="w-5 h-5" />
              {/* Notification Badge */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-sport-red rounded-full"></div>
            </Button>
            
            {/* Profile Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab('profile')}
              className="rounded-full p-2"
            >
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Content with top padding for fixed header */}
      <main className={`pt-16 ${showBottomNav ? 'pb-20' : ''}`}>
        {renderContent()}
      </main>

      {/* Bottom Navigation - Only show for main tabs */}
      {showBottomNav && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
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
              variant={activeTab === 'my-events' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('my-events')}
              className={`flex flex-col items-center gap-1 ${
                activeTab === 'my-events' ? 'bg-sport-red hover:bg-sport-red/90' : ''
              }`}
            >
              <CalendarCheck className="w-5 h-5" />
              <span className="text-xs">Mis Eventos</span>
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
      )}
    </div>
  );
};

export default MainApp;
