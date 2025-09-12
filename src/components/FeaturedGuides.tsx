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
  // Generar base de datos extensa de guías (300+ perfiles)
  ...Array.from({ length: 350 }, (_, index) => {
    const cities = [
      // España
      "Madrid", "Barcelona", "Sevilla", "Valencia", "Granada", "Bilbao", "Salamanca", "Toledo", "Córdoba", "Cádiz", 
      "Málaga", "Zaragoza", "Murcia", "Palma", "Las Palmas", "Santander", "Oviedo", "Pamplona", "Vitoria", "Logroño",
      "Burgos", "León", "Girona", "Tarragona", "Alicante", "Vigo", "Coruña", "Santiago", "Cáceres", "Badajoz",
      // Colombia
      "Ibagué", "Guamo", "Espinal", "Melgar", "Honda", "Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena",
      "Santa Marta", "Bucaramanga", "Pereira", "Manizales", "Armenia", "Cúcuta", "Villavicencio", "Pasto", "Montería",
      // Internacional
      "París", "Londres", "Roma", "Berlín", "Ámsterdam", "Viena", "Praga", "Budapest", "Varsovia", "Estocolmo",
      "Lisboa", "Atenas", "Dubrovnik", "Florencia", "Venecia", "Múnich", "Zurich", "Copenhague", "Oslo", "Helsinki"
    ];
    
    const names = [
      "María", "Carlos", "Ana", "Diego", "Laura", "Pedro", "Carmen", "Francisco", "Isabel", "Alejandro",
      "Pilar", "Manuel", "Rosa", "Antonio", "Dolores", "José", "Concepción", "Ángel", "Josefa", "Jesús",
      "Elena", "Miguel", "Patricia", "Luis", "Cristina", "Javier", "Beatriz", "Fernando", "Raquel", "Alberto",
      "Mónica", "Rafael", "Silvia", "Sergio", "Natalia", "Marcos", "Gloria", "Rubén", "Irene", "Pablo",
      "Lucía", "Andrés", "Verónica", "Óscar", "Alicia", "Víctor", "Sandra", "Iván", "Nuria", "Adrián"
    ];
    
    const surnames = [
      "García", "Rodríguez", "González", "Fernández", "López", "Martínez", "Sánchez", "Pérez", "Gómez", "Martín",
      "Jiménez", "Ruiz", "Hernández", "Díaz", "Moreno", "Muñoz", "Álvarez", "Romero", "Alonso", "Gutiérrez",
      "Navarro", "Torres", "Domínguez", "Vázquez", "Ramos", "Gil", "Ramírez", "Serrano", "Blanco", "Molina",
      "Morales", "Suárez", "Ortega", "Delgado", "Castro", "Ortiz", "Rubio", "Marín", "Sanz", "Iglesias"
    ];
    
    const languageCombinations = [
      ["Español"],
      ["Español", "English"],
      ["Español", "English", "Français"],
      ["Español", "English", "Deutsch"],
      ["Español", "English", "Italiano"],
      ["Español", "English", "Português"],
      ["Español", "Français"],
      ["Español", "Deutsch"],
      ["Español", "Italiano"],
      ["Español", "English", "中文"],
      ["Español", "English", "日本語"],
      ["Español", "English", "Русский"],
      ["Español", "English", "العربية"],
      ["Español", "English", "한국어"],
      ["Español", "Français", "Italiano"],
      ["Español", "Deutsch", "English"],
      ["English", "Français", "Deutsch"],
      ["Español", "English", "Nederlands"],
      ["Español", "English", "Svenska"],
      ["Español", "English", "Polski"],
      ["Español", "Català"],
      ["Español", "Euskera"],
      ["Español", "Galego"],
      ["Español", "English", "Português", "Français"],
      ["Español", "English", "Deutsch", "Italiano"]
    ];
    
    const availabilityPatterns = [
      ["Lunes"],
      ["Martes"],
      ["Miércoles"],
      ["Jueves"],
      ["Viernes"],
      ["Sábado"],
      ["Domingo"],
      ["Lunes", "Miércoles"],
      ["Martes", "Jueves"],
      ["Miércoles", "Viernes"],
      ["Jueves", "Sábado"],
      ["Viernes", "Domingo"],
      ["Sábado", "Domingo"],
      ["Lunes", "Miércoles", "Viernes"],
      ["Martes", "Jueves", "Sábado"],
      ["Lunes", "Martes", "Miércoles"],
      ["Jueves", "Viernes", "Sábado"],
      ["Viernes", "Sábado", "Domingo"],
      ["Lunes", "Miércoles", "Viernes", "Domingo"],
      ["Martes", "Jueves", "Sábado", "Domingo"],
      ["Lunes", "Martes", "Miércoles", "Jueves"],
      ["Miércoles", "Jueves", "Viernes", "Sábado"],
      ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
      ["Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
      ["Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
      ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
      ["Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
      ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]
    ];
    
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
      ["Familia", "Niños", "Actividades familiares"],
      ["Deportes", "Aventura", "Actividades extremas"],
      ["Espiritualidad", "Templos", "Peregrinación"],
      ["Literatura", "Rutas literarias", "Bibliotecas"],
      ["Ciencia", "Museos científicos", "Tecnología"],
      ["Vinos", "Bodegas", "Catas"],
      ["Playas", "Deportes acuáticos", "Costa"],
      ["Montaña", "Escalada", "Esquí"],
      ["Turismo rural", "Granjas", "Ecoturismo"],
      ["Moda", "Diseño", "Tendencias"],
      ["Medicina tradicional", "Spa", "Wellness"],
      ["Negocios", "Networking", "Empresarial"],
      ["Estudiantes", "Intercambio", "Universidad"],
      ["LGBTQ+", "Comunidad", "Inclusión"],
      ["Accesibilidad", "Turismo adaptado", "Inclusivo"],
      ["Lujo", "Experiencias premium", "VIP"]
    ];
    
    const cityIndex = index % cities.length;
    const nameIndex = index % names.length;
    const surnameIndex = (index + 17) % surnames.length;
    const languageIndex = index % languageCombinations.length;
    const availabilityIndex = index % availabilityPatterns.length;
    const specialtyIndex = index % specialtiesList.length;
    const imageIndex = index % 2;
    
    return {
      id: `${index + 7}`,
      name: `${names[nameIndex]} ${surnames[surnameIndex]}`,
      rating: Number((4.0 + Math.random() * 1.0).toFixed(1)),
      totalReviews: Math.floor(Math.random() * 300) + 15,
      location: cities[cityIndex],
      availableDays: availabilityPatterns[availabilityIndex],
      languages: languageCombinations[languageIndex],
      specialties: specialtiesList[specialtyIndex],
      biography: `Guía ${languageCombinations[languageIndex].length > 2 ? 'multilingüe' : 'profesional'} especializado en ${specialtiesList[specialtyIndex].join(", ").toLowerCase()} en ${cities[cityIndex]}. Disponible ${availabilityPatterns[availabilityIndex].join(", ")}.`,
      profileImage: imageIndex === 0 ? guide1Image : guide2Image,
      locationImages: [location1Image, location2Image, location3Image, location4Image].slice(0, Math.floor(Math.random() * 4) + 1),
      pricePerHour: Math.floor(Math.random() * 40) + 20,
      responseTime: ["15 minutos", "30 minutos", "1 hora", "2 horas", "3 horas"][Math.floor(Math.random() * 5)],
      isVerified: Math.random() > 0.15,
      yearsExperience: Math.floor(Math.random() * 15) + 1
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