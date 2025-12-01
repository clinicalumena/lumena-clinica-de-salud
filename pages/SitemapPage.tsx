
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { getPosts, getAuthors, DETAILED_SERVICES } from '../lib/data';
import { Post, Author } from '../types';

const SitemapPage: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [authors, setAuthors] = useState<Author[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = 'Mapa Web | LUMENA Clínica de Salud';
        let metaRobots = document.querySelector('meta[name="robots"]');
        if (!metaRobots) {
            metaRobots = document.createElement('meta');
            metaRobots.setAttribute('name', 'robots');
            document.head.appendChild(metaRobots);
        }
        metaRobots.setAttribute('content', 'index, follow');
        
        const fetchData = async () => {
            try {
                const [fetchedPosts, fetchedAuthors] = await Promise.all([
                    getPosts(),
                    getAuthors()
                ]);
                setPosts(fetchedPosts);
                setAuthors(fetchedAuthors);
            } catch (error) {
                console.error("Error fetching sitemap data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const legalLinks = [
        { href: '/aviso-legal', label: 'Aviso Legal' },
        { href: '/politica-de-privacidad', label: 'Política de Privacidad' },
        { href: '/politica-de-cookies', label: 'Política de Cookies' },
        { href: '/mapa-web', label: 'Mapa Web' },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-primary">Mapa Web</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Índice completo de todas las secciones y contenidos de LUMENA.
                </p>
            </div>

            {loading ? (
                <div className="text-center py-12">Cargando mapa del sitio...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    
                    {/* General & Legal */}
                    <div className="space-y-10">
                        <div>
                            <h2 className="text-xl font-bold mb-4 text-foreground border-b border-border/60 pb-2">General</h2>
                            <ul className="space-y-2">
                                {NAV_LINKS.map(link => (
                                    <li key={link.href}><Link to={link.href} className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200">{link.label}</Link></li>
                                ))}
                                <li><Link to="/especialistas" className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200">Equipo Médico</Link></li>
                                <li><Link to="/contacto" className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200 font-medium">Pedir Cita</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold mb-4 text-foreground border-b border-border/60 pb-2">Legal</h2>
                            <ul className="space-y-2">
                                {legalLinks.map(link => (
                                    <li key={link.href}><Link to={link.href} className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200">{link.label}</Link></li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Services */}
                    <div className="lg:col-span-2">
                         <h2 className="text-xl font-bold mb-6 text-foreground border-b border-border/60 pb-2">Servicios y Tratamientos</h2>
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
                            {DETAILED_SERVICES.map(category => (
                                <div key={category.slug}>
                                    <h3 className="font-bold text-primary mb-3 text-lg">
                                        <Link to={`/servicios/${category.slug}`} className="hover:underline">{category.name}</Link>
                                    </h3>
                                    <ul className="space-y-1.5 ml-4 border-l-2 border-primary/20 pl-4">
                                        {category.services.map(service => (
                                            <li key={service.slug}>
                                                <Link to={`/servicios/${category.slug}/${service.slug}`} className="text-sm text-muted-foreground hover:text-primary transition-colors block py-0.5">
                                                    {service.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                         </div>
                    </div>

                    {/* Blog & Specialists */}
                    <div className="space-y-10">
                         <div>
                            <h2 className="text-xl font-bold mb-4 text-foreground border-b border-border/60 pb-2">Artículos Recientes</h2>
                            <ul className="space-y-3">
                                {posts.slice(0, 5).map(post => (
                                    <li key={post.slug}>
                                        <Link to={`/blog/${post.slug}`} className="text-sm text-muted-foreground hover:text-primary transition-colors line-clamp-2 leading-snug" title={post.title}>
                                            {post.title}
                                        </Link>
                                    </li>
                                ))}
                                <li><Link to="/blog" className="text-sm font-semibold text-primary mt-2 inline-block hover:underline">Ver todo el blog &rarr;</Link></li>
                            </ul>
                        </div>

                         <div>
                            <h2 className="text-xl font-bold mb-4 text-foreground border-b border-border/60 pb-2">Especialistas</h2>
                            <ul className="space-y-2">
                                {authors.map(author => (
                                    <li key={author.slug}>
                                        <Link to={`/especialistas/${author.slug}`} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                                            {author.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
};

export default SitemapPage;
