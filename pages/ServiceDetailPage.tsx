
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getServiceBySlug, getServices, DETAILED_SERVICES } from '../lib/data';
import { Service, ServiceCategoryDetail } from '../types';
import { Button } from '../components/ui/Button';
import { ClientTypeSection } from '../components/ClientTypeSection';
import { FeaturesSection } from '../components/FeaturesSection';
import { JourneySection } from '../components/JourneySection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { ServiceGallerySection } from '../components/ServiceGallerySection';
import { FaqSection } from '../components/FaqSection';
import ServiceGrid from '../components/ServiceGrid';
import SEO from '../components/SEO';

const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [relatedServices, setRelatedServices] = useState<Service[]>([]);
  const [detailedService, setDetailedService] = useState<ServiceCategoryDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const serviceData = await getServiceBySlug(slug);
        if (serviceData) {
          setService(serviceData);
          
          const detailedData = DETAILED_SERVICES.find(ds => ds.slug === slug);
          setDetailedService(detailedData || null);

          if (serviceData.relatedServices) {
            const allServices = await getServices();
            const related = allServices.filter(s => serviceData.relatedServices?.includes(s.slug));
            setRelatedServices(related);
          } else {
            setRelatedServices([]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch service:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [slug]);

  if (loading) {
    return <p className="text-center py-20">Cargando servicio...</p>;
  }

  if (!service) {
    return (
        <div className="text-center py-20">
            <h2 className="text-2xl font-bold">Servicio no encontrado</h2>
            <p className="mt-4">El servicio que buscas no existe.</p>
            <Link to="/servicios" className="mt-6 inline-block">
                <Button>Volver a Servicios</Button>
            </Link>
        </div>
    );
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalSpecialty",
    "name": service.title,
    "description": service.shortDescription,
    "provider": {
        "@type": "MedicalOrganization",
        "name": "LUMENA Clínica de Salud"
    },
    "image": service.imageUrl
  };

  return (
    <>
        <SEO 
            title={service.title}
            description={service.shortDescription}
            keywords={[service.title, "clínica lumena", "salud", "el ejido"]}
            image={service.imageUrl}
            schema={schema}
        />
        <section className="relative w-screen left-1/2 -ml-[50vw] bg-foreground text-primary-foreground py-20 md:py-32 overflow-hidden -mt-8 md:-mt-12">
            <div
                className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{ backgroundImage: `url(${service.imageUrl})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10" />
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
                <div className="mb-4">
                <Link to="/servicios" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    &larr; Volver a todos los servicios
                </Link>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold">{service.title}</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-foreground/90">{service.shortDescription}</p>
                 <div className="mt-8">
                    <Link to="/contacto">
                        <Button size="lg">
                            Reserva Ahora
                        </Button>
                    </Link>
                </div>
            </div>
        </section>

        <div className="relative w-screen left-1/2 -ml-[50vw] mt-16 md:mt-24">
            <ClientTypeSection />
        </div>
    
        {relatedServices.length > 0 && (
            <div className="max-w-4xl mx-auto py-16 md:py-24">
                <h3 className="text-2xl font-bold mb-4">Servicios Relacionados</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {relatedServices.map(related => (
                        <Link key={related.slug} to={`/servicios/${related.slug}`} className="block p-4 border rounded-lg hover:bg-accent transition-colors">
                            <h4 className="font-semibold text-primary">{related.title}</h4>
                            <p className="text-sm text-muted-foreground">{related.shortDescription}</p>
                        </Link>
                    ))}
                </div>
            </div>
        )}

        {detailedService && (
            <div className="relative w-screen left-1/2 -ml-[50vw]">
                <ServiceGrid category={detailedService} />
            </div>
        )}

        <div className="space-y-16 md:space-y-24">
            <section>
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold">Por Qué Confiar en Nosotros</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                        Nuestro compromiso es con tu bienestar, ofreciendo un servicio de excelencia en cada detalle.
                    </p>
                </div>
                <div className="mt-12 border border-border/60 rounded-xl overflow-hidden">
                    <FeaturesSection />
                </div>
            </section>
            <JourneySection />
        </div>
        
        <div className="relative w-screen left-1/2 -ml-[50vw] mt-16 md:mt-24">
             <TestimonialsSection />
        </div>

        <ServiceGallerySection />

        <div className="py-16 md:py-24">
            <FaqSection />
        </div>
        
    </>
  );
};

export default ServiceDetailPage;
