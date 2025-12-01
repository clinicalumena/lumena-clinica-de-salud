
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { IconHome, IconStethoscope, IconCalendarEvent, IconNews, IconUsers } from '@tabler/icons-react';

const MobileNav = () => {
    const location = useLocation();
    
    const navItems = [
        { href: '/', label: 'Inicio', icon: IconHome },
        { href: '/servicios', label: 'Servicios', icon: IconStethoscope },
        { href: '/contacto', label: 'Cita', icon: IconCalendarEvent, isMain: true },
        { href: '/blog', label: 'Blog', icon: IconNews },
        { href: '/especialistas', label: 'Equipo', icon: IconUsers },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-t border-border md:hidden shadow-[0_-4px_10px_rgba(0,0,0,0.03)] pb-[env(safe-area-inset-bottom)]">
            <div className="flex items-end justify-around pb-2 pt-2 px-2">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.href;
                    const Icon = item.icon;
                    
                    if (item.isMain) {
                         return (
                            <div key={item.href} className="relative -top-6">
                                {/* Background Patch for the 'Bump' effect */}
                                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-[4.5rem] h-[4.5rem] bg-background rounded-full -z-10 shadow-[0_-1px_3px_rgba(0,0,0,0.05)] border-t border-border/50" />
                                
                                <Link 
                                    to={item.href}
                                    className="group block"
                                    aria-label="Pedir Cita"
                                >
                                    <div className={cn(
                                        "flex flex-col items-center justify-center w-14 h-14 rounded-full shadow-lg shadow-primary/30 transition-all duration-300 group-active:scale-95 mx-auto",
                                        isActive 
                                            ? "bg-primary text-primary-foreground scale-105" 
                                            : "bg-primary text-primary-foreground"
                                    )}>
                                        <Icon size={26} stroke={2} />
                                    </div>
                                    <span className={cn(
                                        "text-[10px] font-bold text-center w-full block mt-1 transition-colors relative z-10",
                                        isActive ? "text-primary" : "text-muted-foreground"
                                    )}>
                                        {item.label}
                                    </span>
                                </Link>
                            </div>
                        )
                    }

                    return (
                        <Link
                            key={item.href}
                            to={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center w-16 py-1 transition-colors active:scale-95",
                                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <Icon 
                                size={24} 
                                stroke={isActive ? 2.5 : 1.5} 
                                className={cn("mb-0.5 transition-all duration-300", isActive && "-translate-y-0.5")}
                            />
                            <span className={cn("text-[10px] font-medium transition-colors", isActive && "font-bold")}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default MobileNav;
