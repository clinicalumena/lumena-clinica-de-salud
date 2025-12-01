import React from 'react';
import { cn } from '../../lib/utils';

interface BlockquoteProps {
  children: React.ReactNode;
  author?: string;
  source?: string;
  className?: string;
}

const Blockquote = React.forwardRef<HTMLQuoteElement, BlockquoteProps>(
  ({ children, author, source, className }, ref) => {
    return (
      <blockquote
        ref={ref}
        className={cn(
          'my-8 border-l-4 border-primary bg-card p-6 rounded-lg shadow-sm border border-border/60',
          className
        )}
      >
        <div className="relative">
          <p className="text-lg italic text-foreground/90">
            {children}
          </p>
        </div>
        {(author || source) && (
          <footer className="mt-4 text-right not-italic">
            {author && <div className="font-bold text-foreground">{`— ${author}`}</div>}
            {source && <cite className="text-sm text-muted-foreground block">{source}</cite>}
          </footer>
        )}
      </blockquote>
    );
  }
);
Blockquote.displayName = 'Blockquote';

export default Blockquote;
