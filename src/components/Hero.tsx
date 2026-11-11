import React from 'react';
import { ArrowDown, Download, Mail } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Hero: React.FC = () => {
  const { data } = usePortfolio();
  const { personalInfo, careerHighlights } = data;

  return (
    <section id="home" className="pt-24 pb-16 lg:pt-32 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Screen 2-Column Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typographic Hierarchy & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Clean unboxed kicker with typographic separator */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wide text-[#245B83] uppercase mb-4">
              <span>{personalInfo.contact.location}</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>6+ Years Experience</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>Meta Certified Advertiser</span>
            </div>

            {/* Main Headline with balanced wrap */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#14263D] tracking-tight leading-[1.15] mb-6 text-balance">
              {personalInfo.headline}
            </h1>

            {/* Sub-headline / Supporting text */}
            <p className="text-base sm:text-lg text-[#657386] leading-relaxed mb-6 max-w-2xl">
              {personalInfo.supportingHeadline}
            </p>

            <p className="text-sm sm:text-base text-[#202B38]/90 leading-relaxed mb-8 max-w-2xl">
              Performance marketing, campaign strategy, and data-driven execution backed by hands-on experience across e-commerce retail, automotive, and travel industries.
            </p>

            {/* CTAs: Primary, Secondary, Additional */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#14263D] hover:bg-[#245B83] active:bg-[#0E1B2C] rounded-lg transition-colors shadow-xs whitespace-nowrap cursor-pointer"
              >
                <span>Explore My Work</span>
                <ArrowDown className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href={personalInfo.contact.cvUrl}
                download="Mohammad_Shoriful_Islam_CV.pdf"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-[#14263D] bg-white hover:bg-slate-50 border border-[#E2E7ED] rounded-lg transition-colors whitespace-nowrap shadow-xs cursor-pointer"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                <span>Download My CV</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[#245B83] hover:text-[#14263D] hover:bg-slate-100/60 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                <span>Contact Me</span>
              </a>
            </div>

            {/* Industry Expertise Micro-Tags */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#657386] font-medium pt-4 border-t border-[#E2E7ED]">
              <span className="text-[#14263D] font-bold">Focus:</span>
              <span className="bg-white px-2.5 py-1 rounded border border-[#E2E7ED]">
                E-Commerce Scaling
              </span>
              <span className="bg-white px-2.5 py-1 rounded border border-[#E2E7ED]">
                Meta & Google Ads
              </span>
              <span className="bg-white px-2.5 py-1 rounded border border-[#E2E7ED]">
                GA4 & Server CAPI
              </span>
            </div>
          </div>

          {/* Right Column: Studio Portrait on Neutral Grey */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm sm:max-w-md">
              <div className="relative bg-[#E2E7ED]/50 rounded-2xl overflow-hidden border border-[#E2E7ED] shadow-md aspect-[3/4]">
                <img
                  src={personalInfo.images.heroPortrait}
                  alt={`${personalInfo.name} – Studio portrait on neutral grey background`}
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl pointer-events-none" />
              </div>

              {/* Verified Performance Pill Badge */}
              <div className="absolute -bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-[#E2E7ED] shadow-lg flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#14263D]">
                    {personalInfo.name}
                  </p>
                  <p className="text-[11px] text-[#657386]">
                    Performance Marketing & Digital Strategy
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-0.5 text-[10px] font-bold text-[#20A37A] bg-emerald-50 rounded border border-emerald-100">
                    6+ Yrs Exp
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Career Highlights Metric Strip */}
        <div className="mt-16 pt-12 border-t border-[#E2E7ED]">
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#657386]">
              Key Contributions & Campaign Milestones
            </h2>
            <p className="text-xs sm:text-sm text-[#202B38]/80 mt-1">
              Documented performance contributions within cross-functional teams and managed accounts.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {careerHighlights.map((highlight, index) => (
              <div
                key={index}
                className="bg-white p-4 sm:p-5 rounded-xl border border-[#E2E7ED] shadow-2xs hover:border-[#245B83]/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#14263D] tracking-tight">
                    {highlight.value}
                  </div>
                  <div className="text-xs font-bold text-[#245B83] mt-1 line-clamp-1">
                    {highlight.label}
                  </div>
                </div>
                <p className="text-[11px] text-[#657386] mt-2.5 leading-normal">
                  {highlight.context}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
