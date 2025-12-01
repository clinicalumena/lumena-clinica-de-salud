
import React from 'react';
import { 
  // FIX: Replaced non-existent `IconShine` with `IconStar`.
  IconDental, IconTool, IconStar, IconBone, IconSparkles, IconHealthRecognition,
  IconRun, IconMassage, IconBrain, IconActivityHeartbeat,
  IconStethoscope, IconDna, IconMicroscope, IconBabyCarriage
} from '@tabler/icons-react';
import { Service, Post, Expert, Testimonial, Author, ServiceCategoryDetail, SpecificService } from '../types';

// --- AUTHORS DATA ---
const authors: Author[] = [
  {
    slug: 'dr-alejandro-vargas',
    name: 'Dr. Alejandro Vargas',
    role: 'Fisioterapeuta Jefe',
    imageUrl: 'https://images.unsplash.com/photo-1537368910025-7003507965b6?q=80&w=400&auto=format&fit=crop',
    shortBio: 'Con más de 15 años de experiencia, Alejandro es reconocido por sus análisis profundos y técnicas que combinan expertise profesional con pasión genuina.',
    bio: `Alejandro Vargas se graduó con honores en Fisioterapia por la Universidad Complutense de Madrid en 2008, justo en un momento en que el enfoque de la recuperación funcional comenzaba a revolucionarse. Su pasión por el deporte lo llevó a especializarse en Fisioterapia Deportiva, completando un Máster en Readaptación de Lesiones que le proporcionó las herramientas para trabajar con atletas de élite.

Durante sus primeros años en la Clínica CEMTRO, se especializó en el tratamiento de lesiones de rodilla y hombro, siendo pionero en la aplicación de técnicas de ecografía musculoesquelética para el diagnóstico y seguimiento de lesiones. Sus protocolos de recuperación para ligamento cruzado anterior (LCA) le valieron el reconocimiento de la comunidad médica.

En 2015, fundó su propio canal de divulgación en YouTube, "Fisio al Día", que rápidamente se convirtió en un referente para pacientes y profesionales. Su habilidad para explicar conceptos complejos de forma clara y accesible le ha permitido construir una comunidad de más de 200.000 suscriptores.

Actualmente, además de su rol como Fisioterapeuta Jefe en LUMENA, Alejandro colabora con el Comité Olímpico Español y es consultor para varios clubes de fútbol de primera división. Su expertise abarca desde la prevención de lesiones en deportistas de alto rendimiento hasta la rehabilitación postquirúrgica, siempre con un enfoque basado en la evidencia científica y la innovación.`,
    specialties: ['Fisioterapia Deportiva', 'Terapia Manual', 'Rehabilitación Postquirúrgica', 'Punción Seca', 'Readaptación de Lesiones', 'Ecografía Musculoesquelética'],
    availability: [
      'Consultoría técnica',
      'Charlas y ponencias',
      'Artículos patrocinados',
      'Formación a equipos',
      'Análisis de producto',
    ],
    externalPublications: [
      { title: 'El mejor SUV chino 2025: ¿Cuál elegir?', url: '#', source: 'Motor.es' },
      { title: '¿Cuál es el mejor SUV eléctrico en 2025?', url: '#', source: 'Autopista' },
      { title: '¿Cuál es el mejor coche eléctrico para ciudad en 2025?', url: '#', source: 'Car and Driver' },
      { title: 'El mejor coche del segmento C en 2025', url: '#', source: 'Coches.net' },
      { title: '¿Cuáles son los 5 mejores coches calidad-precio de 2025?', url: '#', source: 'YouTube' },
    ],
    socials: {
      instagram: '#',
      x: '#',
      tiktok: '#',
      facebook: '#',
      linkedin: '#',
      email: 'mailto:alejandro.vargas@lumena.health'
    },
  },
  {
    slug: 'dra-isabel-rios',
    name: 'Dra. Isabel Rios',
    role: 'Nutricionista Deportiva',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop',
    shortBio: 'Apasionada por la nutrición y el rendimiento. Ayudo a las personas a alcanzar sus metas a través de una alimentación inteligente y sostenible.',
    bio: 'Isabel es una nutricionista-dietista con una profunda especialización en nutrición deportiva y clínica. Su enfoque se basa en la ciencia para crear planes alimenticios personalizados que optimizan el rendimiento, aceleran la recuperación y promueven un estilo de vida saludable y sostenible. Colabora con atletas de diversas disciplinas para ayudarles a alcanzar su máximo potencial.',
    specialties: ['Nutrición Deportiva', 'Pérdida de Peso', 'Dietoterapia'],
    availability: ['Consultas online', 'Planes nutricionales'],
    externalPublications: [],
    socials: { linkedin: '#', email: 'mailto:isabel.rios@lumena.health' },
  },
  {
    slug: 'dr-carlos-mendoza',
    name: 'Dr. Carlos Mendoza',
    role: 'Odontólogo Senior',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da60710?q=80&w=400&auto=format&fit=crop',
    shortBio: 'Experto en estética dental y salud bucal integral. Mi objetivo es diseñar sonrisas saludables que duren toda la vida.',
    bio: 'Carlos es un odontólogo con más de 20 años de experiencia, especializado en odontología estética y restauradora. Su filosofía se centra en combinar el arte y la ciencia para crear sonrisas naturales y funcionales. Es un miembro activo de la Sociedad Española de Prótesis Estomatológica y Estética (SEPES) y un conferenciante habitual en congresos nacionales.',
    specialties: ['Estética Dental', 'Implantes', 'Ortodoncia Invisible'],
    availability: ['Diseño de sonrisa', 'Consultas'],
    externalPublications: [],
    socials: { linkedin: '#', email: 'mailto:carlos.mendoza@lumena.health' },
  },
  {
    slug: 'dra-laura-fernandez',
    name: 'Dra. Laura Fernández',
    role: 'Ginecóloga Especialista',
    imageUrl: 'https://images.unsplash.com/photo-1582750421881-542648584380?q=80&w=400&auto=format&fit=crop',
    shortBio: 'Comprometida con la salud de la mujer en todas las etapas de la vida, con un enfoque en la prevención y el cuidado integral.',
    bio: 'Laura ofrece un cuidado ginecológico compasivo y basado en la evidencia. Su práctica abarca desde la adolescencia hasta la menopausia, con un interés especial en la planificación familiar y el seguimiento de embarazos. Cree firmemente en empoderar a sus pacientes a través de la educación para que tomen decisiones informadas sobre su salud.',
    specialties: ['Obstetricia', 'Planificación Familiar', 'Salud Menopáusica'],
    availability: ['Seguimiento de embarazo', 'Consultas ginecológicas'],
    externalPublications: [],
    socials: { email: 'mailto:laura.fernandez@lumena.health' },
  },
  {
    slug: 'lic-ana-torres',
    name: 'Lic. Ana Torres',
    role: 'Psicóloga Clínica',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop',
    shortBio: 'Ofrezco un espacio seguro para el crecimiento personal y el bienestar emocional, utilizando terapias basadas en la evidencia.',
    bio: 'Ana es una psicóloga clínica con especialización en Terapia Cognitivo-Conductual (TCC) y Mindfulness. Su objetivo es proporcionar a sus pacientes herramientas prácticas para manejar la ansiedad, el estrés y la depresión. Crea un ambiente terapéutico cálido y sin prejuicios, fomentando la autocompasión y el crecimiento personal.',
    specialties: ['Terapia Cognitivo-Conductual', 'Mindfulness', 'Ansiedad y Estrés'],
    availability: ['Terapia individual', 'Talleres grupales'],
    externalPublications: [],
    socials: { x: '#', email: 'mailto:ana.torres@lumena.health' },
  }
];


