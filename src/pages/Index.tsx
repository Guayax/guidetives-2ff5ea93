import { useState } from "react";
import { Compass, Users, Award, Globe } from "lucide-react";
import SearchForm, { SearchData } from "@/components/SearchForm";
import GuideResults from "@/components/GuideResults";
import heroBackground from "@/assets/hero-background.jpg";

const Index = () => {
  const [searchResults, setSearchResults] = useState<SearchData | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (data: SearchData) => {
    setSearchResults(data);
    setShowResults(true);
  };

  const handleNewSearch = () => {
    setShowResults(false);
    setSearchResults(null);
  };

  if (showResults && searchResults) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <GuideResults 
            searchData={searchResults} 
            onNewSearch={handleNewSearch}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBackground})` }}
        >
          <div className="absolute inset-0 bg-gradient-hero opacity-80"></div>
        </div>

        {/* Brand text */}
        <div className="absolute top-6 right-6 z-20">
          <span className="text-surface/70 text-sm font-medium tracking-wide">
            guidetives
          </span>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-surface mb-6 drop-shadow-lg">
              Descubre el Mundo
              <span className="block text-accent-light">con Guías Locales</span>
            </h1>
            <p className="text-xl md:text-2xl text-surface/90 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              Conecta con guías expertos que conocen los secretos mejor guardados de cada destino. 
              Vive experiencias auténticas y personalizadas.
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-4xl mx-auto">
            <SearchForm onSearch={handleSearch} />
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 text-surface/20 animate-float">
          <Compass className="w-16 h-16" />
        </div>
        <div className="absolute bottom-20 right-10 text-surface/20 animate-float" style={{ animationDelay: '1s' }}>
          <Globe className="w-12 h-12" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-sky">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              ¿Por qué elegir nuestros guías?
            </h2>
            <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
              Experiencias únicas diseñadas por expertos locales que conocen cada rincón de su ciudad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center group animate-fade-in">
              <div className="bg-surface w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-card group-hover:shadow-card-hover transition-all duration-300">
                <Users className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Guías Verificados</h3>
              <p className="text-foreground-muted">
                Todos nuestros guías están verificados y cuentan con años de experiencia mostrando lo mejor de su ciudad.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center group animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="bg-surface w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-card group-hover:shadow-card-hover transition-all duration-300">
                <Award className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Experiencias Únicas</h3>
              <p className="text-foreground-muted">
                Descubre lugares secretos y vive experiencias auténticas que solo los locales conocen.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center group animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="bg-surface w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-card group-hover:shadow-card-hover transition-all duration-300">
                <Globe className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Múltiples Idiomas</h3>
              <p className="text-foreground-muted">
                Comunícate en tu idioma preferido con guías que hablan más de 10 idiomas diferentes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-sunset">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-surface mb-6">
            ¿Listo para tu próxima aventura?
          </h2>
          <p className="text-xl text-surface/90 mb-8 max-w-2xl mx-auto">
            Miles de viajeros ya han descubierto destinos increíbles con nuestros guías locales
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-surface">
            <div className="bg-surface/20 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-surface/80">Guías Verificados</div>
            </div>
            <div className="bg-surface/20 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-surface/80">Ciudades</div>
            </div>
            <div className="bg-surface/20 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">10,000+</div>
              <div className="text-surface/80">Experiencias Únicas</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;