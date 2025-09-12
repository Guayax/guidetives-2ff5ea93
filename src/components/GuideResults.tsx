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
    location: "Barcelona",
    availableDays: ["Lunes", "Miércoles", "Viernes", "Sábado"],
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
    location: "Madrid",
    availableDays: ["Martes", "Jueves", "Domingo"],
    languages: ["Español", "English", "Deutsch"],
    specialties: ["Historia", "Arquitectura", "Museos", "Cultura Local", "Tradiciones"],
    biography: "Historiador de profesión y guía por vocación. Durante los últimos 5 años he ayudado a cientos de visitantes a descubrir la rica historia de Barcelona, desde los romanos hasta Gaudí. Conozco todas las leyendas y anécdotas que harán tu visita inolvidable.",
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
  {
    id: "5",
    name: "Laura Fernández",
    rating: 4.9,
    totalReviews: 203,
    location: "Granada",
    availableDays: ["Lunes", "Jueves", "Sábado"],
    languages: ["Español", "English", "العربية"],
    specialties: ["Alhambra", "Historia", "Arquitectura", "Jardines"],
    biography: "Historiadora del arte especializada en patrimonio andalusí.",
    profileImage: guide1Image,
    locationImages: [location1Image, location3Image, location4Image],
    pricePerHour: 50,
    responseTime: "30 minutos",
    isVerified: true,
    yearsExperience: 10
  },
  {
    id: "6",
    name: "Miguel Santos",
    rating: 4.5,
    totalReviews: 92,
    location: "Bilbao",
    availableDays: ["Martes", "Viernes", "Domingo"],
    languages: ["Español", "English", "Euskera"],
    specialties: ["Guggenheim", "Pintxos", "Cultura Vasca", "Arte Moderno"],
    biography: "Artista local y conocedor profundo de la cultura vasca contemporánea.",
    profileImage: guide2Image,
    locationImages: [location2Image, location4Image],
    pricePerHour: 44,
    responseTime: "2 horas",
    isVerified: true,
    yearsExperience: 7
  },
  {
    id: "7",
    name: "Carmen Jiménez",
    rating: 4.7,
    totalReviews: 134,
    location: "San Sebastián",
    availableDays: ["Lunes", "Miércoles", "Sábado"],
    languages: ["Español", "Français", "English"],
    specialties: ["Gastronomía", "Playas", "Festivales", "Surf"],
    biography: "Surfista profesional y amante de la gastronomía donostiarra.",
    profileImage: guide1Image,
    locationImages: [location1Image, location2Image, location3Image],
    pricePerHour: 46,
    responseTime: "1 hora",
    isVerified: true,
    yearsExperience: 8
  },
  {
    id: "8",
    name: "Roberto Vega",
    rating: 4.4,
    totalReviews: 67,
    location: "Toledo",
    availableDays: ["Martes", "Jueves", "Domingo"],
    languages: ["Español", "English"],
    specialties: ["Historia Medieval", "Espadas", "Iglesias", "Artesanías"],
    biography: "Forjador tradicional y especialista en historia medieval toledana.",
    profileImage: guide2Image,
    locationImages: [location4Image, location1Image],
    pricePerHour: 35,
    responseTime: "4 horas",
    isVerified: true,
    yearsExperience: 12
  },
  {
    id: "9",
    name: "Isabel Moreno",
    rating: 4.8,
    totalReviews: 178,
    location: "Córdoba",
    availableDays: ["Lunes", "Viernes", "Sábado"],
    languages: ["Español", "English", "Deutsch"],
    specialties: ["Mezquita", "Patios", "Historia", "Flamenco"],
    biography: "Arquitecta especializada en patrimonio histórico cordobés.",
    profileImage: guide1Image,
    locationImages: [location2Image, location3Image],
    pricePerHour: 41,
    responseTime: "2 horas",
    isVerified: true,
    yearsExperience: 9
  },
  {
    id: "10",
    name: "Fernando García",
    rating: 4.6,
    totalReviews: 115,
    location: "Salamanca",
    availableDays: ["Miércoles", "Jueves", "Domingo"],
    languages: ["Español", "Português", "English"],
    specialties: ["Universidad", "Literatura", "Plaza Mayor", "Piedra Dorada"],
    biography: "Profesor universitario jubilado y escritor aficionado.",
    profileImage: guide2Image,
    locationImages: [location1Image, location4Image],
    pricePerHour: 37,
    responseTime: "3 horas",
    isVerified: true,
    yearsExperience: 15
  },
  {
    id: "11",
    name: "Patricia Ruiz",
    rating: 4.9,
    totalReviews: 189,
    location: "Ibagué",
    availableDays: ["Lunes", "Martes", "Viernes"],
    languages: ["Español", "English"],
    specialties: ["Música", "Comida Típica", "Naturaleza", "Festivales"],
    biography: "Musicóloga y promotora cultural especializada en folklore tolimense.",
    profileImage: guide1Image,
    locationImages: [location1Image, location2Image, location3Image],
    pricePerHour: 28,
    responseTime: "1 hora",
    isVerified: true,
    yearsExperience: 6
  },
  {
    id: "12",
    name: "Andrés Vargas",
    rating: 4.5,
    totalReviews: 98,
    location: "Espinal",
    availableDays: ["Sábado", "Domingo"],
    languages: ["Español"],
    specialties: ["Pesca", "Río Magdalena", "Gastronomía", "Ecoturismo"],
    biography: "Pescador artesanal y conocedor del río Magdalena.",
    profileImage: guide2Image,
    locationImages: [location4Image, location3Image],
    pricePerHour: 25,
    responseTime: "2 horas",
    isVerified: true,
    yearsExperience: 8
  },
  {
    id: "13",
    name: "Monica Delgado",
    rating: 4.7,
    totalReviews: 142,
    location: "Girardot",
    availableDays: ["Viernes", "Sábado", "Domingo"],
    languages: ["Español", "English"],
    specialties: ["Deportes Acuáticos", "Hoteles", "Río Magdalena", "Vida Nocturna"],
    biography: "Instructora de deportes acuáticos y experta en turismo de río.",
    profileImage: guide1Image,
    locationImages: [location2Image, location4Image],
    pricePerHour: 32,
    responseTime: "30 minutos",
    isVerified: true,
    yearsExperience: 5
  },
  {
    id: "14",
    name: "Carlos Ramírez",
    rating: 4.3,
    totalReviews: 76,
    location: "Melgar",
    availableDays: ["Lunes", "Miércoles", "Jueves"],
    languages: ["Español"],
    specialties: ["Piscinas", "Hoteles", "Familia", "Deporte"],
    biography: "Administrador hotelero especializado en turismo familiar.",
    profileImage: guide2Image,
    locationImages: [location1Image, location3Image],
    pricePerHour: 30,
    responseTime: "3 horas",
    isVerified: true,
    yearsExperience: 7
  },
  {
    id: "15",
    name: "Alejandra Castro",
    rating: 4.8,
    totalReviews: 167,
    location: "Honda",
    availableDays: ["Martes", "Sábado", "Domingo"],
    languages: ["Español", "English"],
    specialties: ["Historia Colonial", "Arquitectura", "Río Magdalena", "Tradiciones"],
    biography: "Historiadora especializada en el periodo colonial del Magdalena Medio.",
    profileImage: guide1Image,
    locationImages: [location3Image, location4Image, location1Image],
    pricePerHour: 34,
    responseTime: "1 hora",
    isVerified: true,
    yearsExperience: 11
  },
  {
    id: "16",
    name: "Jorge Medina",
    rating: 4.6,
    totalReviews: 103,
    location: "Líbano",
    availableDays: ["Miércoles", "Viernes", "Sábado"],
    languages: ["Español"],
    specialties: ["Café", "Montaña", "Naturaleza", "Senderismo"],
    biography: "Caficultor de tercera generación y guía de montaña.",
    profileImage: guide2Image,
    locationImages: [location2Image, location3Image],
    pricePerHour: 26,
    responseTime: "4 horas",
    isVerified: true,
    yearsExperience: 9
  },
  {
    id: "17",
    name: "Sandra Muñoz",
    rating: 4.4,
    totalReviews: 84,
    location: "Chaparral",
    availableDays: ["Jueves", "Viernes", "Domingo"],
    languages: ["Español"],
    specialties: ["Artesanías", "Cultura Local", "Mercados", "Tradiciones"],
    biography: "Artesana local especializada en tejidos y cerámica tradicional.",
    profileImage: guide1Image,
    locationImages: [location4Image, location1Image],
    pricePerHour: 24,
    responseTime: "5 horas",
    isVerified: true,
    yearsExperience: 12
  },
  {
    id: "18",
    name: "Ricardo Peña",
    rating: 4.7,
    totalReviews: 129,
    location: "Purificación",
    availableDays: ["Lunes", "Martes", "Sábado"],
    languages: ["Español", "English"],
    specialties: ["Pesca", "Gastronomía", "Río Magdalena", "Ecoturismo"],
    biography: "Biólogo marino especializado en ecosistemas fluviales.",
    profileImage: guide2Image,
    locationImages: [location3Image, location2Image],
    pricePerHour: 29,
    responseTime: "2 horas",
    isVerified: true,
    yearsExperience: 6
  },
  {
    id: "19",
    name: "Lucía Herrera",
    rating: 4.9,
    totalReviews: 198,
    location: "Flandes",
    availableDays: ["Miércoles", "Sábado", "Domingo"],
    languages: ["Español", "Français"],
    specialties: ["Hoteles", "Piscinas", "Familia", "Gastronomía"],
    biography: "Chef especializada en cocina tolimense contemporánea.",
    profileImage: guide1Image,
    locationImages: [location1Image, location4Image, location2Image],
    pricePerHour: 36,
    responseTime: "45 minutos",
    isVerified: true,
    yearsExperience: 8
  },
  {
    id: "20",
    name: "Javier Ordóñez",
    rating: 4.5,
    totalReviews: 91,
    location: "Mariquita",
    availableDays: ["Martes", "Jueves", "Viernes"],
    languages: ["Español"],
    specialties: ["Historia Colonial", "Minería", "Naturaleza", "Senderismo"],
    biography: "Geólogo e historiador especializado en la época de la Colonia.",
    profileImage: guide2Image,
    locationImages: [location2Image, location4Image],
    pricePerHour: 31,
    responseTime: "3 horas",
    isVerified: true,
    yearsExperience: 10
  },
  {
    id: "21",
    name: "Diana Torres",
    rating: 4.6,
    totalReviews: 112,
    location: "Fresno",
    availableDays: ["Lunes", "Sábado", "Domingo"],
    languages: ["Español", "English"],
    specialties: ["Café", "Naturaleza", "Aventura", "Ciclismo"],
    biography: "Guía de aventura especializada en turismo cafetalero.",
    profileImage: guide1Image,
    locationImages: [location3Image, location1Image],
    pricePerHour: 33,
    responseTime: "2 horas",
    isVerified: true,
    yearsExperience: 7
  },
  {
    id: "22",
    name: "Sebastián Cruz",
    rating: 4.8,
    totalReviews: 154,
    location: "Cajamarca",
    availableDays: ["Miércoles", "Viernes", "Sábado"],
    languages: ["Español"],
    specialties: ["Música", "Bambuco", "Tradiciones", "Festivales"],
    biography: "Músico folclorista y director de agrupaciones típicas.",
    profileImage: guide2Image,
    locationImages: [location4Image, location3Image, location2Image],
    pricePerHour: 27,
    responseTime: "1 hora",
    isVerified: true,
    yearsExperience: 13
  },
  {
    id: "23",
    name: "Gabriela Sánchez",
    rating: 4.4,
    totalReviews: 88,
    location: "Rovira",
    availableDays: ["Jueves", "Domingo"],
    languages: ["Español"],
    specialties: ["Café", "Montaña", "Ecoturismo", "Avistamiento de Aves"],
    biography: "Ornitóloga y conservacionista especializada en aves endémicas.",
    profileImage: guide1Image,
    locationImages: [location1Image, location2Image],
    pricePerHour: 28,
    responseTime: "4 horas",
    isVerified: true,
    yearsExperience: 6
  },
  {
    id: "24",
    name: "Felipe Rojas",
    rating: 4.7,
    totalReviews: 136,
    location: "Ortega",
    availableDays: ["Viernes", "Sábado", "Domingo"],
    languages: ["Español", "English"],
    specialties: ["Río Magdalena", "Pesca", "Deportes Acuáticos", "Ecoturismo"],
    biography: "Capitán de embarcaciones fluviales y experto en deportes acuáticos.",
    profileImage: guide2Image,
    locationImages: [location2Image, location3Image],
    pricePerHour: 35,
    responseTime: "2 horas",
    isVerified: true,
    yearsExperience: 9
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
    biography: "Nutricionista especializada en gastronomía tradicional tolimense.",
    profileImage: guide1Image,
    locationImages: [location4Image, location1Image, location3Image],
    pricePerHour: 38,
    responseTime: "30 minutos",
    isVerified: true,
    yearsExperience: 8
  },
  {
    id: "26",
    name: "Tomás Álvarez",
    rating: 4.3,
    totalReviews: 72,
    location: "Saldaña",
    availableDays: ["Sábado", "Domingo"],
    languages: ["Español"],
    specialties: ["Agricultura", "Arroz", "Cultura Local", "Tradiciones"],
    biography: "Ingeniero agrónomo especializado en cultivos tradicionales.",
    profileImage: guide2Image,
    locationImages: [location3Image, location4Image],
    pricePerHour: 26,
    responseTime: "5 horas",
    isVerified: true,
    yearsExperience: 11
  },
  {
    id: "27",
    name: "Carolina Espinosa",
    rating: 4.8,
    totalReviews: 163,
    location: "Ambalema",
    availableDays: ["Martes", "Jueves", "Viernes"],
    languages: ["Español", "English"],
    specialties: ["Historia Colonial", "Tabaco", "Arquitectura", "Río Magdalena"],
    biography: "Arqueóloga especializada en el periodo colonial del alto Magdalena.",
    profileImage: guide1Image,
    locationImages: [location2Image, location4Image, location1Image],
    pricePerHour: 33,
    responseTime: "1 hora",
    isVerified: true,
    yearsExperience: 12
  },
  {
    id: "28",
    name: "Eduardo Vargas",
    rating: 4.5,
    totalReviews: 95,
    location: "Venadillo",
    availableDays: ["Miércoles", "Sábado", "Domingo"],
    languages: ["Español"],
    specialties: ["Ganadería", "Agricultura", "Tradiciones", "Comida Típica"],
    biography: "Veterinario zootecnista y conocedor de tradiciones ganaderas.",
    profileImage: guide2Image,
    locationImages: [location1Image, location3Image],
    pricePerHour: 29,
    responseTime: "3 horas",
    isVerified: true,
    yearsExperience: 14
  },
  {
    id: "29",
    name: "Valeria Montenegro",
    rating: 4.6,
    totalReviews: 118,
    location: "Armero-Guayabal",
    availableDays: ["Lunes", "Jueves", "Viernes"],
    languages: ["Español", "English"],
    specialties: ["Historia Reciente", "Vulcanología", "Memorial", "Resiliencia"],
    biography: "Socióloga especializada en memoria histórica y procesos de reconstrucción.",
    profileImage: guide1Image,
    locationImages: [location4Image, location2Image],
    pricePerHour: 32,
    responseTime: "2 horas",
    isVerified: true,
    yearsExperience: 7
  },
  {
    id: "30",
    name: "Hernán Molina",
    rating: 4.7,
    totalReviews: 147,
    location: "Piedras",
    availableDays: ["Martes", "Sábado", "Domingo"],
    languages: ["Español"],
    specialties: ["Naturaleza", "Senderismo", "Ecoturismo", "Aventura"],
    biography: "Guía de montaña certificado y especialista en ecoturismo sostenible.",
    profileImage: guide2Image,
    locationImages: [location3Image, location1Image, location4Image],
    pricePerHour: 31,
    responseTime: "2 horas",
    isVerified: true,
    yearsExperience: 10
  },
  {
    id: "31",
    name: "Beatriz Ramírez",
    rating: 4.8,
    totalReviews: 172,
    location: "Barcelona",
    availableDays: ["Lunes", "Miércoles", "Viernes"],
    languages: ["Español", "English", "Italiano"],
    specialties: ["Museos", "Arte", "Pintura", "Cultura"],
    biography: "Crítica de arte y curadora de museos especializada en arte contemporáneo.",
    profileImage: guide1Image,
    locationImages: [location1Image, location2Image, location3Image],
    pricePerHour: 47,
    responseTime: "1 hora",
    isVerified: true,
    yearsExperience: 12
  },
  {
    id: "32",
    name: "Antonio Silva",
    rating: 4.4,
    totalReviews: 83,
    location: "Madrid",
    availableDays: ["Martes", "Jueves", "Sábado"],
    languages: ["Español", "Français", "English"],
    specialties: ["Vida Nocturna", "Tapas", "Flamenco", "Música"],
    biography: "DJ y promotor cultural especializado en la escena musical madrileña.",
    profileImage: guide2Image,
    locationImages: [location4Image, location2Image],
    pricePerHour: 43,
    responseTime: "3 horas",
    isVerified: true,
    yearsExperience: 6
  },
  {
    id: "33",
    name: "Rosa Delgado",
    rating: 4.9,
    totalReviews: 234,
    location: "Sevilla",
    availableDays: ["Miércoles", "Sábado", "Domingo"],
    languages: ["Español", "English", "Deutsch"],
    specialties: ["Catedral", "Alcázar", "Barrio Santa Cruz", "Fotografía"],
    biography: "Fotógrafa profesional especializada en patrimonio histórico sevillano.",
    profileImage: guide1Image,
    locationImages: [location3Image, location4Image, location1Image],
    pricePerHour: 49,
    responseTime: "30 minutos",
    isVerified: true,
    yearsExperience: 15
  },
  {
    id: "34",
    name: "Manuel Torres",
    rating: 4.5,
    totalReviews: 97,
    location: "Valencia",
    availableDays: ["Lunes", "Viernes", "Domingo"],
    languages: ["Español", "English", "中文"],
    specialties: ["Ciudad de las Artes", "Océano", "Ciencia", "Tecnología"],
    biography: "Ingeniero e investigador especializado en divulgación científica.",
    profileImage: guide2Image,
    locationImages: [location2Image, location3Image],
    pricePerHour: 45,
    responseTime: "2 horas",
    isVerified: true,
    yearsExperience: 8
  },
  {
    id: "35",
    name: "Pilar Navarro",
    rating: 4.7,
    totalReviews: 156,
    location: "Granada",
    availableDays: ["Martes", "Jueves", "Sábado"],
    languages: ["Español", "Français", "العربية"],
    specialties: ["Albaicín", "Sacromonte", "Flamenco", "Cuevas"],
    biography: "Bailaora de flamenco y especialista en cultura gitana granadina.",
    profileImage: guide1Image,
    locationImages: [location1Image, location4Image],
    pricePerHour: 44,
    responseTime: "1 hora",
    isVerified: true,
    yearsExperience: 11
  },
  {
    id: "36",
    name: "Francisco Iglesias",
    rating: 4.6,
    totalReviews: 124,
    location: "Bilbao",
    availableDays: ["Miércoles", "Viernes", "Domingo"],
    languages: ["Español", "Euskera", "English"],
    specialties: ["Industria", "Transformación Urbana", "Arquitectura", "Casco Viejo"],
    biography: "Urbanista especializado en procesos de regeneración urbana.",
    profileImage: guide2Image,
    locationImages: [location3Image, location2Image],
    pricePerHour: 41,
    responseTime: "4 horas",
    isVerified: true,
    yearsExperience: 9
  },
  {
    id: "37",
    name: "Elena Castillo",
    rating: 4.8,
    totalReviews: 189,
    location: "San Sebastián",
    availableDays: ["Lunes", "Jueves", "Sábado"],
    languages: ["Español", "English", "日本語"],
    specialties: ["Estrella Michelin", "Cocina Vanguardista", "Pintxos", "Mercados"],
    biography: "Chef con estrella Michelin especializada en nueva cocina vasca.",
    profileImage: guide1Image,
    locationImages: [location2Image, location4Image, location3Image],
    pricePerHour: 55,
    responseTime: "45 minutos",
    isVerified: true,
    yearsExperience: 13
  },
  {
    id: "38",
    name: "Álvaro Mendoza",
    rating: 4.3,
    totalReviews: 76,
    location: "Toledo",
    availableDays: ["Martes", "Viernes", "Domingo"],
    languages: ["Español", "English"],
    specialties: ["Artesanías", "Damasquinado", "Mazapán", "Tradiciones"],
    biography: "Maestro artesano especializado en técnicas tradicionales toledanas.",
    profileImage: guide2Image,
    locationImages: [location1Image, location3Image],
    pricePerHour: 36,
    responseTime: "5 horas",
    isVerified: true,
    yearsExperience: 18
  },
  {
    id: "39",
    name: "Cristina Herrera",
    rating: 4.9,
    totalReviews: 267,
    location: "Córdoba",
    availableDays: ["Miércoles", "Sábado", "Domingo"],
    languages: ["Español", "English", "Français"],
    specialties: ["Patios Cordobeses", "Judería", "Fiesta de los Patios", "Jardinería"],
    biography: "Paisajista especializada en patios tradicionales cordobeses.",
    profileImage: guide1Image,
    locationImages: [location4Image, location1Image, location2Image],
    pricePerHour: 46,
    responseTime: "30 minutos",
    isVerified: true,
    yearsExperience: 14
  },
  {
    id: "40",
    name: "Raúl Domínguez",
    rating: 4.5,
    totalReviews: 108,
    location: "Salamanca",
    availableDays: ["Lunes", "Jueves", "Viernes"],
    languages: ["Español", "Português", "English"],
    specialties: ["Casa de las Conchas", "Catedral Nueva", "Vida Estudiantil", "Tapas"],
    biography: "Profesor universitario especializado en historia medieval salmantina.",
    profileImage: guide2Image,
    locationImages: [location3Image, location4Image],
    pricePerHour: 39,
    responseTime: "2 horas",
    isVerified: true,
    yearsExperience: 16
  },
  {
    id: "41",
    name: "Amparo Ruiz",
    rating: 4.7,
    totalReviews: 145,
    location: "Ibagué",
    availableDays: ["Martes", "Jueves", "Domingo"],
    languages: ["Español", "English"],
    specialties: ["Conservatorio", "Parque de la Música", "Festivales", "Folclore"],
    biography: "Musicóloga y directora de conservatorio especializada en música colombiana.",
    profileImage: guide1Image,
    locationImages: [location1Image, location3Image],
    pricePerHour: 30,
    responseTime: "1 hora",
    isVerified: true,
    yearsExperience: 17
  },
  {
    id: "42",
    name: "David Morales",
    rating: 4.4,
    totalReviews: 92,
    location: "Espinal",
    availableDays: ["Sábado", "Domingo"],
    languages: ["Español"],
    specialties: ["Artesanías", "Cerámica", "Mercados", "Tradiciones"],
    biography: "Ceramista y artesano especializado en técnicas precolombinas.",
    profileImage: guide2Image,
    locationImages: [location2Image, location4Image],
    pricePerHour: 27,
    responseTime: "3 horas",
    isVerified: true,
    yearsExperience: 20
  },
  {
    id: "43",
    name: "Marisol Gutiérrez",
    rating: 4.8,
    totalReviews: 178,
    location: "Girardot",
    availableDays: ["Viernes", "Sábado", "Domingo"],
    languages: ["Español", "English"],
    specialties: ["Turismo de Salud", "Aguas Termales", "Spa", "Relajación"],
    biography: "Terapeuta especializada en turismo de bienestar y aguas termales.",
    profileImage: guide1Image,
    locationImages: [location3Image, location1Image, location4Image],
    pricePerHour: 35,
    responseTime: "45 minutos",
    isVerified: true,
    yearsExperience: 9
  },
  {
    id: "44",
    name: "Guillermo Pérez",
    rating: 4.6,
    totalReviews: 119,
    location: "Melgar",
    availableDays: ["Lunes", "Miércoles", "Sábado"],
    languages: ["Español", "English"],
    specialties: ["Deportes Acuáticos", "Piscinas", "Familia", "Entretenimiento"],
    biography: "Instructor de natación y especialista en turismo familiar acuático.",
    profileImage: guide2Image,
    locationImages: [location4Image, location2Image],
    pricePerHour: 33,
    responseTime: "2 horas",
    isVerified: true,
    yearsExperience: 7
  },
  {
    id: "45",
    name: "Liliana Ospina",
    rating: 4.9,
    totalReviews: 203,
    location: "Honda",
    availableDays: ["Martes", "Viernes", "Domingo"],
    languages: ["Español", "English", "Français"],
    specialties: ["Puente Navarro", "Malecón", "Historia Ferroviaria", "Fotografía"],
    biography: "Historiadora especializada en la época dorada del ferrocarril colombiano.",
    profileImage: guide1Image,
    locationImages: [location2Image, location3Image, location4Image],
    pricePerHour: 37,
    responseTime: "30 minutos",
    isVerified: true,
    yearsExperience: 13
  },
  {
    id: "46",
    name: "César Aguilar",
    rating: 4.3,
    totalReviews: 87,
    location: "Líbano",
    availableDays: ["Miércoles", "Jueves", "Sábado"],
    languages: ["Español"],
    specialties: ["Café", "Fincas Cafeteras", "Proceso del Café", "Degustación"],
    biography: "Catador profesional de café y propietario de finca cafetera familiar.",
    profileImage: guide2Image,
    locationImages: [location1Image, location3Image],
    pricePerHour: 29,
    responseTime: "4 horas",
    isVerified: true,
    yearsExperience: 22
  },
  {
    id: "47",
    name: "Patricia Ramos",
    rating: 4.7,
    totalReviews: 158,
    location: "Chaparral",
    availableDays: ["Lunes", "Viernes", "Domingo"],
    languages: ["Español", "English"],
    specialties: ["Textiles", "Bordados", "Cultura Indígena", "Artesanías"],
    biography: "Antropóloga especializada en culturas indígenas y técnicas textiles ancestrales.",
    profileImage: guide1Image,
    locationImages: [location4Image, location1Image],
    pricePerHour: 32,
    responseTime: "2 horas",
    isVerified: true,
    yearsExperience: 15
  },
  {
    id: "48",
    name: "Óscar Jiménez",
    rating: 4.5,
    totalReviews: 104,
    location: "Purificación",
    availableDays: ["Martes", "Sábado", "Domingo"],
    languages: ["Español", "English"],
    specialties: ["Pesca Deportiva", "Turismo Fluvial", "Gastronomía de Río", "Conservación"],
    biography: "Biólogo marino especializado en conservación de especies fluviales.",
    profileImage: guide2Image,
    locationImages: [location2Image, location3Image],
    pricePerHour: 31,
    responseTime: "3 horas",
    isVerified: true,
    yearsExperience: 11
  },
  {
    id: "49",
    name: "Claudia Varela",
    rating: 4.8,
    totalReviews: 185,
    location: "Flandes",
    availableDays: ["Jueves", "Sábado", "Domingo"],
    languages: ["Español", "Italiano", "English"],
    specialties: ["Resort", "Gastronomía Internacional", "Coctelería", "Lujo"],
    biography: "Sommelier internacional especializada en maridajes y experiencias gastronómicas de lujo.",
    profileImage: guide1Image,
    locationImages: [location3Image, location4Image, location2Image],
    pricePerHour: 48,
    responseTime: "1 hora",
    isVerified: true,
    yearsExperience: 12
  },
  {
    id: "50",
    name: "Rodrigo Medina",
    rating: 4.6,
    totalReviews: 127,
    location: "Mariquita",
    availableDays: ["Lunes", "Miércoles", "Viernes"],
    languages: ["Español", "English"],
    specialties: ["Orquídeas", "Jardín Botánico", "Investigación", "Naturaleza"],
    biography: "Botánico especializado en orquídeas nativas y conservación de flora tropical.",
    profileImage: guide2Image,
    locationImages: [location1Image, location4Image, location3Image],
    pricePerHour: 34,
    responseTime: "2 horas",
    isVerified: true,
    yearsExperience: 16
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
      // Filtrar por ciudad - debe coincidir exactamente
      if (searchData.city && guide.location !== searchData.city) {
        return false;
      }
      
      // Filtrar por idioma - debe coincidir exactamente
      if (searchData.language && !guide.languages.includes(searchData.language)) {
        return false;
      }
      
      // Filtrar por día disponible - convertir fecha a día de la semana
      if (searchData.date) {
        const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const selectedDay = dayNames[searchData.date.getDay()];
        if (!guide.availableDays.includes(selectedDay)) {
          return false;
        }
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