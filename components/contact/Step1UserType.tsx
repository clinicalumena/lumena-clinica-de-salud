
import React from 'react';
import { Card } from '../ui/Card';
import { IconUserPlus, IconUserCheck } from '@tabler/icons-react';
import { FormData, UserType } from '../../pages/ContactPage';

interface Step1UserTypeProps {
  onNext: () => void;
  updateFormData: (data: Partial<FormData>) => void;
}

const Step1UserType: React.FC<Step1UserTypeProps> = ({ onNext, updateFormData }) => {
  const handleSelect = (userType: UserType) => {
    updateFormData({ userType });
    onNext();
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-2 text-foreground">¡Bienvenido a LUMENA!</h2>
      <p className="text-muted-foreground mb-8">Para empezar, dinos si ya nos has visitado antes.</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card 
          className="p-6 text-center cursor-pointer hover:border-primary hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          onClick={() => handleSelect('new')}
        >
          <div className="bg-primary/10 p-4 rounded-full mb-4 inline-block">
            <IconUserPlus className="h-10 w-10 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-primary mb-2">Soy nuevo paciente</h3>
          <p className="text-muted-foreground">
            Es mi primera vez en la clínica.
          </p>
        </Card>

        <Card 
          className="p-6 text-center cursor-pointer hover:border-primary hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          onClick={() => handleSelect('existing')}
        >
          <div className="bg-muted p-4 rounded-full mb-4 inline-block">
            <IconUserCheck className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">Ya soy paciente</h3>
          <p className="text-muted-foreground">
            Quiero agendar una cita de seguimiento.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Step1UserType;
