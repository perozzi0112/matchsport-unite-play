
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Calendar, Award } from 'lucide-react';

interface WelcomeScreenProps {
  onLogin: () => void;
}

const WelcomeScreen = ({ onLogin }: WelcomeScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-sport-gradient flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Match<span className="text-sport-gold">sport</span>
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Conecta, juega, compite
          </p>
          
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 animate-scale-in">
              <Users className="w-8 h-8 text-sport-gold mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Conecta</h3>
              <p className="text-white/80 text-sm">Encuentra deportistas cerca de ti</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <Calendar className="w-8 h-8 text-sport-gold mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Organiza</h3>
              <p className="text-white/80 text-sm">Crea y únete a partidos fácilmente</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <Award className="w-8 h-8 text-sport-gold mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Compite</h3>
              <p className="text-white/80 text-sm">Mejora tu nivel y gana reputación</p>
            </div>
          </div>
        </div>

        {/* Auth Forms */}
        <Card className="w-full max-w-md animate-slide-up">
          <CardHeader>
            <CardTitle className="text-center text-sport-red">¡Únete a Matchsport!</CardTitle>
            <CardDescription className="text-center">
              Empieza a conectar con deportistas hoy
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
                <TabsTrigger value="signup">Registrarse</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-sport-red hover:bg-sport-red/90">
                    Entrar
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Tu nombre"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Contraseña</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-sport-gold hover:bg-sport-gold/90 text-sport-red">
                    Crear cuenta
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WelcomeScreen;
