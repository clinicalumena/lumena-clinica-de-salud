
import React, { useRef, useState, useEffect } from 'react';
import { Button } from './ui/Button';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { cn } from '../lib/utils';

interface CategorySliderProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategorySlider: React.FC<CategorySliderProps> = ({ categories, activeCategory, onCategoryChange }) => {
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
    const resizeObserver = new ResizeObserver(checkScrollPosition);
    resizeObserver.observe(container);
    container.addEventListener('scroll', checkScrollPosition, { passive: true });
    
    const timeoutId = setTimeout(checkScrollPosition, 100);

    return () => {
      if(container) {
        resizeObserver.unobserve(container);
        container.removeEventListener('scroll', checkScrollPosition);
      }
      clearTimeout(timeoutId);
    };
  }, [categories]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = current.clientWidth * 0.75;
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

   useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const activeButton = container.querySelector(`[data-category="${activeCategory}"]`) as HTMLElement;
      if (activeButton) {
        const containerRect = container.getBoundingClientRect();
        const buttonRect = activeButton.getBoundingClientRect();

        const scrollLeft =
          buttonRect.left -
          containerRect.left -
          containerRect.width / 2 +
          buttonRect.width / 2;
        
        container.scrollBy({
          left: scrollLeft,
          behavior: 'smooth',
        });
      }
    }
  }, [activeCategory]);


  return (
    <div className="relative max-w-2xl mx-auto">
      <div
        ref={scrollContainerRef}
        className="flex items-center space-x-2 overflow-x-auto px-10 py-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((category) => (
          <button
            key={category}
            data-category={category}
            onClick={() => onCategoryChange(category)}
            className={cn(
                'px-4 py-2 rounded-full border text-sm font-medium whitespace-nowrap transition-colors duration-200',
                activeCategory === category
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-transparent border-input hover:bg-accent hover:text-accent-foreground'
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="absolute top-0 bottom-0 -left-2 hidden sm:flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "rounded-full h-9 w-9 bg-card/80 backdrop-blur-sm shadow hover:bg-accent",
            "transition-opacity duration-300",
            isAtStart ? "opacity-0 pointer-events-none" : "opacity-100"
          )}
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          <IconChevronLeft className="h-5 w-5" />
        </Button>
      </div>

      <div className="absolute top-0 bottom-0 -right-2 hidden sm:flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "rounded-full h-9 w-9 bg-card/80 backdrop-blur-sm shadow hover:bg-accent",
            "transition-opacity duration-300",
            isAtEnd ? "opacity-0 pointer-events-none" : "opacity-100"
          )}
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          <IconChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default CategorySlider;
