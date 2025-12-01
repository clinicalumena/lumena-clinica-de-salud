
import React, { createContext, useContext, useState, ReactNode } from 'react';
import AppointmentModal from '../components/AppointmentModal';

interface AppointmentModalContextType {
  openModal: () => void;
  closeModal: () => void;
}

const AppointmentModalContext = createContext<AppointmentModalContextType | undefined>(undefined);

export const AppointmentModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <AppointmentModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <AppointmentModal isOpen={isOpen} onClose={closeModal} />
    </AppointmentModalContext.Provider>
  );
};

export const useAppointmentModal = () => {
  const context = useContext(AppointmentModalContext);
  if (!context) {
    throw new Error('useAppointmentModal must be used within a AppointmentModalProvider');
  }
  return context;
};