// --- SERVICES DATA ---
const services: Service[] = [
  {
    slug: 'odontologia',
    title: 'Odontología',
    shortDescription: 'Cuidado dental integral para una sonrisa sana y radiante.',
    longDescription: 'Desde revisiones y limpiezas hasta implantes y ortodoncia. Nuestro equipo de odontólogos utiliza la última tecnología para garantizar tu salud bucodental y la estética de tu sonrisa.',
    imageUrl: 'https://picsum.photos/seed/dentistry/600/400',
  },
  {
    slug: 'ginecologia',
    title: 'Ginecología',
    shortDescription: 'Salud y bienestar para la mujer en cada etapa de su vida.',
    longDescription: 'Ofrecemos un cuidado ginecológico completo, incluyendo revisiones anuales, seguimiento de embarazo, planificación familiar y manejo de la menopausia, con un enfoque cercano y profesional.',
    imageUrl: 'https://picsum.photos/seed/gyn/600/400',
  },
  {
    slug: 'fisioterapia',
    title: 'Fisioterapia',
    shortDescription: 'Recuperación funcional, alivio del dolor y prevención de lesiones.',
    longDescription: 'Nuestros fisioterapeutas están especializados en terapia manual, rehabilitación deportiva y tratamiento de dolencias musculoesqueléticas para ayudarte a recuperar la movilidad y vivir sin dolor.',
    imageUrl: 'https://picsum.photos/seed/physiotherapy/600/400',
  },
  {
    slug: 'psicologia',
    title: 'Psicología',
    shortDescription: 'Apoyo profesional para tu bienestar emocional y salud mental.',
    longDescription: 'Te ofrecemos un espacio seguro y confidencial para abordar la ansiedad, el estrés, la depresión y otros desafíos emocionales. Terapia individual para adultos y adolescentes.',
    imageUrl: 'https://picsum.photos/seed/psychology/600/400',
  },
  {
    slug: 'logopedia',
    title: 'Logopedia',
    shortDescription: 'Tratamiento de trastornos del habla, lenguaje y comunicación.',
    longDescription: 'Ayudamos a niños y adultos a superar dificultades de comunicación, habla, voz y deglución. Nuestro objetivo es mejorar la calidad de vida a través de una comunicación efectiva.',
    imageUrl: 'https://picsum.photos/seed/speech/600/400',
  },
  {
    slug: 'atencion-primaria',
    title: 'Atención Primaria',
    shortDescription: 'Tu médico de cabecera para un cuidado continuo y preventivo.',
    longDescription: 'Ofrecemos un servicio de medicina general para el diagnóstico, tratamiento y seguimiento de enfermedades comunes, así como para la promoción de la salud y la prevención.',
    imageUrl: 'https://picsum.photos/seed/primarycare/600/400',
  },
  {
    slug: 'nutricion',
    title: 'Nutrición',
    shortDescription: 'Planes de alimentación personalizados para tus objetivos de salud.',
    longDescription: 'Nuestros nutricionistas te guiarán para alcanzar tus metas, ya sea pérdida de peso, mejora del rendimiento deportivo o manejo de condiciones de salud a través de la alimentación.',
    imageUrl: 'https://picsum.photos/seed/nutrition/600/400',
  },
  {
    slug: 'entrenamiento-personalizado',
    title: 'Entrenamiento Personalizado',
    shortDescription: 'Alcanza tu máximo potencial físico con un plan a tu medida.',
    longDescription: 'Diseñamos programas de entrenamiento adaptados a tus capacidades y objetivos, supervisados por profesionales para garantizar resultados seguros y eficaces.',
    imageUrl: 'https://picsum.photos/seed/training/600/400',
  },
];


