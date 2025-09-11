import { useState } from "react";
import { Star, MapPin, MessageCircle, Heart, Camera, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export interface Guide {
  id: string;
  name: string;
  rating: number;
  totalReviews: number;
  location: string;
  languages: string[];
  specialties: string[];
  biography: string;
  profileImage: string;
  locationImages: string[];
  pricePerHour: number;
  responseTime: string;
  isVerified: boolean;
  yearsExperience: number;
}

interface GuideCardProps {
  guide: Guide;
  onContact: (guideId: string) => void;
}

export default function GuideCard({ guide, onContact }: GuideCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          "w-4 h-4",
          i < Math.floor(rating) 
            ? "text-rating-gold fill-rating-gold" 
            : i < rating 
            ? "text-rating-gold fill-rating-gold opacity-50"
            : "text-rating-silver"
        )}
      />
    ));
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === guide.locationImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? guide.locationImages.length - 1 : prev - 1
    );
  };

  return (
    <Card className="overflow-hidden bg-surface border-card-border shadow-card hover:shadow-card-hover transition-all duration-300 animate-fade-in group">
      <div className="relative">
        {/* Imagen principal del lugar */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={guide.locationImages[currentImageIndex]}
            alt={`Lugar favorito de ${guide.name}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Controles de imagen */}
          {guide.locationImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-surface/80 hover:bg-surface rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Camera className="w-4 h-4" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-surface/80 hover:bg-surface rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Camera className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Indicadores de imagen */}
          {guide.locationImages.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {guide.locationImages.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors",
                    index === currentImageIndex ? "bg-primary" : "bg-surface/60"
                  )}
                />
              ))}
            </div>
          )}

          {/* Botón de favorito */}
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-3 right-3 p-2 rounded-full bg-surface/80 hover:bg-surface transition-colors"
          >
            <Heart className={cn(
              "w-4 h-4 transition-colors",
              isFavorite ? "text-destructive fill-destructive" : "text-foreground-muted"
            )} />
          </button>

          {/* Badge de verificado */}
          {guide.isVerified && (
            <Badge className="absolute top-3 left-3 bg-success text-white">
              ✓ Verificado
            </Badge>
          )}
        </div>
      </div>

      <CardContent className="p-6">
        {/* Información del guía */}
        <div className="flex items-start gap-4 mb-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={guide.profileImage} alt={guide.name} />
            <AvatarFallback>{guide.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-lg text-foreground truncate">
                {guide.name}
              </h3>
              <div className="text-right">
                <p className="font-semibold text-primary">
                  €{guide.pricePerHour}/hora
                </p>
              </div>
            </div>
            
            {/* Rating y ubicación */}
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                {renderStars(guide.rating)}
                <span className="text-sm text-foreground-muted ml-1">
                  {guide.rating} ({guide.totalReviews} reseñas)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-foreground-muted mb-3">
              <MapPin className="w-4 h-4" />
              <span>{guide.location}</span>
              <Clock className="w-4 h-4 ml-2" />
              <span>Responde en {guide.responseTime}</span>
            </div>
          </div>
        </div>

        {/* Biografía */}
        <p className="text-foreground-muted text-sm mb-4 line-clamp-3">
          {guide.biography}
        </p>

        {/* Especialidades */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-foreground mb-2">Especialidades:</h4>
          <div className="flex flex-wrap gap-1">
            {guide.specialties.slice(0, 4).map((specialty) => (
              <Badge key={specialty} variant="secondary" className="text-xs">
                {specialty}
              </Badge>
            ))}
            {guide.specialties.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{guide.specialties.length - 4} más
              </Badge>
            )}
          </div>
        </div>

        {/* Idiomas */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-foreground mb-2">Idiomas:</h4>
          <div className="flex flex-wrap gap-1">
            {guide.languages.map((language) => (
              <Badge key={language} variant="outline" className="text-xs border-primary text-primary">
                {language}
              </Badge>
            ))}
          </div>
        </div>

        {/* Botón de contacto */}
        <Button 
          onClick={() => onContact(guide.id)}
          className="w-full bg-gradient-sunset hover:opacity-90 text-primary-foreground font-medium transition-all duration-300"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Contactar Guía
        </Button>
      </CardContent>
    </Card>
  );
}