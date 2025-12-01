import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '../ui/Button';
import { FormData } from '../../pages/ContactPage';
import { getAvailableTimes } from '../../lib/data';
import { IconChevronLeft, IconChevronRight, IconLoader2, IconSun, IconSunset, IconCalendarTime } from '@tabler/icons-react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

interface Step4DateTimeSelectionProps {
  onNext: () => void;
  onBack: () => void;
  updateFormData: (data: Partial<FormData>) => void;
  formData: FormData;
}

const Calendar: React.FC<{ selectedDate: Date | null, onDateSelect: (date: Date) => void }> = ({ selectedDate, onDateSelect }) => {
    const [currentDate, setCurrentDate] = useState(selectedDate || new Date());

    const daysInMonth = useMemo(() => new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate(), [currentDate]);
    const firstDayOfMonth = useMemo(() => {
        const day = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
        return day === 0 ? 6 : day - 1; // Start Monday
    }, [currentDate]);

    const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    
    const today = new Date();
    today.setHours(0,0,0,0);

    const renderDays = () => {
        const days = [];
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="p-2"></div>);
        }
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const isSelected = selectedDate && 
                               date.getDate() === selectedDate.getDate() && 
                               date.getMonth() === selectedDate.getMonth() &&
                               date.getFullYear() === selectedDate.getFullYear();
            const isPast = date < today;
            const isWeekend = date.getDay() === 0 || date.getDay() === 6;
            const isAvailable = !isPast && !isWeekend;
            const isToday = date.getTime() === today.getTime();

            days.push(
                <button
                    key={day}
                    disabled={!isAvailable}
                    onClick={() => onDateSelect(date)}
                    className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center text-sm font-medium transition-all duration-200 relative",
                        !isAvailable && "text-muted-foreground/30 cursor-not-allowed",
                        isAvailable && !isSelected && "hover:bg-primary/10 hover:text-primary text-foreground",
                        isSelected && "bg-primary text-primary-foreground shadow-md shadow-primary/30 scale-105 font-bold",
                        isToday && !isSelected && "border border-primary text-primary",
                    )}
                >
                    {day}
                    {isToday && !isSelected && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></span>}
                </button>
            );
        }
        return days;
    };
    
    const weekDays = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'];

    return (
        <div className="p-6 rounded-2xl bg-card border border-border shadow-sm h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <Button variant="ghost" size="icon" onClick={handlePrevMonth} className="h-8 w-8 hover:bg-accent rounded-full"><IconChevronLeft className="h-5 w-5"/></Button>
                <div className="text-center">
                    <h3 className="font-bold text-lg capitalize text-foreground">
                        {currentDate.toLocaleString('es-ES', { month: 'long' })}
                    </h3>
                    <p className="text-xs text-muted-foreground font-medium">{currentDate.getFullYear()}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={handleNextMonth} className="h-8 w-8 hover:bg-accent rounded-full"><IconChevronRight className="h-5 w-5"/></Button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
                {weekDays.map(day => <div key={day}>{day}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-y-3 gap-x-1 place-items-center flex-grow content-start">
                {renderDays()}
            </div>
        </div>
    );
};

const TimeSlots: React.FC<{ selectedDate: Date | null, selectedTime: string, onTimeSelect: (time: string) => void }> = ({ selectedDate, selectedTime, onTimeSelect }) => {
    const [loading, setLoading] = useState(false);
    const [slots, setSlots] = useState<{ morning: string[], afternoon: string[] }>({ morning: [], afternoon: [] });
    
    useEffect(() => {
        if (selectedDate) {
            setLoading(true);
            setSlots({ morning: [], afternoon: [] }); 
            getAvailableTimes(selectedDate).then(data => {
                setSlots(data);
                setLoading(false);
            });
        }
    }, [selectedDate]);

    if (!selectedDate) {
        return (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center bg-muted/20 rounded-2xl border border-dashed border-border/60">
                <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mb-4">
                    <IconCalendarTime className="h-8 w-8 text-muted-foreground/60" />
                </div>
                <h4 className="font-medium text-foreground">Selecciona una fecha</h4>
                <p className="text-sm text-muted-foreground mt-2 max-w-[200px]">Elige un día en el calendario para ver la disponibilidad.</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center p-8 rounded-2xl bg-card border border-border">
                <IconLoader2 className="h-8 w-8 text-primary animate-spin mb-4" />
                <p className="text-sm font-medium text-muted-foreground">Buscando horarios...</p>
            </div>
        );
    }

    const hasSlots = slots.morning.length > 0 || slots.afternoon.length > 0;

    return (
        <div className="h-full flex flex-col bg-card rounded-2xl border border-border p-6 overflow-hidden">
            <h4 className="font-bold text-lg mb-4 text-center border-b border-border/50 pb-4">
                Horarios disponibles para el <span className="text-primary">{selectedDate.toLocaleDateString('es-ES', {day: 'numeric', month: 'long'})}</span>
            </h4>
            
            {!hasSlots ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <p className="text-foreground font-medium">No hay citas disponibles.</p>
                    <p className="text-sm text-muted-foreground mt-1">Por favor, prueba con otro día.</p>
                </div>
            ) : (
                <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar">
                    {slots.morning.length > 0 && (
                        <div>
                            <div className="flex items-center gap-2 mb-3 text-xs font-bold text-muted-foreground uppercase tracking-widest bg-orange-50 dark:bg-orange-950/20 w-fit px-3 py-1 rounded-full">
                                <IconSun className="h-4 w-4 text-orange-500" />
                                <span>Mañana</span>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                {slots.morning.map((time, i) => (
                                    <motion.button 
                                        key={time} 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        onClick={() => onTimeSelect(time)}
                                        className={cn(
                                            "py-2.5 px-2 rounded-lg text-sm font-semibold transition-all duration-200 border",
                                            selectedTime === time 
                                                ? "bg-primary border-primary text-primary-foreground shadow-md ring-2 ring-primary/20" 
                                                : "bg-background border-input hover:border-primary hover:text-primary text-foreground"
                                        )}
                                    >
                                        {time}
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {slots.morning.length > 0 && slots.afternoon.length > 0 && <div className="h-px bg-border/50 my-2"></div>}

                    {slots.afternoon.length > 0 && (
                         <div>
                            <div className="flex items-center gap-2 mb-3 text-xs font-bold text-muted-foreground uppercase tracking-widest bg-indigo-50 dark:bg-indigo-950/20 w-fit px-3 py-1 rounded-full">
                                <IconSunset className="h-4 w-4 text-indigo-500" />
                                <span>Tarde</span>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                {slots.afternoon.map((time, i) => (
                                    <motion.button 
                                        key={time} 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        onClick={() => onTimeSelect(time)}
                                        className={cn(
                                            "py-2.5 px-2 rounded-lg text-sm font-semibold transition-all duration-200 border",
                                            selectedTime === time 
                                                ? "bg-primary border-primary text-primary-foreground shadow-md ring-2 ring-primary/20" 
                                                : "bg-background border-input hover:border-primary hover:text-primary text-foreground"
                                        )}
                                    >
                                        {time}
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};


const Step4DateTimeSelection: React.FC<Step4DateTimeSelectionProps> = ({ onNext, onBack, updateFormData, formData }) => {
  const handleDateSelect = (date: Date) => {
    updateFormData({ date, time: '' }); // Reset time when date changes
  };

  const handleTimeSelect = (time: string) => {
    updateFormData({ time });
  };

  return (
    <div className="animate-fade-in-up max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-2 text-center text-foreground">Elige Fecha y Hora</h2>
      <p className="text-muted-foreground mb-8 text-center">Selecciona tu momento ideal.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch min-h-[450px]">
        <Calendar selectedDate={formData.date} onDateSelect={handleDateSelect} />
        <TimeSlots selectedDate={formData.date} selectedTime={formData.time} onTimeSelect={handleTimeSelect} />
      </div>

      <div className="flex justify-between mt-10 pt-6 border-t border-border/40">
        <Button variant="outline" onClick={onBack}>Atrás</Button>
        <Button onClick={onNext} disabled={!formData.date || !formData.time} className="px-8 shadow-lg shadow-primary/20">Siguiente</Button>
      </div>
    </div>
  );
};

export default Step4DateTimeSelection;