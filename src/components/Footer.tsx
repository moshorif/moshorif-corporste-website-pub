import React from 'react';
import { Mail, Phone, Linkedin, ExternalLink, ArrowUp } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Footer: React.FC = () => {
  const { data } = usePortfolio();
  const { personalInfo } = data;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#14263D] text-[#E2E7ED] border-t border-[#202B38]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          {/* Brand & positioning column (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <a href="#home" className="inline-block">
              <span className="text-xl font-bold tracking-tight text-white block">
                {personalInfo.name}
              </span>
              <span className="text-xs font-semibold text-[#20A37A] tracking-wider uppercase block mt-0.5">
                {personalInfo.role}
              </span>
            </a>
            <p className="text-xs sm:text-sm text-[#E2E7ED]/80 leading-relaxed max-w-md">
              Driving business growth through performance strategy, audience segmentation, digital advertising execution, and data-backed analytics across e-commerce, automotive, and travel.
            </p>
            <div className="text-xs text-[#E2E7ED]/60">
              Based in {personalInfo.contact.location} • Available for corporate full-time opportunities
            </div>
          </div>

          {/* Quick links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About & Background
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-white transition-colors">
                  Professional Experience
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-white transition-colors">
                  Campaign Case Studies
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-white transition-colors">
                  Core Competencies
                </a>
              </li>
              <li>
                <a href="#education" className="hover:text-white transition-colors">
                  Education & Credentials
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact & Hiring
                </a>
              </li>
            </ul>
          </div>

          {/* Direct channels & Drive (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Direct Contact & Proof
            </h4>
            <div className="space-y-2 text-xs sm:text-sm">
              <div>
                <a
                  href={`mailto:${personalInfo.contact.email}`}
                  className="hover:text-white transition-colors inline-flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5 text-[#20A37A]" />
                  <span>{personalInfo.contact.email}</span>
                </a>
              </div>
              <div>
                <a
                  href={`tel:${personalInfo.contact.phoneRaw}`}
                  className="hover:text-white transition-colors inline-flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-[#20A37A]" />
                  <span>{personalInfo.contact.phone}</span>
                </a>
              </div>
              <div>
                <a
                  href={personalInfo.contact.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-2"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#20A37A]" />
                  <span>{personalInfo.contact.linkedInDisplay}</span>
                  <ExternalLink className="w-3 h-3 text-[#E2E7ED]/60" />
                </a>
              </div>
              <div className="pt-2">
                <a
                  href={personalInfo.contact.portfolioDrive}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#20A37A] hover:underline"
                >
                  <span>Google Drive Portfolio Archive</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Verification & Integrity Statement */}
        <div className="pt-8 border-t border-[#202B38] flex flex-col md:flex-row md:items-center justify-between gap-4 text-[11px] text-[#E2E7ED]/60">
          <p className="max-w-3xl leading-relaxed">
            All campaign performance figures, screenshots, and credentials are based on documented employment history and campaign executions at LensCart Bangladesh, Niloy Motors Ltd., Unity Tourism BD, Genex Infosys Ltd., and partner initiatives.
          </p>
          <div className="flex items-center gap-4 shrink-0">
            <span>© {new Date().getFullYear()} {personalInfo.name}</span>
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-white transition-colors flex items-center gap-1 cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
