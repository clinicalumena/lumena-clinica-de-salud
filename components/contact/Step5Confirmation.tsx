import React from 'react';
import { Button } from '../ui/Button';
import { FormData } from '../../pages/ContactPage';
import { IconCalendarEvent, IconClock, IconUser, IconMail, IconPhone, IconUserCircle, IconCheck } from '@tabler/icons-react';

interface Step5ConfirmationProps {
  onFinish: () => void;
  onBack: () => void;
  formData: FormData;
}

const Step5Confirmation: React.FC<Step5ConfirmationProps> = ({ onFinish, onBack, formData }) => {
  const { appointmentFor, name, email, phone, specialty, service, date, time, patientName, relationship } = formData;
  const formattedDate = date ? date.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'No seleccionada';
  
  const isForOther = appointmentFor === 'other';

  return (
    <div className="animate-fade-in-up max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-2 text-center text-foreground">Revisar y Confirmar</h2>
      <p className="text-muted-foreground mb-8 text-center">Ya casi está listo. Verifica los detalles de tu cita.</p>
      
      {/* Premium Ticket Card */}
      <div className="bg-card rounded-3xl shadow-2xl overflow-hidden border border-border/50 relative">
        {/* Left notch */}
        <div className="absolute top-[160px] -left-3 w-6 h-6 bg-background rounded-full border border-border/50 z-10" />
        {/* Right notch */}
        <div className="absolute top-[160px] -right-3 w-6 h-6 bg-background rounded-full border border-border/50 z-10" />

        {/* Header Section */}
        <div className="bg-primary p-8 text-primary-foreground text-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
            
            <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-80 mb-2">Resumen de Reserva</p>
            <h3 className="text-3xl font-bold mb-1">{service}</h3>
            <p className="text-lg opacity-90">{specialty}</p>
        </div>

        {/* Divider with Dashes */}
        <div className="relative h-8 bg-card">
             <div className="absolute top-1/2 left-4 right-4 border-t-2 border-dashed border-muted-foreground/20"></div>
        </div>

        {/* Body Content */}
        <div className="px-8 pb-8 pt-2 space-y-8">
            
            {/* Date & Time Row */}
            <div className="flex rounded-2xl bg-muted/30 p-4 border border-border/50">
                <div className="flex-1 text-center border-r border-border/50 pr-4">
                    <div className="flex justify-center mb-2 text-primary">
                        <IconCalendarEvent size={24} />
                    </div>
                    <p className="text-xs uppercase font-bold text-muted-foreground">Fecha</p>
                    <p className="font-semibold text-foreground capitalize">{formattedDate}</p>
                </div>
                <div className="flex-1 text-center pl-4">
                    <div className="flex justify-center mb-2 text-primary">
                         <IconClock size={24} />
                    </div>
                    <p className="text-xs uppercase font-bold text-muted-foreground">Hora</p>
                    <p className="font-semibold text-foreground">{time}</p>
                </div>
            </div>

            {/* Details List */}
            <div className="space-y-5">
                <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-full text-primary shrink-0">
                        <IconUserCircle size={20} />
                    </div>
                    <div>
                         <p className="text-xs font-bold text-muted-foreground uppercase">Paciente</p>
                         <p className="font-medium text-foreground text-lg">{isForOther ? patientName : name}</p>
                         {isForOther && <p className="text-xs text-muted-foreground mt-0.5 inline-block bg-muted px-2 py-0.5 rounded">Relación: {relationship}</p>}
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-full text-primary shrink-0">
                        <IconMail size={20} />
                    </div>
                    <div>
                         <p className="text-xs font-bold text-muted-foreground uppercase">Email de contacto</p>
                         <p className="font-medium text-foreground">{email}</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-full text-primary shrink-0">
                        <IconPhone size={20} />
                    </div>
                    <div>
                         <p className="text-xs font-bold text-muted-foreground uppercase">Teléfono</p>
                         <p className="font-medium text-foreground">{phone}</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div className="bg-muted/30 p-4 text-center border-t border-border/50">
             <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <IconCheck size={14} className="text-green-600" /> 
                <span>Reserva 100% segura y sin compromiso inmediato de pago.</span>
             </div>
        </div>
      </div>

      <div className="flex justify-between mt-10 pt-4">
        <Button variant="outline" onClick={onBack}>Atrás</Button>
        <Button onClick={onFinish} size="lg" className="px-10 shadow-xl shadow-primary/25 hover:shadow-primary/40 transform hover:-translate-y-0.5 transition-all">
            Confirmar Reserva
        </Button>
      </div>
    </div>
  );
};

export default Step5Confirmation;