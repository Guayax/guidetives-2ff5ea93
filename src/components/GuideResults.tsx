import { useState } from "react";
import { Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import GuideCard, { Guide } from "./GuideCard";
import { SearchData } from "./SearchForm";

// Datos de ejemplo de guías
import guide1Image from "@/assets/guide-1.jpg";
import guide2Image from "@/assets/guide-2.jpg";
import location1Image from "@/assets/location-1.jpg";
import location2Image from "@/assets/location-2.jpg";
import location3Image from "@/assets/location-3.jpg";
import location4Image from "@/assets/location-4.jpg";

const mockGuides: Guide[] = [
  {
    id: "1",
    name: "María González",
    rating: 4.9,
    totalReviews: 127,
    location: "Barcelona Centro",
    languages: ["Español", "English", "Français"],
    specialties: ["Arte", "Arquitectura", "Gastronomía", "Historia", "Fotografía"],
    biography: "Soy una guía local apasionada con más de 8 años de experiencia mostrando los secretos mejor guardados de Barcelona. Me especializo en arte contemporáneo y gastronomía catalana, y conozco todos los rincones fotogénicos de la ciudad. Mi objetivo es que vivas Barcelona como un auténtico local.",
    profileImage: guide1Image,
    locationImages: [location1Image, location3Image, location4Image],
    pricePerHour: 45,
    responseTime: "2 horas",
    isVerified: true,
    yearsExperience: 8
  },
  {
    id: "2", 
    name: "Carlos Martín",
    rating: 4.7,
    totalReviews: 89,
    location: "Barcelona Gótico",
    languages: ["Español", "English", "Deutsch"],
    specialties: ["Historia", "Arquitectura", "Museos", "Cultura Local", "Tradiciones"],
    biography: "Historiador de profesión y guía por vocación. Durante los últimos 5 años he ayudado a cientos de visitantes a descubrir la rica historia de Barcelona, desde los romanos hasta Gaudí. Conozco todas las leyendas y anécdotas que harán tu visita inolvidable.",
    profileImage: guide2Image,
    locationImages: [location2Image, location1Image, location4Image, location3Image],
    pricePerHour: 40,
    responseTime: "1 hora",
    isVerified: true,
    yearsExperience: 5
  }
];

interface GuideResultsProps {
  searchData: SearchData;
  onNewSearch: () => void;
}

type SortOption = "rating" | "price-low" | "price-high" | "reviews";

export default function GuideResults({ searchData, onNewSearch }: GuideResultsProps) {
  const [sortBy, setSortBy] = useState<SortOption>("rating");
  const [priceFilter, setPriceFilter] = useState<string>("all");
  
  const handleContact = (guideId: string) => {
    // Aquí implementarías la lógica para contactar al guía
    console.log(`Contactando al guía: ${guideId}`);
    alert(`Redirigiendo al chat con el guía...`);
  };

  const filteredAndSortedGuides = mockGuides
    .filter(guide => {
      // Filtrar por ciudad
      if (searchData.city && !guide.location.toLowerCase().includes(searchData.city.toLowerCase())) {
        return false;
      }
      
      // Filtrar por idioma
      if (searchData.language && !guide.languages.includes(searchData.language)) {
        return false;
      }
      
      // Filtrar por intereses - debe coincidir al menos con uno
      if (searchData.selectedInterests.length > 0) {
        const hasMatchingInterest = searchData.selectedInterests.some(interest =>
          guide.specialties.some(specialty => 
            specialty.toLowerCase().includes(interest.toLowerCase()) ||
            interest.toLowerCase().includes(specialty.toLowerCase())
          )
        );
        if (!hasMatchingInterest) return false;
      }
      
      // Filtrar por precio
      if (priceFilter !== "all") {
        if (priceFilter === "budget" && guide.pricePerHour > 35) return false;
        if (priceFilter === "mid" && (guide.pricePerHour <= 35 || guide.pricePerHour > 50)) return false;
        if (priceFilter === "premium" && guide.pricePerHour <= 50) return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "price-low":
          return a.pricePerHour - b.pricePerHour;
        case "price-high":
          return b.pricePerHour - a.pricePerHour;
        case "reviews":
          return b.totalReviews - a.totalReviews;
        default:
          return 0;
      }
    });

  return (
    <div className="space-y-6">
      {/* Header con resumen de búsqueda */}
      <div className="bg-gradient-sky p-6 rounded-lg border border-card-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-foreground">
            Guías disponibles en {searchData.city}
          </h2>
          <Button variant="outline" onClick={onNewSearch} className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            Nueva búsqueda
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-3 items-center text-sm text-foreground-muted">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-primary text-primary">
              📍 {searchData.city}
            </Badge>
            {searchData.date && (
              <Badge variant="outline" className="border-primary text-primary">
                📅 {searchData.date.toLocaleDateString('es-ES')}
              </Badge>
            )}
            <Badge variant="outline" className="border-primary text-primary">
              🗣️ {searchData.language}
            </Badge>
          </div>
        </div>
        
        {searchData.selectedInterests.length > 0 && (
          <div className="mt-3">
            <p className="text-sm text-foreground-muted mb-2">Intereses seleccionados:</p>
            <div className="flex flex-wrap gap-2">
              {searchData.selectedInterests.map((interest) => (
                <Badge key={interest} className="bg-accent text-accent-foreground">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Filtros y ordenamiento */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-surface p-4 rounded-lg border border-card-border">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-foreground-muted" />
            <span className="text-sm font-medium text-foreground">Filtros:</span>
          </div>
          
          <Select value={priceFilter} onValueChange={setPriceFilter}>
            <SelectTrigger className="w-40 bg-surface border-input">
              <SelectValue placeholder="Precio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los precios</SelectItem>
              <SelectItem value="budget">Económico (≤€35/h)</SelectItem>
              <SelectItem value="mid">Intermedio (€35-50/h)</SelectItem>
              <SelectItem value="premium">Premium (&gt;€50/h)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-foreground-muted" />
            <span className="text-sm font-medium text-foreground">Ordenar por:</span>
          </div>
          
          <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
            <SelectTrigger className="w-44 bg-surface border-input">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Mayor puntuación</SelectItem>
              <SelectItem value="reviews">Más reseñas</SelectItem>
              <SelectItem value="price-low">Precio menor</SelectItem>
              <SelectItem value="price-high">Precio mayor</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Resultados */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-foreground-muted">
            Mostrando {filteredAndSortedGuides.length} guías disponibles
          </p>
        </div>

        {filteredAndSortedGuides.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-foreground-muted text-lg mb-4">
              No se encontraron guías que coincidan con tus criterios
            </p>
            <Button onClick={onNewSearch} variant="outline">
              Modificar búsqueda
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredAndSortedGuides.map((guide) => (
              <GuideCard
                key={guide.id}
                guide={guide}
                onContact={handleContact}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}