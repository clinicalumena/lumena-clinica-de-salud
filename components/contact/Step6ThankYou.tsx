
import React from 'react';
import { Button } from '../ui/Button';
import { IconCircleCheck, IconCalendar, IconHome } from '@tabler/icons-react';

interface Step6ThankYouProps {
  onReset: () => void;
}

const Step6ThankYou: React.FC<Step6ThankYouProps> = ({ onReset }) => {
  const referenceNumber = `LMN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  return (
    <div className="text-center py-8">
      <IconCircleCheck className="h-16 w-16 text-green-500 mx-auto mb-4" />
      <h2 className="text-3xl font-bold text-foreground">¡Cita Confirmada!</h2>
      <p className="text-muted-foreground mt-2 mb-6">Gracias por confiar en LUMENA. Tu cita ha sido agendada con éxito.</p>
      
      <div className="bg-accent/50 p-4 rounded-lg mb-8">
        <p className="text-sm text-muted-foreground">Tu número de referencia es:</p>
        <p className="text-xl font-bold text-primary tracking-wider">{referenceNumber}</p>
      </div>

      <p className="text-sm text-muted-foreground mb-6">
        Hemos enviado todos los detalles de tu cita a tu correo electrónico y un recordatorio a tu móvil.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button size="lg">
          <IconCalendar className="mr-2 h-5 w-5" />
          Añadir al Calendario
        </Button>
        <Button size="lg" variant="outline" onClick={onReset}>
          <IconHome className="mr-2 h-5 w-5" />
          Volver al Inicio
        </Button>
      </div>
      
       <div className="mt-8">
          <Button variant="link" className="text-xs text-muted-foreground">
             ¿Necesitas cancelar o reprogramar?
          </Button>
       </div>
    </div>
  );
};

export default Step6ThankYou;
