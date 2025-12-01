import React from 'react';
import { Card } from '../ui/Card';
import { IconUser, IconUsers } from '@tabler/icons-react';
import { FormData } from '../../pages/ContactPage';

interface Step1AppointmentForProps {
  onNext: () => void;
  updateFormData: (data: Partial<FormData>) => void;
}

const Step1AppointmentFor: React.FC<Step1AppointmentForProps> = ({ onNext, updateFormData }) => {
  const handleSelect = (appointmentFor: 'self' | 'other') => {
    updateFormData({ appointmentFor });
    onNext();
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-2 text-foreground">¿Para quién es la cita?</h2>
      <p className="text-muted-foreground mb-8">Ayúdanos a preparar la consulta seleccionando una opción.</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card 
          className="p-6 text-center cursor-pointer hover:border-primary hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          onClick={() => handleSelect('self')}
        >
          <div className="bg-primary/10 p-4 rounded-full mb-4 inline-block">
            <IconUser className="h-10 w-10 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-primary mb-2">Para mí</h3>
          <p className="text-muted-foreground">
            Estoy pidiendo la cita para mi propio cuidado.
          </p>
        </Card>

        <Card 
          className="p-6 text-center cursor-pointer hover:border-primary hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          onClick={() => handleSelect('other')}
        >
          <div className="bg-muted p-4 rounded-full mb-4 inline-block">
            <IconUsers className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">Para otra persona</h3>
          <p className="text-muted-foreground">
            Estoy gestionando la cita para un familiar o amigo.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Step1AppointmentFor;