// --- BLOG POSTS DATA ---
const posts: Omit<Post, 'author' | 'readingTime'>[] = [
  {
    slug: '5-ejercicios-para-aliviar-dolor-espalda',
    title: '5 Ejercicios para Aliviar el Dolor de Espalda en Casa',
    excerpt: 'El dolor de espalda es una de las dolencias más comunes. Descubre 5 simples ejercicios que puedes hacer en casa para encontrar alivio.',
    content: `El dolor de espalda afecta a millones de personas. El sedentarismo y las malas posturas son causas frecuentes. Afortunadamente, ciertos ejercicios pueden ofrecer un gran alivio.

## Estiramientos Suaves

Aquí tienes una rutina simple para empezar.

### 1. Estiramiento de rodilla al pecho
Acostado boca arriba, lleva una rodilla hacia tu pecho, sosteniéndola con ambas manos. Mantén por 20-30 segundos y cambia de pierna.

### 2. Postura del gato-vaca
En cuatro patas, arquea la espalda hacia arriba (gato) y luego hacia abajo (vaca). Repite 10 veces de forma fluida.

## Fortalecimiento del Core

Un core fuerte es esencial para proteger tu espalda.

### 3. Puente de glúteos
Acostado boca arriba con las rodillas dobladas, levanta las caderas del suelo hasta que tu cuerpo forme una línea recta desde los hombros hasta las rodillas.

### 4. Plancha
Mantén una posición de plancha por 20-30 segundos para fortalecer el core, lo cual es vital para el soporte de la espalda.

## Conclusión

Realiza estos ejercicios con suavidad y sin causar dolor. Si el dolor persiste, consulta a un profesional.`,
    authorSlug: 'dr-alejandro-vargas',
    date: '15 de Julio, 2024',
    imageUrl: 'https://picsum.photos/seed/backpain/1200/675',
    category: 'Fisioterapia',
  },
  {
    slug: 'importancia-hidratacion-rendimiento',
    title: 'La Importancia de la Hidratación en el Rendimiento Deportivo',
    excerpt: 'El agua es esencial para la vida y más aún para los atletas. Aprende cómo una correcta hidratación puede potenciar tu rendimiento.',
    content: `## El Motor Invisible
    La hidratación es uno de los pilares del rendimiento deportivo, aunque a menudo se subestima. El agua regula la temperatura corporal, lubrica las articulaciones y transporta nutrientes para dar energía y mantener la salud. Una deshidratación de tan solo el 2% del peso corporal puede disminuir significativamente el rendimiento, afectando la fuerza, la velocidad y la concentración.
    
    ## ¿Cuándo y Cómo?
    Es crucial beber agua antes, durante y después del ejercicio. Para actividades prolongadas o intensas, las bebidas deportivas que reponen electrolitos pueden ser beneficiosas. No esperes a tener sed para beber; la sed es ya un signo de deshidratación. ¡Mantente hidratado y alcanza tu máximo potencial!`,
    authorSlug: 'dra-isabel-rios',
    date: '5 de Julio, 2024',
    imageUrl: 'https://picsum.photos/seed/hydration/1200/675',
    category: 'Fisioterapia',
  },
  {
    slug: 'prevencion-lesiones-corredores',
    title: 'Guía Completa para la Prevención de Lesiones en Corredores',
    excerpt: 'Correr es un excelente ejercicio, pero las lesiones son comunes. Sigue estos consejos para mantenerte en la pista y lejos de la clínica.',
    content: `Para evitar lesiones al correr, es fundamental un enfoque integral.
    
    ## Calentamiento y Progresión
    
    ### 1. Calentamiento adecuado
    No empieces en frío. Realiza 5-10 minutos de caminata rápida o trote suave, seguido de estiramientos dinámicos.
    
    ### 2. Aumento progresivo
    No aumentes tu kilometraje o intensidad en más de un 10% por semana. Dale tiempo a tu cuerpo para adaptarse.
    
    ## Fortalecimiento y Equipamiento
    
    ### 3. Fortalecimiento
    Un core, caderas y glúteos fuertes estabilizan tu cuerpo y mejoran la biomecánica. Incorpora ejercicios de fuerza 2-3 veces por semana.
    
    ### 4. Calzado adecuado
    Usa zapatillas específicas para correr que se ajusten a tu tipo de pie y pisada. Reemplázalas cada 500-800 km.
    
    ## Escucha a tu Cuerpo
    El dolor es una señal. No corras con dolor. Descansa y, si persiste, busca ayuda profesional. El descanso es tan importante como el entrenamiento.`,
    authorSlug: 'dr-alejandro-vargas',
    date: '28 de Junio, 2024',
    imageUrl: 'https://picsum.photos/seed/running/1200/675',
    category: 'Fisioterapia',
  },
  {
    slug: 'salud-bucal-diaria',
    title: 'Claves para una Sonrisa Radiante: Tu Rutina de Salud Bucal',
    excerpt: 'Más allá del cepillado, existen hábitos sencillos que marcan la diferencia en tu salud dental. Descúbrelos y luce tu mejor sonrisa.',
    content: `## Más Allá del Cepillo
    Mantener una sonrisa sana va más allá de cepillarse dos veces al día. El uso de hilo dental es fundamental para eliminar la placa entre los dientes, donde el cepillo no llega.
    
    ## Complementos Esenciales
    Un enjuague bucal antiséptico puede reducir las bacterias y prevenir la gingivitis. No olvides visitar a tu dentista cada seis meses para una limpieza profesional y una revisión completa. Una dieta equilibrada, baja en azúcares y ácidos, también protegerá tu esmalte. ¡Pequeños gestos para una gran sonrisa!`,
    authorSlug: 'dr-carlos-mendoza',
    date: '20 de Julio, 2024',
    imageUrl: 'https://picsum.photos/seed/dental/1200/675',
    category: 'Odontología',
  },
  {
    slug: 'revision-ginecologica-anual',
    title: 'La Revisión Ginecológica Anual: Un Acto de Amor Propio',
    excerpt: 'La prevención es la mejor herramienta para la salud de la mujer. Conoce por qué tu visita anual al ginecólogo es tan importante.',
    content: `## Prevención Activa
    La visita anual al ginecólogo es un pilar fundamental en el cuidado de la salud femenina. Permite la detección temprana de afecciones como el VPH, quistes o miomas, y es clave en la prevención del cáncer de cérvix y de mama.
    
    ## Un Espacio de Confianza
    Además, es un espacio para resolver dudas sobre anticoncepción, fertilidad, menstruación y menopausia. No esperes a tener síntomas. Tu revisión anual es una inversión en tu tranquilidad y bienestar a largo plazo.`,
    authorSlug: 'dra-laura-fernandez',
    date: '18 de Julio, 2024',
    imageUrl: 'https://picsum.photos/seed/womanhealth/1200/675',
    category: 'Ginecología',
  },
  {
    slug: 'mindfulness-ansiedad',
    title: 'Mindfulness para Principiantes: Reduce la Ansiedad en 10 Minutos',
    excerpt: 'Aprende a calmar tu mente y a conectar con el presente a través de técnicas sencillas de mindfulness que puedes practicar en cualquier lugar.',
    content: `## El Poder de la Atención Plena
    El mindfulness o atención plena es una práctica poderosa para combatir el estrés y la ansiedad del día a día.
    
    ## Primeros Pasos
    Comienza sentándote en un lugar tranquilo. Cierra los ojos y centra tu atención en tu respiración. Siente cómo el aire entra y sale de tu cuerpo. Tu mente divagará; es normal. Cuando ocurra, simplemente reconoce el pensamiento sin juzgarlo y suavemente redirige tu atención a la respiración. Practicar esto solo 10 minutos al día puede generar cambios significativos en tu estado de ánimo y tu capacidad de concentración.`,
    authorSlug: 'lic-ana-torres',
    date: '12 de Julio, 2024',
    imageUrl: 'https://picsum.photos/seed/mindful/1200/675',
    category: 'Psicología',
  },
];

