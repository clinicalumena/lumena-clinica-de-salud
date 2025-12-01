
import React, { useRef, useState, useEffect } from 'react';
import { Service } from '../types';
import ServiceCard from './ServiceCard';
import { Button } from './ui/Button';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { cn } from '../lib/utils';

interface ServiceSliderProps {
  services: Service[];
}

const ServiceSlider: React.FC<ServiceSliderProps> = ({ services }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

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

    // Re-check in case images load slowly and change the scroll width
    const timeoutId = setTimeout(checkScrollPosition, 500);

    return () => {
      container.removeEventListener('scroll', checkScrollPosition);
      window.removeEventListener('resize', checkScrollPosition);
      clearTimeout(timeoutId);
    };
  }, [services]);

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
    <div className="relative">
      <div className="overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="flex space-x-6 overflow-x-auto pb-5 -mb-5"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {services.map((service, index) => (
            <div key={service.slug} className={cn(
              index === 0 && 'pl-1',
              index === services.length - 1 && 'pr-1'
            )}>
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-0 bottom-5 -left-6 hidden md:flex items-center">
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

      <div className="absolute top-0 bottom-5 -right-6 hidden md:flex items-center">
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
  );
};

export default ServiceSlider;
