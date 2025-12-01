
import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Label } from './ui/Label';
import { Card } from './ui/Card';
import { IconCalendarEvent, IconCheck, IconUser, IconClock, IconMail, IconPhone, IconLoader2, IconCalendar, IconBolt, IconAlertCircle, IconCircleCheck } from '@tabler/icons-react';
import { cn } from '../lib/utils';

interface QuickAppointmentFormProps {
    defaultService?: string;
    idPrefix?: string;
}

const QuickAppointmentForm: React.FC<QuickAppointmentFormProps> = ({ defaultService, idPrefix = 'quick' }) => {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        date: '',
        time: '',
        service: defaultService || ''
    });
    
    // Update service if prop changes
    React.useEffect(() => {
        if (defaultService) {
            setFormData(prev => ({ ...prev, service: defaultService }));
        }
    }, [defaultService]);

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

    const validateField = (name: string, value: string) => {
        let error = '';
        if (name === 'name' && (!value || value.trim().length < 2)) error = 'Mínimo 2 caracteres';
        if (name === 'phone' && !/^[0-9\s+]{9,}$/.test(value)) error = 'Teléfono inválido (mínimo 9 dígitos)';
        if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Email inválido';
        if (name === 'date' && !value) error = 'Selecciona una fecha';
        if (name === 'time' && !value) error = 'Selecciona una hora';
        return error;
    };

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Validate immediately if already touched to provide real-time feedback
        if (touched[field]) {
            setErrors(prev => ({ ...prev, [field]: validateField(field, value) }));
        }
    };

    const handleBlur = (field: string) => {
        setTouched(prev => ({ ...prev, [field]: true }));
        setErrors(prev => ({ ...prev, [field]: validateField(field, (formData as any)[field]) }));
    };

    // Derived validity state
    const isStep1Valid = !!(
        formData.name && formData.name.trim().length >= 2 && !validateField('name', formData.name) &&
        formData.phone && /^[0-9\s+]{9,}$/.test(formData.phone) && !validateField('phone', formData.phone) &&
        formData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && !validateField('email', formData.email)
    );

    const isStep2Valid = !!(formData.date && formData.time);

    const handleNext = () => {
        if (step === 1) {
            // Force validation on all fields
            setTouched({ name: true, phone: true, email: true });
            const nameError = validateField('name', formData.name);
            const phoneError = validateField('phone', formData.phone);
            const emailError = validateField('email', formData.email);
            setErrors({ name: nameError, phone: phoneError, email: emailError });

            if (!nameError && !phoneError && !emailError) setStep(2);
        }
    };

    const handleSubmit = async () => {
        if (!formData.date || !formData.time) {
             setErrors(prev => ({
                 ...prev,
                 date: !formData.date ? 'Requerido' : '',
                 time: !formData.time ? 'Requerido' : ''
             }));
             return;
        }

        setIsSubmitting(true);
        console.log("Enviando cita para:", formData);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setStep(3);
    };

    const handleAddToCalendar = () => {
        alert("El evento se añadiría a tu calendario.");
    };

    // Helper for input visual state
    const getInputState = (field: string) => {
        const hasError = !!errors[field];
        const isTouched = !!touched[field];
        const value = (formData as any)[field];
        const isValid = isTouched && !hasError && value;
        return { hasError, isValid };
    };

    return (
        <Card className="shadow-2xl border-t-4 border-t-primary bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 overflow-hidden sticky top-28">
            {/* Header */}
            <div className="p-5 pb-4 bg-muted/30 border-b border-border/50">
                <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                         <div className="bg-primary/10 p-1.5 rounded-md">
                            <IconBolt size={18} className="text-primary" />
                         </div>
                         <div>
                            <h3 className="font-bold text-lg leading-none">Cita Rápida</h3>
                            {defaultService && <p className="text-[10px] text-muted-foreground font-medium mt-0.5 truncate max-w-[140px]">{defaultService}</p>}
                         </div>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Paso {step}/3</span>
                </div>
                
                {/* Visual Progress */}
                <div className="flex gap-1.5 mt-3">
                    {[1, 2, 3].map((s) => (
                        <div 
                            key={s} 
                            className={cn(
                                "h-1 flex-1 rounded-full transition-all duration-500",
                                step >= s ? "bg-primary" : "bg-primary/20"
                            )}
                        />
                    ))}
                </div>
            </div>

            <div className="p-5">
            {step === 1 && (
                <div className="space-y-4 animate-fade-in-up">
                    <div className="space-y-1">
                        <Label htmlFor={`${idPrefix}-name`} className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Nombre</Label>
                        <div className="relative group">
                            <IconUser className={cn("absolute left-3 top-2.5 h-4 w-4 transition-colors", getInputState('name').hasError ? "text-destructive" : "text-muted-foreground group-focus-within:text-primary")} />
                            <Input 
                                id={`${idPrefix}-name`} 
                                className={cn(
                                    "pl-9 h-10 text-sm transition-all pr-8", 
                                    getInputState('name').hasError ? "border-destructive bg-destructive/5 focus-visible:ring-destructive" : 
                                    getInputState('name').isValid ? "border-green-500 focus-visible:ring-green-500" : "focus:border-primary"
                                )}
                                placeholder="Tu nombre"
                                value={formData.name}
                                onChange={e => handleChange('name', e.target.value)}
                                onBlur={() => handleBlur('name')}
                            />
                            {getInputState('name').hasError && <IconAlertCircle className="absolute right-3 top-2.5 h-4 w-4 text-destructive" />}
                            {getInputState('name').isValid && <IconCircleCheck className="absolute right-3 top-2.5 h-4 w-4 text-green-500" />}
                        </div>
                        {errors.name && <span className="text-[10px] text-destructive font-medium block animate-fade-in-up">{errors.name}</span>}
                    </div>
                    
                    <div className="space-y-1">
                        <Label htmlFor={`${idPrefix}-phone`} className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Teléfono</Label>
                        <div className="relative group">
                            <IconPhone className={cn("absolute left-3 top-2.5 h-4 w-4 transition-colors", getInputState('phone').hasError ? "text-destructive" : "text-muted-foreground group-focus-within:text-primary")} />
                            <Input 
                                id={`${idPrefix}-phone`} 
                                type="tel" 
                                className={cn(
                                    "pl-9 h-10 text-sm transition-all pr-8", 
                                    getInputState('phone').hasError ? "border-destructive bg-destructive/5 focus-visible:ring-destructive" : 
                                    getInputState('phone').isValid ? "border-green-500 focus-visible:ring-green-500" : "focus:border-primary"
                                )}
                                placeholder="600 000 000"
                                value={formData.phone}
                                onChange={e => handleChange('phone', e.target.value)}
                                onBlur={() => handleBlur('phone')}
                            />
                             {getInputState('phone').hasError && <IconAlertCircle className="absolute right-3 top-2.5 h-4 w-4 text-destructive" />}
                             {getInputState('phone').isValid && <IconCircleCheck className="absolute right-3 top-2.5 h-4 w-4 text-green-500" />}
                        </div>
                        {errors.phone && <span className="text-[10px] text-destructive font-medium block animate-fade-in-up">{errors.phone}</span>}
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor={`${idPrefix}-email`} className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Email</Label>
                        <div className="relative group">
                            <IconMail className={cn("absolute left-3 top-2.5 h-4 w-4 transition-colors", getInputState('email').hasError ? "text-destructive" : "text-muted-foreground group-focus-within:text-primary")} />
                            <Input 
                                id={`${idPrefix}-email`} 
                                type="email"
                                className={cn(
                                    "pl-9 h-10 text-sm transition-all pr-8", 
                                    getInputState('email').hasError ? "border-destructive bg-destructive/5 focus-visible:ring-destructive" : 
                                    getInputState('email').isValid ? "border-green-500 focus-visible:ring-green-500" : "focus:border-primary"
                                )}
                                placeholder="tu@email.com"
                                value={formData.email}
                                onChange={e => handleChange('email', e.target.value)}
                                onBlur={() => handleBlur('email')}
                            />
                            {getInputState('email').hasError && <IconAlertCircle className="absolute right-3 top-2.5 h-4 w-4 text-destructive" />}
                            {getInputState('email').isValid && <IconCircleCheck className="absolute right-3 top-2.5 h-4 w-4 text-green-500" />}
                        </div>
                        {errors.email && <span className="text-[10px] text-destructive font-medium block animate-fade-in-up">{errors.email}</span>}
                    </div>

                    <Button 
                        className="w-full mt-2 shadow-lg shadow-primary/20 transition-all duration-300" 
                        onClick={handleNext} 
                        disabled={!isStep1Valid}
                    >
                        Continuar
                    </Button>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-4 animate-fade-in-up">
                    <div className="space-y-1">
                        <Label htmlFor={`${idPrefix}-date`} className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Fecha Preferida</Label>
                        <div className="relative group">
                            <IconCalendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <Input 
                                id={`${idPrefix}-date`} 
                                type="date"
                                className={cn("pl-9 h-10 text-sm", errors.date && "border-destructive bg-destructive/5")}
                                value={formData.date}
                                onChange={e => handleChange('date', e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                            />
                        </div>
                        {errors.date && <span className="text-[10px] text-destructive font-medium block animate-fade-in-up">{errors.date}</span>}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor={`${idPrefix}-time`} className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Preferencia Horaria</Label>
                        <div className="relative group">
                            <IconClock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <select 
                                id={`${idPrefix}-time`}
                                className={cn(
                                    "flex h-10 w-full rounded-md border border-input bg-transparent pl-9 pr-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 appearance-none",
                                    errors.time && "border-destructive bg-destructive/5"
                                )}
                                value={formData.time}
                                onChange={e => handleChange('time', e.target.value)}
                            >
                                <option value="">Selecciona...</option>
                                <option value="morning">Mañana (09:00 - 13:00)</option>
                                <option value="afternoon">Tarde (15:00 - 20:00)</option>
                            </select>
                        </div>
                         {errors.time && <span className="text-[10px] text-destructive font-medium block animate-fade-in-up">{errors.time}</span>}
                    </div>
                    <div className="flex gap-3 mt-6">
                        <Button variant="outline" size="sm" className="flex-1" onClick={() => setStep(1)}>Atrás</Button>
                        <Button 
                            className="flex-[2] shadow-lg shadow-primary/20" 
                            onClick={handleSubmit}
                            disabled={isSubmitting || !isStep2Valid}
                        >
                            {isSubmitting ? (
                                <>
                                    <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Enviando
                                </>
                            ) : 'Confirmar'}
                        </Button>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="text-center animate-fade-in-up py-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                        <IconCheck className="h-8 w-8 text-green-600" />
                    </div>
                    <h4 className="text-xl font-bold text-foreground">¡Solicitud Recibida!</h4>
                    <p className="text-sm text-muted-foreground mt-2 mb-6 leading-relaxed">
                        Te contactaremos al <strong>{formData.phone}</strong> para confirmar tu cita de <strong>{formData.service}</strong>.
                    </p>
                    
                    <Button 
                        variant="secondary" 
                        size="sm"
                        className="w-full gap-2 text-xs font-semibold"
                        onClick={handleAddToCalendar}
                    >
                        <IconCalendarEvent className="h-4 w-4" />
                        Guardar en Calendario
                    </Button>
                </div>
            )}
            </div>
        </Card>
    );
};

export default QuickAppointmentForm;