export const BLOG_CATEGORIES = ['Odontología', 'Ginecología', 'Psicología', 'Fisioterapia'];

// --- NEW DETAILED SERVICES DATA ---

// FIX: Converted all icon JSX to React.createElement to prevent parsing errors in .ts files.
// This resolves a large number of errors related to TypeScript interpreting JSX as type assertions.
export const DETAILED_SERVICES: ServiceCategoryDetail[] = [
  {
    slug: 'odontologia',
    name: 'Odontología',
    description: 'Ofrecemos soluciones dentales completas para que tu sonrisa se mantenga sana y siempre radiante.',
    services: [
      {
        slug: 'limpieza-dental-pro',
        icon: React.createElement(IconDental, { size: 32 }),
        title: 'Limpieza Dental Pro',
        description: 'Elimina el sarro y la placa para una boca sana y un aliento fresco.',
        price: 69,
      },
      {
        slug: 'blanqueamiento-dental',
        icon: React.createElement(IconSparkles, { size: 32 }),
        title: 'Blanqueamiento Dental',
        description: 'Consigue una sonrisa visiblemente más blanca y brillante con nuestro tratamiento profesional y seguro.',
        price: 250,
      },
      {
        slug: 'empastes',
        icon: React.createElement(IconTool, { size: 32 }),
        title: 'Empastes (Obturación)',
        description: 'Restauramos tus dientes afectados por caries con materiales estéticos y de alta durabilidad.',
        price: 80,
      },
      {
        slug: 'ortodoncia-invisible',
        icon: React.createElement(IconHealthRecognition, { size: 32 }),
        title: 'Ortodoncia Invisible',
        description: 'Alinea tu sonrisa de forma discreta y cómoda con la tecnología de alineadores transparentes.',
        price: 1800,
      },
      {
        slug: 'implantes-dentales',
        icon: React.createElement(IconBone, { size: 32 }),
        title: 'Implantes Dentales',
        description: 'Recupera la función y estética de tus dientes perdidos con soluciones permanentes y naturales.',
        price: 1200,
      },
      {
        slug: 'carillas-esteticas',
        icon: React.createElement(IconStar, { size: 32 }),
        title: 'Carillas Estéticas',
        description: 'Transforma la apariencia de tu sonrisa corrigiendo forma, color y posición de los dientes.',
        price: 450,
      }
    ]
  },
  {
    slug: 'fisioterapia',
    name: 'Fisioterapia',
    description: 'Nuestros expertos te ayudarán a recuperar la movilidad, aliviar el dolor y prevenir futuras lesiones.',
    services: [
      {
        slug: 'fisioterapia-deportiva',
        icon: React.createElement(IconRun, { size: 32 }),
        title: 'Fisioterapia Deportiva',
        description: 'Tratamiento y prevención de lesiones en atletas para optimizar el rendimiento y acelerar recuperación.',
        price: 55,
      },
      {
        slug: 'terapia-manual',
        icon: React.createElement(IconMassage, { size: 32 }),
        title: 'Terapia Manual',
        description: 'Técnicas manuales especializadas para aliviar el dolor muscular y mejorar la movilidad articular.',
        price: 50,
      },
      {
        slug: 'rehabilitacion-neurologica',
        icon: React.createElement(IconBrain, { size: 32 }),
        title: 'Rehabilitación Neurológica',
        description: 'Ayudamos a pacientes con afecciones neurológicas a recuperar la máxima funcionalidad y autonomía posible.',
        price: 60,
      },
      {
        slug: 'readaptacion-postquirurgica',
        icon: React.createElement(IconActivityHeartbeat, { size: 32 }),
        title: 'Readaptación Postquirúrgica',
        description: 'Programa personalizado para una recuperación segura y eficaz después de una intervención quirúrgica.',
        price: 55,
      }
    ]
  },
  {
    slug: 'ginecologia',
    name: 'Ginecología',
    description: 'Cuidamos de la salud femenina en todas las etapas con un enfoque profesional, cercano y empático.',
    services: [
      {
        slug: 'revision-ginecologica',
        icon: React.createElement(IconStethoscope, { size: 32 }),
        title: 'Revisión Ginecológica',
        description: 'Chequeo anual completo para la prevención y detección precoz de patologías ginecológicas.',
        price: 120,
      },
      {
        slug: 'citologia',
        icon: React.createElement(IconDna, { size: 32 }),
        title: 'Citología (Papanicolau)',
        description: 'Prueba esencial para la detección temprana del cáncer de cuello uterino y otras anomalías.',
        price: 50,
      },
      {
        slug: 'colposcopia',
        icon: React.createElement(IconMicroscope, { size: 32 }),
        title: 'Colposcopia',
        description: 'Examen detallado del cuello uterino para evaluar resultados anormales de la citología.',
        price: 90,
      },
      {
        slug: 'seguimiento-embarazo',
        icon: React.createElement(IconBabyCarriage, { size: 32 }),
        title: 'Seguimiento de Embarazo',
        description: 'Acompañamiento médico completo para asegurar tu bienestar y el de tu bebé durante la gestación.',
        price: 100,
      }
    ]
  }
];

