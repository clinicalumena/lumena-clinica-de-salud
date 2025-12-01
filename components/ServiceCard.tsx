
import React from 'react';
import { Link } from 'react-router-dom';
import { Service } from '../types';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { IconArrowRight } from '@tabler/icons-react';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <Card className="w-80 flex-shrink-0 group flex flex-col h-full overflow-hidden shadow-lg rounded-xl transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="overflow-hidden rounded-t-xl">
        <img
          src={service.imageUrl}
          alt={service.title}
          className="w-full h-48 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-foreground mb-2">{service.title}</h3>
        <p className="text-muted-foreground text-sm flex-grow mb-4">{service.shortDescription}</p>
        <div className="mt-auto flex justify-end">
             <Link to={`/servicios/${service.slug}`}>
                <Button>
                    Saber Más
                    <IconArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </Link>
        </div>
      </div>
    </Card>
  );
};

export default ServiceCard;
