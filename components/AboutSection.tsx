import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        <div className="animate-fade-in-up">
          <div className="mb-4">
            <span className="inline-block bg-foreground text-background text-sm font-semibold py-1.5 px-4 rounded-full">
              Nuestra Clínica
            </span>
          </div>
          <h3 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            El comienzo de un nuevo bienestar
          </h3>
          <p className="mt-6 text-lg text-muted-foreground">
            En LUMENA, creemos que la salud es el pilar de una vida plena. Hemos creado un espacio donde la tecnología de vanguardia y un trato humano se unen para ofrecerte una atención médica integral y personalizada.
          </p>
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <div className="bg-muted/60 p-4 rounded-2xl">
            <img
              src="https://picsum.photos/seed/clinic-hallway/800/600"
              alt="Interior de la clínica LUMENA, un espacio moderno y acogedor"
              className="rounded-xl w-full h-auto object-cover aspect-[4/3] shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;