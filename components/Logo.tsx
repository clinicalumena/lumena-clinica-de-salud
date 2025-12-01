import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

interface LogoProps {
  className?: string;
  variant?: 'dark' | 'light';
}

const Logo: React.FC<LogoProps> = ({ className, variant = 'dark' }) => {
  const textColor = variant === 'dark' ? 'text-primary' : 'text-primary-foreground';
  
  return (
    <Link to="/" aria-label="Lumena | Clinica de Salud - Volver a Inicio" className={cn("flex flex-col items-center leading-none group", className)}>
      <span 
        style={{ letterSpacing: '0.2em' }} 
        className={`block text-3xl font-light tracking-widest uppercase ${textColor}`}
      >
        LUMENA
      </span>
      <span 
        className={`text-xs font-normal tracking-widest uppercase mt-1 ${cn(textColor, 'opacity-80')}`}
      >
        CLÍNICA DE SALUD
      </span>
    </Link>
  );
};

export default Logo;