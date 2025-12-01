import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/Button';
import { cn } from '../lib/utils';

interface CtaCardProps {
  imageUrl: string;
  headline: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  className?: string;
}

const CtaCard: React.FC<CtaCardProps> = ({
  imageUrl,
  headline,
  description,
  buttonText,
  buttonLink,
  className
}) => {
  return (
    <div className={cn("p-0.5 rounded-xl bg-gradient-to-br from-primary to-secondary", className)}>
      <div className="bg-card rounded-lg p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
          <div className="md:w-2/5 flex-shrink-0">
            <img 
              src={imageUrl} 
              alt={headline} 
              className="w-full h-auto object-cover rounded-lg aspect-video md:aspect-square" 
            />
          </div>
          <div className="md:w-3/5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
              {headline}
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              {description}
            </p>
            <div className="mt-6">
              <Link to={buttonLink}>
                <Button size="lg">
                  {buttonText}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CtaCard;