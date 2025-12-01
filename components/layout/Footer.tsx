import React from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../../constants';
import Logo from '../Logo';

const Footer: React.FC = () => {

  const legalLinks = [
    { href: '/aviso-legal', label: 'Aviso legal' },
    { href: '/politica-de-privacidad', label: 'Política de privacidad' },
    { href: '/politica-de-cookies', label: 'Política de cookies' },
    { href: '/mapa-web', label: 'Mapa web' },
  ];

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <Logo variant="light" />
            <p className="mt-4 text-background/60">Tu salud es nuestra prioridad. Cuidamos de ti y de los tuyos con claridad y profesionalismo.</p>
          </div>
          <div className="lg:col-span-2">
            <h4 className="font-semibold tracking-wider uppercase text-background/80">Navegación</h4>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-background/60 hover:text-background transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/especialistas" className="text-background/60 hover:text-background transition-colors">
                  Especialistas
                </Link>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-3">
            <h4 className="font-semibold tracking-wider uppercase text-background/80">Contacto</h4>
            <ul className="mt-4 space-y-2 text-background/60">
              <li>Av. Principal 123, Ciudad</li>
              <li><a href="mailto:info@lumena.health" className="hover:text-background transition-colors">info@lumena.health</a></li>
              <li><a href="tel:+34912345678" className="hover:text-background transition-colors">+34 912 345 678</a></li>
            </ul>
            <h4 className="font-semibold tracking-wider uppercase text-background/80 mt-6">Síguenos</h4>
            <div className="flex mt-4 space-x-4">
              {/* Placeholder for social icons */}
              <a href="#" className="text-background/60 hover:text-background transition-colors">FB</a>
              <a href="#" className="text-background/60 hover:text-background transition-colors">IG</a>
              <a href="#" className="text-background/60 hover:text-background transition-colors">LN</a>
            </div>
          </div>
          <div className="lg:col-span-3">
            <h4 className="font-semibold tracking-wider uppercase text-background/80">Legal</h4>
            <ul className="mt-4 space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-background/60 hover:text-background transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-background/20 pt-8 text-center text-background/50">
          <p>&copy; {new Date().getFullYear()} LUMENA Clínica de Salud. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;