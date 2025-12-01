import React from 'react';
import { Link } from 'react-router-dom';
import { Author } from '../types';

const ExpertCard: React.FC<{ expert: Author }> = ({ expert }) => {
  return (
    <Link to={`/especialistas/${expert.slug}`} className="w-[300px] flex-shrink-0 group transform transition-all duration-300 hover:-translate-y-1 block">
      <div className="relative">
        <div className="bg-muted p-4 rounded-2xl aspect-square flex items-center justify-center overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
          <img
            src={expert.imageUrl}
            alt={expert.name}
            className="w-full h-full object-cover rounded-xl transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
        </div>
        <div className="absolute bottom-0 left-4">
          <div className="bg-primary text-primary-foreground rounded-full w-24 h-24 flex flex-col items-center justify-center text-center leading-tight shadow-lg transform translate-y-1/3 transition-transform duration-300 group-hover:scale-105">
            <span className="font-semibold">Ver</span>
            <span>Perfil</span>
          </div>
        </div>
      </div>
      <div className="mt-12 text-center">
        <p className="text-xl font-bold text-foreground">{expert.name}</p>
        <p className="text-muted-foreground">{expert.role}</p>
      </div>
    </Link>
  );
};

export default ExpertCard;