import React, { useEffect } from 'react';

const LegalNoticePage: React.FC = () => {
    useEffect(() => {
        document.title = 'Aviso Legal | LUMENA Clínica de Salud';
        let metaRobots = document.querySelector('meta[name="robots"]');
        if (!metaRobots) {
            metaRobots = document.createElement('meta');
            metaRobots.setAttribute('name', 'robots');
            document.head.appendChild(metaRobots);
        }
        metaRobots.setAttribute('content', 'noindex, nofollow');

        return () => {
            // Remove the meta tag on cleanup if it was added by this component
            // Or reset it to a default value if your app has one
        };
    }, []);

    return (
        <div className="max-w-4xl mx-auto prose lg:prose-xl py-8">
            <h1>Aviso Legal</h1>
            <p><strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

            <h2>1. Datos Identificativos</h2>
            <p>En cumplimiento con el deber de información recogido en artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico, a continuación se reflejan los siguientes datos:</p>
            <ul>
                <li><strong>Titular:</strong> LUMENA CLÍNICA DE SALUD, S.L. (en adelante, LUMENA)</li>
                <li><strong>Domicilio Social:</strong> Av. Principal 123, Ciudad, CP 00000, País</li>
                <li><strong>C.I.F.:</strong> B-12345678</li>
                <li><strong>Correo electrónico de contacto:</strong> legal@lumena.health</li>
                <li><strong>Datos registrales:</strong> Inscrita en el Registro Mercantil de [Ciudad], Tomo XXXX, Folio XX, Hoja X-XXXXX, Inscripción 1ª.</li>
            </ul>

            <h2>2. Usuarios</h2>
            <p>El acceso y/o uso de este portal de LUMENA atribuye la condición de USUARIO, que acepta, desde dicho acceso y/o uso, las Condiciones Generales de Uso aquí reflejadas. Las citadas Condiciones serán de aplicación independientemente de las Condiciones Generales de Contratación que en su caso resulten de obligado cumplimiento.</p>

            <h2>3. Uso del Portal</h2>
            <p>www.lumena.health proporciona el acceso a multitud de informaciones, servicios, programas o datos (en adelante, "los contenidos") en Internet pertenecientes a LUMENA o a sus licenciantes a los que el USUARIO pueda tener acceso. El USUARIO asume la responsabilidad del uso del portal. Dicha responsabilidad se extiende al registro que fuese necesario para acceder a determinados servicios o contenidos.</p>
            
            <h2>4. Propiedad Intelectual e Industrial</h2>
            <p>LUMENA por sí o como cesionaria, es titular de todos los derechos de propiedad intelectual e industrial de su página web, así como de los elementos contenidos en la misma (a título enunciativo, imágenes, sonido, audio, vídeo, software o textos; marcas o logotipos, combinaciones de colores, estructura y diseño, selección de materiales usados, programas de ordenador necesarios para su funcionamiento, acceso y uso, etc.), titularidad de LUMENA o bien de sus licenciantes.</p>

            <h2>5. Legislación Aplicable y Jurisdicción</h2>
            <p>La relación entre LUMENA y el USUARIO se regirá por la normativa española vigente y cualquier controversia se someterá a los Juzgados y tribunales de la ciudad de [Ciudad].</p>
        </div>
    );
};

export default LegalNoticePage;