
import React from 'react';
import { ServiceCategoryDetail } from '../types';
import SpecificServiceCard from './SpecificServiceCard';
import { cn } from '../lib/utils';

interface ServiceGridProps {
  category: ServiceCategoryDetail;
  className?: string;
}

const ServiceGrid: React.FC<ServiceGridProps> = ({ category, className }) => {
  return (
    <section className={cn("py-16 md:py-24 bg-accent/30", className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Elige tu servicio de {category.name}</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            {category.description}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {category.services.map((service) => (
            <SpecificServiceCard key={service.title} service={service} categorySlug={category.slug} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceGrid;
