
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSpecificServiceData } from '../lib/data';
import { ServiceCategoryDetail, SpecificService, Author } from '../types';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import Accordion from '../components/ui/Accordion';
import QuickAppointmentForm from '../components/QuickAppointmentForm';
import { 
    IconCheck, IconStar, IconShieldCheck, IconClock, IconMoodSmile, IconHeartHandshake 
} from '@tabler/icons-react';
import SEO from '../components/SEO';

const BenefitsGrid = () => {
    const benefits = [
        { icon: <IconShieldCheck />, title: "Máxima Seguridad", desc: "Protocolos estrictos de higiene y esterilización." },
        { icon: <IconClock />, title: "Sin Esperas", desc: "Respetamos tu tiempo con una gestión eficiente de citas." },
        { icon: <IconMoodSmile />, title: "Mínima Invasión", desc: "Técnicas modernas para reducir molestias." },
        { icon: <IconHeartHandshake />, title: "Trato Humano", desc: "Acompañamiento cercano en todo el proceso." },
        { icon: <IconStar />, title: "Tecnología Top", desc: "Equipamiento de última generación." },
        { icon: <IconCheck />, title: "Resultados Reales", desc: "Satisfacción garantizada basada en experiencia." },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-8">
            {benefits.map((b, i) => (
                <Card key={i} className="p-4 flex flex-col items-center text-center border-border/50 hover:border-primary/50 transition-colors">
                    <div className="text-primary mb-2">{b.icon}</div>
                    <h4 className="font-bold text-sm text-foreground">{b.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{b.desc}</p>
                </Card>
            ))}
        </div>
    );
};

const SpecificServicePage: React.FC = () => {
    const { categorySlug, serviceSlug } = useParams<{ categorySlug: string, serviceSlug: string }>();
    const [data, setData] = useState<{ category: ServiceCategoryDetail, service: SpecificService, doctor: Author } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            if (categorySlug && serviceSlug) {
                setLoading(true);
                const result = await getSpecificServiceData(categorySlug, serviceSlug);
                setData(result);
                setLoading(false);
            }
        };
        fetch();
    }, [categorySlug, serviceSlug]);

    if (loading) return <div className="py-20 text-center">Cargando...</div>;
    if (!data) return <div className="py-20 text-center">Servicio no encontrado. <Link to="/servicios" className="underline">Volver</Link></div>;

    const { category, service, doctor } = data;

    // Mock images based on category to keep it dynamic but realistic
    const galleryImages = [
        `https://picsum.photos/seed/${serviceSlug}1/600/400`,
        `https://picsum.photos/seed/${serviceSlug}2/600/400`,
        `https://picsum.photos/seed/${serviceSlug}3/600/400`,
        `https://picsum.photos/seed/${serviceSlug}4/600/400`,
    ];

    const accordionItems = [
        {
            title: "Detalles del Procedimiento",
            content: `${service.description} Realizamos un diagnóstico previo exhaustivo para asegurar que este es el tratamiento ideal para ti. El procedimiento tiene una duración aproximada de 45-60 minutos y se realiza en nuestras salas equipadas para tu máximo confort. Utilizamos materiales de primera calidad y técnicas mínimamente invasivas.`
        },
        {
            title: `Conoce a tu Especialista: ${doctor.name}`,
            content: `${doctor.role}. ${doctor.shortBio} Especializado en ${doctor.specialties.join(', ')}. Con años de experiencia en ${category.name}, te garantiza un trato profesional y cercano.`
        }
    ];

    const faqItems = [
        { title: "¿Es doloroso el tratamiento?", content: "La mayoría de nuestros pacientes reportan molestias mínimas o nulas. Utilizamos anestesia local si es necesario y técnicas suaves." },
        { title: "¿Cuánto tiempo dura la recuperación?", content: "Depende de cada caso, pero generalmente puedes volver a tu rutina normal inmediatamente o en 24 horas." },
        { title: "¿Aceptan seguros médicos?", content: "Sí, trabajamos con las principales aseguradoras. Consúltanos para verificar tu cobertura." },
    ];

    const schema = {
        "@context": "https://schema.org",
        "@type": "MedicalProcedure",
        "name": service.title,
        "description": service.description,
        "procedureType": "NoninvasiveProcedure",
        "bodyLocation": "Body", // Generic, could be specific based on category
        "performer": {
            "@type": "Physician",
            "name": doctor.name,
            "jobTitle": doctor.role
        },
        "offers": {
            "@type": "Offer",
            "price": service.price,
            "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock"
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <SEO 
                title={`${service.title} - ${category.name}`}
                description={service.description}
                keywords={[service.title, category.name, "tratamiento", "precio", "el ejido"]}
                schema={schema}
            />
            {/* Breadcrumbs */}
            <nav className="text-sm text-muted-foreground mb-8">
                <ol className="flex items-center space-x-2">
                    <li><Link to="/" className="hover:text-primary">Inicio</Link></li>
                    <li>/</li>
                    <li><Link to="/servicios" className="hover:text-primary">Servicios</Link></li>
                    <li>/</li>
                    <li><Link to={`/servicios/${category.slug}`} className="hover:text-primary">{category.name}</Link></li>
                    <li>/</li>
                    <li className="font-semibold text-foreground">{service.title}</li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <main className="lg:col-span-2 space-y-10">
                    
                    <header>
                        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">{service.title}</h1>
                        <p className="text-xl text-muted-foreground">{service.description}</p>
                        <div className="mt-4 inline-block bg-accent px-4 py-2 rounded-lg text-lg font-bold text-primary">
                            Desde {service.price}€
                        </div>
                    </header>

                    {/* Gallery */}
                    <section>
                        <h3 className="text-2xl font-bold mb-6">Galería</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {galleryImages.map((src, idx) => (
                                <img 
                                    key={idx} 
                                    src={src} 
                                    alt={`${service.title} ${idx + 1}`} 
                                    className="rounded-xl w-full h-48 object-cover hover:opacity-90 transition-opacity"
                                />
                            ))}
                        </div>
                    </section>
                    
                    {/* Mobile Quick Appointment Form (Below Gallery) */}
                    <div className="lg:hidden mt-8">
                         <QuickAppointmentForm defaultService={service.title} idPrefix="mobile-quick" />
                    </div>

                    {/* Benefits */}
                    <section>
                        <h3 className="text-2xl font-bold mb-4">¿Por qué elegirnos?</h3>
                        <BenefitsGrid />
                    </section>

                    {/* Information Accordions */}
                    <section>
                        <h3 className="text-2xl font-bold mb-6">Información Detallada</h3>
                        <Accordion items={accordionItems} />
                    </section>
                    
                     {/* FAQs */}
                     <section>
                        <h3 className="text-2xl font-bold mb-6">Preguntas Frecuentes</h3>
                        <Accordion items={faqItems} />
                    </section>

                </main>

                {/* Sticky Sidebar */}
                <aside className="lg:col-span-1">
                    <div className="sticky top-28 space-y-6">
                        {/* Desktop Quick Appointment Form (Hidden on Mobile) */}
                        <div className="hidden lg:block">
                            <QuickAppointmentForm defaultService={service.title} idPrefix="desktop-quick" />
                        </div>
                        
                        {/* Mini Doctor Profile Card */}
                        <Link to={`/especialistas/${doctor.slug}`} className="block group">
                            <Card className="p-4 flex items-center gap-4 bg-muted/30 transition-colors group-hover:bg-muted/50 group-hover:border-primary/30">
                                <img src={doctor.imageUrl} alt={doctor.name} className="w-16 h-16 rounded-full object-cover" />
                                <div>
                                    <p className="text-xs text-muted-foreground uppercase font-bold">Te atenderá</p>
                                    <p className="font-bold text-foreground group-hover:text-primary transition-colors">{doctor.name}</p>
                                </div>
                            </Card>
                        </Link>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default SpecificServicePage;
