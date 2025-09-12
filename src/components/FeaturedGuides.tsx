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

// Todos los guías disponibles
const allGuides: Guide[] = [
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
  // Generar más guías hasta llegar a ~150
  ...Array.from({ length: 145 }, (_, index) => {
    const cities = ["Madrid", "Barcelona", "Sevilla", "Valencia", "Granada", "Bilbao", "Salamanca", "Toledo", "Córdoba", "Cádiz", "Málaga", "Zaragoza", "Murcia", "Palma", "Las Palmas", "Santander", "Oviedo", "Pamplona", "Vitoria", "Logroño", "Ibagué", "Guamo", "Espinal", "Melgar", "Honda"];
    const names = ["María", "Carlos", "Ana", "Diego", "Laura", "Pedro", "Carmen", "Francisco", "Isabel", "Alejandro", "Pilar", "Manuel", "Rosa", "Antonio", "Dolores", "José", "Concepción", "Ángel", "Josefa", "Jesús"];
    const surnames = ["García", "Rodríguez", "González", "Fernández", "López", "Martínez", "Sánchez", "Pérez", "Gómez", "Martín", "Jiménez", "Ruiz", "Hernández", "Díaz", "Moreno", "Muñoz", "Álvarez", "Romero", "Alonso", "Gutiérrez"];
    const specialtiesList = [
      ["Arte", "Museos", "Galerías"], 
      ["Historia", "Arquitectura", "Monumentos"], 
      ["Gastronomía", "Mercados", "Restaurantes"], 
      ["Flamenco", "Música", "Danza"], 
      ["Naturaleza", "Senderismo", "Parques"],
      ["Fotografía", "Tours fotográficos", "Paisajes"],
      ["Cultura Local", "Tradiciones", "Festivales"],
      ["Compras", "Artesanías", "Souvenirs"],
      ["Vida Nocturna", "Bares", "Discotecas"],
      ["Familia", "Niños", "Actividades familiares"]
    ];
    const languages = [
      ["Español", "English"],
      ["Español", "English", "Français"],
      ["Español", "English", "Deutsch"],
      ["Español", "English", "Italiano"],
      ["Español", "English", "Português"],
      ["Español", "English", "中文"],
      ["Español", "English", "日本語"],
      ["Español", "English", "Русский"]
    ];
    const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    
    const cityIndex = (index + 6) % cities.length;
    const nameIndex = (index + 6) % names.length;
    const surnameIndex = (index + 6) % surnames.length;
    const specialtyIndex = (index + 6) % specialtiesList.length;
    const languageIndex = (index + 6) % languages.length;
    const imageIndex = (index + 6) % 2;
    
    return {
      id: `${index + 7}`,
      name: `${names[nameIndex]} ${surnames[surnameIndex]}`,
      rating: Number((4.2 + Math.random() * 0.8).toFixed(1)),
      totalReviews: Math.floor(Math.random() * 200) + 20,
      location: cities[cityIndex],
      availableDays: days.slice(0, Math.floor(Math.random() * 4) + 2),
      languages: languages[languageIndex],
      specialties: specialtiesList[specialtyIndex],
      biography: `Guía profesional especializado en ${specialtiesList[specialtyIndex].join(", ").toLowerCase()} con años de experiencia en ${cities[cityIndex]}.`,
      profileImage: imageIndex === 0 ? guide1Image : guide2Image,
      locationImages: [location1Image, location2Image, location3Image, location4Image].slice(0, Math.floor(Math.random() * 3) + 1),
      pricePerHour: Math.floor(Math.random() * 30) + 25,
      responseTime: ["30 minutos", "1 hora", "2 horas", "3 horas"][Math.floor(Math.random() * 4)],
      isVerified: Math.random() > 0.2,
      yearsExperience: Math.floor(Math.random() * 10) + 2
    };
  })
];

export default function FeaturedGuides() {
  const [showAllGuides, setShowAllGuides] = useState(false);

  const handleContact = (guideId: string) => {
    console.log(`Contactando al guía: ${guideId}`);
    alert(`Redirigiendo al chat con el guía...`);
  };

  return (
    <div className="space-y-8">
      {/* Mostrar guías solo cuando se presiona el botón */}
      {showAllGuides && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {allGuides.map((guide) => (
            <GuideCard
              key={guide.id}
              guide={guide}
              onContact={handleContact}
            />
          ))}
        </div>
      )}

      {/* Botón para mostrar todos los guías */}
      <div className="text-center">
        <Button
          onClick={() => setShowAllGuides(!showAllGuides)}
          variant="outline"
          size="lg"
          className="bg-surface border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
        >
          {showAllGuides ? "Ocultar guías" : `Ver todos los guías (${allGuides.length} disponibles)`}
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