import { useState } from "react";
import { CalendarIcon, MapPinIcon, TagIcon, LanguagesIcon, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import location1 from "@/assets/location-1.jpg";
import location2 from "@/assets/location-2.jpg";
import location3 from "@/assets/location-3.jpg";
import location4 from "@/assets/location-4.jpg";

const cities = [
  "Barcelona", "Madrid", "Sevilla", "Valencia", "Granada", 
  "Bilbao", "San Sebastián", "Toledo", "Córdoba", "Salamanca"
];

const languages = [
  "Español", "English", "Français", "Deutsch", "Italiano", 
  "Português", "中文", "日本語", "Русский", "العربية"
];

const interests = [
  "Historia", "Arte", "Gastronomía", "Arquitectura", "Museos",
  "Naturaleza", "Playas", "Montaña", "Vida Nocturna", "Compras",
  "Fotografía", "Cultura Local", "Deporte", "Música", "Tradiciones"
];

interface SearchFormProps {
  onSearch: (data: SearchData) => void;
}

export interface SearchData {
  city: string;
  date: Date | undefined;
  language: string;
  selectedInterests: string[];
}

export default function SearchForm({ onSearch }: SearchFormProps) {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [interestInput, setInterestInput] = useState("");

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      city: selectedCity,
      date: selectedDate,
      language: selectedLanguage,
      selectedInterests
    });
  };

  const filteredInterests = interests.filter(interest =>
    interest.toLowerCase().includes(interestInput.toLowerCase()) &&
    !selectedInterests.includes(interest)
  );

  const carouselImages = [
    { src: location1, alt: "Destino turístico 1" },
    { src: location2, alt: "Destino turístico 2" },
    { src: location3, alt: "Destino turístico 3" },
    { src: location4, alt: "Destino turístico 4" }
  ];

  return (
    <div className="space-y-6">
      {/* Carrusel de imágenes */}
      <Carousel className="w-full max-w-4xl mx-auto">
        <CarouselContent>
          {carouselImages.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative h-48 md:h-64 rounded-lg overflow-hidden">
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>

      {/* Formulario de búsqueda */}
      <Card className="p-8 bg-surface/95 backdrop-blur-sm border-card-border shadow-card">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Encuentra tu Guía Perfecto
          </h2>
          <p className="text-foreground-muted">
            Descubre destinos únicos con guías locales especializados
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Ciudad */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-foreground font-medium">
              <MapPinIcon className="w-4 h-4 text-primary" />
              Ciudad de destino
            </Label>
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="bg-surface border-input focus:border-primary focus:ring-2 focus:ring-primary/20">
                <SelectValue placeholder="Selecciona una ciudad" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Fecha */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-foreground font-medium">
              <CalendarIcon className="w-4 h-4 text-primary" />
              Fecha del viaje
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal bg-surface border-input hover:border-primary",
                    !selectedDate && "text-foreground-muted"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP", { locale: es }) : <span>Selecciona una fecha</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Idioma */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-foreground font-medium">
              <LanguagesIcon className="w-4 h-4 text-primary" />
              Idioma del guía
            </Label>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="bg-surface border-input focus:border-primary focus:ring-2 focus:ring-primary/20">
                <SelectValue placeholder="Selecciona un idioma" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {languages.map((language) => (
                  <SelectItem key={language} value={language}>
                    {language}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Intereses */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-foreground font-medium">
              <TagIcon className="w-4 h-4 text-primary" />
              Intereses
            </Label>
            <Input
              type="text"
              placeholder="Buscar intereses..."
              value={interestInput}
              onChange={(e) => setInterestInput(e.target.value)}
              className="bg-surface border-input focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Tags de intereses filtrados */}
        {interestInput && filteredInterests.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm text-foreground-muted">Haz clic para agregar:</p>
            <div className="flex flex-wrap gap-2">
              {filteredInterests.slice(0, 8).map((interest) => (
                <Badge
                  key={interest}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors border-card-border"
                  onClick={() => handleInterestToggle(interest)}
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Intereses seleccionados */}
        {selectedInterests.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm text-foreground-muted">Intereses seleccionados:</p>
            <div className="flex flex-wrap gap-2">
              {selectedInterests.map((interest) => (
                <Badge
                  key={interest}
                  className="bg-primary text-primary-foreground hover:bg-primary-dark cursor-pointer"
                  onClick={() => handleInterestToggle(interest)}
                >
                  {interest} ×
                </Badge>
              ))}
            </div>
          </div>
        )}

        <Button 
          type="submit" 
          size="lg"
          className="w-full bg-gradient-ocean hover:opacity-90 text-primary-foreground font-semibold py-4 transition-all duration-300"
          disabled={!selectedCity || !selectedDate || !selectedLanguage}
        >
          <SearchIcon className="w-5 h-5 mr-2" />
          Buscar Guías Disponibles
        </Button>
      </form>
    </Card>
    </div>
  );
}