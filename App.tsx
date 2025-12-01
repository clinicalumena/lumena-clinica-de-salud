
import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, Outlet } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MobileNav from './components/layout/MobileNav';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import SpecificServicePage from './pages/SpecificServicePage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import AuthorPage from './pages/AuthorPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import { Button } from './components/ui/Button';
import ScrollToTop from './components/ScrollToTop';
import SpecialistsPage from './pages/SpecialistsPage';
import LegalNoticePage from './pages/LegalNoticePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import CookiesPolicyPage from './pages/CookiesPolicyPage';
import SitemapPage from './pages/SitemapPage';
import SitemapXmlPage from './pages/SitemapXmlPage';

const CtaSection: React.FC = () => {
  return (
    <section className="bg-secondary/50 rounded-lg p-12 text-center mt-16 md:mt-24">
      <h2 className="text-3xl font-bold text-foreground">¿Listo para dar el primer paso hacia tu bienestar?</h2>
      <p className="mt-4 max-w-xl mx-auto text-lg text-secondary-foreground">
        Nuestro equipo de profesionales está listo para ayudarte. Contáctanos hoy mismo.
      </p>
      <Link to="/contacto">
        <Button size="lg" className="mt-8">
          Contactar Ahora
        </Button>
      </Link>
    </section>
  );
};

// Layout component
const PageLayout: React.FC = () => {
  const location = useLocation();
  const showCta = !['/aviso-legal', '/politica-de-privacidad', '/politica-de-cookies', '/sitemap.xml'].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen pb-16 md:pb-0"> {/* Added padding bottom for mobile nav */}
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Outlet /> {/* Child routes will render here */}
        {showCta && <CtaSection />}
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
};


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Routes with the main layout */}
        <Route element={<PageLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/servicios" element={<ServicesPage />} />
          <Route path="/servicios/:slug" element={<ServiceDetailPage />} />
          <Route path="/servicios/:categorySlug/:serviceSlug" element={<SpecificServicePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/especialistas" element={<SpecialistsPage />} />
          <Route path="/especialistas/:slug" element={<AuthorPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/aviso-legal" element={<LegalNoticePage />} />
          <Route path="/politica-de-privacidad" element={<PrivacyPolicyPage />} />
          <Route path="/politica-de-cookies" element={<CookiesPolicyPage />} />
          <Route path="/mapa-web" element={<SitemapPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        {/* Route without the layout */}
        <Route path="/sitemap.xml" element={<SitemapXmlPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
