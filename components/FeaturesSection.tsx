
import React from 'react';
import { cn } from '../lib/utils';
import {
  IconMicroscope,
  IconUsers,
  IconHeartHandshake,
  IconShieldCheck,
  IconSofa,
  IconChartInfographic,
  IconBook,
  IconFlower,
} from "@tabler/icons-react";

// FIX: Explicitly type Feature as a React.FC to ensure special props like `key` are correctly handled by TypeScript.
// This resolves the type error when spreading props in a map.
interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

const Feature: React.FC<FeatureProps> = ({
  title,
  description,
  icon,
  index,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature border-border/60",
        (index === 0 || index === 4) && "lg:border-l border-border/60",
        index < 4 && "lg:border-b border-border/60"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-accent/50 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-accent/50 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-primary">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-border group-hover/feature:bg-primary transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-foreground">
          {title}
        </span>
      </div>
      <p className="text-sm text-muted-foreground max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};

export function FeaturesSection() {
  const features = [
    {
      title: "Tecnología de Vanguardia",
      description: "Utilizamos la última tecnología para diagnósticos precisos y tratamientos efectivos.",
      icon: <IconMicroscope size={28} />,
    },
    {
      title: "Equipo Multidisciplinar",
      description: "Nuestros especialistas colaboran para ofrecerte un cuidado integral y completo.",
      icon: <IconUsers size={28} />,
    },
    {
      title: "Atención Personalizada",
      description: "Cada paciente es único. Diseñamos planes de tratamiento a medida para tus necesidades.",
      icon: <IconHeartHandshake size={28} />,
    },
    {
      title: "Enfoque Preventivo",
      description: "Nos centramos no solo en tratar, sino en prevenir futuras dolencias para un bienestar duradero.",
      icon: <IconShieldCheck size={28} />,
    },
    {
      title: "Ambiente Confortable",
      description: "Instalaciones modernas y un ambiente tranquilo para que te sientas cómodo y seguro.",
      icon: <IconSofa size={28} />,
    },
    {
      title: "Resultados Comprobados",
      description: "Comprometidos con tu recuperación, seguimos protocolos basados en la evidencia científica.",
      icon: <IconChartInfographic size={28} />,
    },
    {
      title: "Educación al Paciente",
      description: "Te empoderamos con el conocimiento necesario para que seas parte activa de tu recuperación.",
      icon: <IconBook size={28} />,
    },
    {
      title: "Bienestar Integral",
      description: "Creemos en un enfoque holístico que abarca tanto la salud física como la mental.",
      icon: <IconFlower size={28} />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}