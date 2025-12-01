import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostBySlug, getLatestPosts, BLOG_CATEGORIES } from '../lib/data';
import { Post, Author } from '../types';
import { Button } from '../components/ui/Button';
import {
  IconBrandWhatsapp, IconBrandLinkedin, IconBrandX, IconBrandFacebook, IconLink, IconChevronDown, IconList
} from '@tabler/icons-react';
import { cn } from '../lib/utils';
import { Card } from '../components/ui/Card';
import FeaturedServiceCard from '../components/FeaturedServiceCard';
import Table from '../components/ui/Table';
import Blockquote from '../components/ui/Blockquote';
import CtaCard from '../components/CtaCard';
import SEO from '../components/SEO';

// --- HELPER & SUB-COMPONENTS ---

interface Heading {
  id: string;
  text: string;
  level: number;
}

const ShareButtons: React.FC<{ post: Post }> = ({ post }) => {
  const url = window.location.href;
  const text = `Echa un vistazo a este artículo: ${post.title}`;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = [
    { Icon: IconBrandWhatsapp, href: `https://api.whatsapp.com/send?text=${encodeURIComponent(text + " " + url)}`, label: 'WhatsApp' },
    { Icon: IconBrandLinkedin, href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(post.title)}`, label: 'LinkedIn' },
    { Icon: IconBrandX, href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, label: 'X' },
    { Icon: IconBrandFacebook, href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, label: 'Facebook' },
  ];

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-semibold text-muted-foreground mr-2">Compartir:</span>
      {shareLinks.map(({ Icon, href, label }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-full hover:bg-accent">
          <Icon size={20} aria-label={`Compartir en ${label}`} />
        </a>
      ))}
      <button onClick={handleCopy} className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-full hover:bg-accent">
        {copied ? <span className="text-xs font-bold text-primary">Copiado!</span> : <IconLink size={20} aria-label="Copiar enlace" />}
      </button>
    </div>
  );
};

const AuthorInfo: React.FC<{ author?: Author; date?: string; readingTime?: number }> = ({ author, date, readingTime }) => {
  if (!author) return null;
  return (
    <div className="flex items-center gap-4">
      <Link to={`/especialistas/${author.slug}`}>
        <img src={author.imageUrl} alt={author.name} className="w-12 h-12 rounded-full object-cover" />
      </Link>
      <div>
        <Link to={`/especialistas/${author.slug}`} className="font-bold text-foreground hover:text-primary transition-colors">{author.name}</Link>
        <p className="text-sm text-muted-foreground">
          {date} &bull; {readingTime} min de lectura
        </p>
      </div>
    </div>
  );
};

const AuthorBio: React.FC<{ author?: Author }> = ({ author }) => {
  if (!author) return null;
  return (
    <Card className="mt-16 p-6 flex flex-col sm:flex-row items-center gap-6 bg-accent/50 border-border/50">
      <Link to={`/especialistas/${author.slug}`}>
        <img src={author.imageUrl} alt={author.name} className="w-24 h-24 rounded-full object-cover flex-shrink-0" />
      </Link>
      <div className="text-center sm:text-left">
        <Link to={`/especialistas/${author.slug}`} className="hover:text-primary transition-colors">
          <h4 className="text-xl font-bold text-foreground">{author.name}</h4>
        </Link>
        <p className="text-sm text-primary font-semibold mb-2">{author.role}</p>
        <p className="text-muted-foreground mb-3">{author.shortBio}</p>
        {/* Placeholder for social links if needed */}
      </div>
    </Card>
  );
};

const TableOfContents: React.FC<{ headings: Heading[] }> = ({ headings }) => {
    const [activeId, setActiveId] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        observer.current = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveId(entry.target.id);
                }
            });
        }, { rootMargin: '0px 0px -75% 0px' });

        const elements = headings.map(h => document.getElementById(h.id)).filter(Boolean);
        elements.forEach(el => observer.current?.observe(el!));

        return () => {
            elements.forEach(el => observer.current?.unobserve(el!));
        };
    }, [headings]);

    if (headings.length === 0) return null;

    const TocContent = () => (
        <ul className="space-y-2 text-sm">
            {headings.map(h => (
                <li key={h.id} style={{ paddingLeft: `${(h.level - 2) * 1}rem` }}>
                    <a
                        href={`#${h.id}`}
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            setIsOpen(false);
                        }}
                        className={cn(
                            'block hover:text-primary transition-colors',
                            activeId === h.id ? 'text-primary font-semibold' : 'text-muted-foreground'
                        )}
                    >
                        {h.text}
                    </a>
                </li>
            ))}
        </ul>
    );

    return (
        <div className="mb-8 border rounded-lg">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-4 font-semibold"
            >
              <div className="flex items-center gap-2">
                <IconList size={18} />
                <span>Índice del artículo</span>
              </div>
              <IconChevronDown size={20} className={cn('transition-transform', isOpen && 'rotate-180')} />
            </button>
            {isOpen && <div className="p-4 border-t"><TocContent /></div>}
        </div>
    );
};

