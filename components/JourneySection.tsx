import React, { useState } from 'react';
import { cn } from '../lib/utils';
import { IconCheck } from '@tabler/icons-react';

const journeySteps = [
  {
    title: "Pide tu Cita",
    description: "Contacta con nosotros y agenda tu primera consulta con uno de nuestros especialistas para empezar tu camino."
  },
  {
    title: "Evaluación Personalizada",
    description: "Realizaremos un diagnóstico completo para entender tus necesidades y definir tus objetivos de salud."
  },
  {
    title: "Plan de Tratamiento",
    description: "Diseñamos un plan a tu medida, combinando las mejores técnicas y tecnologías para tu recuperación."
  }
];

export const JourneySection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1); // Default to second step as active, matching the example image

  return (
    <section>
      <div className="text-center mb-12">
        <h3 className="text-3xl md:text-4xl font-bold">Tu Viaje Empieza Aquí</h3>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Te acompañamos en cada paso de tu camino hacia el bienestar.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        <div className="space-y-10">
          {journeySteps.map((step, index) => {
            const isActive = index === activeStep;
            const isCompleted = index < activeStep;

            return (
              <div key={index} className="flex items-start gap-6 cursor-pointer group" onClick={() => setActiveStep(index)}>
                <div
                  className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center font-bold border-2 transition-all duration-300 flex-shrink-0",
                    isActive
                      ? "bg-foreground text-background border-foreground"
                      : "border-muted text-muted-foreground"
                  )}
                >
                  {isCompleted || isActive ? <IconCheck size={20} /> : index + 1}
                </div>
                <div>
                  <h4
                    className={cn(
                      "text-xl font-semibold mb-1 transition-colors duration-300",
                      isActive ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {step.title}
                  </h4>
                  <p className="text-muted-foreground/80">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <img
            src="https://picsum.photos/seed/health-journey/800/600"
            alt="Paciente en su viaje de recuperación en la clínica LUMENA"
            className="rounded-xl shadow-2xl w-full h-auto object-cover aspect-[4/3]"
          />
        </div>
      </div>
    </section>
  );
};