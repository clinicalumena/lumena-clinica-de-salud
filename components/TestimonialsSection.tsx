import React, { useState, useEffect, useCallback } from 'react';
import { getTestimonials } from '../lib/data';
import { Testimonial } from '../types';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

export const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await getTestimonials();
        setTestimonials(data);
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (testimonials.length > 1) {
      const interval = setInterval(handleNext, 6000);
      return () => clearInterval(interval);
    }
  }, [testimonials.length, handleNext]);

  if (loading) {
    return <div className="text-center py-10">Cargando testimonios...</div>;
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="bg-accent/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold">Lo que dicen nuestros pacientes</h3>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Historias reales de quienes han confiado en nosotros para su cuidado.
            </p>
            </div>

            <div className="relative h-[480px] md:h-[380px] max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => {
                const offset = index - currentIndex;
                let transformStyle = {};
                let opacity = 0;

                if (offset === 0) {
                transformStyle = { transform: 'translateX(0%) scale(1)', zIndex: 20 };
                opacity = 1;
                } else if (offset === 1 || (currentIndex === testimonials.length - 1 && index === 0)) {
                transformStyle = { transform: 'translateX(50%) scale(0.85)', zIndex: 10 };
                opacity = 0.5;
                } else if (offset === -1 || (currentIndex === 0 && index === testimonials.length - 1)) {
                transformStyle = { transform: 'translateX(-50%) scale(0.85)', zIndex: 10 };
                opacity = 0.5;
                } else {
                const xPos = offset > 0 ? '100%' : '-100%';
                transformStyle = { transform: `translateX(${xPos}) scale(0.7)`, zIndex: 0 };
                opacity = 0;
                }

                return (
                <div
                    key={index}
                    className="absolute top-0 left-0 w-full h-full transition-all duration-500 ease-out"
                    style={{ ...transformStyle, opacity }}
                >
                    <div className="bg-card p-6 md:p-8 rounded-2xl shadow-2xl w-full h-full flex flex-col md:flex-row items-center gap-6 md:gap-8">
                    <div className="w-full md:w-2/5 h-48 md:h-full flex-shrink-0">
                        <img 
                        src={testimonial.imageUrl} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover rounded-xl"
                        />
                    </div>
                    <div className="w-full md:w-3/5 text-center md:text-left">
                        <h4 className="text-2xl font-bold text-foreground">{testimonial.name}</h4>
                        <p className="text-primary font-semibold mb-4">{testimonial.title}</p>
                        <blockquote className="text-muted-foreground">
                        <p className="relative before:content-['“'] before:absolute before:-left-4 before:top-0 before:text-4xl before:text-primary/50 before:font-serif after:content-['”'] after:absolute after:text-4xl after:text-primary/50 after:font-serif">
                            {testimonial.quote}
                        </p>
                        </blockquote>
                    </div>
                    </div>
                </div>
                );
            })}
            </div>
            
            <div className="flex justify-center items-center mt-8 gap-4">
                <button onClick={handlePrev} className="p-3 rounded-full bg-foreground text-background hover:bg-foreground/80 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2" aria-label="Anterior testimonio">
                    <IconChevronLeft size={24} />
                </button>
                <button onClick={handleNext} className="p-3 rounded-full bg-foreground text-background hover:bg-foreground/80 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2" aria-label="Siguiente testimonio">
                    <IconChevronRight size={24} />
                </button>
            </div>
        </div>
    </section>
  );
};