const experts: Expert[] = [
  {
    name: 'M Rongila Rongs',
    specialty: 'Medicine Specialist',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Dr Moshur Gulati',
    specialty: 'Medicine Specialist',
    imageUrl: 'https://images.unsplash.com/photo-1537368910025-7003507965b6?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Mk Jonty Dhoni',
    specialty: 'Medicine Specialist',
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Dra. Sofia Vera',
    specialty: 'Cardiologist',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da60710?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Dr. Mateo Campos',
    specialty: 'Pediatrician',
    imageUrl: 'https://images.unsplash.com/photo-1582750421881-542648584380?q=80&w=800&auto=format&fit=crop',
  }
];

const testimonials: Testimonial[] = [
  {
    name: 'Tamar Mendelson',
    title: 'Paciente de Fisioterapia',
    quote: 'Quedé impresionada con el trato. Realmente se nota que utilizan técnicas de alta calidad. El personal fue amable y atento. ¡Definitivamente volveré!',
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'Carlos Jiménez',
    title: 'Paciente de Odontología',
    quote: 'El resultado de mi tratamiento dental fue increíble. El equipo fue muy profesional y me hicieron sentir cómodo durante todo el proceso. ¡Mi sonrisa nunca se ha visto mejor!',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'Ana Sofía Rojas',
    title: 'Paciente de Ginecología',
    quote: 'La Dra. me brindó una atención excepcional y muy humana. Resolvió todas mis dudas con paciencia y profesionalismo. Me sentí en las mejores manos.',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'Javier Morales',
    title: 'Paciente de Psicología',
    quote: 'La terapia me ha ayudado enormemente a gestionar el estrés. Es un espacio seguro donde me siento escuchado y comprendido. Recomiendo totalmente sus servicios.',
    imageUrl: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=800&auto=format&fit=crop'
  }
];


