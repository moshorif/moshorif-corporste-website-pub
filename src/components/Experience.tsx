import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, TrendingUp } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { ExperienceItem } from '../types/portfolio';

export const Experience: React.FC = () => {
  const { data } = usePortfolio();
  const experiences = data.experiences;

  return (
    <section id="experience" className="py-24 bg-white border-b border-[#E2E7ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#245B83] bg-[#E2E7ED]/50 px-3 py-1 rounded mb-3">
            <Briefcase className="w-3.5 h-3.5 text-[#245B83]" />
            <span>Career History</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14263D] tracking-tight">
            Professional Experience & Track Record
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#657386] leading-relaxed">
            Hands-on performance marketing, campaign leadership, and cross-functional execution across e-commerce retail, automotive, and travel sectors. Verified against official employment records.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="relative border-l-2 border-[#E2E7ED] ml-4 sm:ml-8 space-y-12">
          {experiences.map((exp: ExperienceItem) => (
            <div key={exp.id} className="relative pl-6 sm:pl-10">
              {/* Timeline marker */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-[#245B83]" />

              <div className="bg-[#F4F6F8] rounded-xl p-6 sm:p-8 border border-[#E2E7ED] hover:border-[#245B83]/40 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#14263D]">
                      {exp.role}
                    </h3>
                    <div className="text-base font-semibold text-[#245B83] mt-1">
                      {exp.company}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-[#657386]">
                    <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1 rounded border border-[#E2E7ED] font-medium text-[#202B38]">
                      <Calendar className="w-4 h-4 text-[#245B83]" />
                      {exp.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1 rounded border border-[#E2E7ED] font-medium text-[#202B38]">
                      <MapPin className="w-4 h-4 text-[#245B83]" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Key Responsibilities */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#657386] mb-3">
                    Core Responsibilities & Campaign Activities
                  </h4>
                  <ul className="space-y-2.5">
                    {exp.bullets.map((bullet: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-[#202B38] leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-[#20A37A] mt-1 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Achievements / Highlights if present */}
                {exp.highlights && exp.highlights.length > 0 && (
                  <div className="pt-5 border-t border-[#E2E7ED]">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#245B83] mb-3 flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-[#20A37A]" />
                      Documented Campaign Contributions
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {exp.highlights.map((highlight: string, idx: number) => (
                        <div
                          key={idx}
                          className="bg-white p-3 rounded-lg border border-[#E2E7ED] text-xs sm:text-sm text-[#202B38] font-medium leading-snug"
                        >
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
