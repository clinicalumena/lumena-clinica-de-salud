import React, { useState, useEffect } from 'react';
import { getPosts } from '../lib/data';
import { Post } from '../types';
import PostCard from '../components/PostCard';
import { BLOG_CATEGORIES } from '../lib/data';
import CategorySlider from '../components/CategorySlider';
import FeaturedServiceCard from '../components/FeaturedServiceCard';
import SEO from '../components/SEO';

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Todos');

  const categories = ['Todos', ...BLOG_CATEGORIES];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
        setFilteredPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (activeCategory === 'Todos') {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter(post => post.category === activeCategory));
    }
  }, [activeCategory, posts]);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Blog de Salud LUMENA",
    "description": "Artículos, consejos y noticias sobre salud, fisioterapia, odontología y bienestar.",
    "publisher": {
      "@type": "MedicalOrganization",
      "name": "LUMENA Clínica de Salud",
      "logo": {
        "@type": "ImageObject",
        "url": "https://clinicalumena.com/logo.png"
      }
    },
    "blogPost": posts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "datePublished": post.date, // Note: Format should ideally be ISO 8601
      "author": {
          "@type": "Person",
          "name": post.author?.name
      },
      "url": `https://clinicalumena.com/blog/${post.slug}`
    }))
  };

  return (
    <div>
      <SEO 
        title="Blog de Salud y Bienestar"
        description="Lee nuestros últimos artículos sobre salud, prevención, tratamientos y estilo de vida saludable. Escritos por nuestros especialistas."
        keywords={["blog salud", "consejos médicos", "fisioterapia blog", "odontología blog", "bienestar"]}
        schema={schema}
      />

      {/* Mobile-only featured card */}
      <div className="mb-8 md:hidden">
        <FeaturedServiceCard />
      </div>

      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">Nuestro Blog de Salud</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Artículos, consejos y noticias para ayudarte a mantener un estilo de vida saludable.
        </p>
      </div>

      <div className="mb-12">
        <CategorySlider
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>

      {loading ? (
        <p className="text-center">Cargando artículos...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Desktop-only featured card */}
            <div className="hidden md:block">
              <FeaturedServiceCard />
            </div>
            
            {filteredPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <p className="text-center text-muted-foreground mt-8">
              No hay artículos en esta categoría por el momento.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default BlogPage;