// --- NEW DATA FOR CONTACT FORM ---

export const serviceSpecialties = [
  {
    name: "Odontología",
    slug: "odontologia",
    services: [
      { name: "Limpieza Dental" },
      { name: "Ortodoncia" },
      { name: "Endodoncia" },
      { name: "Extracción" },
      { name: "Implantes" },
      { name: "Blanqueamiento" }
    ]
  },
  {
    name: "Ginecología",
    slug: "ginecologia",
    services: [
      { name: "Consulta General" },
      { name: "Citología (Papanicolau)" },
      { name: "Ecografía" },
      { name: "Mamografía" },
      { name: "Seguimiento de Embarazo" },
    ]
  },
  {
    name: "Psicología",
    slug: "psicologia",
    services: [
      { name: "Primera Consulta" },
      { name: "Terapia Individual" },
      { name: "Terapia de Pareja" },
      { name: "Evaluación Psicológica" },
    ]
  },
  {
    name: "Fisioterapia",
    slug: "fisioterapia",
    services: [
      { name: "Fisioterapia Deportiva" },
      { name: "Terapia Manual" },
      { name: "Rehabilitación Neurológica" },
      { name: "Rehabilitación Postquirúrgica" },
    ]
  },
  {
    name: "Logopedia",
    slug: "logopedia",
    services: [
      { name: "Evaluación Inicial" },
      { name: "Trastornos del Habla (Articulación)" },
      { name: "Retraso del Lenguaje" },
      { name: "Terapia Miofuncional" },
    ]
  },
  {
    name: "Atención Primaria",
    slug: "atencion-primaria",
    services: [
      { name: "Consulta Medicina General" },
      { name: "Revisión / Chequeo" },
      { name: "Control de Tensión" },
      { name: "Recetas Médicas" },
    ]
  },
  {
    name: "Nutrición",
    slug: "nutricion",
    services: [
      { name: "Primera Consulta Nutricional" },
      { name: "Plan de Pérdida de Peso" },
      { name: "Nutrición Deportiva" },
      { name: "Dietoterapia" },
    ]
  },
  {
    name: "Entrenamiento Personalizado",
    slug: "entrenamiento-personalizado",
    services: [
      { name: "Sesión de Valoración Inicial" },
      { name: "Entrenamiento Individual" },
      { name: "Planificación de Entrenamiento" },
      { name: "Readaptación de Lesiones" },
    ]
  }
];

// Mock function to simulate fetching available times
export const getAvailableTimes = async (date: Date): Promise<{ morning: string[], afternoon: string[] }> => {
  await sleep(300); // Simulate network delay
  const day = date.getDay();

  // No appointments on weekends
  if (day === 0 || day === 6) {
    return { morning: [], afternoon: [] };
  }

  // Generate some random available slots
  const morningSlots = ["09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00", "12:00 - 13:00"];
  const afternoonSlots = ["15:00 - 16:00", "16:00 - 17:00", "17:00 - 18:00", "18:00 - 19:00"];

  const randomFilter = () => Math.random() > 0.4;

  return {
    morning: morningSlots.filter(randomFilter),
    afternoon: afternoonSlots.filter(randomFilter)
  };
};

// Mock function to simulate checking patient existence
export const verifyPatient = async (identifier: string): Promise<{ name: string } | null> => {
    await sleep(1000); // Simulate network delay
    if (identifier.includes('test') || identifier.includes('123')) {
        return { name: "Elena García" };
    }
    return null;
}


// --- UTILITY FUNCTIONS ---
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 220;
  // This regex finds image tags, we assume 12 seconds (0.2 minutes) per image
  const imageCount = (content.match(/<img/g) || []).length; 
  const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  
  const readingTime = (wordCount / wordsPerMinute) + (imageCount * 0.2);
  return Math.ceil(readingTime);
};

