import React, { useState, useEffect } from 'react';
import { getServices, DETAILED_SERVICES } from '../lib/data';
import { Service } from '../types';
import ServiceSlider from '../components/ServiceSlider';
import AboutSection from '../components/AboutSection';
import ServiceGrid from '../components/ServiceGrid';
import SEO from '../components/SEO';

const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setServices(data);
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
    "@type": "ItemList",
    "name": "Servicios Médicos en LUMENA",
    "description": "Lista de especialidades y servicios médicos disponibles en Clínica LUMENA.",
    "itemListElement": services.map((service, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "MedicalSpecialty",
        "name": service.title,
        "description": service.shortDescription,
        "url": `https://clinicalumena.com/servicios/${service.slug}`
      }
    }))
  };

  return (
    <div className="space-y-16 md:space-y-24">
      <SEO 
        title="Nuestros Servicios Médicos"
        description="Explora nuestra amplia gama de servicios médicos en El Ejido: Odontología, Fisioterapia, Ginecología, Psicología, Nutrición y más. Cuidado integral para ti."
        keywords={["servicios médicos", "especialidades médicas", "dentista", "fisioterapia", "ginecología", "el ejido"]}
        schema={schema}
      />

      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">Nuestros Servicios</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Comprometidos con tu salud integral, ofrecemos una variedad de servicios especializados.
        </p>
      </div>

      <section>
        <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold">Explora Nuestras Especialidades</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Desde odontología hasta fisioterapia, encuentra el cuidado que necesitas.
            </p>
        </div>
        {loading ? (
          <p className="text-center mt-12">Cargando servicios...</p>
        ) : (
          <div className="mt-12">
            <ServiceSlider services={services} />
          </div>
        )}
      </section>

      <AboutSection />

      {/* Detailed Services Lists */}
      <div className="space-y-0">
          {DETAILED_SERVICES.map((category, index) => (
              <div key={category.slug} className="relative w-screen left-1/2 -ml-[50vw]">
                <ServiceGrid 
                  category={category} 
                  className={index % 2 === 0 ? "bg-accent/30" : "bg-background"} 
                />
              </div>
          ))}
      </div>

    </div>
  );
};

export default ServicesPage;