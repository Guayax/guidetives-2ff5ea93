import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const BecomeGuideForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    ciudad: "",
    gustos: "",
    telefono: "",
    email: ""
  });
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.nombre || !formData.ciudad || !formData.telefono || !formData.email) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios.",
        variant: "destructive",
      });
      return;
    }

    // Simular envío del formulario
    toast({
      title: "¡Solicitud enviada!",
      description: "Hemos recibido tu solicitud para convertirte en guía. Te contactaremos pronto.",
    });
    
    // Resetear formulario y cerrar modal
    setFormData({
      nombre: "",
      ciudad: "",
      gustos: "",
      telefono: "",
      email: ""
    });
    setIsOpen(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-lg font-semibold"
        >
          Convertirme en Guía
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-foreground">
            Convertirte en Guía
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="nombre" className="text-foreground font-medium">
              Nombre completo *
            </Label>
            <Input
              id="nombre"
              type="text"
              value={formData.nombre}
              onChange={(e) => handleInputChange("nombre", e.target.value)}
              placeholder="Tu nombre completo"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ciudad" className="text-foreground font-medium">
              Ciudad de residencia *
            </Label>
            <Input
              id="ciudad"
              type="text"
              value={formData.ciudad}
              onChange={(e) => handleInputChange("ciudad", e.target.value)}
              placeholder="Ciudad donde ofreces tus servicios"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gustos" className="text-foreground font-medium">
              Gustos y especialidades
            </Label>
            <Textarea
              id="gustos"
              value={formData.gustos}
              onChange={(e) => handleInputChange("gustos", e.target.value)}
              placeholder="Cuéntanos sobre tus intereses, especialidades y qué tipo de experiencias te gusta ofrecer"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="telefono" className="text-foreground font-medium">
              Número de teléfono *
            </Label>
            <Input
              id="telefono"
              type="tel"
              value={formData.telefono}
              onChange={(e) => handleInputChange("telefono", e.target.value)}
              placeholder="+34 600 000 000"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground font-medium">
              Correo electrónico *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="tu@email.com"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              Enviar Solicitud
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BecomeGuideForm;