import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import {
  IconUserPlus,
  IconUserCheck,
  IconHeartHandshake,
  IconUsers,
  IconMicroscope,
  IconClipboardList,
  IconSofa,
  IconShieldCheck,
  IconArrowRight
} from '@tabler/icons-react';

const benefits = [
    { icon: <IconHeartHandshake size={18} />, text: 'Atención Personalizada' },
    { icon: <IconUsers size={18} />, text: 'Equipo Multidisciplinar' },
    { icon: <IconMicroscope size={18} />, text: 'Tecnología de Vanguardia' },
    { icon: <IconClipboardList size={18} />, text: 'Planes a Medida' },
    { icon: <IconSofa size={18} />, text: 'Ambiente Confortable' },
    { icon: <IconShieldCheck size={18} />, text: 'Enfoque Preventivo' },
];

export const ClientTypeSection: React.FC = () => {
    return (
        <section className="bg-accent/30 rounded-2xl py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h3 className="text-3xl md:text-4xl font-bold text-foreground">¿Cómo podemos ayudarte hoy?</h3>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                        Estamos aquí para ayudarte, ya sea para empezar tu camino hacia el bienestar o para continuar con tu cuidado.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* New Patient Card */}
                    <Card className="text-center flex flex-col items-center p-8 border-primary/20 shadow-xl shadow-primary/20 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 transform hover:-translate-y-1">
                        <div className="bg-primary/10 p-4 rounded-full mb-4">
                            <IconUserPlus className="h-10 w-10 text-primary" />
                        </div>
                        <h4 className="text-2xl font-bold text-primary mb-2">Soy nuevo paciente</h4>
                        <p className="text-muted-foreground mb-6 flex-grow">
                            Agenda tu primera consulta y descubre cómo nuestro equipo puede ayudarte a alcanzar tus objetivos de salud.
                        </p>
                        <Link to="/contacto" className="w-full sm:w-auto">
                            <Button size="lg" className="w-full">
                                Pedir mi primera cita
                                <IconArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </Card>

                    {/* Existing Patient Card */}
                    <Card className="text-center flex flex-col items-center p-8 border-border/60 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                         <div className="bg-muted p-4 rounded-full mb-4">
                            <IconUserCheck className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <h4 className="text-2xl font-bold text-foreground mb-2">Ya soy paciente</h4>
                        <p className="text-muted-foreground mb-6 flex-grow">
                            Si ya eres parte de nuestra familia, agenda tu próxima cita de seguimiento o consulta aquí.
                        </p>
                        <Link to="/contacto" className="w-full sm:w-auto">
                            <Button size="lg" variant="outline" className="w-full">
                                Agendar seguimiento
                                <IconArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </Card>
                </div>

                <div className="mt-20 text-center">
                    <h4 className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">En cada visita te ofrecemos</h4>
                    <div className="mt-8 flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto">
                        {benefits.map((benefit, index) => (
                             <div key={index} className="flex items-center gap-2.5 rounded-full border border-input bg-card px-4 py-2 text-sm shadow-sm transition-colors hover:bg-accent">
                                <div className="text-primary">{benefit.icon}</div>
                                <span className="font-medium text-foreground/90">{benefit.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};