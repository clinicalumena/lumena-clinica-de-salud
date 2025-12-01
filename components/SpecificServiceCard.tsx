
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { SpecificService } from '../types';

interface SpecificServiceCardProps {
  service: SpecificService;
  categorySlug: string;
}

const SpecificServiceCard: React.FC<SpecificServiceCardProps> = ({ service, categorySlug }) => {
  return (
    <Link to={`/servicios/${categorySlug}/${service.slug}`} className="block h-full">
      <Card className="flex flex-col text-center items-center p-6 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group">
        <div className="bg-primary/10 p-4 rounded-full mb-4 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
          {service.icon}
        </div>
        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
        <p className="text-sm text-muted-foreground flex-grow mb-4">{service.description}</p>
        <Button className="mt-auto w-full">
          Desde {service.price}€
        </Button>
      </Card>
    </Link>
  );
};

export default SpecificServiceCard;