// --- DATA ACCESS FUNCTIONS ---

export const getServices = async (): Promise<Service[]> => {
  await sleep(200);
  return services;
};

export const getServiceBySlug = async (slug: string): Promise<Service | undefined> => {
  await sleep(200);
  return services.find(service => service.slug === slug);
};

export const getSpecificServiceData = async (categorySlug: string, serviceSlug: string): Promise<{ category: ServiceCategoryDetail, service: SpecificService, doctor: Author } | null> => {
  await sleep(200);
  const category = DETAILED_SERVICES.find(c => c.slug === categorySlug);
  if (!category) return null;
  
  const service = category.services.find(s => s.slug === serviceSlug);
  if (!service) return null;

  // Mock finding a relevant doctor based on category
  // In a real app, this would be a relation in the DB
  let doctorSlug = '';
  switch(categorySlug) {
      case 'odontologia': doctorSlug = 'dr-carlos-mendoza'; break;
      case 'ginecologia': doctorSlug = 'dra-laura-fernandez'; break;
      case 'fisioterapia': doctorSlug = 'dr-alejandro-vargas'; break;
      default: doctorSlug = 'lic-ana-torres';
  }
  const doctor = authors.find(a => a.slug === doctorSlug) || authors[0];

  return { category, service, doctor };
}

export const getPosts = async (): Promise<Post[]> => {
  await sleep(200);
  // Enrich posts with author and reading time
  return posts.map(p => {
    const author = authors.find(a => a.slug === p.authorSlug);
    return {
      ...p,
      author,
      readingTime: calculateReadingTime(p.content)
    };
  });
};

export const getLatestPosts = async (limit: number = 5): Promise<Post[]> => {
  await sleep(200);
  const sortedPosts = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return sortedPosts.slice(0, limit).map(p => {
    const author = authors.find(a => a.slug === p.authorSlug);
    return { ...p, author };
  });
};


export const getPostBySlug = async (slug: string): Promise<Post | undefined> => {
  await sleep(200);
  const post = posts.find(p => p.slug === slug);
  if (!post) return undefined;

  const author = authors.find(a => a.slug === post.authorSlug);
  return {
    ...post,
    author,
    readingTime: calculateReadingTime(post.content),
  };
};

export const getExperts = async (): Promise<Expert[]> => {
  await sleep(200);
  return experts;
}

export const getTestimonials = async (): Promise<Testimonial[]> => {
  await sleep(200);
  return testimonials;
}

export const getAuthors = async (): Promise<Author[]> => {
  await sleep(200);
  return authors;
};

export const getAuthorBySlug = async (slug: string): Promise<Author | undefined> => {
  await sleep(200);
  return authors.find(author => author.slug === slug);
};

export const getPostsByAuthorSlug = async (authorSlug: string, limit?: number): Promise<Post[]> => {
  await sleep(200);
  const authorPosts = posts.filter(p => p.authorSlug === authorSlug);
  
  const enrichedPosts = authorPosts.map(p => {
    const author = authors.find(a => a.slug === p.authorSlug);
    return {
      ...p,
      author,
      readingTime: calculateReadingTime(p.content)
    };
  });
  
  if (limit) {
      return enrichedPosts.slice(0, limit);
  }
  return enrichedPosts;
};