
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Image, Video, MapPin } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { usePosts } from '@/hooks/usePosts';

interface CreatePostProps {
  onBack: () => void;
}

const CreatePost = ({ onBack }: CreatePostProps) => {
  const { createPost } = usePosts();
  const [postText, setPostText] = useState('');
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!postText.trim()) {
      toast({
        title: "Error",
        description: "Escribe algo para compartir",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await createPost({
        content: postText,
        media_url: selectedMedia,
        media_type: mediaType,
        location: null // TODO: Add location selection
      });

      if (error) {
        toast({
          title: "Error",
          description: "Error al crear el post",
          variant: "destructive"
        });
      } else {
        toast({
          title: "¡Post publicado!",
          description: "Tu contenido ha sido compartido exitosamente",
        });
        onBack();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error inesperado al crear el post",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMediaSelect = (type: 'image' | 'video') => {
    setMediaType(type);
    // Simular selección de archivo
    const mockUrl = type === 'image' 
      ? 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'
      : 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400&h=400&fit=crop';
    setSelectedMedia(mockUrl);
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
        <h1 className="text-2xl font-bold text-sport-red">Crear Post</h1>
      </div>

      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="text-sport-red">Comparte tu momento deportivo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Text Input */}
          <Textarea
            placeholder="¿Qué está pasando en tu deporte?"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            rows={4}
            className="resize-none"
          />

          {/* Media Preview */}
          {selectedMedia && (
            <div className="relative rounded-lg overflow-hidden">
              <img 
                src={selectedMedia} 
                alt="Selected media"
                className="w-full h-48 object-cover"
              />
              {mediaType === 'video' && (
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  Video
                </div>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedMedia(null);
                  setMediaType(null);
                }}
                className="absolute top-2 left-2 bg-black/50 text-white hover:bg-black/70"
              >
                ✕
              </Button>
            </div>
          )}

          {/* Media Actions */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleMediaSelect('image')}
              className="flex items-center gap-2"
            >
              <Image className="w-4 h-4" />
              Foto
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleMediaSelect('video')}
              className="flex items-center gap-2"
            >
              <Video className="w-4 h-4" />
              Video
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              Ubicación
            </Button>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button 
              variant="outline" 
              onClick={onBack}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex-1 bg-sport-gold hover:bg-sport-gold/90 text-sport-red"
            >
              {isLoading ? "Publicando..." : "Publicar"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePost;
