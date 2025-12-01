import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAuthors } from '../lib/data';
import { Author } from '../types';
import { Card } from '../components/ui/Card';
import { IconArrowRight } from '@tabler/icons-react';
import SEO from '../components/SEO';

const SpecialistCard: React.FC<{ specialist: Author }> = ({ specialist }) => {
  return (
    <Link to={`/especialistas/${specialist.slug}`} className="group block">
      <Card className="overflow-hidden h-full flex flex-col transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
        <div className="overflow-hidden">
          <img
            src={specialist.imageUrl}
            alt={specialist.name}
            className="w-full h-64 object-cover object-center transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{specialist.name}</h3>
          <p className="text-primary font-semibold text-sm mt-1">{specialist.role}</p>
          <p className="text-muted-foreground text-sm mt-2 flex-grow mb-4">{specialist.shortBio}</p>
          <div className="mt-auto flex items-center text-sm font-semibold text-primary">
            Ver perfil completo
            <IconArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </Card>
    </Link>
  );
};

const SpecialistsPage: React.FC = () => {
  const [specialists, setSpecialists] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpecialists = async () => {
      try {
        const data = await getAuthors();
        setSpecialists(data);
      } catch (error) {
        console.error("Failed to fetch specialists:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSpecialists();
  }, []);

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Equipo Médico de LUMENA",
    "itemListElement": specialists.map((specialist, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Physician",
        "name": specialist.name,
        "jobTitle": specialist.role,
        "image": specialist.imageUrl,
        "url": `https://clinicalumena.com/especialistas/${specialist.slug}`
      }
    }))
  };

  return (
    <div className="space-y-12">
      <SEO 
        title="Nuestro Equipo Médico"
        description="Conoce a los doctores y especialistas de LUMENA. Profesionales expertos en Odontología, Ginecología, Fisioterapia y más."
        keywords={["equipo médico", "doctores el ejido", "especialistas salud", "dentistas", "fisioterapeutas"]}
        schema={schema}
      />

      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">Nuestro Equipo de Especialistas</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Conoce a los profesionales dedicados a tu salud y bienestar.
        </p>
      </div>

      {loading ? (
        <p className="text-center">Cargando especialistas...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {specialists.map((specialist) => (
            <SpecialistCard key={specialist.slug} specialist={specialist} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SpecialistsPage;