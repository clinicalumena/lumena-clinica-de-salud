import React, { useRef, useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import { Button } from './ui/Button';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

interface GalleryItem {
  imageUrl: string;
  title: string;
  description: string;
}

const galleryItems: GalleryItem[] = [
  {
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=400&auto=format&fit=crop",
    title: "Consulta Personalizada",
    description: "Espacios privados para tu comodidad."
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1581092580497-c9a421b4974d?q=80&w=400&auto=format&fit=crop",
    title: "Rehabilitación Avanzada",
    description: "Equipos para una recuperación óptima."
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=400&auto=format&fit=crop",
    title: "Sala de Terapia",
    description: "Ambientes diseñados para tu bienestar."
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1538688423619-a81d3f23454b?q=80&w=400&auto=format&fit=crop",
    title: "Profesionales Dedicados",
    description: "Un equipo comprometido con tu salud."
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1556742111-a301076d9d18?q=80&w=400&auto=format&fit=crop",
    title: "Recepción Acogedora",
    description: "Tu bienestar desde el primer momento."
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=400&auto=format&fit=crop",
    title: "Diagnóstico Preciso",
    description: "Tecnología para un cuidado efectivo."
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1551192422-6ea72a06a49a?q=80&w=400&auto=format&fit=crop",
    title: "Tratamiento Odontológico",
    description: "Sonrisas saludables y radiantes."
  }
];

const GalleryCard: React.FC<{ item: GalleryItem }> = ({ item }) => (
    <div className="relative w-[350px] max-w-full flex-shrink-0 h-[220px] rounded-2xl overflow-hidden group shadow-lg">
        <img
            src={item.imageUrl}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4 text-white">
            <h4 className="text-lg font-bold">{item.title}</h4>
            <p className="text-sm text-white/80">{item.description}</p>
        </div>
    </div>
);

export function ServiceGallerySection() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);

    const checkScrollPosition = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            // Add a small buffer (10px) for precision
            setIsAtStart(scrollLeft < 10);
            setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 10);
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        checkScrollPosition();
        container.addEventListener('scroll', checkScrollPosition, { passive: true });
        window.addEventListener('resize', checkScrollPosition);

        const timeoutId = setTimeout(checkScrollPosition, 500);

        return () => {
            if (container) {
                container.removeEventListener('scroll', checkScrollPosition);
            }
            window.removeEventListener('resize', checkScrollPosition);
            clearTimeout(timeoutId);
        };
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const { current } = scrollContainerRef;
            const scrollAmount = current.offsetWidth * 0.8;
            current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    return (
        <section className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
                <h3 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Un Vistazo a Nuestras Instalaciones
                </h3>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                    Explora los espacios modernos y acogedores donde cuidamos de tu salud y bienestar.
                </p>
            </div>
            
            <div className="relative container mx-auto">
                <div
                    ref={scrollContainerRef}
                    className="flex gap-4 overflow-x-auto pb-4 -mb-4"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {galleryItems.map((item, index) => (
                        <GalleryCard key={index} item={item} />
                    ))}
                </div>
                 <div className="absolute top-1/2 -translate-y-1/2 -left-4 hidden md:flex items-center">
                    <Button
                    variant="outline"
                    size="icon"
                    className={cn(
                        "rounded-full bg-card/80 backdrop-blur-sm shadow-lg hover:bg-accent border-border",
                        "transition-opacity duration-300",
                        isAtStart ? "opacity-0 pointer-events-none" : "opacity-100"
                    )}
                    onClick={() => scroll('left')}
                    aria-label="Scroll left"
                    >
                    <IconChevronLeft className="h-6 w-6" />
                    </Button>
                </div>

                <div className="absolute top-1/2 -translate-y-1/2 -right-4 hidden md:flex items-center">
                    <Button
                    variant="outline"
                    size="icon"
                    className={cn(
                        "rounded-full bg-card/80 backdrop-blur-sm shadow-lg hover:bg-accent border-border",
                        "transition-opacity duration-300",
                        isAtEnd ? "opacity-0 pointer-events-none" : "opacity-100"
                    )}
                    onClick={() => scroll('right')}
                    aria-label="Scroll right"
                    >
                    <IconChevronRight className="h-6 w-6" />
                    </Button>
                </div>
            </div>
        </section>
    );
}