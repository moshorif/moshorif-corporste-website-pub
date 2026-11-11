import React from 'react';
import { Target, FileDown, ArrowRight, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const CareerObjective: React.FC = () => {
  const { data } = usePortfolio();
  const { personalInfo } = data;

  return (
    <section className="py-20 bg-[#14263D] text-white relative overflow-hidden">
      {/* Background graphic accents */}
      <div className="absolute inset-0 bg-radial-[at_top_right] from-[#245B83]/30 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#20A37A] bg-white/10 px-3 py-1 rounded border border-white/10 mb-4">
            <Target className="w-3.5 h-3.5 text-[#20A37A]" />
            <span>Recruiter & Hiring Team Notice</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {personalInfo.careerObjective.heading}
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#E2E7ED] leading-relaxed">
            {personalInfo.careerObjective.text}
          </p>

          {/* Value propositions for hiring managers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 mb-10">
            <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-lg border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-[#20A37A] mt-0.5 shrink-0" />
              <div className="text-xs sm:text-sm text-white">
                <strong className="block font-semibold">Real Business Accountability:</strong>
                Track record of contributing to 50% monthly revenue growth and double-digit acquisition jumps.
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-lg border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-[#20A37A] mt-0.5 shrink-0" />
              <div className="text-xs sm:text-sm text-white">
                <strong className="block font-semibold">Technical Tracking Competence:</strong>
                B.Sc. CSE background ensuring precision pixel setup, CAPI configuration, and GA4 telemetry.
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#20A37A] hover:bg-[#1b8a67] text-white text-sm font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <span>Get in Touch for Corporate Roles</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href={personalInfo.contact.cvUrl}
              download="Mohammad_Shoriful_Islam_CV.pdf"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white text-sm font-bold rounded-lg border border-white/20 transition-colors cursor-pointer"
            >
              <FileDown className="w-4 h-4" />
              <span>Download Official CV (PDF)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
