import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { IconArrowRight, IconDental } from '@tabler/icons-react';

const FeaturedServiceCard: React.FC = () => {
  return (
    <Card className="bg-secondary text-secondary-foreground overflow-hidden group border-0 shadow-lg flex flex-col h-full">
      <CardContent className="p-6 flex flex-col items-center justify-center text-center flex-grow">
        <div className="mb-3 bg-secondary-foreground/10 p-3 rounded-full">
            <IconDental className="h-6 w-6 text-secondary-foreground" />
        </div>
        <p className="font-semibold uppercase tracking-wider text-sm mb-2 text-secondary-foreground/80">Servicio Destacado del Mes</p>
        
        <h2 className="text-2xl font-bold mb-1">Limpieza Dental</h2>
        
        <p className="text-5xl font-extrabold mb-4 flex items-center">
            69<span className="text-3xl font-bold -translate-y-1">€</span>
        </p>
        
        <Link to="/servicios" className="w-full">
          <Button variant="outline" className="w-full bg-background/90 text-foreground hover:bg-background border-secondary-foreground/20 text-sm font-bold py-3 h-auto shadow-sm hover:shadow-md transition-shadow">
            Ver todos los servicios
            <IconArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default FeaturedServiceCard;