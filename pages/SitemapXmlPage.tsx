import React, { useState, useEffect } from 'react';
import { getPosts, getServices, getAuthors } from '../lib/data';
import { Post, Service, Author } from '../types';

const BASE_URL = 'https://clinicalumena.es';

const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
};

const parseSpanishDate = (dateString: string): Date => {
    const months: { [key: string]: number } = {
        'enero': 0, 'febrero': 1, 'marzo': 2, 'abril': 3, 'mayo': 4, 'junio': 5,
        'julio': 6, 'agosto': 7, 'septiembre': 8, 'octubre': 9, 'noviembre': 10, 'diciembre': 11
    };
    // Handles "15 de Julio, 2024" format
    const cleanedString = dateString.toLowerCase().replace(/,/g, '');
    const parts = cleanedString.split(' '); // ["15", "de", "julio", "2024"]
    if (parts.length === 4) {
        const day = parseInt(parts[0], 10);
        const month = months[parts[2]];
        const year = parseInt(parts[3], 10);
        if (!isNaN(day) && month !== undefined && !isNaN(year)) {
            return new Date(year, month, day);
        }
    }
    // Fallback for unexpected formats
    return new Date();
};


const SitemapXmlPage: React.FC = () => {
    const [sitemapContent, setSitemapContent] = useState('Generating sitemap...');

    useEffect(() => {
        const generateSitemap = async () => {
            try {
                const [posts, services, authors] = await Promise.all([
                    getPosts(),
                    getServices(),
                    getAuthors(),
                ]);
                
                const today = formatDate(new Date());

                const staticPages = [
                    { loc: '/', priority: '1.0', changefreq: 'daily', lastmod: today },
                    { loc: '/#/servicios', priority: '0.7', changefreq: 'weekly', lastmod: today },
                    { loc: '/#/blog', priority: '0.7', changefreq: 'weekly', lastmod: today },
                    { loc: '/#/contacto', priority: '0.5', changefreq: 'monthly', lastmod: today },
                    { loc: '/#/especialistas', priority: '0.7', changefreq: 'monthly', lastmod: today },
                    { loc: '/#/mapa-web', priority: '0.3', changefreq: 'yearly', lastmod: today },
                ];

                const serviceUrls = services.map(service => ({
                    loc: `/#/servicios/${service.slug}`,
                    priority: '0.9',
                    changefreq: 'monthly',
                    lastmod: today,
                }));

                const postUrls = posts.map(post => ({
                    loc: `/#/blog/${post.slug}`,
                    priority: '0.6',
                    changefreq: 'monthly',
                    lastmod: formatDate(parseSpanishDate(post.date)),
                }));

                const authorUrls = authors.map(author => ({
                    loc: `/#/especialistas/${author.slug}`,
                    priority: '0.8',
                    changefreq: 'monthly',
                    lastmod: today,
                }));

                const allUrls = [...staticPages, ...serviceUrls, ...postUrls, ...authorUrls];

                const urlEntries = allUrls.map(url => `
  <url>
    <loc>${BASE_URL}${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('');

                const content = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlEntries}
</urlset>`;
                
                setSitemapContent(content);

            } catch (error) {
                console.error("Failed to generate sitemap:", error);
                setSitemapContent('Error generating sitemap.');
            }
        };

        generateSitemap();
    }, []);

    return (
        <pre style={{ margin: 0, whiteSpace: 'pre', wordBreak: 'break-word', fontFamily: 'monospace' }}>
            {sitemapContent}
        </pre>
    );
};

export default SitemapXmlPage;