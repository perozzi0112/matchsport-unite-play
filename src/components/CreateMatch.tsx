
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Calendar, MapPin, Users, DollarSign } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface CreateMatchProps {
  onBack: () => void;
}

const CreateMatch = ({ onBack }: CreateMatchProps) => {
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

  const handleSubmit = (e: React.FormEvent) => {
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

    // Simular creación del partido
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
    
    onBack();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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
                    <SelectItem value="Fútbol">Fútbol</SelectItem>
                    <SelectItem value="Tenis">Tenis</SelectItem>
                    <SelectItem value="Básquet">Básquet</SelectItem>
                    <SelectItem value="Voleibol">Voleibol</SelectItem>
                    <SelectItem value="Pádel">Pádel</SelectItem>
                    <SelectItem value="Running">Running</SelectItem>
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

            {/* Ubicación */}
            <div className="space-y-2">
              <Label htmlFor="location">Ubicación *</Label>
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
                className="flex-1 bg-sport-gold hover:bg-sport-gold/90 text-sport-red"
              >
                Crear Partido
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateMatch;
