import React, { useEffect } from 'react';

const PrivacyPolicyPage: React.FC = () => {
    useEffect(() => {
        document.title = 'Política de Privacidad | LUMENA Clínica de Salud';
        let metaRobots = document.querySelector('meta[name="robots"]');
        if (!metaRobots) {
            metaRobots = document.createElement('meta');
            metaRobots.setAttribute('name', 'robots');
            document.head.appendChild(metaRobots);
        }
        metaRobots.setAttribute('content', 'noindex, nofollow');
    }, []);

    return (
        <div className="max-w-4xl mx-auto prose lg:prose-xl py-8">
            <h1>Política de Privacidad</h1>
            <p><strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

            <h2>1. Responsable del Tratamiento</h2>
            <p>LUMENA CLÍNICA DE SALUD, S.L., con domicilio en Av. Principal 123, Ciudad, es el responsable del tratamiento de los datos de carácter personal que se recogen en este sitio web.</p>

            <h2>2. Finalidad del Tratamiento de Datos</h2>
            <p>Los datos que nos facilitas a través de los formularios de contacto o al pedir cita serán utilizados para las siguientes finalidades:</p>
            <ul>
                <li>Gestionar tu solicitud de cita y contactarte para confirmarla.</li>
                <li>Responder a tus consultas y proporcionarte la información que solicites.</li>
                <li>Enviarte comunicaciones comerciales sobre nuestros servicios, si has otorgado tu consentimiento explícito.</li>
            </ul>

            <h2>3. Legitimación</h2>
            <p>La base legal para el tratamiento de tus datos es tu consentimiento, que otorgas al marcar la casilla de aceptación correspondiente y enviar tus datos.</p>

            <h2>4. Destinatarios</h2>
            <p>Tus datos no serán cedidos a terceros, salvo obligación legal. Podrán tener acceso a tus datos los proveedores de servicios tecnológicos que nos asisten en el mantenimiento de la web, con los cuales hemos firmado los correspondientes contratos de encargo de tratamiento.</p>
            
            <h2>5. Derechos</h2>
            <p>Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad de tus datos escribiendo a legal@lumena.health. También tienes derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).</p>
        </div>
    );
};

export default PrivacyPolicyPage;