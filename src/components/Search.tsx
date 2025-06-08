
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, User, Calendar, Camera, MapPin } from 'lucide-react';

interface SearchProps {
  onBack: () => void;
}

const Search = ({ onBack }: SearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const searchResults = [
    {
      id: 1,
      type: 'user',
      title: 'Carlos Mendoza',
      subtitle: 'Fútbol • Nivel Intermedio',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      icon: User
    },
    {
      id: 2,
      type: 'match',
      title: 'Partido de Fútbol',
      subtitle: 'Hoy 18:00 • Parque Central',
      image: null,
      icon: Calendar
    },
    {
      id: 3,
      type: 'post',
      title: 'Gran partido de ayer',
      subtitle: 'María González • 2h',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop',
      icon: Camera
    },
    {
      id: 4,
      type: 'user',
      title: 'Ana Silva',
      subtitle: 'Tenis • Nivel Avanzado',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b002?w=100&h=100&fit=crop&crop=face',
      icon: User
    }
  ];

  const filteredResults = searchResults.filter(result => {
    const matchesQuery = result.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || result.type === activeTab;
    return matchesQuery && matchesTab;
  });

  const tabs = [
    { id: 'all', label: 'Todo' },
    { id: 'user', label: 'Personas' },
    { id: 'match', label: 'Partidos' },
    { id: 'post', label: 'Posts' }
  ];

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
        <h1 className="text-2xl font-bold text-sport-red">Buscar</h1>
      </div>

      {/* Search Input */}
      <div className="mb-4">
        <Input
          placeholder="Buscar personas, partidos o publicaciones..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab(tab.id)}
            className={`whitespace-nowrap ${
              activeTab === tab.id ? 'bg-sport-red hover:bg-sport-red/90' : ''
            }`}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Search Results */}
      <div className="space-y-3">
        {filteredResults.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-500">No se encontraron resultados</p>
            </CardContent>
          </Card>
        ) : (
          filteredResults.map((result) => {
            const IconComponent = result.icon;
            return (
              <Card key={result.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    {result.image ? (
                      <img 
                        src={result.image} 
                        alt={result.title}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-sport-red/10 rounded-full flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-sport-red" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold">{result.title}</h3>
                      <p className="text-gray-600 text-sm">{result.subtitle}</p>
                    </div>
                    <div className="text-gray-400">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Search;
