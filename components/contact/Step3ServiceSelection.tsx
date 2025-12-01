import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { FormData } from '../../pages/ContactPage';
import { serviceSpecialties } from '../../lib/data';
import { cn } from '../../lib/utils';
import { IconChevronRight, IconArrowLeft, IconCheck, IconCategory } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Step3ServiceSelectionProps {
  onNext: () => void;
  onBack: () => void;
  updateFormData: (data: Partial<FormData>) => void;
  formData: FormData;
}

const Step3ServiceSelection: React.FC<Step3ServiceSelectionProps> = ({ onNext, onBack, updateFormData, formData }) => {
  const [currentSubStep, setCurrentSubStep] = useState(formData.specialty ? 2 : 1);
  
  const handleSpecialtySelect = (specialty: string) => {
    updateFormData({ specialty, service: '' }); // Reset service when specialty changes
    setCurrentSubStep(2);
  };
  
  const handleServiceSelect = (service: string) => {
      updateFormData({ service });
  }

  const goBackToSpecialties = () => {
      setCurrentSubStep(1);
  }

  const selectedSpecialtyData = serviceSpecialties.find(s => s.name === formData.specialty);

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-2 text-center text-foreground">Selecciona un Servicio</h2>
      <p className="text-muted-foreground mb-8 text-center">
        {currentSubStep === 1 ? 'Elige una especialidad para ver los tratamientos.' : `Servicios de ${formData.specialty}`}
      </p>

      <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {currentSubStep === 1 ? (
                <motion.div 
                    key="specialties"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                {serviceSpecialties.map(specialty => (
                    <button
                    key={specialty.slug}
                    onClick={() => handleSpecialtySelect(specialty.name)}
                    className={cn(
                        "group relative p-6 rounded-xl border transition-all duration-200 flex items-center justify-between hover:shadow-lg",
                        formData.specialty === specialty.name 
                        ? "bg-primary/5 border-primary text-primary ring-1 ring-primary" 
                        : "bg-card border-border hover:border-primary/50"
                    )}
                    >
                        <div className="flex items-center gap-3">
                            <div className={cn(
                                "p-2 rounded-lg transition-colors",
                                formData.specialty === specialty.name ? "bg-primary/10" : "bg-muted group-hover:bg-primary/10"
                            )}>
                                <IconCategory className="w-6 h-6" />
                            </div>
                            <span className="text-lg font-semibold">{specialty.name}</span>
                        </div>
                        <IconChevronRight className={cn(
                            "h-5 w-5 text-muted-foreground transition-transform duration-300",
                            "group-hover:translate-x-1 group-hover:text-primary"
                        )} />
                    </button>
                ))}
                </motion.div>
            ) : (
                <motion.div 
                    key="services"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-4"
                >
                    <button 
                        onClick={goBackToSpecialties} 
                        className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-4 px-1"
                    >
                        <IconArrowLeft className="h-4 w-4 mr-1" />
                        Volver a Especialidades
                    </button>

                    <div className="grid gap-3">
                    {selectedSpecialtyData?.services.map(service => (
                        <button
                        key={service.name}
                        onClick={() => handleServiceSelect(service.name)}
                        className={cn(
                            "w-full p-4 rounded-xl border transition-all duration-200 flex items-center justify-between group relative overflow-hidden",
                            formData.service === service.name
                            ? "bg-primary border-primary text-primary-foreground shadow-lg scale-[1.01]"
                            : "bg-card border-border hover:border-primary/50 hover:bg-accent/30"
                        )}
                        >
                        <span className="font-medium text-base z-10">{service.name}</span>
                        
                        <div className="flex items-center gap-2 z-10">
                            {formData.service === service.name && (
                                <motion.div 
                                    initial={{ scale: 0 }} 
                                    animate={{ scale: 1 }}
                                    className="h-6 w-6 rounded-full bg-white text-primary flex items-center justify-center shadow-sm"
                                >
                                    <IconCheck size={14} strokeWidth={3} />
                                </motion.div>
                            )}
                        </div>
                        
                        {formData.service === service.name && (
                             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                        )}
                        </button>
                    ))}
                </div>
                </motion.div>
            )}
          </AnimatePresence>
      </div>

      <div className="flex justify-between mt-10 pt-6 border-t border-border/40">
        <Button variant="outline" onClick={onBack}>Atrás</Button>
        <Button onClick={onNext} disabled={!formData.service} className="px-8 shadow-lg shadow-primary/20">Siguiente</Button>
      </div>
    </div>
  );
};

export default Step3ServiceSelection;