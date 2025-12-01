import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { getServices } from '../lib/data';
import { Service } from '../types';
import { FeaturesSection } from '../components/FeaturesSection';
import { JourneySection } from '../components/JourneySection';
import { FaqSection } from '../components/FaqSection';
import ServiceSlider from '../components/ServiceSlider';
import { ExpertsSection } from '../components/ExpertsSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { ClientTypeSection } from '../components/ClientTypeSection';
import { ServiceGallerySection } from '../components/ServiceGallerySection';
import { IconArrowRight } from '@tabler/icons-react';
import SEO from '../components/SEO';

const HomePage: React.FC = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const allServices = await getServices();
                setServices(allServices);
            } catch (error) {
                console.error("Failed to fetch services:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    const schema = {
      "@context": "https://schema.org",
      "@type": "MedicalOrganization",
      "name": "LUMENA Clínica de Salud",
      "url": "https://clinicalumena.com",
      "logo": "https://clinicalumena.com/logo.png",
      "description": "LUMENA: Tu clínica de confianza en El Ejido. Especialistas en odontología, ginecología, fisioterapia y mucho más.",
      "telephone": "+34645245709",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Calle Principal 123",
        "addressLocality": "El Ejido",
        "addressRegion": "Almería",
        "postalCode": "04700",
        "addressCountry": "ES"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "08:00",
          "closes": "20:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Saturday",
          "opens": "09:00",
          "closes": "14:00"
        }
      ],
      "medicalSpecialty": ["Odontologia", "Ginecologia", "Fisioterapia", "Psicologia", "Nutricion"]
    };

  return (
    <div className="space-y-16 md:space-y-24">
      <SEO 
        title="Inicio"
        description="Bienvenido a LUMENA Clínica de Salud en El Ejido. Ofrecemos servicios médicos integrales: odontología, ginecología, fisioterapia y más. Tecnología avanzada y trato humano."
        keywords={["clínica el ejido", "médico el ejido", "dentista", "fisioterapeuta", "ginecólogo", "psicólogo", "salud almería"]}
        schema={schema}
      />

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold text-primary tracking-tight">
                LUMENA, tu clínica de salud en El Ejido
            </h1>
            <p className="mt-6 max-w-xl mx-auto md:mx-0 text-lg md:text-xl text-muted-foreground">
                En LUMENA, combinamos experiencia, tecnología y un trato cercano para ofrecerte la mejor atención médica.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                <Link to="/contacto">
                    <Button size="lg" className="w-full sm:w-auto">
                        Pide tu Cita
                    </Button>
                </Link>
                <Link to="/servicios">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">Nuestros Servicios</Button>
                </Link>
            </div>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <img 
                  src="https://www.fundacio-puigvert.es/wp-content/uploads/2023/04/Sanguedolce.png"
                  alt="Dos doctoras rubias profesionales en la Clínica LUMENA" 
                  className="rounded-xl shadow-2xl w-full h-auto object-cover aspect-[1/1] transform md:rotate-3 transition-transform duration-500 hover:rotate-0 hover:scale-105"
                />
            </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section>
        <div className="text-center md:text-left md:flex md:justify-between md:items-center mb-12">
            <div>
                <h2 className="text-3xl md:text-4xl font-bold">Servicios Destacados</h2>
                <p className="mt-4 max-w-2xl mx-auto md:mx-0 text-lg text-muted-foreground">
                    Ofrecemos una amplia gama de especialidades para cubrir todas tus necesidades de salud.
                </p>
            </div>
            <div className="hidden md:block mt-4 md:mt-0 flex-shrink-0">
                <Link to="/servicios">
                    <Button variant="outline">
                        Ver Todos los Servicios
                        <IconArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
            </div>
        </div>
        
        <div>
          {loading ? (
            <p className="text-center">Cargando servicios...</p>
          ) : (
            <ServiceSlider services={services} />
          )}
        </div>

        <div className="md:hidden text-center mt-8">
            <Link to="/servicios">
                <Button size="lg" variant="outline">
                    Ver Todos los Servicios
                    <IconArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </Link>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold">¿Por Qué Elegir LUMENA?</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Nuestro compromiso es con tu bienestar, ofreciendo un servicio de excelencia en cada detalle.
            </p>
        </div>
        <div className="mt-12 border border-border/60 rounded-xl overflow-hidden">
             <FeaturesSection />
        </div>
      </section>
      
      {/* Client Type Section */}
      <ClientTypeSection />

      {/* Journey Section */}
      <JourneySection />

      {/* Experts Section */}
      <ExpertsSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Service Gallery Section */}
      <ServiceGallerySection />

      {/* FAQ Section */}
      <FaqSection />
    </div>
  );
};

export default HomePage;