import React, { useState, useEffect } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Label } from './ui/Label';
import { Textarea } from './ui/Textarea';
import { Card, CardContent } from './ui/Card';
import { IconX } from '@tabler/icons-react';
import { cn } from '../lib/utils';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState('');
  const [isClosing, setIsClosing] = useState(false);

  // Reset form status when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormStatus('');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300); // Match animation duration
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('Enviando...');
    console.log('Form data submitted:', formData);
    // Simulate API call
    setTimeout(() => {
        setFormStatus('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
        // Don't reset form data here, it's done on open, so user can see success message
        setTimeout(handleClose, 2000); // Close modal after success message
    }, 1500);
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };
    if (isOpen) {
        window.addEventListener('keydown', handleEsc);
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, handleClose]);

  if (!isOpen && !isClosing) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
        isOpen && !isClosing ? "opacity-100" : "opacity-0"
      )}
      onClick={handleClose}
      aria-modal="true"
      role="dialog"
    >
      <Card
        className={cn(
          "max-w-lg w-full transform transition-all duration-300 mt-16 sm:mt-0",
          isOpen && !isClosing ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 -translate-y-4"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <CardContent className="p-8 relative">
          <Button variant="ghost" size="icon" className="absolute top-4 right-4 h-8 w-8 rounded-full" onClick={handleClose}>
            <IconX className="h-5 w-5" />
            <span className="sr-only">Cerrar</span>
          </Button>
          <h3 className="text-2xl font-bold mb-6 text-primary">Pide tu Cita</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="modal-name">Nombre Completo</Label>
              <Input id="modal-name" type="text" placeholder="Tu nombre" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="modal-email">Correo Electrónico</Label>
              <Input id="modal-email" type="email" placeholder="tu@email.com" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="modal-subject">Asunto</Label>
              <Input id="modal-subject" type="text" placeholder="Motivo de tu consulta" value={formData.subject} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="modal-message">Mensaje</Label>
              <Textarea id="modal-message" placeholder="Escribe tu mensaje aquí..." value={formData.message} onChange={handleChange} required />
            </div>
            <Button type="submit" className="w-full">Enviar Mensaje</Button>
            {formStatus && <p className="text-center mt-4 text-sm text-muted-foreground">{formStatus}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentModal;