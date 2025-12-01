import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Step1AppointmentFor from '../components/contact/Step1AppointmentFor';
import Step2PatientData from '../components/contact/Step2PatientData';
import Step3ServiceSelection from '../components/contact/Step3ServiceSelection';
import Step4DateTimeSelection from '../components/contact/Step4DateTimeSelection';
import Step5Confirmation from '../components/contact/Step5Confirmation';
import Step6ThankYou from '../components/contact/Step6ThankYou';
import ProgressBar from '../components/contact/ProgressBar';
import SEO from '../components/SEO';

export type UserType = 'new' | 'existing';

export interface FormData {
  userType: UserType | null;
  appointmentFor: 'self' | 'other' | null;
  // Contact person's data
  name: string;
  email: string;
  phone: string;
  // Patient's data (if different)
  patientName: string;
  patientDob: string;
  relationship: string;
  // Service data
  specialty: string;
  service: string;
  date: Date | null;
  time: string;
}

export type FormErrors = {
  [key in keyof FormData]?: string;
};

const initialFormData: FormData = {
  userType: null,
  appointmentFor: null,
  name: '',
  email: '',
  phone: '',
  patientName: '',
  patientDob: '',
  relationship: '',
  specialty: '',
  service: '',
  date: null,
  time: '',
};

const steps = [
  "Inicio",
  "Datos",
  "Servicio",
  "Fecha y Hora",
  "Confirmación",
];

const ContactPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [isFinished, setIsFinished] = useState(false);
  
  const [direction, setDirection] = useState(1);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };

  const validateField = (name: keyof FormData, value: any): string => {
    switch (name) {
      case 'name':
        if (!value || value.trim().length < 2) return 'El nombre debe tener al menos 2 caracteres.';
        return '';
      case 'patientName':
        if (!value || value.trim().length < 2) return 'El nombre del paciente es requerido.';
        return '';
      case 'email':
        if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Introduce un correo electrónico válido.';
        return '';
      case 'phone':
        if (!value || !/^[0-9\s+]{9,}$/.test(value)) return 'Teléfono inválido (mínimo 9 dígitos).';
        return '';
      case 'patientDob':
        if (!value) return 'La fecha de nacimiento es obligatoria.';
        // Optional: Check if future date
        if (new Date(value) > new Date()) return 'La fecha no puede ser futura.';
        return '';
      case 'relationship':
        if (!value) return 'Debes seleccionar el parentesco.';
        return '';
      case 'service':
        if (!value) return 'Debes seleccionar un servicio.';
        return '';
      case 'date':
        if (!value) return 'Selecciona una fecha en el calendario.';
        return '';
      case 'time':
        if (!value) return 'Selecciona una hora disponible.';
        return '';
      default:
        return '';
    }
  };

  const updateFormData = useCallback((newData: Partial<FormData>) => {
    setFormData(prev => {
      const updated = { ...prev, ...newData };
      
      // Real-time validation for fields that are being updated or have been touched
      const newErrors = { ...errors };
      Object.keys(newData).forEach((key) => {
        const fieldKey = key as keyof FormData;
        // Validate immediately if it's being updated
        newErrors[fieldKey] = validateField(fieldKey, updated[fieldKey]);
      });
      
      setErrors(newErrors);
      return updated;
    });
  }, [errors]);

  const handleBlur = (field: keyof FormData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setErrors(prev => ({
      ...prev,
      [field]: validateField(field, formData[field])
    }));
  };

  const handleNext = () => {
    // Validate all fields for current step before proceeding
    let stepErrors: FormErrors = {};
    let hasError = false;
    let fieldsToValidate: (keyof FormData)[] = [];
    
    if (currentStep === 2) {
       if (formData.appointmentFor === 'self') {
           fieldsToValidate = ['name', 'email', 'phone'];
       } else {
           // Note: Step 2 handles its own internal sub-step validation visually,
           // but here we ensure everything is valid before moving to Step 3.
           fieldsToValidate = ['patientName', 'patientDob', 'relationship', 'name', 'email', 'phone'];
       }
    } else if (currentStep === 3) {
        fieldsToValidate = ['service'];
    } else if (currentStep === 4) {
        fieldsToValidate = ['date', 'time'];
    }

    fieldsToValidate.forEach(field => {
        const error = validateField(field, formData[field]);
        if (error) {
            stepErrors[field] = error;
            hasError = true;
        }
    });

    if (hasError) {
        setErrors(prev => ({ ...prev, ...stepErrors }));
        setTouched(prev => {
            const newTouched = { ...prev };
            fieldsToValidate.forEach(f => newTouched[f] = true);
            return newTouched;
        });
        return; // Stop if errors
    }

    setDirection(1);
    setCurrentStep(prev => Math.min(prev + 1, steps.length + 1));
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };
  
  const handleFinish = () => {
      // Final validation check
      const requiredFields: (keyof FormData)[] = ['name', 'email', 'phone', 'specialty', 'service', 'date', 'time'];
      if (formData.appointmentFor === 'other') {
          requiredFields.push('patientName', 'patientDob', 'relationship');
      }

      const hasErrors = requiredFields.some(field => validateField(field, formData[field]));
      
      if (hasErrors) {
          alert("Por favor, revisa los campos obligatorios.");
          return;
      }

      console.log('Final form data submitted:', formData);
      setIsFinished(true);
  };
  
  const handleReset = () => {
      setFormData(initialFormData);
      setErrors({});
      setTouched({});
      setCurrentStep(1);
      setIsFinished(false);
  }

  const renderStep = () => {
    if (isFinished) {
      return <Step6ThankYou onReset={handleReset} />;
    }
      
    switch (currentStep) {
      case 1:
        return <Step1AppointmentFor onNext={handleNext} updateFormData={updateFormData} />;
      case 2:
        return (
          <Step2PatientData 
            onNext={handleNext} 
            onBack={handlePrev} 
            updateFormData={updateFormData} 
            formData={formData} 
            errors={errors}
            handleBlur={handleBlur}
          />
        );
      case 3:
        return (
            <Step3ServiceSelection 
                onNext={handleNext} 
                onBack={handlePrev} 
                updateFormData={updateFormData} 
                formData={formData} 
            />
        );
      case 4:
        return (
            <Step4DateTimeSelection 
                onNext={handleNext} 
                onBack={handlePrev} 
                updateFormData={updateFormData} 
                formData={formData} 
            />
        );
      case 5:
        return <Step5Confirmation onFinish={handleFinish} onBack={handlePrev} formData={formData} />;
      default:
        return null;
    }
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contacto y Citas - LUMENA Clínica de Salud",
    "mainEntity": {
      "@type": "MedicalOrganization",
      "name": "LUMENA Clínica de Salud",
      "telephone": "+34645245709",
      "email": "info@lumena.health",
      "address": {
          "@type": "PostalAddress",
          "streetAddress": "Calle Principal 123",
          "addressLocality": "El Ejido",
          "addressRegion": "Almería",
          "postalCode": "04700",
          "addressCountry": "ES"
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <SEO 
        title="Pide tu Cita"
        description="Reserva tu cita online en LUMENA Clínica de Salud. Fácil, rápido y seguro. Elige especialista, fecha y hora en pocos pasos."
        keywords={["pedir cita médico", "cita dentista online", "reserva fisioterapia", "contacto clínica"]}
        schema={schema}
      />
      
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">Agenda tu Cita</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Sigue estos sencillos pasos para reservar tu cita con nosotros. ¡Es rápido y fácil!
        </p>
      </div>

      <div className="bg-card rounded-2xl shadow-2xl p-4 sm:p-8 overflow-hidden">
        {!isFinished && (
            <div className="mb-8 px-4">
                <ProgressBar currentStep={currentStep} totalSteps={steps.length} labels={steps} />
            </div>
        )}
        
        <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {renderStep()}
            </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ContactPage;