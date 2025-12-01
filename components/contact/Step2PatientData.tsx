import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { FormData, FormErrors } from '../../pages/ContactPage';
import { IconUser, IconMail, IconPhone, IconCalendar, IconUsers, IconId, IconAlertCircle } from '@tabler/icons-react';
import { cn } from '../../lib/utils';

interface Step2PatientDataProps {
  onNext: () => void;
  onBack: () => void;
  updateFormData: (data: Partial<FormData>) => void;
  formData: FormData;
  errors: FormErrors;
  handleBlur: (field: keyof FormData) => void;
}

const InputWithIcon = ({ icon: Icon, error, ...props }: any) => (
  <div className="space-y-1">
    <div className="relative group">
      <Icon className={cn(
        "absolute left-3 top-2.5 h-5 w-5 transition-colors duration-200",
        error ? "text-destructive" : "text-muted-foreground group-hover:text-primary"
      )} />
      <Input 
        {...props} 
        className={cn(
          "pl-10 transition-all duration-200",
          error 
            ? "border-destructive focus-visible:ring-destructive bg-destructive/5" 
            : "focus:ring-primary/20 hover:border-primary/50",
          props.className
        )} 
      />
      {error && (
        <IconAlertCircle className="absolute right-3 top-2.5 h-5 w-5 text-destructive" />
      )}
    </div>
    {error && <p className="text-xs text-destructive font-medium ml-1 animate-fade-in-up">{error}</p>}
  </div>
);