const BlogSidebar: React.FC = () => {
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);

  useEffect(() => {
    getLatestPosts(5).then(setLatestPosts);
  }, []);

  return (
    <aside className="space-y-8">
       <div className="aspect-square">
        <FeaturedServiceCard />
       </div>
       <div>
        <h3 className="font-semibold mb-4 text-foreground">Últimos artículos</h3>
        <ul className="space-y-4">
          {latestPosts.map(p => (
            <li key={p.slug}>
              <Link to={`/blog/${p.slug}`} className="group flex items-center gap-4">
                <img src={p.imageUrl} alt={p.title} className="w-16 h-16 object-cover rounded-md flex-shrink-0" />
                <div>
                    <p className="font-semibold text-sm leading-tight group-hover:text-primary transition-colors">{p.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{p.date}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-semibold mb-4 text-foreground">Categorías</h3>
        <ul className="space-y-2">
            {BLOG_CATEGORIES.map(cat => (
                <li key={cat}>
                    <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">&bull; {cat}</Link>
                </li>
            ))}
        </ul>
      </div>
    </aside>
  );
};

const BlogPostLayout: React.FC<{ post: Post }> = ({ post }) => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    const headingElements = Array.from(contentRef.current.querySelectorAll('h2, h3')) as HTMLHeadingElement[];
    const newHeadings = headingElements.map((el, i) => {
      const text = el.textContent || '';
      const level = parseInt(el.tagName.substring(1), 10);
      const id = text.toLowerCase().replace(/\s/g, '-') + `-${i}`;
      el.id = id;
      return { id, text, level };
    });
    setHeadings(newHeadings);
  }, [post.content]);

  const contentToHtml = (content: string): string => {
    return content
      .split('\n')
      .map(line => {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith('### ')) {
          return `<h3>${trimmedLine.substring(4)}</h3>`;
        }
        if (trimmedLine.startsWith('## ')) {
          return `<h2>${trimmedLine.substring(3)}</h2>`;
        }
        if (trimmedLine === '') {
          return '';
        }
        return `<p>${trimmedLine}</p>`;
      })
      .filter(Boolean)
      .join('');
  };
  
  const exampleTableHeaders = ['Servicio', 'Descripción', 'Duración', 'Precio'];
  const exampleTableRows = [
    ['Limpieza Dental Completa', 'Incluye ultrasonido, pulido y fluorización.', '45 min', '69€'],
    ['Blanqueamiento LED', 'Tratamiento de blanqueamiento profesional en clínica.', '60 min', '250€'],
    ['Empaste de Composite', 'Restauración de caries con material estético.', '30-45 min', 'Desde 80€'],
    ['Sesión de Fisioterapia', 'Tratamiento manual para dolencias musculares.', '50 min', '55€']
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": post.imageUrl,
    "description": post.excerpt,
    "articleBody": post.content,
    "datePublished": post.date,
    "author": {
      "@type": "Person",
      "name": post.author?.name
    },
    "publisher": {
      "@type": "MedicalOrganization",
      "name": "LUMENA Clínica de Salud",
      "logo": {
        "@type": "ImageObject",
        "url": "https://clinicalumena.com/logo.png"
      }
    }
  };

  return (
    <div>
      <SEO 
        title={post.title}
        description={post.excerpt}
        image={post.imageUrl}
        type="article"
        author={post.author?.name}
        schema={schema}
      />
      {/* Hero Section */}
      <header
        className="relative min-h-[40vh] md:min-h-[50vh] flex items-center justify-center text-center text-white p-4 rounded-2xl overflow-hidden mb-8 bg-foreground"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${post.imageUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10" />
        <div className="relative z-10 max-w-3xl">
          <Link to="/blog" className="text-sm font-bold bg-white/10 backdrop-blur-sm py-1 px-3 rounded-full hover:bg-white/20 transition-colors">
            {post.category}
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mt-4">{post.title}</h1>
          <p className="mt-4 text-lg text-white/80">{post.excerpt}</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto">
        {/* Meta and Share */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 my-8">
            <AuthorInfo author={post.author} date={post.date} readingTime={post.readingTime} />
            <ShareButtons post={post} />
        </div>

        {/* Main Content with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Article Content */}
          <main className="lg:col-span-8">
            <TableOfContents headings={headings} />
            
            <div
              ref={contentRef}
              className="prose prose-lg max-w-none prose-h2:font-bold prose-h2:text-primary prose-h3:font-semibold prose-h3:text-primary/90"
              dangerouslySetInnerHTML={{ __html: contentToHtml(post.content) }}
            />
            
            <div className="mt-12">
                <h2 className="text-3xl font-bold text-primary mb-2">Ejemplo de Cita</h2>
                <p className="text-muted-foreground mb-4">Así se visualiza una cita destacada en nuestros artículos.</p>
                
                <Blockquote author="Dr. Alejandro Vargas" source="Fisioterapeuta Jefe en LUMENA">
                    El movimiento es una medicina para crear el cambio en el estado físico, emocional y mental de una persona.
                </Blockquote>
            </div>


            <div className="mt-12">
              <h2 className="text-3xl font-bold text-primary mb-2">Tabla de Servicios</h2>
              <p className="text-muted-foreground mb-4">A continuación, se muestra un ejemplo de nuestra nueva tabla de servicios adaptable.</p>
              <Table 
                headers={exampleTableHeaders}
                rows={exampleTableRows}
                firstColumnBold
              />
            </div>

            <div className="my-16">
              <CtaCard
                imageUrl="https://picsum.photos/seed/cta-car/600/600"
                headline="¿Listo para tu próxima revisión?"
                description="Nuestro equipo de expertos está listo para ofrecerte el mejor cuidado. Agenda tu cita hoy y da el primer paso hacia un bienestar completo."
                buttonText="Pedir Cita Ahora"
                buttonLink="/contacto"
              />
            </div>

            <AuthorBio author={post.author} />
          </main>
          
          {/* Right Rail - Sidebar */}
          <div className="lg:col-span-4 self-start">
              <div className="lg:sticky lg:top-28">
                <BlogSidebar />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// --- MAIN PAGE COMPONENT ---

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const data = await getPostBySlug(slug);
        setPost(data || null);
      } catch (error) {
        console.error("Failed to fetch post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return <div className="text-center py-20">Cargando artículo...</div>;
  }

  if (!post) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Artículo no encontrado</h2>
        <p className="mt-4">La entrada del blog que buscas no existe.</p>
        <Link to="/blog" className="mt-6 inline-block">
          <Button>Volver al Blog</Button>
        </Link>
      </div>
    );
  }

  return <BlogPostLayout post={post} />;
};

export default BlogPostPage;