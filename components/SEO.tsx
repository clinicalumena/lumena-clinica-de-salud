import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  type?: string;
  schema?: object;
  author?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  keywords, 
  image, 
  type = 'website', 
  schema,
  author 
}) => {
  const location = useLocation();
  // Construct absolute URL (handling hash router if necessary, but standard canonical usually points to clean URL)
  const baseUrl = 'https://clinicalumena.com';
  const url = `${baseUrl}${location.pathname}`;
  const siteName = 'LUMENA Clínica de Salud';
  const defaultImage = 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=1200&auto=format&fit=crop'; 

  useEffect(() => {
    // 1. Update Title
    document.title = `${title} | ${siteName}`;

    // 2. Helper to update/create meta tags
    const setMeta = (name: string, content: string, attr: 'name' | 'property' = 'name') => {
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 3. Standard Meta Tags
    setMeta('description', description);
    if (keywords && keywords.length > 0) {
      setMeta('keywords', keywords.join(', '));
    }
    if (author) {
      setMeta('author', author);
    }

    // 4. Open Graph Tags (Facebook/LinkedIn)
    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:url', url, 'property');
    setMeta('og:type', type, 'property');
    setMeta('og:image', image || defaultImage, 'property');
    setMeta('og:site_name', siteName, 'property');

    // 5. Twitter Card Tags
    setMeta('twitter:title', title, 'name');
    setMeta('twitter:description', description, 'name');
    setMeta('twitter:image', image || defaultImage, 'name');
    setMeta('twitter:card', 'summary_large_image', 'name');

    // 6. Canonical Link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', url);

    // 7. JSON-LD Structured Data
    if (schema) {
      let script = document.querySelector('#seo-schema');
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        script.setAttribute('id', 'seo-schema');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schema);
    } else {
        // Cleanup if no schema provided for this page
        const script = document.querySelector('#seo-schema');
        if (script) script.remove();
    }

  }, [title, description, keywords, image, type, url, schema, author]);

  return null;
};

export default SEO;