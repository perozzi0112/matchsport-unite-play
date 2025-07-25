import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Calendar, MapPin, Users, DollarSign, Camera, Navigation } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useMatches } from '@/hooks/useMatches';
import { useSports } from '@/hooks/useSports';

interface CreateMatchProps {
  onBack: () => void;
}

const CreateMatch = ({ onBack }: CreateMatchProps) => {
  const { createMatch } = useMatches();
  const { sports } = useSports();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    sport: '',
    level: '',
    date: '',
    time: '',
    location: '',
    maxParticipants: '',
    price: '',
    description: ''
  });

  const [venuePhotos, setVenuePhotos] = useState<string[]>([]);
  const [gpsLocation, setGpsLocation] = useState<{lat: number, lng: number} | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.title || !formData.sport || !formData.level || !formData.date || !formData.time || !formData.location || !formData.maxParticipants) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // Buscar el sport_id basado en el nombre seleccionado
      const selectedSport = sports.find(sport => sport.name === formData.sport);
      if (!selectedSport) {
        toast({
          title: "Error",
          description: "Deporte no válido",
          variant: "destructive"
        });
        return;
      }

      // Combinar fecha y hora
      const dateTime = new Date(`${formData.date}T${formData.time}`).toISOString();

      const matchData = {
        title: formData.title,
        description: formData.description || null,
        sport_id: selectedSport.id,
        location: formData.location,
        latitude: gpsLocation?.lat || null,
        longitude: gpsLocation?.lng || null,
        date_time: dateTime,
        max_participants: parseInt(formData.maxParticipants),
        price: formData.price ? parseFloat(formData.price) : 0,
        skill_level: formData.level,
        venue_photos: venuePhotos.length > 0 ? venuePhotos : null
      };

      const { error } = await createMatch(matchData);

      if (error) {
        toast({
          title: "Error",
          description: "Error al crear el partido",
          variant: "destructive"
        });
      } else {
        toast({
          title: "¡Partido creado!",
          description: "Tu partido ha sido publicado exitosamente",
        });
        
        // Resetear formulario y volver
        setFormData({
          title: '',
          sport: '',
          level: '',
          date: '',
          time: '',
          location: '',
          maxParticipants: '',
          price: '',
          description: ''
        });
        setVenuePhotos([]);
        setGpsLocation(null);
        
        onBack();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error inesperado al crear el partido",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addVenuePhoto = () => {
    // Simular agregar foto del lugar
    const mockPhotoUrl = `https://images.unsplash.com/photo-157101961345${venuePhotos.length + 4}-1cb2f99b2d8b?w=300&h=200&fit=crop`;
    setVenuePhotos(prev => [...prev, mockPhotoUrl]);
  };

  const removeVenuePhoto = (index: number) => {
    setVenuePhotos(prev => prev.filter((_, i) => i !== index));
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGpsLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          toast({
            title: "Ubicación obtenida",
            description: "Ubicación actual capturada correctamente",
          });
        },
        () => {
          toast({
            title: "Error",
            description: "No se pudo obtener la ubicación",
            variant: "destructive"
          });
        }
      );
    }
  };

  const openInMaps = () => {
    if (gpsLocation) {
      const url = `https://www.google.com/maps?q=${gpsLocation.lat},${gpsLocation.lng}`;
      window.open(url, '_blank');
    } else if (formData.location) {
      const url = `https://www.google.com/maps/search/${encodeURIComponent(formData.location)}`;
      window.open(url, '_blank');
    }
  };

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
        <h1 className="text-2xl font-bold text-sport-red">Crear Partido</h1>
      </div>

      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="text-sport-red">Nuevo Partido</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Título */}
            <div className="space-y-2">
              <Label htmlFor="title">Título del partido *</Label>
              <Input
                id="title"
                placeholder="ej. Fútbol 5 - Cancha Norte"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
              />
            </div>

            {/* Deporte y Nivel */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="sport">Deporte *</Label>
                <Select value={formData.sport} onValueChange={(value) => handleInputChange('sport', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    {sports.map((sport) => (
                      <SelectItem key={sport.id} value={sport.name}>
                        {sport.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="level">Nivel *</Label>
                <Select value={formData.level} onValueChange={(value) => handleInputChange('level', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Principiante">Principiante</SelectItem>
                    <SelectItem value="Intermedio">Intermedio</SelectItem>
                    <SelectItem value="Avanzado">Avanzado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Fecha y Hora */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="date">Fecha *</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="date"
                    type="date"
                    className="pl-10"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time">Hora *</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Ubicación con GPS */}
            <div className="space-y-2">
              <Label htmlFor="location">Ubicación *</Label>
              <div className="space-y-2">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="location"
                    placeholder="ej. Cancha Norte, Centro"
                    className="pl-10"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={getCurrentLocation}
                    className="flex items-center gap-1"
                  >
                    <Navigation className="w-4 h-4" />
                    Mi ubicación
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={openInMaps}
                    className="flex items-center gap-1"
                  >
                    <MapPin className="w-4 h-4" />
                    Abrir en Maps
                  </Button>
                </div>
                {gpsLocation && (
                  <div className="text-xs text-green-600">
                    Ubicación GPS: {gpsLocation.lat.toFixed(6)}, {gpsLocation.lng.toFixed(6)}
                  </div>
                )}
              </div>
            </div>

            {/* Fotos del lugar */}
            <div className="space-y-2">
              <Label>Fotos del lugar</Label>
              <div className="space-y-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addVenuePhoto}
                  className="flex items-center gap-2"
                >
                  <Camera className="w-4 h-4" />
                  Agregar foto del lugar
                </Button>
                
                {venuePhotos.length > 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    {venuePhotos.map((photo, index) => (
                      <div key={index} className="relative">
                        <img 
                          src={photo} 
                          alt={`Foto del lugar ${index + 1}`}
                          className="w-full h-24 object-cover rounded"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeVenuePhoto(index)}
                          className="absolute top-1 right-1 bg-black/50 text-white hover:bg-black/70 h-6 w-6 p-0"
                        >
                          ✕
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Participantes y Precio */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="maxParticipants">Máx. participantes *</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="maxParticipants"
                    type="number"
                    placeholder="10"
                    className="pl-10"
                    min="2"
                    max="50"
                    value={formData.maxParticipants}
                    onChange={(e) => handleInputChange('maxParticipants', e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="price">Precio</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="price"
                    placeholder="$15.000 o Gratis"
                    className="pl-10"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Descripción */}
            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                placeholder="Describe tu partido, reglas especiales, lo que incluye el precio, etc."
                rows={3}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </div>

            {/* Botones */}
            <div className="flex gap-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onBack}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading}
                className="flex-1 bg-sport-gold hover:bg-sport-gold/90 text-sport-red"
              >
                {isLoading ? "Creando..." : "Crear Partido"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateMatch;
