
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../../constants';
import { Button } from '../ui/Button';
import Logo from '../Logo';
import { motion, AnimatePresence } from 'framer-motion';
import { IconMenu2, IconX } from '@tabler/icons-react';
import { cn } from '../../lib/utils';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setIsMenuOpen(false);

  // Close menu on route change
  useEffect(() => {
    closeMenu();
  }, [location]);

  const activeLinkStyle = {
    color: 'hsl(26, 29%, 50%)',
    fontWeight: '600',
  };

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [isMenuOpen]);

  return (
    <header className={cn(
      "sticky top-0 z-40 border-b border-border/60 transition-all duration-300",
      isMenuOpen ? "bg-background" : "bg-background/80 backdrop-blur-sm"
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          <div className="relative z-50">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                style={({ isActive }) => (isActive ? activeLinkStyle : {})}
                className="text-foreground/80 hover:text-primary transition-colors font-medium relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link to="/contacto">
              <Button>Pedir Cita</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden relative z-50">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground hover:text-primary focus:outline-none p-2 rounded-full hover:bg-muted/50 transition-colors"
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMenuOpen ? <IconX size={28} /> : <IconMenu2 size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-0 z-30 bg-black/20 backdrop-blur-sm md:hidden"
              onClick={closeMenu}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed inset-0 top-0 z-40 bg-background md:hidden flex flex-col pt-24 px-6 pb-8 overflow-y-auto"
            >
              <nav className="flex flex-col space-y-4 text-center mt-4">
                {NAV_LINKS.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <NavLink
                      to={link.href}
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        `text-2xl font-medium transition-all duration-200 block py-2 rounded-lg hover:bg-muted/50 ${isActive ? 'text-primary font-bold' : 'text-foreground/80 hover:text-foreground'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: NAV_LINKS.length * 0.05, duration: 0.3 }}
                  className="h-px bg-border/50 w-2/3 mx-auto my-6"
                />

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (NAV_LINKS.length + 1) * 0.05, duration: 0.3 }}
                >
                  <Link to="/contacto" className="w-full block" onClick={closeMenu}>
                    <Button size="lg" className="w-full text-lg py-6 shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300">
                      Pedir Cita
                    </Button>
                  </Link>
                </motion.div>
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="mt-auto text-center space-y-3 pt-8"
              >
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-foreground">LUMENA Clínica de Salud</span><br />
                  Av. Principal 123, El Ejido
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
