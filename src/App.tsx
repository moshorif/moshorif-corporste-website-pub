import React, { useState, useEffect } from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Portfolio } from './components/Portfolio';
import { ProjectModal } from './components/ProjectModal';
import { Skills } from './components/Skills';
import { EducationCertifications } from './components/EducationCertifications';
import { CareerObjective } from './components/CareerObjective';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { PublicAdminToolbar } from './components/admin/PublicAdminToolbar';
import { CaseStudy } from './types/portfolio';

function AppContent() {
  const [selectedProject, setSelectedProject] = useState<CaseStudy | null>(null);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isAdminView, setIsAdminView] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      const params = new URLSearchParams(window.location.search);
      return hash === '#admin' || params.get('admin') === '1';
    }
    return false;
  });

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash.toLowerCase() === '#admin') {
        setIsAdminView(true);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (isAdminView) return;

    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'portfolio', 'skills', 'education', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAdminView]);

  if (isAdminView) {
    return (
      <AdminDashboard
        onViewPublicSite={() => {
          setIsAdminView(false);
          if (window.location.hash === '#admin') {
            window.history.pushState(null, '', window.location.pathname);
          }
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F6F8] text-[#202B38] font-sans antialiased selection:bg-[#245B83] selection:text-white flex flex-col">
      {/* WordPress / Shopify style Public Admin Bar */}
      <PublicAdminToolbar onOpenDashboard={() => setIsAdminView(true)} />

      {/* Sticky Main Navigation */}
      <Navbar activeSection={activeSection} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero with studio portrait & career highlights strip */}
        <Hero />

        {/* 2. About section with alternative formal portrait & strategic pillars */}
        <About />

        {/* 3. Professional Experience timeline verified against CV */}
        <Experience />

        {/* 4. Filterable Campaign Portfolio & Case Studies */}
        <Portfolio onSelectProject={(project) => setSelectedProject(project)} />

        {/* 5. Core Competencies & CSE Technical Edge */}
        <Skills />

        {/* 6. Education (BSc CSE) & Industry Certifications */}
        <EducationCertifications />

        {/* 7. Corporate Career Objective & Value Proposition */}
        <CareerObjective />

        {/* 8. Contact & Hiring Inquiries Form */}
        <Contact />
      </main>

      {/* Footer with verification statement */}
      <Footer />

      {/* Case Study Proof Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <AppContent />
    </PortfolioProvider>
  );
}
