
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IconCheck } from '@tabler/icons-react';
import { cn } from '../../lib/utils';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  labels: string[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps, labels }) => {
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="w-full">
      <div className="relative h-2 bg-muted rounded-full">
        <motion.div
          className="absolute top-0 left-0 h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>
      <div className="flex justify-between mt-2">
        {labels.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <div key={label} className="flex flex-col items-center w-1/5">
                <div className="relative">
                    <motion.div
                        className={cn(
                            "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors duration-300",
                            isCompleted ? "bg-primary border-primary" :
                            isActive ? "bg-card border-primary" :
                            "bg-card border-muted"
                        )}
                        animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                        transition={{ duration: 0.2 }}
                    >
                        <AnimatePresence>
                        {isCompleted ? (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                <IconCheck className="w-5 h-5 text-primary-foreground" />
                            </motion.div>
                        ) : (
                            <span className={cn(
                                "font-bold transition-colors duration-300",
                                isActive ? 'text-primary' : 'text-muted-foreground'
                            )}>
                                {stepNumber}
                            </span>
                        )}
                        </AnimatePresence>
                    </motion.div>
                </div>
              <span className={cn(
                "text-xs sm:text-sm text-center mt-2 font-medium transition-colors duration-300",
                isActive || isCompleted ? 'text-foreground' : 'text-muted-foreground'
              )}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
