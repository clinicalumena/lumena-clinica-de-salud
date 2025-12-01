import React, { useEffect } from 'react';

const CookiesPolicyPage: React.FC = () => {
    useEffect(() => {
        document.title = 'Política de Cookies | LUMENA Clínica de Salud';
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
            <h1>Política de Cookies</h1>
            <p><strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

            <h2>1. ¿Qué son las cookies?</h2>
            <p>Una cookie es un pequeño fichero de texto que se almacena en tu navegador cuando visitas casi cualquier página web. Su utilidad es que la web sea capaz de recordar tu visita cuando vuelvas a navegar por esa página. Las cookies suelen almacenar información de carácter técnico, preferencias personales, personalización de contenidos, estadísticas de uso, enlaces a redes sociales, acceso a cuentas de usuario, etc.</p>

            <h2>2. Cookies utilizadas en este sitio web</h2>
            <p>Siguiendo las directrices de la Agencia Española de Protección de Datos procedemos a detallar el uso de cookies que hace esta web con el fin de informarte con la máxima exactitud posible.</p>
            <p>Este sitio web utiliza las siguientes <strong>cookies propias</strong>:</p>
            <ul>
                <li>Cookies de sesión, para garantizar que los usuarios que escriban comentarios en el blog sean humanos y no aplicaciones automatizadas. De esta forma se combate el spam.</li>
            </ul>
            <p>Este sitio web utiliza las siguientes <strong>cookies de terceros</strong>:</p>
            <ul>
                <li><strong>Google Analytics:</strong> Almacena cookies para poder elaborar estadísticas sobre el tráfico y volumen de visitas de esta web. Al utilizar este sitio web estás consintiendo el tratamiento de información acerca de ti por Google. Por tanto, el ejercicio de cualquier derecho en este sentido deberás hacerlo comunicando directamente con Google.</li>
                <li><strong>Redes sociales:</strong> Cada red social utiliza sus propias cookies para que usted pueda pinchar en botones del tipo Me gusta o Compartir.</li>
            </ul>

            <h2>3. Desactivación o eliminación de cookies</h2>
            <p>En cualquier momento podrás ejercer tu derecho de desactivación o eliminación de cookies de este sitio web. Estas acciones se realizan de forma diferente en función del navegador que estés usando. Te dejamos una guía rápida para los navegadores más populares.</p>
        </div>
    );
};

export default CookiesPolicyPage;