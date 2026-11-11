import React from 'react';
import { Target, BarChart3, Layers, Compass, Code, GraduationCap } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const About: React.FC = () => {
  const { data } = usePortfolio();
  const { personalInfo } = data;

  return (
    <section id="about" className="py-20 bg-white border-y border-[#E2E7ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#245B83] uppercase mb-2">
            <span>Professional Profile</span>
            <span aria-hidden="true">·</span>
            <span>Strategic & Technical Approach</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#14263D] tracking-tight">
            Bridging Creative Marketing Strategy With Technical Precision
          </h2>
        </div>

        {/* 2-Column Split: Story & Formal Portrait */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Narrative & Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4 text-base text-[#202B38] leading-relaxed">
              <p>
                {personalInfo.aboutSummary}
              </p>
              <p>
                Having managed multi-channel campaigns across Meta Ads Manager, Google Ads, and CRM integrations, I focus on building sustainable customer acquisition systems rather than short-lived traffic spikes.
              </p>
              <p className="text-[#657386]">
                My concurrent studies in Computer Science & Engineering provide a distinctive technical advantage in tracking infrastructure, data layers, Google Tag Manager event schemas, and server-side Conversion API (CAPI) implementations.
              </p>
            </div>

            {/* Approach Pillars */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="p-5 rounded-xl bg-[#F4F6F8] border border-[#E2E7ED]">
                <div className="flex items-center gap-2.5 text-[#14263D] font-bold text-sm mb-2">
                  <Target className="w-4 h-4 text-[#20A37A]" />
                  <span>Audience & Funnel Architecture</span>
                </div>
                <p className="text-xs text-[#657386] leading-relaxed">
                  Structuring cold, warm, and retention audiences with custom retargeting windows to lower blended acquisition costs.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#F4F6F8] border border-[#E2E7ED]">
                <div className="flex items-center gap-2.5 text-[#14263D] font-bold text-sm mb-2">
                  <BarChart3 className="w-4 h-4 text-[#20A37A]" />
                  <span>Data-Driven Attribution</span>
                </div>
                <p className="text-xs text-[#657386] leading-relaxed">
                  Connecting GA4, GTM, Meta Pixel, and CAPI for transparent reporting on ROAS, CPA, and user journey drop-offs.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#F4F6F8] border border-[#E2E7ED]">
                <div className="flex items-center gap-2.5 text-[#14263D] font-bold text-sm mb-2">
                  <Layers className="w-4 h-4 text-[#20A37A]" />
                  <span>Cross-Functional Leadership</span>
                </div>
                <p className="text-xs text-[#657386] leading-relaxed">
                  Aligning marketing calendars with inventory, sales quotas, creative design, and corporate dealership operations.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#F4F6F8] border border-[#E2E7ED]">
                <div className="flex items-center gap-2.5 text-[#14263D] font-bold text-sm mb-2">
                  <Code className="w-4 h-4 text-[#20A37A]" />
                  <span>Technical Foundations</span>
                </div>
                <p className="text-xs text-[#657386] leading-relaxed">
                  BSc in Computer Science & Engineering background enabling seamless technical collaboration with engineering teams.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Alternative Formal Portrait */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-sm rounded-2xl overflow-hidden border border-[#E2E7ED] bg-[#F4F6F8] shadow-xs">
              <img
                src={personalInfo.images.formalPortrait}
                alt={`${personalInfo.name} – Formal portrait representing corporate readiness`}
                className="w-full h-auto aspect-3/4 object-cover object-top"
                referrerPolicy="no-referrer"
              />
              <div className="p-4 bg-white border-t border-[#E2E7ED]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-[#14263D]">Corporate Marketing Readiness</p>
                    <p className="text-xs text-[#657386]">Full-time & Enterprise Opportunities</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold text-[#245B83]">Dhaka, BD</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
