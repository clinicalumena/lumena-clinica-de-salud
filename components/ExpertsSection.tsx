import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Author } from '../types';
import ExpertCard from './ExpertCard';
import { Button } from './ui/Button';
import { IconChevronLeft, IconChevronRight, IconArrowRight } from '@tabler/icons-react';
import { cn } from '../lib/utils';
import { getAuthors } from '../lib/data';

export const ExpertsSection: React.FC = () => {
    const [experts, setExperts] = useState<Author[]>([]);
    const [loading, setLoading] = useState(true);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);

    useEffect(() => {
        const fetchExperts = async () => {
            try {
                const data = await getAuthors();
                setExperts(data);
            } catch (error) {
                console.error("Failed to fetch experts:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchExperts();
    }, []);

    const checkScrollPosition = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
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
    }, [experts]);

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
        <section>
            <div className="text-center md:text-left md:flex md:justify-between md:items-center mb-12">
                <div>
                    <h3 className="text-3xl md:text-4xl font-bold">Conoce a Nuestros Especialistas</h3>
                    <p className="mt-4 max-w-2xl mx-auto md:mx-0 text-lg text-muted-foreground">
                        Profesionales apasionados y dedicados a tu bienestar.
                    </p>
                </div>
                <div className="hidden md:block mt-4 md:mt-0 flex-shrink-0">
                    <Link to="/especialistas">
                        <Button variant="outline">
                            Ver Todo el Equipo
                            <IconArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </div>

            {loading ? (
                <p className="text-center">Cargando expertos...</p>
            ) : (
                <div className="relative">
                    <div className="overflow-hidden">
                        <div
                            ref={scrollContainerRef}
                            className="flex space-x-8 overflow-x-auto pb-16 -mb-16"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {experts.map((expert, index) => (
                                <div key={expert.slug} className={cn(
                                    'py-4',
                                    index === 0 && 'pl-4',
                                    index === experts.length - 1 && 'pr-4'
                                )}>
                                    <ExpertCard expert={expert} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="absolute top-1/2 -translate-y-1/2 -left-6 hidden md:flex items-center" style={{transform: 'translateY(-50%)'}}>
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

                    <div className="absolute top-1/2 -translate-y-1/2 -right-6 hidden md:flex items-center" style={{transform: 'translateY(-50%)'}}>
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
            )}
            <div className="md:hidden text-center mt-24">
                <Link to="/especialistas">
                    <Button size="lg" variant="outline">
                        Ver Todo el Equipo
                        <IconArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
            </div>
        </section>
    );
};