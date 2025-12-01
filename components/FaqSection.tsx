import React from 'react';
import Accordion from './ui/Accordion';

const faqData = [
  {
    title: '¿Qué es LUMENA?',
    content: 'LUMENA es una clínica de salud integral dedicada a proporcionar atención médica excepcional. Combinamos un equipo de especialistas, tecnología de vanguardia y un enfoque personalizado para cuidar tu bienestar físico y mental.',
  },
  {
    title: '¿Quién puede beneficiarse de sus servicios?',
    content: 'Nuestros servicios están diseñados para personas de todas las edades que buscan mejorar su salud, recuperarse de lesiones, manejar condiciones crónicas o simplemente mantener un estilo de vida activo y saludable. Desde atletas de élite hasta adultos mayores, todos son bienvenidos.'
  },
  {
    title: '¿Qué características y servicios incluyen?',
    content: 'Ofrecemos una amplia gama de servicios, incluyendo Fisioterapia Deportiva, Terapia Manual Ortopédica, Rehabilitación Neurológica y Postquirúrgica. Cada plan de tratamiento es personalizado para satisfacer tus necesidades específicas y ayudarte a alcanzar tus objetivos de recuperación.'
  },
  {
    title: '¿Puedo personalizar mi plan de tratamiento?',
    content: '¡Absolutamente! De hecho, la personalización es el núcleo de nuestro enfoque. Después de una evaluación inicial completa, tu terapeuta trabajará contigo para diseñar un plan de tratamiento que se alinee con tus objetivos, estilo de vida y necesidades específicas.'
  },
  {
    title: '¿Se integra LUMENA con mis otros médicos?',
    content: 'Sí. Creemos en un cuidado colaborativo. Nos comunicamos y coordinamos activamente con tus otros proveedores de atención médica, como tu médico de cabecera o cirujano, para garantizar que recibas un tratamiento cohesivo y completo.'
  },
  {
    title: '¿Necesito una remisión para ser atendido?',
    content: 'No, no necesitas una remisión para la mayoría de nuestros servicios de fisioterapia. Puedes programar una cita directamente con nosotros. Sin embargo, te recomendamos verificar con tu seguro médico, ya que algunas pólizas pueden requerirlo para el reembolso.'
  },
  {
    title: '¿Qué seguros médicos aceptan?',
    content: 'Aceptamos una amplia variedad de seguros médicos. Para confirmar si tu plan tiene cobertura, por favor, contacta a nuestra oficina con la información de tu seguro antes de tu primera cita. Estaremos encantados de ayudarte a verificar tus beneficios.'
  },
  {
    title: '¿Qué debo llevar a mi primera cita?',
    content: 'Por favor, trae una identificación con foto, tu tarjeta de seguro médico, cualquier informe médico relevante (radiografías, resonancias magnéticas, etc.), y viste ropa cómoda que permita el movimiento y el acceso a la zona a tratar.'
  },
  {
    title: '¿Cómo puedo programar una cita?',
    content: 'Puedes programar una cita llamando a nuestra clínica al +34 912 345 678, o utilizando nuestro formulario de contacto en línea. Nuestro personal te ayudará a encontrar un horario conveniente.'
  },
  {
    title: '¿Cuál es su política de cancelación?',
    content: 'Entendemos que pueden surgir imprevistos. Te pedimos que nos notifiques con al menos 24 horas de antelación si necesitas cancelar o reprogramar tu cita. Las cancelaciones tardías o ausencias pueden estar sujetas a una tarifa.'
  }
];

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
        "@type": "Question",
        "name": item.title,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": `<p>${item.content}</p>`
        }
    }))
};

export const FaqSection: React.FC = () => {
    return (
        <section>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <div className="text-center">
                <h3 className="text-3xl md:text-4xl font-bold">Preguntas Frecuentes</h3>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Aquí tienes algunas respuestas a las preguntas más comunes. Si no encuentras lo que buscas, no dudes en contactarnos.
                </p>
            </div>
            
            <div className="mt-12 max-w-3xl mx-auto bg-foreground rounded-xl shadow-2xl overflow-hidden">
                <Accordion items={faqData} variant="dark" />
            </div>
        </section>
    );
};