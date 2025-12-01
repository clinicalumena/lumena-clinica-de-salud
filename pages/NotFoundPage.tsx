
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="text-center py-16">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <h2 className="mt-4 text-3xl font-semibold text-gray-800">Página No Encontrada</h2>
      <p className="mt-4 text-lg text-gray-600">
        Lo sentimos, la página que buscas no existe o ha sido movida.
      </p>
      <Link to="/" className="mt-8 inline-block">
        <Button size="lg">Volver al Inicio</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
