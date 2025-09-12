import { useState } from "react";
import { Button } from "@/components/ui/button";
import GuideCard, { Guide } from "./GuideCard";

// Importar las mismas imágenes que usa GuideResults
import guide1Image from "@/assets/guide-1.jpg";
import guide2Image from "@/assets/guide-2.jpg";
import location1Image from "@/assets/location-1.jpg";
import location2Image from "@/assets/location-2.jpg";
import location3Image from "@/assets/location-3.jpg";
import location4Image from "@/assets/location-4.jpg";

// Guías destacados (selección de los mejores)
const featuredGuides: Guide[] = [
  {
    id: "1",
    name: "María González",
    rating: 4.9,
    totalReviews: 127,
    location: "Barcelona",
    availableDays: ["Lunes", "Miércoles", "Viernes", "Sábado"],
    languages: ["Español", "English", "Français"],
    specialties: ["Arte", "Arquitectura", "Gastronomía", "Historia", "Fotografía"],
    biography: "Soy una guía local apasionada con más de 8 años de experiencia mostrando los secretos mejor guardados de Barcelona. Me especializo en arte contemporáneo y gastronomía catalana, y conozco todos los rincones fotogénicos de la ciudad.",
    profileImage: guide1Image,
    locationImages: [location1Image, location3Image, location4Image],
    pricePerHour: 45,
    responseTime: "2 horas",
    isVerified: true,
    yearsExperience: 8
  },
  {
    id: "5",
    name: "Laura Fernández",
    rating: 4.9,
    totalReviews: 203,
    location: "Granada",
    availableDays: ["Lunes", "Jueves", "Sábado"],
    languages: ["Español", "English", "العربية"],
    specialties: ["Alhambra", "Historia", "Arquitectura", "Jardines"],
    biography: "Historiadora del arte especializada en patrimonio andalusí con más de 10 años guiando por la Alhambra y el Albaicín.",
    profileImage: guide1Image,
    locationImages: [location1Image, location3Image, location4Image],
    pricePerHour: 50,
    responseTime: "30 minutos",
    isVerified: true,
    yearsExperience: 10
  },
  {
    id: "25",
    name: "Natalia Gómez",
    rating: 4.9,
    totalReviews: 201,
    location: "Guamo",
    availableDays: ["Lunes", "Martes", "Miércoles"],
    languages: ["Español", "English"],
    specialties: ["Gastronomía", "Mercados", "Cultura Local", "Artesanías"],
    biography: "Nutricionista especializada en gastronomía tradicional tolimense con experiencia en tours gastronómicos únicos.",
    profileImage: guide1Image,
    locationImages: [location4Image, location1Image, location3Image],
    pricePerHour: 38,
    responseTime: "30 minutos",
    isVerified: true,
    yearsExperience: 8
  }
];

// Todos los guías disponibles (importados desde GuideResults)
const allGuides: Guide[] = [
  ...featuredGuides,
  {
    id: "2", 
    name: "Carlos Martín",
    rating: 4.7,
    totalReviews: 89,
    location: "Madrid",
    availableDays: ["Martes", "Jueves", "Domingo"],
    languages: ["Español", "English", "Deutsch"],
    specialties: ["Historia", "Arquitectura", "Museos", "Cultura Local", "Tradiciones"],
    biography: "Historiador de profesión y guía por vocación. Durante los últimos 5 años he ayudado a cientos de visitantes a descubrir la rica historia de Madrid.",
    profileImage: guide2Image,
    locationImages: [location2Image, location1Image, location4Image, location3Image],
    pricePerHour: 40,
    responseTime: "1 hora",
    isVerified: true,
    yearsExperience: 5
  },
  {
    id: "3",
    name: "Ana Rodríguez",
    rating: 4.8,
    totalReviews: 156,
    location: "Sevilla",
    availableDays: ["Lunes", "Martes", "Viernes"],
    languages: ["Español", "English"],
    specialties: ["Flamenco", "Gastronomía", "Historia", "Tradiciones"],
    biography: "Bailaora de flamenco y guía turística especializada en la cultura andaluza.",
    profileImage: guide1Image,
    locationImages: [location1Image, location2Image],
    pricePerHour: 38,
    responseTime: "3 horas",
    isVerified: true,
    yearsExperience: 6
  },
  {
    id: "4",
    name: "Diego López",
    rating: 4.6,
    totalReviews: 78,
    location: "Valencia",
    availableDays: ["Miércoles", "Sábado", "Domingo"],
    languages: ["Español", "Français", "Italiano"],
    specialties: ["Paella", "Ciencia", "Playas", "Arquitectura"],
    biography: "Chef profesional convertido en guía turístico, especializado en experiencias gastronómicas.",
    profileImage: guide2Image,
    locationImages: [location3Image, location4Image],
    pricePerHour: 42,
    responseTime: "1 hora",
    isVerified: true,
    yearsExperience: 4
  },
  // Agregar más guías aquí...
  {
    id: "6",
    name: "Pedro Sánchez",
    rating: 4.5,
    totalReviews: 92,
    location: "Ibagué",
    availableDays: ["Martes", "Viernes", "Sábado"],
    languages: ["Español", "English"],
    specialties: ["Música", "Folclore", "Conservatorio", "Festivales"],
    biography: "Músico y folclorista especializado en la cultura musical tolimense.",
    profileImage: guide2Image,
    locationImages: [location1Image, location2Image],
    pricePerHour: 32,
    responseTime: "2 horas",
    isVerified: true,
    yearsExperience: 7
  }
];

export default function FeaturedGuides() {
  const [showAllGuides, setShowAllGuides] = useState(false);

  const handleContact = (guideId: string) => {
    console.log(`Contactando al guía: ${guideId}`);
    alert(`Redirigiendo al chat con el guía...`);
  };

  const guidesToShow = showAllGuides ? allGuides : featuredGuides;

  return (
    <div className="space-y-8">
      {/* Grid de guías */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {guidesToShow.map((guide) => (
          <GuideCard
            key={guide.id}
            guide={guide}
            onContact={handleContact}
          />
        ))}
      </div>

      {/* Botón para mostrar todos los guías */}
      <div className="text-center">
        <Button
          onClick={() => setShowAllGuides(!showAllGuides)}
          variant="outline"
          size="lg"
          className="bg-surface border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
        >
          {showAllGuides ? "Mostrar solo destacados" : `Ver todos los guías (${allGuides.length} disponibles)`}
        </Button>
        
        {showAllGuides && (
          <p className="text-foreground-muted mt-4">
            Mostrando {allGuides.length} guías disponibles
          </p>
        )}
      </div>
    </div>
  );
}