const Step2PatientData: React.FC<Step2PatientDataProps> = ({ onNext, onBack, updateFormData, formData, errors, handleBlur }) => {
  const [subStep, setSubStep] = useState(1); // 1 for patient, 2 for contact
  const [direction, setDirection] = useState(1);

  const variants = {
    enter: (direction: number) => ({ x: direction > 0 ? '50%' : '-50%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? '50%' : '-50%', opacity: 0 }),
  };

  const isPatientDataValid = useMemo(() => {
    return !!(formData.patientName && !errors.patientName &&
              formData.patientDob && !errors.patientDob &&
              formData.relationship && !errors.relationship);
  }, [formData, errors]);

  const isContactDataValid = useMemo(() => {
    return !!(formData.name && !errors.name &&
              formData.email && !errors.email &&
              formData.phone && !errors.phone);
  }, [formData, errors]);

  const handleSubStepNext = () => {
    ['patientName', 'patientDob', 'relationship'].forEach(f => handleBlur(f as keyof FormData));
    
    if (isPatientDataValid) {
         setDirection(1);
         setSubStep(2);
    }
  };

  const handleSubStepBack = () => {
    setDirection(-1);
    setSubStep(1);
  };

  // Logic for single step (Self)
  const isSelfFormValid = !!(formData.name && formData.email && formData.phone && !errors.name && !errors.email && !errors.phone);

  if (formData.appointmentFor === 'self') {
    return (
      <div className="animate-fade-in-up max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-2 text-center text-foreground">Tus datos de contacto</h2>
        <p className="text-muted-foreground mb-8 text-center">Necesitamos algunos datos para agendar tu cita.</p>
        <div className="space-y-6">
          <div>
            <Label htmlFor="name" className="mb-2 block">Nombre Completo</Label>
            <InputWithIcon 
                icon={IconUser} 
                id="name" 
                value={formData.name} 
                onChange={(e: any) => updateFormData({ name: e.target.value })} 
                onBlur={() => handleBlur('name')}
                error={errors.name}
                placeholder="Ej: Ana García" 
                required 
            />
          </div>
          <div>
            <Label htmlFor="email" className="mb-2 block">Correo Electrónico</Label>
            <InputWithIcon 
                icon={IconMail} 
                id="email" 
                type="email" 
                value={formData.email} 
                onChange={(e: any) => updateFormData({ email: e.target.value })} 
                onBlur={() => handleBlur('email')}
                error={errors.email}
                placeholder="tu@email.com" 
                required 
            />
          </div>
          <div>
            <Label htmlFor="phone" className="mb-2 block">Teléfono Móvil</Label>
            <InputWithIcon 
                icon={IconPhone} 
                id="phone" 
                type="tel" 
                value={formData.phone} 
                onChange={(e: any) => updateFormData({ phone: e.target.value })} 
                onBlur={() => handleBlur('phone')}
                error={errors.phone}
                placeholder="600 123 456" 
                required 
            />
          </div>
        </div>
        <div className="flex justify-between mt-10 pt-6 border-t border-border/40">
          <Button variant="outline" onClick={onBack}>Atrás</Button>
          <Button onClick={onNext} disabled={!isSelfFormValid} className="px-8 shadow-lg shadow-primary/20">Siguiente</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden max-w-xl mx-auto">
        <AnimatePresence mode="wait" custom={direction}>
            <motion.div
                key={subStep}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
                {subStep === 1 ? (
                    <div>
                        <h2 className="text-2xl font-bold mb-2 text-center text-foreground">Datos del Paciente (1/2)</h2>
                        <p className="text-muted-foreground mb-8 text-center">Información de quien recibirá la atención.</p>
                        <div className="space-y-6">
                            <div>
                                <Label htmlFor="patientName" className="mb-2 block">Nombre del Paciente</Label>
                                <InputWithIcon 
                                    icon={IconUser} 
                                    id="patientName" 
                                    value={formData.patientName} 
                                    onChange={(e: any) => updateFormData({ patientName: e.target.value })} 
                                    onBlur={() => handleBlur('patientName')}
                                    error={errors.patientName}
                                    placeholder="Ej: Juan Pérez" 
                                    required 
                                />
                            </div>
                            <div>
                                <Label htmlFor="patientDob" className="mb-2 block">Fecha de Nacimiento</Label>
                                <InputWithIcon 
                                    icon={IconCalendar} 
                                    id="patientDob" 
                                    type="date" 
                                    value={formData.patientDob} 
                                    onChange={(e: any) => updateFormData({ patientDob: e.target.value })} 
                                    onBlur={() => handleBlur('patientDob')}
                                    error={errors.patientDob}
                                    required 
                                />
                            </div>
                            <div>
                                <Label htmlFor="relationship" className="mb-2 block">Relación o Parentesco</Label>
                                <div className="space-y-1">
                                    <div className="relative group">
                                    <IconUsers className={cn(
                                        "absolute left-3 top-2.5 h-5 w-5 z-10 transition-colors",
                                        errors.relationship ? "text-destructive" : "text-muted-foreground group-hover:text-primary"
                                    )} />
                                    <select
                                        id="relationship"
                                        value={formData.relationship}
                                        onChange={e => updateFormData({ relationship: e.target.value })}
                                        onBlur={() => handleBlur('relationship')}
                                        className={cn(
                                            "flex h-10 w-full rounded-md border bg-background pl-10 pr-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none transition-all",
                                            errors.relationship 
                                                ? "border-destructive focus-visible:ring-destructive bg-destructive/5" 
                                                : "border-input hover:border-primary/50 focus:ring-primary/20"
                                        )}
                                    >
                                        <option value="">Selecciona una opción</option>
                                        <option value="Hijo/a">Hijo/a</option>
                                        <option value="Padre/Madre">Padre/Madre</option>
                                        <option value="Cónyuge/Pareja">Cónyuge/Pareja</option>
                                        <option value="Otro Familiar">Otro Familiar</option>
                                        <option value="Tutor Legal">Tutor Legal</option>
                                        <option value="Otro">Otro</option>
                                    </select>
                                    {errors.relationship && (
                                        <IconAlertCircle className="absolute right-3 top-2.5 h-5 w-5 text-destructive pointer-events-none" />
                                    )}
                                    </div>
                                    {errors.relationship && <p className="text-xs text-destructive font-medium ml-1 animate-fade-in-up">{errors.relationship}</p>}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between mt-10 pt-6 border-t border-border/40">
                            <Button variant="outline" onClick={onBack}>Atrás</Button>
                            <Button onClick={handleSubStepNext} disabled={!isPatientDataValid} className="px-8 shadow-lg shadow-primary/20">Siguiente</Button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-2xl font-bold mb-2 text-center text-foreground">Tus Datos de Contacto (2/2)</h2>
                        <p className="text-muted-foreground mb-8 text-center">Persona responsable de la reserva.</p>
                        <div className="space-y-6">
                            <div>
                                <Label htmlFor="contactName" className="mb-2 block">Tu Nombre Completo</Label>
                                <InputWithIcon 
                                    icon={IconId} 
                                    id="contactName" 
                                    value={formData.name} 
                                    onChange={(e: any) => updateFormData({ name: e.target.value })} 
                                    onBlur={() => handleBlur('name')}
                                    error={errors.name}
                                    placeholder="Ej: Ana García" 
                                    required 
                                />
                            </div>
                            <div>
                                <Label htmlFor="contactEmail" className="mb-2 block">Tu Correo Electrónico</Label>
                                <InputWithIcon 
                                    icon={IconMail} 
                                    id="contactEmail" 
                                    type="email" 
                                    value={formData.email} 
                                    onChange={(e: any) => updateFormData({ email: e.target.value })} 
                                    onBlur={() => handleBlur('email')}
                                    error={errors.email}
                                    placeholder="tu@email.com" 
                                    required 
                                />
                            </div>
                            <div>
                                <Label htmlFor="contactPhone" className="mb-2 block">Tu Teléfono Móvil</Label>
                                <InputWithIcon 
                                    icon={IconPhone} 
                                    id="contactPhone" 
                                    type="tel" 
                                    value={formData.phone} 
                                    onChange={(e: any) => updateFormData({ phone: e.target.value })} 
                                    onBlur={() => handleBlur('phone')}
                                    error={errors.phone}
                                    placeholder="600 123 456" 
                                    required 
                                />
                            </div>
                        </div>
                        <div className="flex justify-between mt-10 pt-6 border-t border-border/40">
                            <Button variant="outline" onClick={handleSubStepBack}>Atrás</Button>
                            <Button onClick={onNext} disabled={!isContactDataValid} className="px-8 shadow-lg shadow-primary/20">Siguiente</Button>
                        </div>
                    </div>
                )}
            </motion.div>
        </AnimatePresence>
    </div>
  );
};
export default Step2PatientData;