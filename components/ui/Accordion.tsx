import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { IconChevronDown } from '@tabler/icons-react';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
  variant: 'default' | 'dark';
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, isOpen, onClick, variant }) => {
  return (
    <div className={cn(
        "border-b last:border-b-0", 
        variant === 'dark' ? "border-background/20" : "border-border"
    )}>
      <button
        onClick={onClick}
        className={cn(
            "flex justify-between items-center w-full py-5 px-4 md:px-6 text-left text-base font-medium transition-colors",
            variant === 'dark' 
                ? "text-background/90 hover:bg-white/5" 
                : "text-foreground hover:bg-muted/30"
        )}
        aria-expanded={isOpen}
      >
        <h4 className="pr-4">{title}</h4>
        <IconChevronDown
          className={cn('h-5 w-5 transition-transform duration-300 shrink-0', isOpen ? 'rotate-180' : '')}
        />
      </button>
      <div
        className={cn(
          'grid grid-rows-[0fr] transition-all duration-300 ease-in-out',
          isOpen ? 'grid-rows-[1fr]' : ''
        )}
      >
        <div className="overflow-hidden">
          <div className={cn(
              "pb-5 px-4 md:px-6",
              variant === 'dark' ? "text-background/70" : "text-muted-foreground"
          )}>
            <p>{children}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface AccordionProps {
  items: {
    title: string;
    content: string;
  }[];
  variant?: 'default' | 'dark';
}

const Accordion: React.FC<AccordionProps> = ({ items, variant = 'default' }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Default open first item

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          isOpen={openIndex === index}
          onClick={() => handleClick(index)}
          variant={variant}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};

export default Accordion;