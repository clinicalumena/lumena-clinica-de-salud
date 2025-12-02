import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Author, Post } from '../types';
import { getAuthorBySlug, getPostsByAuthorSlug, getAuthors } from '../lib/data';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import PostSlider from '../components/PostSlider';
import CtaCard from '../components/CtaCard';
import {
    IconBrandInstagram,
    IconBrandX,
    IconBrandTiktok,
    IconBrandFacebook,
    IconBrandLinkedin,
    IconMail,
    IconChevronRight
} from '@tabler/icons-react';
import SEO from '../components/SEO';

const AuthorPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [author, setAuthor] = useState<Author | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [otherAuthors, setOtherAuthors] = useState<Author[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!slug) return;
            setLoading(true);
            try {
                const [authorData, postsData, allAuthorsData] = await Promise.all([
                    getAuthorBySlug(slug),
                    getPostsByAuthorSlug(slug, 6),
                    getAuthors()
                ]);

                if (authorData) {
                    setAuthor(authorData);
                    setPosts(postsData);
                    setOtherAuthors(allAuthorsData.filter(a => a.slug !== slug).slice(0, 4));
                } else {
                    setAuthor(null);
                }
            } catch (error) {
                console.error("Failed to fetch author data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [slug]);

    if (loading) {
        return <div className="text-center py-20">Cargando perfil del autor...</div>;
    }

    if (!author) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold">Autor no encontrado</h2>
                <p className="mt-4">El autor que buscas no existe.</p>
                <Link to="/blog" className="mt-6 inline-block">
                    <Button>Volver al Blog</Button>
                </Link>
            </div>
        );
    }

    const bioToHtml = (content: string): string => {
        return content
            .split('\n')
            .map(line => line.trim())
            .filter(Boolean)
            .map(line => `<p>${line}</p>`)
            .join('');
    };

    const socialIcons = {
        instagram: IconBrandInstagram,
        x: IconBrandX,
        tiktok: IconBrandTiktok,
        facebook: IconBrandFacebook,
        linkedin: IconBrandLinkedin,
        email: IconMail,
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "Physician",
        "name": author.name,
        "image": author.imageUrl,
        "jobTitle": author.role,
        "description": author.shortBio,
        "medicalSpecialty": author.specialties.map(s => ({
            "@type": "MedicalSpecialty",
            "name": s
        })),
        "worksFor": {
            "@type": "MedicalOrganization",
            "name": "LUMENA Clínica de Salud"
        }
    };

    return (
        <div className="space-y-12">
            <SEO
                title={`${author.name} - ${author.role}`}
                description={`Perfil profesional de ${author.name}, ${author.role} en Clínica LUMENA. Especialista en ${author.specialties.join(', ')}.`}
                image={author.imageUrl}
                schema={schema}
            />
            <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
                <ol className="flex items-center space-x-1.5">
                    <li><Link to="/" className="hover:text-primary">Home</Link></li>
                    <li><span className="mx-1">/</span></li>
                    <li><Link to="/especialistas" className="hover:text-primary">Especialistas</Link></li>
                    <li><span className="mx-1">/</span></li>
                    <li><span className="font-semibold text-foreground">{author.name}</span></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                <main className="lg:col-span-8 space-y-12">
                    <section className="p-8 rounded-2xl shadow-xl" style={{ background: 'linear-gradient(135deg, #9B7B6E 0%, #B89B8F 100%)' }}>
                        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                            <img src={author.imageUrl} alt={author.name} className="w-32 h-32 rounded-full object-cover border-4 border-white/30 flex-shrink-0 shadow-lg" />
                            <div className="flex-1">
                                <h1 className="text-3xl md:text-4xl font-bold text-white">{author.name}</h1>
                                <p className="text-lg font-semibold mt-1" style={{ color: '#FFF8E7' }}>{author.role}</p>
                                <p className="mt-3" style={{ color: '#FFF8E7' }}>{author.shortBio}</p>

                                {/* Badges de certificación y experiencia */}
                                <div className="flex flex-wrap gap-2 mt-4 justify-center sm:justify-start">
                                    <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/30">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                        </svg>
                                        Certificado Profesional
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/30">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10" />
                                            <polyline points="12 6 12 12 16 14" />
                                        </svg>
                                        +15 años de experiencia
                                    </span>
                                </div>

                                {/* Elemento de confianza */}
                                <div className="mt-4 inline-flex items-center gap-2 bg-white/25 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/30">
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-yellow-300 fill-yellow-300" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="text-white text-sm font-semibold">150+ pacientes satisfechos</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-sm font-bold mb-4 text-foreground uppercase tracking-wider">Áreas de Especialización</h2>
                        <div className="flex flex-wrap gap-2">
                            {author.specialties.map(spec => (
                                <span key={spec} className="bg-muted text-muted-foreground text-sm font-medium px-3 py-1.5 rounded-md">{spec}</span>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-foreground">Biografía</h2>
                        <div className="prose prose-lg max-w-none text-foreground/90" dangerouslySetInnerHTML={{ __html: bioToHtml(author.bio) }} />
                    </section>

                    <hr className="border-border/60" />

                    <section>
                        <h2 className="text-2xl font-bold mb-6 text-foreground">Artículos recientes</h2>
                        {posts.length > 0 ? <PostSlider posts={posts} /> : <p className="text-muted-foreground">Este autor aún no tiene artículos publicados.</p>}
                        <div className="text-center mt-10">
                            <Link to="/blog">
                                <Button size="lg" variant="outline">Ver todos los artículos &rarr;</Button>
                            </Link>
                        </div>
                    </section>

                    {author.externalPublications.length > 0 && (
                        <>
                            <hr className="border-border/60" />
                            <section>
                                <h2 className="text-2xl font-bold mb-6 text-foreground">Otras publicaciones externas</h2>
                                <div className="space-y-3">
                                    {author.externalPublications.map((pub, index) => (
                                        <a href={pub.url} key={index} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-lg bg-card border border-border/60 hover:bg-accent hover:border-primary/20 transition-all duration-200 group">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center font-bold text-primary flex-shrink-0">{pub.source.charAt(0)}</div>
                                                <div>
                                                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{pub.title}</p>
                                                    <p className="text-sm text-muted-foreground">{pub.source}</p>
                                                </div>
                                            </div>
                                            <IconChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0 ml-4" />
                                        </a>
                                    ))}
                                </div>
                            </section>
                        </>
                    )}
                </main>

                <aside className="lg:col-span-4 lg:sticky lg:top-28 self-start space-y-8">
                    <Card className="p-6">
                        <h3 className="text-sm font-bold mb-4 text-foreground uppercase tracking-wider">Contacto y Colaboración</h3>
                        <div className="flex flex-wrap gap-2">
                            {Object.entries(author.socials).map(([key, value]) => {
                                const Icon = socialIcons[key as keyof typeof socialIcons];
                                if (!Icon || !value) return null;
                                return (
                                    <a key={key} href={value} target="_blank" rel="noopener noreferrer" className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-full hover:bg-accent">
                                        <Icon size={22} aria-label={`Visitar ${key}`} />
                                    </a>
                                );
                            })}
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-sm font-bold mb-4 text-foreground uppercase tracking-wider">Disponible para</h3>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1.5 text-sm">
                            {author.availability.map(item => <li key={item}>{item}</li>)}
                        </ul>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-sm font-bold mb-4 text-foreground uppercase tracking-wider">Otros Autores</h3>
                        <div className="space-y-2">
                            {otherAuthors.map(other => (
                                <Link to={`/especialistas/${other.slug}`} key={other.slug} className="flex items-center gap-3 p-2 -m-2 rounded-lg hover:bg-accent transition-colors group">
                                    <img src={other.imageUrl} alt={other.name} className="w-12 h-12 rounded-full object-cover" />
                                    <div>
                                        <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{other.name}</p>
                                        <p className="text-sm text-muted-foreground">{other.role}</p>
                                    </div>
                                    <IconChevronRight className="h-5 w-5 text-muted-foreground ml-auto flex-shrink-0" />
                                </Link>
                            ))}
                        </div>
                    </Card>

                    <CtaCard
                        imageUrl="https://picsum.photos/seed/cta-clinic/600/600"
                        headline="¿Listo para tu próxima revisión?"
                        description="Nuestro equipo de expertos está listo para ofrecerte el mejor cuidado. Agenda tu cita hoy y da el primer paso hacia un bienestar completo."
                        buttonText="Pedir Cita Ahora"
                        buttonLink="/contacto"
                    />
                </aside>
            </div>
        </div>
    );
};

export default AuthorPage;