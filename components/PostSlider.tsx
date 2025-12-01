
import React, { useRef, useState, useEffect } from 'react';
import { Post } from '../types';
import PostCard from './PostCard';
import { Button } from './ui/Button';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { cn } from '../lib/utils';

interface PostSliderProps {
  posts: Post[];
}

const PostSlider: React.FC<PostSliderProps> = ({ posts }) => {
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

    const timeoutId = setTimeout(checkScrollPosition, 500);

    return () => {
      if (container) {
          container.removeEventListener('scroll', checkScrollPosition);
      }
      window.removeEventListener('resize', checkScrollPosition);
      clearTimeout(timeoutId);
    };
  }, [posts]);

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
          {posts.map((post, index) => (
            <div key={post.slug} className={cn(
              "w-80 md:w-96 flex-shrink-0",
              index === 0 && 'pl-1',
              index === posts.length - 1 && 'pr-1'
            )}>
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 -left-6 hidden md:flex items-center">
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

      <div className="absolute top-1/2 -translate-y-1/2 -right-6 hidden md:flex items-center">
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

export default PostSlider;
