import React from 'react';
import { cn } from '../../lib/utils';

export interface SliderItem {
  imageUrl: string;
  title: string;
  description: string;
}

interface InfiniteSliderProps {
  items: SliderItem[];
  speed?: 'normal' | 'slow' | 'fast';
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  className?: string;
}

const InfiniteSlider: React.FC<InfiniteSliderProps> = ({
  items,
  speed = 'normal',
  direction = 'left',
  pauseOnHover = true,
  className,
}) => {
  const duplicatedItems = [...items, ...items];

  const speedClasses = {
    slow: 'duration-[60s]',
    normal: 'duration-[40s]',
    fast: 'duration-[20s]',
  };

  return (
    <div
      className={cn(
        'w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]',
        className
      )}
    >
      <div
        className={cn(
          'flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap animate-scroll',
          speedClasses[speed],
          direction === 'right' ? 'flex-row-reverse' : 'flex-row',
          pauseOnHover && 'hover:[animation-play-state:paused]'
        )}
      >
        {duplicatedItems.map((item, index) => (
          <div
            key={index}
            className="relative w-[350px] max-w-full flex-shrink-0 h-[220px] rounded-2xl overflow-hidden group shadow-lg"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="text-sm text-white/80">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteSlider;